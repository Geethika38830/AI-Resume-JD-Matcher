import type { ReactNode } from 'react'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

import type { MatchResult } from '../../services/matchService'
import MatchScore from './MatchScore'
import SkillMatch from './SkillMatch'
import SkillGap from './SkillGap'

interface MatchBreakdownProps {
  result: MatchResult
}

function DetailSection({
  title,
  value,
  icon,
}: {
  title: string
  value: string | undefined | null
  icon: ReactNode
}) {
  const hasValue = Boolean(value?.trim())

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={1.2}>
        {icon}
        <Typography fontWeight={750}>{title}</Typography>
      </Stack>

      <Typography
        variant="body2"
        color={hasValue ? 'text.primary' : 'text.secondary'}
        sx={{ lineHeight: 1.8, overflowWrap: 'anywhere' }}
      >
        {hasValue ? value : 'Not provided by the matching analysis.'}
      </Typography>
    </Box>
  )
}

export default function MatchBreakdown({
  result,
}: MatchBreakdownProps) {
  const score = Number(result.match_score)
  const validScore = Number.isFinite(score)
    ? Math.min(100, Math.max(0, score))
    : 0

  const scoreLabel =
    validScore >= 80
      ? 'Strong match'
      : validScore >= 60
        ? 'Good potential'
        : validScore >= 40
          ? 'Partial match'
          : 'Needs improvement'

  return (
    <Stack spacing={3}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 4,
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: 3 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={1.5}
            mb={2}
          >
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <AutoAwesomeRoundedIcon color="primary" />
                <Typography variant="h6" fontWeight={800}>
                  Match overview
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                See how your resume compares with the job requirements.
              </Typography>
            </Box>

            <Chip
              icon={<CheckCircleRoundedIcon />}
              label={scoreLabel}
              color={
                validScore >= 80
                  ? 'success'
                  : validScore >= 60
                    ? 'primary'
                    : 'default'
              }
              variant="outlined"
            />
          </Stack>

          <MatchScore score={result.match_score} />
        </CardContent>
      </Card>

      <Divider />

      <Box>
        <Typography variant="h6" fontWeight={800} mb={0.5}>
          Skills analysis
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Review the skills identified as matches and the gaps to address.
        </Typography>

        <Stack spacing={2}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <SkillMatch skills={result.matched_skills} />
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <SkillGap skills={result.missing_skills} />
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" fontWeight={800} mb={0.5}>
          Qualification details
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Additional information from the matching result.
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <DetailSection
            title="Experience"
            value={result.experience_match}
            icon={<WorkOutlineRoundedIcon color="primary" />}
          />

          <DetailSection
            title="Education"
            value={result.education_match}
            icon={<SchoolOutlinedIcon color="primary" />}
          />
        </Stack>
      </Box>
    </Stack>
  )
}
