
import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingProps {
  message?: string
}

export default function Loading({
  message = 'Loading...',
}: LoadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 5,
      }}
    >
      <CircularProgress />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  )
}
