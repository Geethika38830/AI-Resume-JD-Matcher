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
import { register } from '../services/authService'

interface RegisterProps {
  onRegistered?: () => void
  onSignIn?: () => void
}

export default function Register({
  onRegistered,
  onSignIn,
}: RegisterProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleRegister() {
    setError('')

    if (!fullName.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.')
      return
    }

    if (fullName.trim().length < 2) {
      setError('Full name must contain at least 2 characters.')
      return
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setBusy(true)

    try {
      await register(fullName.trim(), email.trim(), password)
      onRegistered?.()

      if (!onRegistered) {
        onSignIn?.()
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Registration failed.',
      )
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
          Create your account
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Start matching your resume with the right opportunities.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2.5}>
          <TextField
            label="Full name"
            value={fullName}
            onChange={event => setFullName(event.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            fullWidth
            required
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleRegister}
            disabled={busy}
          >
            {busy ? 'Creating account…' : 'Create account'}
          </Button>

          <Button onClick={onSignIn}>
            Already registered? Sign in
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}