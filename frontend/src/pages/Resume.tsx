import { useEffect, useRef, useState } from 'react'

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'

import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'

import {
  getResumes,
  uploadResume,
  type Resume as ResumeRecord,
} from '../services/resumeService'

const MAX_FILE_SIZE = 10 * 1024 * 1024

export default function Resume() {
  const inputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File | null>(null)
  const [resumeId, setResumeId] = useState('')
  const [resumes, setResumes] = useState<ResumeRecord[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [loadingResumes, setLoadingResumes] = useState(true)

  async function loadResumes() {
    setLoadingResumes(true)

    try {
      const result = await getResumes()
      setResumes(result)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not load your saved resumes.',
      )
    } finally {
      setLoadingResumes(false)
    }
  }

  useEffect(() => {
    void loadResumes()
  }, [])

  function selectFile(selectedFile?: File) {
    setError('')
    setMessage('')

    if (!selectedFile) return

    const isPdf =
      selectedFile.type === 'application/pdf' ||
      selectedFile.name.toLowerCase().endsWith('.pdf')

    if (!isPdf) {
      setFile(null)
      setError('Please select a PDF file.')
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null)
      setError('The PDF must be 10 MB or smaller.')
      return
    }

    if (selectedFile.size === 0) {
      setFile(null)
      setError('The selected file is empty. Choose another PDF.')
      return
    }

    setFile(selectedFile)
  }

  async function handleUpload() {
    if (!file) {
      setError('Choose a PDF file before uploading.')
      return
    }

    setBusy(true)
    setError('')
    setMessage('')

    try {
      const result = await uploadResume(file)

      // The backend returns the resume inside result.resume.
      if (result.resume?.id != null) {
        setResumeId(String(result.resume.id))
      }

      setMessage(
        result.message || 'Your resume was uploaded successfully.',
      )

      setFile(null)

      if (inputRef.current) {
        inputRef.current.value = ''
      }

      // Reload saved resumes after a successful upload.
      await loadResumes()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Resume upload failed. Please try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  const formattedSize = file
    ? file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(1)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    : ''

  return (
    <Stack spacing={3} sx={{ width: '100%', minWidth: 0, pb: 4 }}>
      <Box>
        <Typography
          variant="overline"
          sx={{ color: '#635bdb', fontWeight: 800, letterSpacing: 1.5 }}
        >
          CAREER DOCUMENTS
        </Typography>

        <Typography
          variant="h4"
          sx={{
            mt: 0.5,
            fontWeight: 850,
            letterSpacing: '-1px',
            fontSize: { xs: '1.8rem', md: '2.3rem' },
          }}
        >
          Resume library
        </Typography>

        <Typography color="text.secondary" mt={1} lineHeight={1.8}>
          Upload, organize, and manage your resumes for AI-powered job matching.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {message && (
        <Alert severity="success" onClose={() => setMessage('')}>
          {message}
        </Alert>
      )}

      <Card
        sx={{
          borderRadius: 3.5,
          color: 'white',
          background:
            'linear-gradient(120deg, #29265e 0%, #5145b9 58%, #7669ed 100%)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Box>
              <Chip
                icon={<AutoAwesomeRoundedIcon />}
                label="RESUME WORKSPACE"
                size="small"
                sx={{
                  mb: 2,
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.14)',
                  '& .MuiChip-icon': { color: '#f7d58a' },
                }}
              />

              <Typography variant="h5" fontWeight={850}>
                Your experience deserves to stand out.
              </Typography>

              <Typography mt={1.5} sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
                Upload a PDF resume. Once saved, your resume ID can be used for job matching.
              </Typography>
            </Box>

            <Avatar
              variant="rounded"
              sx={{
                display: { xs: 'none', sm: 'flex' },
                width: 72,
                height: 72,
                bgcolor: 'rgba(255,255,255,0.14)',
              }}
            >
              <DescriptionRoundedIcon sx={{ fontSize: 40 }} />
            </Avatar>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ border: '1px solid #e9eaf2', borderRadius: 3.5 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
            <Avatar
              variant="rounded"
              sx={{ bgcolor: '#eeedff', color: '#635bdb' }}
            >
              <CloudUploadRoundedIcon />
            </Avatar>

            <Box>
              <Typography variant="h6" fontWeight={850}>
                Upload a resume
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PDF format · Maximum 10 MB
              </Typography>
            </Box>
          </Stack>

          <Box
            role="button"
            tabIndex={0}
            aria-label="Choose a PDF resume or drag and drop a file"
            onClick={() => !busy && inputRef.current?.click()}
            onKeyDown={(event) => {
              if (
                !busy &&
                (event.key === 'Enter' || event.key === ' ')
              ) {
                event.preventDefault()
                inputRef.current?.click()
              }
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              if (!busy) selectFile(event.dataTransfer.files?.[0])
            }}
            sx={{
              mt: 3,
              p: { xs: 3, md: 4 },
              minHeight: 210,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              border: '2px dashed #d8d9e8',
              bgcolor: '#fafaff',
              borderRadius: 3,
              cursor: busy ? 'wait' : 'pointer',
              '&:hover': {
                borderColor: '#635bdb',
                bgcolor: '#f5f4ff',
              },
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                bgcolor: '#eeedff',
                color: '#635bdb',
              }}
            >
              <CloudUploadRoundedIcon sx={{ fontSize: 32 }} />
            </Avatar>

            <Typography fontWeight={800} mt={2}>
              Drag and drop your PDF here
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              or select a file from your computer
            </Typography>

            <Typography variant="caption" color="text.secondary" mt={1.5}>
              PDF only · Up to 10 MB
            </Typography>

            <input
              ref={inputRef}
              hidden
              type="file"
              accept=".pdf,application/pdf"
              disabled={busy}
              onChange={(event) => {
                selectFile(event.target.files?.[0])
                event.target.value = ''
              }}
            />
          </Box>

          {file && (
            <Card
              variant="outlined"
              sx={{ mt: 2.5, borderRadius: 2.5, borderColor: '#deddf7' }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <PictureAsPdfRoundedIcon color="error" />

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography fontWeight={750} sx={{ overflowWrap: 'anywhere' }}>
                      {file.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formattedSize} · PDF document
                    </Typography>
                  </Box>

                  <Button
                    size="small"
                    disabled={busy}
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}

          {busy && (
            <Box sx={{ mt: 2.5 }}>
              <LinearProgress sx={{ borderRadius: 5, height: 6 }} />
              <Typography variant="caption" color="text.secondary" mt={1} display="block">
                Uploading and processing your resume...
              </Typography>
            </Box>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<CloudUploadRoundedIcon />}
            onClick={() => void handleUpload()}
            disabled={busy || !file}
            sx={{ mt: 3, py: 1.35, borderRadius: 2.5, fontWeight: 800 }}
          >
            {busy ? 'Uploading resume...' : 'Upload resume'}
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ border: '1px solid #e9eaf2', borderRadius: 3.5 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Box>
              <Typography variant="h6" fontWeight={850}>
                Uploaded resumes
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Your saved resumes and their reference IDs.
              </Typography>
            </Box>

            <Button
              variant="outlined"
              startIcon={<RefreshRoundedIcon />}
              onClick={() => void loadResumes()}
              disabled={loadingResumes}
            >
              Refresh
            </Button>
          </Stack>

          <Divider sx={{ my: 2.5 }} />

          {loadingResumes ? (
            <LinearProgress />
          ) : resumes.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <InsertDriveFileRoundedIcon
                sx={{ fontSize: 42, color: '#a5a5bd', mb: 1 }}
              />
              <Typography fontWeight={750}>No saved resumes found</Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Upload a PDF above. Your saved resume will appear here.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1.5}>
              {resumes.map((resume) => {
                const name =
                  resume.file_name || resume.filename || `Resume ${resume.id}`

                return (
                  <Card
                    key={resume.id}
                    variant="outlined"
                    sx={{ borderRadius: 2.5, borderColor: '#e5e5f0' }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={1.5}
                      >
                        <Avatar
                          variant="rounded"
                          sx={{ bgcolor: '#feeceb', color: '#c43d3d' }}
                        >
                          <PictureAsPdfRoundedIcon />
                        </Avatar>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography fontWeight={750} sx={{ overflowWrap: 'anywhere' }}>
                            {name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Resume ID: {resume.id}
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            size="small"
                            color="success"
                            icon={<CheckCircleRoundedIcon />}
                            label="Saved"
                          />
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setResumeId(String(resume.id))
                              setMessage(`Resume ID ${resume.id} selected.`)
                              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                            }}
                          >
                            Use ID
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                )
              })}
            </Stack>
          )}
        </CardContent>
      </Card>

      <Card sx={{ border: '1px solid #e9eaf2', borderRadius: 3.5 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="h6" fontWeight={850}>
            Resume reference
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5} mb={2}>
            Select a saved resume above or enter its ID manually for matching.
          </Typography>

          <Box
            component="input"
            value={resumeId}
            onChange={(event) => setResumeId(event.target.value)}
            placeholder="Enter resume ID"
            aria-label="Resume ID"
            sx={{
              width: '100%',
              p: 1.5,
              border: '1px solid #c8c8d8',
              borderRadius: 2,
              fontSize: 16,
              outlineColor: '#635bdb',
            }}
          />

          {resumeId && (
            <Chip
              sx={{ mt: 2 }}
              color="success"
              icon={<CheckCircleRoundedIcon />}
              label={`Selected Resume ID: ${resumeId}`}
            />
          )}
        </CardContent>
      </Card>
    </Stack>
  )
}