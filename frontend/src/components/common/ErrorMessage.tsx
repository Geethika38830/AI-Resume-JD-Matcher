
import { Alert, Button, Stack } from '@mui/material'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <Stack spacing={2} alignItems="flex-start">
      <Alert severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Stack>
  )
}
