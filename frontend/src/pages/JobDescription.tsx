import { useCallback, useEffect, useState } from 'react'
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

import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'

import JobDescriptionInput from '../components/job/JobDescriptionInput'
import JobDescriptionList from '../components/job/JobDescriptionList'
import type { JobDescription as JobDescriptionType } from '../services/jobService'
import { getJobDescriptions } from '../services/jobService'

export default function JobDescription() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [savedJobId, setSavedJobId] = useState<number | null>(null)
  const [jobs, setJobs] = useState<JobDescriptionType[]>([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState('')
  const [selectedJob, setSelectedJob] =
    useState<JobDescriptionType | null>(null)

  const loadJobs = useCallback(async () => {
    setLoading(true)
    setListError('')

    try {
      const result = await getJobDescriptions()
      setJobs(result)
    } catch (err) {
      setListError(
        err instanceof Error
          ? err.message
          : 'Unable to load saved job descriptions.',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadJobs()
  }, [loadJobs])

  function handleCreated(job: {
    id?: number
    title?: string
    description?: string
  }) {
    setError('')
    setSavedJobId(typeof job.id === 'number' ? job.id : null)
    setMessage(
      `Job description saved successfully${job.id !== undefined ? `. ID: ${job.id}` : ''}.`,
    )

    void loadJobs()
  }

  async function copyJobId(id: number) {
    try {
      await navigator.clipboard.writeText(String(id))
      setMessage(`Job ID ${id} copied. You can use it for AI matching.`)
      setError('')
    } catch {
      setError(`Your selected Job ID is ${id}. Copy it manually for matching.`)
    }
  }

  return (
    <Stack spacing={3.5} sx={{ width: '100%', minWidth: 0, pb: 4 }}>
      <Box>
        <Typography
          variant="overline"
          sx={{ color: '#635bdb', fontWeight: 800, letterSpacing: 1.5 }}
        >
          TARGET YOUR NEXT ROLE
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
          Job descriptions
        </Typography>

        <Typography color="text.secondary" mt={1} lineHeight={1.8}>
          Save job requirements, review your saved roles, and prepare for
          focused resume analysis.
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          color: 'white',
          background:
            'linear-gradient(120deg, #123d48 0%, #117d80 55%, #32a99a 100%)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={3}
        >
          <Box sx={{ maxWidth: 620 }}>
            <Chip
              icon={<AutoAwesomeRoundedIcon />}
              label="JOB REQUIREMENT WORKSPACE"
              size="small"
              sx={{
                mb: 2,
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.13)',
                border: '1px solid rgba(255,255,255,0.16)',
                fontWeight: 750,
                '& .MuiChip-icon': { color: '#ffe09b' },
              }}
            />

            <Typography
              variant="h4"
              sx={{
                fontWeight: 850,
                letterSpacing: '-1px',
                lineHeight: 1.2,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
              }}
            >
              Find the right role.
              <br />
              Prepare with purpose.
            </Typography>

            <Typography
              mt={1.5}
              sx={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.8 }}
            >
              Save job postings and reuse them when comparing your resume
              against the requirements for a target position.
            </Typography>
          </Box>

          <Avatar
            variant="rounded"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: 76,
              height: 76,
              bgcolor: 'rgba(255,255,255,0.13)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 3,
            }}
          >
            <WorkRoundedIcon sx={{ fontSize: 42 }} />
          </Avatar>
        </Stack>
      </Box>

      {message && (
        <Alert
          severity="success"
          icon={<CheckCircleRoundedIcon />}
          onClose={() => setMessage('')}
          action={
            savedJobId !== null ? (
              <Chip
                size="small"
                label={`ID: ${savedJobId}`}
                color="success"
                variant="outlined"
              />
            ) : undefined
          }
        >
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: 'minmax(0, 1.65fr) minmax(270px, 1fr)',
          },
          gap: 3,
          alignItems: 'start',
        }}
      >
        <Card
          sx={{
            border: '1px solid #e9eaf2',
            borderRadius: 3.5,
            boxShadow: '0 5px 22px rgba(29, 34, 67, 0.045)',
            minWidth: 0,
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: '#e1f7ef',
                  color: '#0e9f83',
                  borderRadius: 2.5,
                }}
              >
                <DescriptionRoundedIcon />
              </Avatar>

              <Box>
                <Typography variant="h6" fontWeight={850}>
                  Add a job description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter the role details you want to analyze.
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2.5 }} />

            <JobDescriptionInput onCreated={handleCreated} />
          </CardContent>
        </Card>

        <Stack spacing={2.5}>
          <Card
            sx={{
              border: '1px solid #e9eaf2',
              borderRadius: 3.5,
              boxShadow: '0 5px 22px rgba(29, 34, 67, 0.035)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: '#fff0df',
                    color: '#d98227',
                    borderRadius: 2.5,
                  }}
                >
                  <TipsAndUpdatesRoundedIcon />
                </Avatar>

                <Typography variant="h6" fontWeight={850}>
                  What to include
                </Typography>
              </Stack>

              <Stack spacing={2.25} mt={3}>
                {[
                  {
                    title: 'Role and responsibilities',
                    description:
                      'Include the job title and the main work expected.',
                  },
                  {
                    title: 'Required skills',
                    description:
                      'Include programming languages, tools, and frameworks.',
                  },
                  {
                    title: 'Experience and education',
                    description:
                      'Mention eligibility, experience level, and qualifications.',
                  },
                  {
                    title: 'Preferred skills',
                    description:
                      'Include additional technologies or domain knowledge.',
                  },
                ].map((item) => (
                  <Stack
                    key={item.title}
                    direction="row"
                    spacing={1.25}
                    alignItems="flex-start"
                  >
                    <CheckCircleRoundedIcon
                      sx={{ color: '#159b78', fontSize: 20, mt: 0.2 }}
                    />

                    <Box>
                      <Typography fontWeight={750} variant="body2">
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.4}
                        lineHeight={1.7}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              border: '1px solid #e9eaf2',
              borderRadius: 3.5,
              bgcolor: '#f8f7ff',
              boxShadow: 'none',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: '#eeedff',
                  color: '#635bdb',
                  borderRadius: 2.5,
                  mb: 2,
                }}
              >
                <PsychologyRoundedIcon />
              </Avatar>

              <Typography fontWeight={850}>
                Next: AI resume matching
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
                lineHeight={1.8}
              >
                After saving a job, use its ID with your resume ID to analyze
                relevant skills and potential gaps.
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                <Chip
                  size="small"
                  label="Save job"
                  sx={{ bgcolor: '#e5e2ff', color: '#5145b9', fontWeight: 700 }}
                />
                <ArrowForwardRoundedIcon sx={{ color: '#8a83d5', fontSize: 18 }} />
                <Chip
                  size="small"
                  label="Analyze"
                  sx={{ bgcolor: '#e1f7ef', color: '#087b65', fontWeight: 700 }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <Card
        sx={{
          border: '1px solid #e9eaf2',
          borderRadius: 3.5,
          boxShadow: '0 5px 22px rgba(29, 34, 67, 0.035)',
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
            mb={2.5}
          >
            <Box>
              <Typography variant="h6" fontWeight={850}>
                Your saved jobs
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Job descriptions retrieved from your backend.
              </Typography>
            </Box>

            <Button
              variant="outlined"
              startIcon={
                loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <RefreshRoundedIcon />
                )
              }
              onClick={() => void loadJobs()}
              disabled={loading}
              sx={{ textTransform: 'none', fontWeight: 750 }}
            >
              Refresh list
            </Button>
          </Stack>

          {listError && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => void loadJobs()}
                >
                  Retry
                </Button>
              }
            >
              {listError}
            </Alert>
          )}

          {loading ? (
            <Stack alignItems="center" spacing={1.5} py={5}>
              <CircularProgress />
              <Typography color="text.secondary" variant="body2">
                Loading saved job descriptions...
              </Typography>
            </Stack>
          ) : (
            <JobDescriptionList
              jobs={jobs}
              onSelect={(job) => {
                setSelectedJob(job)
                setSavedJobId(job.id)
                setMessage(`Selected "${job.title}" for matching.`)
                setError('')
              }}
            />
          )}

          {selectedJob && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2.5,
                bgcolor: 'action.hover',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="subtitle2" fontWeight={800}>
                Selected job
              </Typography>

              <Typography fontWeight={750} mt={0.75}>
                {selectedJob.title}
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1}
                alignItems={{ xs: 'stretch', sm: 'center' }}
                mt={1.5}
              >
                <Chip
                  label={`Job ID: ${selectedJob.id}`}
                  color="primary"
                  variant="outlined"
                />

                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={() => void copyJobId(selectedJob.id)}
                  sx={{ textTransform: 'none', fontWeight: 750 }}
                >
                  Copy job ID
                </Button>
              </Stack>

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mt={1.5}
              >
                To run a match, open AI Matching and enter this job ID along
                with the ID of your uploaded resume.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Box
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          bgcolor: '#fafaff',
          border: '1px solid #e9eaf2',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <AutoAwesomeRoundedIcon sx={{ color: '#635bdb', mt: 0.2 }} />
          <Box>
            <Typography fontWeight={800}>
              Make each comparison count
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
              lineHeight={1.8}
            >
              Use a specific job description for each target role. Detailed
              requirements give the matching system more useful information
              to compare against your resume.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}