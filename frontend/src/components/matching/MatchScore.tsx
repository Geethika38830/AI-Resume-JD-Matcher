
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'

interface MatchScoreProps {
  score: number
}

export default function MatchScore({ score }: MatchScoreProps) {
  const numericScore = Number(score)
  const value = Number.isFinite(numericScore)
    ? Math.round(Math.max(0, Math.min(100, numericScore)))
    : 0

  const scoreColor =
    value >= 80
      ? '#16845b'
      : value >= 60
        ? '#5b4bdb'
        : value >= 40
          ? '#d97706'
          : '#dc4c4c'

  const scoreLabel =
    value >= 80
      ? 'Excellent compatibility'
      : value >= 60
        ? 'Good compatibility'
        : value >= 40
          ? 'Moderate compatibility'
          : 'Needs improvement'

  const ScoreIcon =
    value >= 80
      ? CheckCircleRoundedIcon
      : value >= 60
        ? TrendingUpRoundedIcon
        : TipsAndUpdatesRoundedIcon

  return (
    <Stack alignItems="center" spacing={1.5} py={2.5}>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          p: 1,
          borderRadius: '50%',
          bgcolor: `${scoreColor}0D`,
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={156}
          thickness={4.5}
          sx={{ color: 'action.hover' }}
        />

        <CircularProgress
          variant="determinate"
          value={value}
          size={156}
          thickness={4.5}
          sx={{
            position: 'absolute',
            left: 8,
            top: 8,
            color: scoreColor,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 700ms ease',
            },
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            fontWeight={850}
            sx={{ color: scoreColor, letterSpacing: '-1.5px' }}
          >
            {value}%
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={700}
          >
            MATCH SCORE
          </Typography>
        </Box>
      </Box>

      <Stack alignItems="center" spacing={0.75}>
        <Stack direction="row" spacing={0.75} alignItems="center">
          <ScoreIcon sx={{ color: scoreColor, fontSize: 21 }} />

          <Typography fontWeight={800} sx={{ color: scoreColor }}>
            {scoreLabel}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ maxWidth: 320, lineHeight: 1.7 }}
        >
          Your resume's skills and qualifications compared with the job
          requirements.
        </Typography>
      </Stack>
    </Stack>
  )
}
