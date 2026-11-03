import { useRef, useState } from 'react'

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
  Typography,
} from '@mui/material'

import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

import { uploadResume } from '../../services/resumeService'

interface ResumeUploadProps {
  onUploaded?: (resume: { id?: number; filename?: string }) => void
}

const MAX_FILE_SIZE = 10 * 1024 * 1024

export default function ResumeUpload({ onUploaded }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploadedId, setUploadedId] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  function chooseFile(selectedFile?: File) {
    setError('')
    setSuccess('')
    setUploadedId(null)

    if (!selectedFile) return

    if (
      selectedFile.type !== 'application/pdf' &&
      !selectedFile.name.toLowerCase().endsWith('.pdf')
    ) {
      setFile(null)
      setError('Please select a PDF file.')
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null)
      setError('The file is too large. Please choose a PDF under 10 MB.')
      return
    }

    if (selectedFile.size === 0) {
      setFile(null)
      setError('The selected file is empty. Please choose another PDF.')
      return
    }

    setFile(selectedFile)
  }

  async function submit() {
    if (!file) {
      setError('Choose a PDF resume before uploading.')
      return
    }

    setError('')
    setSuccess('')
    setBusy(true)

    try {
      const result = await uploadResume(file)
      const uploadedResume = result.resume

      onUploaded?.({
        id: uploadedResume.id,
        filename:
          uploadedResume.file_name ?? uploadedResume.filename,
      })

      setUploadedId(
        typeof uploadedResume.id === 'number'
          ? uploadedResume.id
          : null,
      )

      setSuccess(
        `Resume uploaded successfully${
          uploadedResume.id != null
            ? ` (ID: ${uploadedResume.id})`
            : ''
        }.`,
      )

      setFile(null)

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Upload failed. Please try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  function clearFile() {
    setFile(null)
    setError('')
    setSuccess('')
    setUploadedId(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <Stack spacing={3}>
      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess('')}
          icon={<CheckCircleRoundedIcon />}
        >
          <Stack spacing={0.75}>
            <Typography fontWeight={700} variant="body2">
              {success}
            </Typography>

            {uploadedId !== null && (
              <Chip
                size="small"
                color="success"
                variant="outlined"
                label={`Resume ID: ${uploadedId}`}
                sx={{ alignSelf: 'flex-start' }}
              />
            )}
          </Stack>
        </Alert>
      )}

      <Card
        variant="outlined"
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          borderColor: file ? 'primary.main' : 'divider',
          transition: 'border-color 0.2s ease',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                variant="rounded"
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'primary.light',
                  color: 'primary.dark',
                  borderRadius: 2.5,
                }}
              >
                <CloudUploadRoundedIcon />
              </Avatar>

              <Box>
                <Typography variant="h6" fontWeight={850}>
                  Upload your resume
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start by adding your latest resume PDF.
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Box
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                if (!busy) chooseFile(event.dataTransfer.files?.[0])
              }}
              sx={{
                border: '2px dashed',
                borderColor: file ? 'primary.main' : 'divider',
                borderRadius: 3,
                p: { xs: 3, sm: 4 },
                textAlign: 'center',
                bgcolor: file ? 'action.selected' : 'action.hover',
                transition: 'all 0.2s ease',
              }}
            >
              <Avatar
                sx={{
                  width: 68,
                  height: 68,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: file ? 'success.light' : 'background.paper',
                  color: file ? 'success.dark' : 'primary.main',
                  boxShadow: 1,
                }}
              >
                {file ? (
                  <PictureAsPdfRoundedIcon sx={{ fontSize: 34 }} />
                ) : (
                  <CloudUploadRoundedIcon sx={{ fontSize: 34 }} />
                )}
              </Avatar>

              <Typography fontWeight={800} variant="subtitle1">
                {file ? 'Your resume is ready' : 'Drop your resume here'}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.75 }}
              >
                {file
                  ? 'Check the file details below before uploading.'
                  : 'Or browse your computer to select a file.'}
              </Typography>

              <Button
                component="label"
                variant="outlined"
                disabled={busy}
                sx={{
                  mt: 2,
                  borderRadius: 2.5,
                  textTransform: 'none',
                  fontWeight: 750,
                }}
              >
                Browse PDF
                <input
                  ref={inputRef}
                  hidden
                  type="file"
                  accept=".pdf,application/pdf"
                  disabled={busy}
                  onChange={(event) => {
                    chooseFile(event.target.files?.[0])
                    event.target.value = ''
                  }}
                />
              </Button>

              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 2 }}
              >
                <Chip size="small" label="PDF only" variant="outlined" />
                <Chip size="small" label="Max 10 MB" variant="outlined" />
              </Stack>
            </Box>

            {file && (
              <Card
                variant="outlined"
                sx={{ borderRadius: 2.5, bgcolor: 'background.paper' }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: '#fff0f0',
                        color: '#d32f2f',
                        borderRadius: 2,
                      }}
                    >
                      <PictureAsPdfRoundedIcon />
                    </Avatar>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        fontWeight={750}
                        variant="body2"
                        sx={{ overflowWrap: 'anywhere' }}
                      >
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </Typography>
                    </Box>

                    <Button
                      color="inherit"
                      size="small"
                      aria-label="Remove selected file"
                      onClick={clearFile}
                      disabled={busy}
                      sx={{ minWidth: 'auto' }}
                    >
                      <DeleteOutlineRoundedIcon />
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            )}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.25,
                p: 2,
                borderRadius: 2.5,
                bgcolor: 'action.hover',
              }}
            >
              <AutoAwesomeRoundedIcon
                sx={{ color: 'primary.main', mt: 0.25 }}
              />
              <Box>
                <Typography variant="body2" fontWeight={750}>
                  Better resume matching
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5, lineHeight: 1.7 }}
                >
                  Use a clear, up-to-date resume with your skills, projects,
                  education, and work experience for more useful job comparisons.
                </Typography>
              </Box>
            </Box>

            {busy && (
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <CircularProgress size={18} />
                <Typography variant="body2" color="text.secondary">
                  Uploading your resume...
                </Typography>
              </Stack>
            )}

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => void submit()}
              disabled={!file || busy}
              startIcon={
                busy ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <CloudUploadRoundedIcon />
                )
              }
              sx={{
                py: 1.4,
                borderRadius: 2.5,
                fontWeight: 800,
                textTransform: 'none',
                boxShadow: 'none',
              }}
            >
              {busy ? 'Uploading...' : 'Upload resume'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}