
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

interface AIExplanationProps {
  explanation?: string | null
}

export default function AIExplanation({
  explanation = '',
}: AIExplanationProps) {
  const safeExplanation = explanation?.trim() ?? ''
  const hasExplanation = Boolean(safeExplanation)

  return (
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
          spacing={2}
          mb={2}
        >
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                flexShrink: 0,
                borderRadius: 2.5,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <AutoAwesomeRoundedIcon />
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={850}>
                AI explanation
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5, lineHeight: 1.7 }}
              >
                Understand the reasoning behind your resume match.
              </Typography>
            </Box>
          </Stack>

          <Chip
            icon={<PsychologyRoundedIcon />}
            label="AI insights"
            color="primary"
            variant="outlined"
            size="small"
            sx={{ flexShrink: 0 }}
          />
        </Stack>

        <Divider sx={{ mb: 2.5 }} />

        {hasExplanation ? (
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: 3,
              bgcolor: 'action.hover',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'anywhere',
                lineHeight: 1.9,
              }}
            >
              {safeExplanation}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: 'action.hover',
            }}
          >
            <InfoOutlinedIcon
              sx={{ fontSize: 34, color: 'text.secondary', mb: 1 }}
            />

            <Typography fontWeight={750}>
              No AI explanation available
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.75, lineHeight: 1.7 }}
            >
              Run a resume-to-job match to view the explanation returned by
              the AI analysis.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
