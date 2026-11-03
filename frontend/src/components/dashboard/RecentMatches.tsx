import {
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

import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'

import type { MatchResult } from '../../services/matchService'

interface RecentMatchesProps {
  matches: MatchResult[]
  onViewAll?: () => void
}

function getScoreColor(score: number): 'success' | 'warning' | 'error' {
  if (score >= 70) return 'success'
  if (score >= 40) return 'warning'
  return 'error'
}

export default function RecentMatches({
  matches,
  onViewAll,
}: RecentMatchesProps) {
  const recentMatches = matches.slice(0, 5)

  return (
    <Card
      sx={{
        width: '100%',
        minWidth: 0,
        border: '1px solid #e9eaf2',
        borderRadius: 3.5,
        boxShadow: '0 5px 22px rgba(29, 34, 67, 0.035)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={1.5}
          mb={3}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              variant="rounded"
              sx={{
                width: 46,
                height: 46,
                borderRadius: 2.5,
                bgcolor: '#eeedff',
                color: '#635bdb',
              }}
            >
              <HistoryRoundedIcon />
            </Avatar>

            <Box>
              <Typography variant="h6" fontWeight={850}>
                Recent matches
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.25}>
                Your latest resume-to-job analyses
              </Typography>
            </Box>
          </Stack>

          {onViewAll && (
            <Button
              size="small"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={onViewAll}
              sx={{
                textTransform: 'none',
                fontWeight: 800,
                alignSelf: { xs: 'flex-start', sm: 'center' },
              }}
            >
              View all
            </Button>
          )}
        </Stack>

        {/* Empty state */}
        {matches.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
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

            <Typography fontWeight={800}>
              No analyses yet
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 360, mx: 'auto', mt: 1, lineHeight: 1.8 }}
            >
              Your saved match results will appear here after you compare a
              resume with a job description.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={0}>
            {recentMatches.map((match, index) => {
              const rawScore = Number(match.match_score ?? 0)
              const score = Number.isFinite(rawScore)
                ? Math.max(0, Math.min(100, rawScore))
                : 0

              const scoreColor = getScoreColor(score)

              return (
                <Box key={match.id ?? `${match.resume_id}-${match.job_description_id}-${index}`}>
                  {index > 0 && <Divider sx={{ my: 2.25 }} />}

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                    spacing={2}
                  >
                    {/* Record information */}
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1.25}
                      >
                        <InsightsRoundedIcon
                          sx={{ color: '#635bdb', fontSize: 20 }}
                        />

                        <Typography fontWeight={800}>
                          Match analysis {match.id != null ? `#${match.id}` : `#${index + 1}`}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={1}
                        mb={1.5}
                      >
                        <Chip
                          size="small"
                          icon={<DescriptionRoundedIcon />}
                          label={`Resume #${match.resume_id ?? '—'}`}
                          sx={{
                            bgcolor: '#eeedff',
                            color: '#5145b9',
                            fontWeight: 700,
                            '& .MuiChip-icon': { color: '#635bdb' },
                          }}
                        />

                        <Chip
                          size="small"
                          icon={<WorkRoundedIcon />}
                          label={`Job #${match.job_description_id ?? '—'}`}
                          sx={{
                            bgcolor: '#e1f7ef',
                            color: '#087b65',
                            fontWeight: 700,
                            '& .MuiChip-icon': { color: '#0e9f83' },
                          }}
                        />
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflowWrap: 'anywhere',
                          lineHeight: 1.75,
                        }}
                      >
                        {match.matched_skills || 'No matching-skill summary is available for this record.'}
                      </Typography>
                    </Box>

                    {/* Score */}
                    <Box
                      sx={{
                        width: { xs: '100%', sm: 135 },
                        flexShrink: 0,
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          fontWeight={700}
                        >
                          Match score
                        </Typography>

                        <Chip
                          size="small"
                          color={scoreColor}
                          variant="outlined"
                          label={`${score}%`}
                          sx={{ fontWeight: 850 }}
                        />
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={score}
                        color={scoreColor}
                        sx={{
                          height: 7,
                          borderRadius: 10,
                          bgcolor: '#ececf4',
                        }}
                      />
                    </Box>
                  </Stack>
                </Box>
              )
            })}

            {matches.length > 5 && (
              <>
                <Divider sx={{ my: 2.25 }} />

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={1}
                >
                  <Typography variant="body2" color="text.secondary">
                    Showing the 5 most recent records from the loaded results.
                  </Typography>

                  {onViewAll && (
                    <Button
                      size="small"
                      endIcon={<ArrowForwardRoundedIcon />}
                      onClick={onViewAll}
                      sx={{ textTransform: 'none', fontWeight: 800 }}
                    >
                      View all {matches.length}
                    </Button>
                  )}
                </Stack>
              </>
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}