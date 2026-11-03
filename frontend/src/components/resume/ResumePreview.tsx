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
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

interface ResumePreviewProps {
  filename?: string
  extractedText?: string
}

export default function ResumePreview({
  filename = 'Resume preview',
  extractedText = '',
}: ResumePreviewProps) {
  const hasText = extractedText.trim().length > 0
  const wordCount = hasText ? extractedText.trim().split(/\s+/).length : 0
  const characterCount = extractedText.length

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
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ minWidth: 0 }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2.5,
                  bgcolor: '#fff0f0',
                  color: '#d32f2f',
                }}
              >
                <DescriptionRoundedIcon sx={{ fontSize: 29 }} />
              </Avatar>

              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" fontWeight={850}>
                  Resume preview
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5, overflowWrap: 'anywhere' }}
                >
                  {filename}
                </Typography>
              </Box>
            </Stack>

            <Chip
              size="small"
              label={hasText ? 'Preview available' : 'Awaiting text'}
              color={hasText ? 'success' : 'default'}
              variant="outlined"
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
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <TextSnippetRoundedIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Word count
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
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <DescriptionRoundedIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Characters
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight={850} mt={1}>
                {characterCount.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <AutoAwesomeRoundedIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={800}>
                Extracted content
              </Typography>
            </Stack>

            {hasText ? (
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
                    color: 'text.primary',
                  }}
                >
                  {extractedText}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  p: { xs: 3, sm: 4 },
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 2.5,
                  bgcolor: 'action.hover',
                  textAlign: 'center',
                }}
              >
                <DescriptionRoundedIcon
                  sx={{ fontSize: 38, color: 'text.secondary', mb: 1 }}
                />
                <Typography fontWeight={750}>
                  No resume text to preview
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, lineHeight: 1.8, maxWidth: 380, mx: 'auto' }}
                >
                  Extracted resume text will appear here when it becomes
                  available.
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}