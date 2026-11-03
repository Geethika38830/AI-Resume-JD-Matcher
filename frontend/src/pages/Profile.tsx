
import { useEffect, useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'

import {
  getMyProfile,
  type UserProfile,
} from '../services/authService'

const PROFILE_STORAGE_KEY = 'resumeiq_career_profile'

interface CareerProfile {
  targetRole: string
  careerGoal: string
}

const defaultCareerProfile: CareerProfile = {
  targetRole: '',
  careerGoal: '',
}

function readCareerProfile(): CareerProfile {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!saved) return defaultCareerProfile

    const parsed = JSON.parse(saved)

    return {
      targetRole:
        typeof parsed.targetRole === 'string'
          ? parsed.targetRole
          : '',
      careerGoal:
        typeof parsed.careerGoal === 'string'
          ? parsed.careerGoal
          : '',
    }
  } catch {
    return defaultCareerProfile
  }
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [targetRole, setTargetRole] = useState(
    () => readCareerProfile().targetRole,
  )
  const [careerGoal, setCareerGoal] = useState(
    () => readCareerProfile().careerGoal,
  )
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true

    getMyProfile()
      .then(profile => {
        if (active) {
          setUser(profile)
          setError('')
        }
      })
      .catch(err => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load your account details.',
          )
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const fullName = user?.full_name ?? ''
  const email = user?.email ?? ''

  const initials = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'U'

  function handleSave() {
    setSaving(true)
    setMessage('')
    setError('')

    try {
      const careerProfile: CareerProfile = {
        targetRole: targetRole.trim(),
        careerGoal: careerGoal.trim(),
      }

      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(careerProfile),
      )

      setMessage('Your career profile has been saved on this browser.')
    } catch {
      setError('Unable to save your career profile in this browser.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Stack spacing={3} sx={{ width: '100%', minWidth: 0, pb: 4 }}>
      <Box>
        <Typography
          variant="overline"
          sx={{ color: '#635bdb', fontWeight: 800, letterSpacing: 1.5 }}
        >
          YOUR ACCOUNT
        </Typography>

        <Typography
          variant="h4"
          sx={{ mt: 0.5, fontWeight: 850, letterSpacing: '-1px' }}
        >
          Profile & career goals
        </Typography>

        <Typography color="text.secondary" mt={1}>
          View your account details and personalize your career workspace.
        </Typography>
      </Box>

      <Box
        sx={{
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          color: 'white',
          background:
            'linear-gradient(120deg, #29265e 0%, #5145b9 58%, #7669ed 100%)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2.5}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Avatar
            sx={{
              width: 78,
              height: 78,
              bgcolor: 'rgba(255,255,255,0.16)',
              color: 'white',
              fontSize: 26,
              fontWeight: 850,
            }}
          >
            {loading ? <CircularProgress color="inherit" size={28} /> : initials}
          </Avatar>

          <Box>
            <Typography variant="overline">
              PROFILE OVERVIEW
            </Typography>

            <Typography variant="h4" fontWeight={850}>
              {loading ? 'Loading profile...' : fullName || 'Account name unavailable'}
            </Typography>

            <Typography mt={1} sx={{ color: 'rgba(255,255,255,0.85)' }}>
              {targetRole || 'Choose a target role for your career journey.'}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {error && (
        <Alert severity="error">{error}</Alert>
      )}

      {message && (
        <Alert
          severity="success"
          icon={<TipsAndUpdatesRoundedIcon />}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}

      <Card sx={{ border: '1px solid #e9eaf2', borderRadius: 3.5 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" fontWeight={850}>
            Account information
          </Typography>

          <Typography color="text.secondary" variant="body2" mt={0.5}>
            These details are fetched from your logged-in account.
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          {loading ? (
            <Stack alignItems="center" spacing={2} py={4}>
              <CircularProgress />
              <Typography color="text.secondary">
                Loading your account details...
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={2.5}>
              <TextField
                label="Full name"
                fullWidth
                value={fullName}
                slotProps={{ input: { readOnly: true } }}
                InputProps={{
                  startAdornment: (
                    <AccountCircleRoundedIcon
                      sx={{ color: 'text.secondary', mr: 1 }}
                    />
                  ),
                }}
              />

              <TextField
                label="Email address"
                type="email"
                fullWidth
                value={email}
                slotProps={{ input: { readOnly: true } }}
                InputProps={{
                  startAdornment: (
                    <EmailRoundedIcon
                      sx={{ color: 'text.secondary', mr: 1 }}
                    />
                  ),
                }}
              />
            </Stack>
          )}
        </CardContent>
      </Card>

      <Card sx={{ border: '1px solid #e9eaf2', borderRadius: 3.5 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="h6" fontWeight={850}>
            Career preferences
          </Typography>

          <Typography color="text.secondary" variant="body2" mt={0.5}>
            These preferences are saved in this browser, separately from your
            login account.
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          <Stack spacing={2.5}>
            <TextField
              label="Target job role"
              placeholder="e.g. AI/ML Engineer"
              value={targetRole}
              onChange={event => setTargetRole(event.target.value)}
              fullWidth
            />

            <TextField
              label="Career goal"
              placeholder="Describe your next career goal"
              value={careerGoal}
              onChange={event => setCareerGoal(event.target.value)}
              multiline
              minRows={3}
              fullWidth
            />

            <Button
              variant="contained"
              size="large"
              startIcon={<CheckCircleRoundedIcon />}
              onClick={handleSave}
              disabled={saving}
              sx={{
                py: 1.3,
                borderRadius: 2.5,
                fontWeight: 800,
                textTransform: 'none',
                boxShadow: 'none',
              }}
            >
              {saving ? 'Saving...' : 'Save career profile'}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3.5, bgcolor: '#f8f7ff', boxShadow: 'none' }}>
        <CardContent>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <WorkOutlineRoundedIcon sx={{ color: '#635bdb' }} />
            <Box>
              <Typography fontWeight={800}>Your career workspace</Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Your account details come from the backend. Career preferences
                are stored locally in this browser.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
