
import { Card, CardContent, Avatar, Typography, Stack } from '@mui/material'
import type { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  color?: string
}

export default function StatsCard({
  title,
  value,
  icon,
  color = '#5b4bdb',
}: StatsCardProps) {
  return (
    <Card className="stat-card">
      <CardContent>
        <Stack spacing={2}>
          <Avatar sx={{ bgcolor: `${color}18`, color, borderRadius: 3 }}>
            {icon}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={800}>
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
