import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

import type { JobDescription } from '../../services/jobService'

interface JobDescriptionListProps {
  jobs: JobDescription[]
  onSelect?: (job: JobDescription) => void
}

export default function JobDescriptionList({
  jobs,
  onSelect,
}: JobDescriptionListProps) {
  if (!jobs.length) {
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
            No job descriptions yet
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 380, mx: 'auto', lineHeight: 1.8 }}
          >
            Save a job description first. You can then select it when comparing
            a resume against a role.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Typography variant="subtitle1" fontWeight={850}>
          Saved job descriptions
        </Typography>

        <Chip
          size="small"
          label={`${jobs.length} ${jobs.length === 1 ? 'job' : 'jobs'}`}
          color="primary"
          variant="outlined"
        />
      </Stack>

      {jobs.map((job) => {
        const description = job.description?.trim() || ''
        const preview =
          description.length > 240
            ? `${description.slice(0, 240).trimEnd()}…`
            : description

        const clickable = Boolean(onSelect)

        const cardContent = (
          <CardContent sx={{ p: 2.5 }}>
            <Stack spacing={2}>
              <Stack
                direction="row"
                alignItems="flex-start"
                spacing={1.5}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2.5,
                    bgcolor: '#e1f7ef',
                    color: '#0e9f83',
                  }}
                >
                  <WorkRoundedIcon />
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={850}
                    sx={{
                      overflowWrap: 'anywhere',
                      lineHeight: 1.5,
                    }}
                  >
                    {job.title || 'Untitled position'}
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mt: 0.75 }}
                  >
                    <Chip
                      size="small"
                      variant="outlined"
                      label={`Job ID: ${job.id}`}
                    />
                    <Chip
                      size="small"
                      icon={<DescriptionRoundedIcon />}
                      label="Job description"
                      sx={{ fontWeight: 650 }}
                    />
                  </Stack>
                </Box>
              </Stack>

              <Divider />

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'anywhere',
                    lineHeight: 1.8,
                  }}
                >
                  {preview || 'No description text is available for this job.'}
                </Typography>

                {description.length > 240 && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 1 }}
                  >
                    Preview shortened
                  </Typography>
                )}
              </Box>

              {clickable && (
                <>
                  <Divider />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AutoAwesomeRoundedIcon
                        sx={{ color: 'primary.main', fontSize: 19 }}
                      />
                      <Typography
                        variant="body2"
                        color="primary.main"
                        fontWeight={750}
                      >
                        Select for matching
                      </Typography>
                    </Stack>

                    <ArrowForwardRoundedIcon
                      sx={{ color: 'primary.main' }}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </CardContent>
        )

        return (
          <Card
            key={job.id}
            variant="outlined"
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              borderColor: 'divider',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              '&:hover': clickable
                ? {
                    borderColor: 'primary.main',
                    boxShadow: 2,
                  }
                : undefined,
            }}
          >
            {clickable ? (
              <CardActionArea
                onClick={() => onSelect?.(job)}
                aria-label={`Select ${job.title || 'job description'} for matching`}
              >
                {cardContent}
              </CardActionArea>
            ) : (
              cardContent
            )}
          </Card>
        )
      })}
    </Stack>
  )
}