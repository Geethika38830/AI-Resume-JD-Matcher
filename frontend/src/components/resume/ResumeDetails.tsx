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

import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded'
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

import type { Resume } from '../../services/resumeService'

interface ResumeDetailsProps {
  resume: Resume | null
}

export default function ResumeDetails({ resume }: ResumeDetailsProps) {
  if (!resume) {
    return (
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderStyle: 'dashed',
          bgcolor: 'action.hover',
        }}
      >
        <CardContent sx={{ py: 5, textAlign: 'center' }}>
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
            <DescriptionRoundedIcon sx={{ fontSize: 32 }} />
          </Avatar>

          <Typography variant="h6" fontWeight={800}>
            No resume selected
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 360, mx: 'auto', lineHeight: 1.8 }}
          >
            Select or upload a resume to inspect its details and extracted
            text.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const filename = resume.filename || resume.file_name || 'Resume'
  const extractedText = resume.extracted_text || ''
  const wordCount = extractedText.trim()
    ? extractedText.trim().split(/\s+/).length
    : 0
  const characterCount = extractedText.length

  const formattedDate = resume.created_at
    ? (() => {
        const date = new Date(resume.created_at)
        return Number.isNaN(date.getTime())
          ? resume.created_at
          : date.toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
      })()
    : null

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
                  bgcolor: '#fff0f0',
                  color: '#d32f2f',
                  borderRadius: 2.5,
                }}
              >
                <DescriptionRoundedIcon sx={{ fontSize: 29 }} />
              </Avatar>

              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" fontWeight={850}>
                  Resume details
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ overflowWrap: 'anywhere', mt: 0.5 }}
                >
                  {filename}
                </Typography>
              </Box>
            </Stack>

            <Chip
              label={`Resume ID: ${resume.id}`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 750, maxWidth: '100%' }}
            />
          </Stack>

          <Divider />

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
                minWidth: 0,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <TextSnippetRoundedIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Extracted words
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight={850} mt={1}>
                {wordCount.toLocaleString()}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                bgcolor: 'action.hover',
                minWidth: 0,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <NumbersRoundedIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Characters
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight={850} mt={1}>
                {characterCount.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {formattedDate && (
            <Stack direction="row" spacing={1.25} alignItems="flex-start">
              <CalendarMonthRoundedIcon
                color="action"
                sx={{ mt: 0.25 }}
              />
              <Box>
                <Typography variant="body2" fontWeight={750}>
                  Upload date
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={0.5}
                >
                  {formattedDate}
                </Typography>
              </Box>
            </Stack>
          )}

          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <AutoAwesomeRoundedIcon color="primary" />
            <Typography variant="subtitle1" fontWeight={850}>
              Extracted resume text
            </Typography>
            <Chip
              size="small"
              label={wordCount > 0 ? 'Text available' : 'No text'}
              color={wordCount > 0 ? 'success' : 'default'}
              variant="outlined"
            />
          </Stack>

          {extractedText.trim() ? (
            <Box
              sx={{
                maxHeight: 420,
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
                  color: 'text.primary',
                }}
              >
                {extractedText}
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
              <TextSnippetRoundedIcon
                sx={{ fontSize: 34, color: 'text.secondary', mb: 1 }}
              />
              <Typography fontWeight={750}>
                No extracted text available
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.75, lineHeight: 1.7 }}
              >
                The resume record does not contain extracted text. Check the
                uploaded PDF and text-extraction result.
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}