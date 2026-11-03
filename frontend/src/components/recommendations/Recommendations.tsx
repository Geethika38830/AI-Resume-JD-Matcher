
import {
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'

interface RecommendationsProps {
  recommendations?: string | string[] | null
}

export default function Recommendations({
  recommendations = '',
}: RecommendationsProps) {
  const rawItems = Array.isArray(recommendations)
    ? recommendations
    : (recommendations ?? '').split(/\n|[;]+/)

  const items = rawItems
    .map((item) => String(item).replace(/^[\s*•\-0-9.)]+/, '').trim())
    .filter(Boolean)

  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.toLowerCase(), item])).values(),
  )

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
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2.5,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              <TipsAndUpdatesRoundedIcon />
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={850}>
                Recommendations
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.3}>
                Practical steps to strengthen your application.
              </Typography>
            </Box>
          </Stack>

          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="Action plan"
            color="primary"
            variant="outlined"
            size="small"
            sx={{ flexShrink: 0 }}
          />
        </Stack>

        {uniqueItems.length > 0 ? (
          <List disablePadding>
            {uniqueItems.map((item, index) => (
              <ListItem
                key={`${item}-${index}`}
                alignItems="flex-start"
                sx={{
                  px: 1.5,
                  py: 1.5,
                  mb: index === uniqueItems.length - 1 ? 0 : 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                }}
              >
                <ListItemIcon sx={{ minWidth: 42, mt: 0.25 }}>
                  <CheckCircleOutlineRoundedIcon color="success" />
                </ListItemIcon>

                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    sx: {
                      lineHeight: 1.8,
                      overflowWrap: 'anywhere',
                    },
                  }}
                />

                <Chip
                  label={index + 1}
                  size="small"
                  variant="outlined"
                  sx={{ ml: 1, mt: 0.25, minWidth: 30 }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: 'action.hover',
            }}
          >
            <TipsAndUpdatesRoundedIcon
              sx={{ fontSize: 34, color: 'text.secondary', mb: 1 }}
            />

            <Typography fontWeight={750}>
              Your action plan will appear here
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.75, lineHeight: 1.7 }}
            >
              Run a resume-to-job match to receive recommendations based on
              the results returned by your matching service.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
