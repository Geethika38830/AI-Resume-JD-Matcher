
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

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'

import { createMatch } from '../services/matchService'
import type { MatchResult } from '../services/matchService'
import MatchBreakdown from '../components/matching/MatchBreakdown'
import AIExplanation from '../components/matching/AIExplanation'
import Recommendations from '../components/recommendations/Recommendations'

export default function Match() {
  const [resumeId, setResumeId] = useState('')
  const [jobId, setJobId] = useState('')
  const [result, setResult] = useState<MatchResult | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit() {
    setError('')

    const cleanResumeId = resumeId.trim()
    const cleanJobId = jobId.trim()

    if (!cleanResumeId || !cleanJobId) {
      setError('Enter both the resume ID and job description ID.')
      return
    }

    // Accept positive whole-number IDs only.
    if (
      !/^[1-9]\d*$/.test(cleanResumeId) ||
      !/^[1-9]\d*$/.test(cleanJobId)
    ) {
      setError('Both IDs must be positive whole numbers, such as 1 or 25.')
      return
    }

    const parsedResumeId = Number(cleanResumeId)
    const parsedJobId = Number(cleanJobId)

    if (
      !Number.isSafeInteger(parsedResumeId) ||
      !Number.isSafeInteger(parsedJobId)
    ) {
      setError('Please enter valid IDs within the supported number range.')
      return
    }

    setBusy(true)
    setResult(null)

    try {
      const data = await createMatch(parsedResumeId, parsedJobId)
      setResult(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Matching failed. Please check the IDs and try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  function resetAnalysis() {
    setResult(null)
    setError('')
  }

  return (
    <Stack spacing={3.5} sx={{ width: '100%', minWidth: 0, pb: 4 }}>
      {/* Page heading */}
      <Box>
        <Typography
          variant="overline"
          sx={{
            color: '#635bdb',
            fontWeight: 800,
            letterSpacing: 1.5,
          }}
        >
          INTELLIGENT CAREER ANALYSIS
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
          AI resume matching
        </Typography>

        <Typography color="text.secondary" mt={1} lineHeight={1.8}>
          Discover how your resume aligns with a target job and identify
          opportunities to strengthen your application.
        </Typography>
      </Box>

      {/* Hero banner */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          color: 'white',
          background:
            'linear-gradient(120deg, #29265e 0%, #5145b9 58%, #7669ed 100%)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          spacing={3}
        >
          <Box sx={{ maxWidth: 620 }}>
            <Chip
              icon={<AutoAwesomeRoundedIcon />}
              label="GEMMA AI · RESUME ANALYSIS"
              size="small"
              sx={{
                mb: 2,
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.13)',
                fontWeight: 750,
                '& .MuiChip-icon': { color: '#ffe09b' },
              }}
            />

            <Typography
              variant="h4"
              sx={{
                fontWeight: 850,
                lineHeight: 1.2,
                letterSpacing: '-1px',
                fontSize: { xs: '1.8rem', md: '2.4rem' },
              }}
            >
              Match your skills
              <br />
              to your next opportunity.
            </Typography>

            <Typography
              mt={1.5}
              sx={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.8 }}
            >
              Analyze a saved resume against a saved job description to explore
              your match results, AI explanation, and improvement recommendations.
            </Typography>
          </Box>

          <Avatar
            variant="rounded"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: 78,
              height: 78,
              borderRadius: 3,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.13)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <PsychologyRoundedIcon sx={{ fontSize: 45 }} />
          </Avatar>
        </Stack>
      </Box>

      {/* Error message */}
      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Input and information panels */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: 'minmax(0, 1.6fr) minmax(270px, 1fr)',
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
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: '#eeedff',
                  color: '#635bdb',
                  borderRadius: 2.5,
                }}
              >
                <InsightsRoundedIcon />
              </Avatar>

              <Box>
                <Typography variant="h6" fontWeight={850}>
                  Configure your analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter the IDs of your saved records.
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2.5 }} />

            <Stack spacing={2.5}>
              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mb={1}
                >
                  <DescriptionRoundedIcon
                    sx={{ color: '#635bdb', fontSize: 21 }}
                  />
                  <Typography fontWeight={750}>
                    Resume reference
                  </Typography>
                </Stack>

                <TextField
                  fullWidth
                  label="Resume ID"
                  placeholder="e.g. 1"
                  value={resumeId}
                  onChange={(event) => {
                    setResumeId(event.target.value)
                    setError('')
                  }}
                  disabled={busy}
                  slotProps={{
                    htmlInput: { inputMode: 'numeric' },
                  }}
                  helperText="Use the ID returned when you uploaded your resume."
                />
              </Box>

              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mb={1}
                >
                  <WorkRoundedIcon
                    sx={{ color: '#0e9f83', fontSize: 21 }}
                  />
                  <Typography fontWeight={750}>
                    Target job reference
                  </Typography>
                </Stack>

                <TextField
                  fullWidth
                  label="Job description ID"
                  placeholder="e.g. 1"
                  value={jobId}
                  onChange={(event) => {
                    setJobId(event.target.value)
                    setError('')
                  }}
                  disabled={busy}
                  slotProps={{
                    htmlInput: { inputMode: 'numeric' },
                  }}
                  helperText="Use the ID returned when you saved a job description."
                />
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={submit}
                disabled={busy}
                startIcon={
                  busy ? (
                    <CircularProgress size={19} color="inherit" />
                  ) : (
                    <AutoAwesomeRoundedIcon />
                  )
                }
                endIcon={busy ? undefined : <ArrowForwardRoundedIcon />}
                sx={{
                  py: 1.4,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  textTransform: 'none',
                  boxShadow: 'none',
                }}
              >
                {busy ? 'Analyzing your resume...' : 'Run AI analysis'}
              </Button>

              {busy && (
                <Alert severity="info" icon={<PsychologyRoundedIcon />}>
                  Your match is being processed. AI analysis may take a little
                  time, so please keep this page open.
                </Alert>
              )}

              {result && !busy && (
                <Button
                  variant="text"
                  color="inherit"
                  startIcon={<RestartAltRoundedIcon />}
                  onClick={resetAnalysis}
                  sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                >
                  Clear results
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Process guide */}
        <Stack spacing={2.5}>
          <Card
            sx={{
              border: '1px solid #e9eaf2',
              borderRadius: 3.5,
              boxShadow: '0 5px 22px rgba(29, 34, 67, 0.035)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={850}>
                What you'll get
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={0.75}>
                Your analysis brings several perspectives together.
              </Typography>

              <Stack spacing={2.5} mt={3}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: '#eeedff',
                      color: '#635bdb',
                      borderRadius: 2,
                      width: 40,
                      height: 40,
                    }}
                  >
                    <InsightsRoundedIcon />
                  </Avatar>

                  <Box>
                    <Typography fontWeight={800}>
                      Match breakdown
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={0.5}
                      lineHeight={1.7}
                    >
                      Review the matching score and skill comparison provided
                      by the matching service.
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: '#e1f7ef',
                      color: '#0e9f83',
                      borderRadius: 2,
                      width: 40,
                      height: 40,
                    }}
                  >
                    <PsychologyRoundedIcon />
                  </Avatar>

                  <Box>
                    <Typography fontWeight={800}>
                      AI explanation
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={0.5}
                      lineHeight={1.7}
                    >
                      Understand the explanation generated for your resume
                      and target job.
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: '#fff0df',
                      color: '#d98227',
                      borderRadius: 2,
                      width: 40,
                      height: 40,
                    }}
                  >
                    <CheckCircleRoundedIcon />
                  </Avatar>

                  <Box>
                    <Typography fontWeight={800}>
                      Recommendations
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={0.5}
                      lineHeight={1.7}
                    >
                      Explore suggestions for strengthening your application.
                    </Typography>
                  </Box>
                </Stack>
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
              <Stack direction="row" spacing={1.25} alignItems="center">
                <AutoAwesomeRoundedIcon sx={{ color: '#635bdb' }} />
                <Typography fontWeight={850}>
                  Before you start
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={1.5}
                lineHeight={1.8}
              >
                Make sure both records exist and that you use their correct
                positive integer IDs. If matching fails, check the IDs and the
                error message before trying again.
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* Matching results */}
      {result && (
        <Stack spacing={3} sx={{ minWidth: 0 }}>
          <Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              gap={1.5}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: '#159b78',
                    fontWeight: 800,
                    letterSpacing: 1.5,
                  }}
                >
                  ANALYSIS COMPLETE
                </Typography>

                <Typography variant="h5" fontWeight={850} mt={0.5}>
                  Your match results
                </Typography>

                <Typography color="text.secondary" mt={0.75}>
                  Review your results and use the insights to guide your next
                  improvements.
                </Typography>
              </Box>

              <Chip
                color="success"
                icon={<CheckCircleRoundedIcon />}
                label="Analysis completed"
                sx={{ fontWeight: 750 }}
              />
            </Stack>
          </Box>

          <Card
            sx={{
              border: '1px solid #e9eaf2',
              borderRadius: 3.5,
              boxShadow: '0 5px 22px rgba(29, 34, 67, 0.045)',
              minWidth: 0,
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3.5 }, minWidth: 0 }}>
              <MatchBreakdown result={result} />
            </CardContent>
          </Card>

          <AIExplanation explanation={result.ai_explanation} />

          <Recommendations recommendations={result.recommendations} />
        </Stack>
      )}

      {/* Empty state */}
      {!result && !busy && (
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 4, md: 5 },
            px: 2,
            borderRadius: 3.5,
            border: '1px dashed #d8d9e8',
            bgcolor: '#fafaff',
          }}
        >
          <Avatar
            sx={{
              width: 58,
              height: 58,
              mx: 'auto',
              mb: 2,
              bgcolor: '#eeedff',
              color: '#635bdb',
            }}
          >
            <PsychologyRoundedIcon sx={{ fontSize: 31 }} />
          </Avatar>

          <Typography variant="h6" fontWeight={850}>
            Your next career insight starts here
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
            sx={{ maxWidth: 460, mx: 'auto', mt: 1, lineHeight: 1.8 }}
          >
            Enter your resume ID and job description ID above to generate a
            match analysis. Your results will appear here.
          </Typography>
        </Box>
      )}
    </Stack>
  )
}
