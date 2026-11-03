
import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { login } from '../services/authService'

interface LoginProps {
  onLogin: () => void
  onRegister: () => void
}

export default function Login({ onLogin, onRegister }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleLogin() {
    setError('')
    setBusy(true)

    try {
      const result = await login(email.trim(), password)

      if (!result.access_token) {
        throw new Error('The server did not return an access token.')
      }

      localStorage.setItem('access_token', result.access_token)
      onLogin()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Box className="auth-screen">
      <Paper className="auth-card" elevation={0}>
        <Box className="brand-mark">
          <AutoAwesomeRoundedIcon />
        </Box>

        <Typography variant="h4" fontWeight={800} gutterBottom>
          Resume<span className="accent-text">IQ</span>
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Your AI-powered career matching workspace.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2.5}>
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={busy || !email.trim() || !password}
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </Button>

          <Button onClick={onRegister}>
            New here? Create an account
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
