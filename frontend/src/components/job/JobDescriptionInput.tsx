import { useState } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'

import { createJobDescription } from '../../services/jobService'

interface JobDescriptionInputProps {
  onCreated?: (job: {
    id?: number
    title?: string
    description?: string
  }) => void
}

const MAX_TITLE_LENGTH = 150
const MAX_DESCRIPTION_LENGTH = 15000

export default function JobDescriptionInput({
  onCreated,
}: JobDescriptionInputProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [savedId, setSavedId] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit() {
    setError('')
    setSuccess('')
    setSavedId(null)

    const cleanTitle = title.trim()
    const cleanDescription = description.trim()

    if (!cleanTitle || !cleanDescription) {
      setError('Enter both a job title and a job description.')
      return
    }

    if (cleanTitle.length > MAX_TITLE_LENGTH) {
      setError(`The job title must be ${MAX_TITLE_LENGTH} characters or fewer.`)
      return
    }

    if (cleanDescription.length > MAX_DESCRIPTION_LENGTH) {
      setError(
        `The description must be ${MAX_DESCRIPTION_LENGTH.toLocaleString()} characters or fewer.`,
      )
      return
    }

    if (cleanDescription.length < 30) {
      setError(
        'Please provide a more detailed job description so the matching system has enough information.',
      )
      return
    }

    setBusy(true)

    try {
      const result = await createJobDescription(
        cleanTitle,
        cleanDescription,
      )

      const job = {
        ...result,
        title: cleanTitle,
        description: cleanDescription,
      }

      setSavedId(typeof result.id === 'number' ? result.id : null)
      setSuccess(
        result.id !== undefined
          ? `Job description saved successfully. ID: ${result.id}.`
          : 'Job description saved successfully.',
      )

      onCreated?.(job)

      setTitle('')
      setDescription('')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not save the job description. Please try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  function resetForm() {
    setTitle('')
    setDescription('')
    setError('')
    setSuccess('')
    setSavedId(null)
  }

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
      >
        <Avatar
          variant="rounded"
          sx={{
            width: 48,
            height: 48,
            bgcolor: '#e1f7ef',
            color: '#0e9f83',
            borderRadius: 2.5,
          }}
        >
          <WorkRoundedIcon />
        </Avatar>

        <Box>
          <Typography variant="h6" fontWeight={850}>
            Add a job description
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.25}>
            Capture the requirements of your target role.
          </Typography>
        </Box>
      </Stack>

      <Divider />

      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          icon={<CheckCircleRoundedIcon />}
          onClose={() => setSuccess('')}
        >
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight={700}>
              {success}
            </Typography>

            {savedId !== null && (
              <Chip
                size="small"
                color="success"
                variant="outlined"
                label={`Saved job ID: ${savedId}`}
                sx={{ alignSelf: 'flex-start', fontWeight: 750 }}
              />
            )}
          </Stack>
        </Alert>
      )}

      <Box>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <WorkRoundedIcon sx={{ color: '#0e9f83', fontSize: 20 }} />
          <Typography fontWeight={750}>Job title</Typography>
        </Stack>

        <TextField
          label="Target job title"
          placeholder="e.g. AI/ML Engineer"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            setError('')
            setSuccess('')
          }}
          fullWidth
          disabled={busy}
          required
          slotProps={{
            htmlInput: { maxLength: MAX_TITLE_LENGTH },
          }}
          helperText={`${title.length}/${MAX_TITLE_LENGTH} characters`}
        />
      </Box>

      <Box>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <DescriptionRoundedIcon
            sx={{ color: '#635bdb', fontSize: 20 }}
          />
          <Typography fontWeight={750}>Job description</Typography>
        </Stack>

        <TextField
          label="Paste the job description"
          placeholder="Paste the responsibilities, required skills, qualifications, and experience for the role here..."
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
            setError('')
            setSuccess('')
          }}
          multiline
          minRows={8}
          maxRows={18}
          fullWidth
          required
          disabled={busy}
          slotProps={{
            htmlInput: { maxLength: MAX_DESCRIPTION_LENGTH },
          }}
          helperText={`${description.length.toLocaleString()}/${MAX_DESCRIPTION_LENGTH.toLocaleString()} characters`}
        />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1, lineHeight: 1.7 }}
        >
          Include relevant skills, tools, responsibilities, and qualifications
          to support a more useful comparison.
        </Typography>
      </Box>

      <Card
        variant="outlined"
        sx={{
          borderRadius: 2.5,
          bgcolor: '#fafaff',
          borderColor: '#e6e4fa',
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Stack direction="row" spacing={1.25} alignItems="flex-start">
            <AutoAwesomeRoundedIcon
              sx={{ color: '#635bdb', mt: 0.15 }}
            />

            <Box>
              <Typography fontWeight={750} variant="body2">
                Tip for better matching
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.5}
                lineHeight={1.7}
              >
                Use the complete job posting when possible. Specific technical
                requirements help the system compare the role with your resume.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {busy && (
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <CircularProgress size={18} />
          <Typography variant="body2" color="text.secondary">
            Saving job description...
          </Typography>
        </Stack>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          startIcon={
            busy ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <SaveRoundedIcon />
            )
          }
          onClick={submit}
          disabled={busy}
          sx={{
            py: 1.3,
            borderRadius: 2.5,
            fontWeight: 800,
            textTransform: 'none',
            boxShadow: 'none',
          }}
        >
          {busy ? 'Saving...' : 'Save job description'}
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<RestartAltRoundedIcon />}
          onClick={resetForm}
          disabled={busy || (!title && !description && !error && !success)}
          sx={{
            py: 1.3,
            px: 2.5,
            borderRadius: 2.5,
            fontWeight: 750,
            textTransform: 'none',
          }}
        >
          Clear form
        </Button>
      </Stack>
    </Stack>
  )
}