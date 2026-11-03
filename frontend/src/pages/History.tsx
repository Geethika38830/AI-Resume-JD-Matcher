
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

import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'

import { useNavigate } from 'react-router-dom'
import { getMatches } from '../services/matchService'
import type { MatchResult } from '../services/matchService'

function displayText(value?: string | null) {
  return value?.trim() || 'Not available'
}

function skillList(value?: string) {
  if (!value?.trim()) return []

  return value
    .split(',')
    .map(skill => skill.trim())
    .filter(Boolean)
}

export default function History() {
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const loadMatches = useCallback(async (isRefresh = false) => {
    setError('')

    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    try {
      const data = await getMatches()
      setMatches(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load your match history.',
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    void loadMatches()
  }, [loadMatches])

  return (
    <Stack spacing={3} sx={{ width: '100%', minWidth: 0, pb: 4 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={2}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ color: '#635bdb', fontWeight: 800, letterSpacing: 1.5 }}
          >
            YOUR ANALYSIS ARCHIVE
          </Typography>

          <Typography
            variant="h4"
            sx={{ mt: 0.5, fontWeight: 850, letterSpacing: '-1px' }}
          >
            Match history
          </Typography>

          <Typography color="text.secondary" mt={1}>
            Review your previously saved resume-to-job analyses.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<RefreshRoundedIcon />}
          onClick={() => void loadMatches(true)}
          disabled={loading || refreshing}
          sx={{
            borderRadius: 2.5,
            textTransform: 'none',
            fontWeight: 750,
          }}
        >
          {refreshing ? 'Refreshing...' : 'Refresh history'}
        </Button>
      </Stack>

      <Box
        sx={{
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          color: 'white',
          background:
            'linear-gradient(120deg, #29265e 0%, #5145b9 58%, #7669ed 100%)',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            variant="rounded"
            sx={{
              width: 58,
              height: 58,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.15)',
            }}
          >
            <HistoryRoundedIcon sx={{ fontSize: 32 }} />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight={850}>
              Your career progress
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.82)' }} mt={0.5}>
              {loading
                ? 'Loading saved analyses...'
                : `${matches.length} saved ${matches.length === 1 ? 'analysis' : 'analyses'}`}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Card sx={{ border: '1px solid #e9eaf2', borderRadius: 3.5 }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2.5}
          >
            <Typography variant="h6" fontWeight={850}>
              Previous analyses
            </Typography>

            {!loading && !error && (
              <Chip
                label={`${matches.length} ${matches.length === 1 ? 'record' : 'records'}`}
                variant="outlined"
              />
            )}
          </Stack>

          {loading ? (
            <Stack alignItems="center" spacing={2} py={5}>
              <CircularProgress />
              <Typography color="text.secondary">
                Loading your match history...
              </Typography>
            </Stack>
          ) : error ? (
            <Alert
              severity="error"
              action={
                <Button
                  color="inherit"
                  onClick={() => void loadMatches()}
                >
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          ) : matches.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 5,
                px: 2,
                border: '1px dashed #d8d9e8',
                borderRadius: 3,
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
                <AutoAwesomeRoundedIcon sx={{ fontSize: 30 }} />
              </Avatar>

              <Typography variant="h6" fontWeight={850}>
                No saved matches found
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 430, mx: 'auto', mt: 1, lineHeight: 1.8 }}
              >
                This account has no match records returned by the history API.
                Create a comparison to save a new analysis.
              </Typography>

              <Button
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate('/match')}
                sx={{
                  mt: 2.5,
                  borderRadius: 2.5,
                  textTransform: 'none',
                  fontWeight: 800,
                  boxShadow: 'none',
                }}
              >
                Start AI matching
              </Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              {matches.map((match, index) => (
                <Card
                  key={match.id ?? `${match.resume_id}-${match.job_description_id}-${index}`}
                  variant="outlined"
                  sx={{ borderRadius: 3, minWidth: 0 }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      justifyContent="space-between"
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      gap={2}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight={850}>
                          Analysis #{match.id ?? index + 1}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={0.75}
                        >
                          Resume ID: {match.resume_id ?? 'N/A'}
                          {' · '}
                          Job description ID: {match.job_description_id ?? 'N/A'}
                        </Typography>
                        {match.created_at && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            mt={0.75}
                          >
                            Saved: {new Date(match.created_at).toLocaleString()}
                          </Typography>
                        )}
                      </Box>

                      <Chip
                        color={
                          match.match_score >= 70
                            ? 'success'
                            : match.match_score >= 40
                              ? 'warning'
                              : 'default'
                        }
                        label={`Match score: ${Number(match.match_score).toFixed(1)}%`}
                        sx={{ fontWeight: 800 }}
                      />
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Typography fontWeight={800} mb={1}>
                      Matching skills
                    </Typography>

                    <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                      {skillList(match.matched_skills).length > 0 ? (
                        skillList(match.matched_skills).map(skill => (
                          <Chip
                            key={skill}
                            size="small"
                            color="success"
                            variant="outlined"
                            label={skill}
                          />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No matching skills returned.
                        </Typography>
                      )}
                    </Stack>

                    <Typography fontWeight={800} mb={1}>
                      Missing skills
                    </Typography>

                    <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                      {skillList(match.missing_skills).length > 0 ? (
                        skillList(match.missing_skills).map(skill => (
                          <Chip
                            key={skill}
                            size="small"
                            color="warning"
                            variant="outlined"
                            label={skill}
                          />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          {displayText(match.missing_skills)}
                        </Typography>
                      )}
                    </Stack>

                    <Typography fontWeight={800} mb={0.5}>
                      AI explanation
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
                    >
                      {displayText(match.ai_explanation)}
                    </Typography>

                    <Typography fontWeight={800} mt={2} mb={0.5}>
                      Recommendations
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
                    >
                      {displayText(match.recommendations)}
                    </Typography>

                    <Typography variant="body2" mt={2}>
                      <strong>Experience:</strong>{' '}
                      {displayText(match.experience_match)}
                    </Typography>

                    <Typography variant="body2" mt={0.75}>
                      <strong>Education:</strong>{' '}
                      {displayText(match.education_match)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  )
}
