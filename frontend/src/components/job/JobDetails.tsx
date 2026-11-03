import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import NumbersRoundedIcon from '@mui/icons-material/Numbers'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

import type { JobDescription } from '../../services/jobService'

interface JobDetailsProps {
  job: JobDescription | null
}

export default function JobDetails({ job }: JobDetailsProps) {
  if (!job) {
    return (
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderStyle: 'dashed',
          bgcolor: 'action.hover',
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 5 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
              bgcolor: 'action.selected',
              color: 'text.secondary',
            }}
          >
            <WorkRoundedIcon sx={{ fontSize: 32 }} />
          </Avatar>

          <Typography variant="h6" fontWeight={800}>
            No job selected
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 360, mx: 'auto', lineHeight: 1.8 }}
          >
            Select a saved job description to review its requirements and
            details.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const title = job.title || 'Untitled position'
  const description = job.description || ''
  const wordCount = description.trim()
    ? description.trim().split(/\s+/).length
    : 0

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ minWidth: 0 }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: 52,
                  height: 52,
                  bgcolor: '#e1f7ef',
                  color: '#0e9f83',
                  borderRadius: 2.5,
                }}
              >
                <WorkRoundedIcon sx={{ fontSize: 29 }} />
              </Avatar>

              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" fontWeight={850}>
                  Job details
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5, overflowWrap: 'anywhere' }}
                >
                  Review the requirements for this position.
                </Typography>
              </Box>
            </Stack>

            <Chip
              label={`Job ID: ${job.id}`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 750, maxWidth: '100%' }}
            />
          </Stack>

          <Divider />

          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              fontWeight={750}
            >
              Target position
            </Typography>

            <Typography
              variant="h5"
              fontWeight={850}
              sx={{ mt: 0.5, overflowWrap: 'anywhere' }}
            >
              {title}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
              },
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                bgcolor: 'action.hover',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <NumbersRoundedIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Job reference
                </Typography>
              </Stack>

              <Typography variant="h6" fontWeight={850} mt={1}>
                #{job.id}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                bgcolor: 'action.hover',
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <DescriptionRoundedIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Description words
                </Typography>
              </Stack>

              <Typography variant="h6" fontWeight={850} mt={1}>
                {wordCount.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Stack direction="row" spacing={1} alignItems="center">
            <AutoAwesomeRoundedIcon color="primary" />
            <Typography variant="subtitle1" fontWeight={850}>
              Job description
            </Typography>
          </Stack>

          {description.trim() ? (
            <Box
              sx={{
                maxHeight: 480,
                overflowY: 'auto',
                overflowX: 'hidden',
                p: { xs: 2, sm: 2.5 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2.5,
                bgcolor: 'background.default',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                  lineHeight: 1.9,
                }}
              >
                {description}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                p: 3,
                borderRadius: 2.5,
                bgcolor: 'action.hover',
                textAlign: 'center',
              }}
            >
              <DescriptionRoundedIcon
                sx={{ fontSize: 34, color: 'text.secondary', mb: 1 }}
              />
              <Typography fontWeight={750}>
                No description available
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.75, lineHeight: 1.7 }}
              >
                This job record does not contain description text.
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}