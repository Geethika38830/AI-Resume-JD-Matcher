
import { useMemo } from 'react'
import {
  Box,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'

interface SkillGapProps {
  skills?: string | string[] | null
}

export default function SkillGap({ skills = '' }: SkillGapProps) {
  const items = useMemo(() => {
    const rawSkills = Array.isArray(skills)
      ? skills
      : (skills ?? '').split(/[,;\n]/)

    const uniqueSkills = new Map<string, string>()

    rawSkills.forEach((skill) => {
      const cleaned = String(skill).trim()

      if (cleaned && !uniqueSkills.has(cleaned.toLowerCase())) {
        uniqueSkills.set(cleaned.toLowerCase(), cleaned)
      }
    })

    return Array.from(uniqueSkills.values())
  }, [skills])

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <WarningAmberRoundedIcon color="warning" />
          <Typography variant="subtitle1" fontWeight={800}>
            Skills to strengthen
          </Typography>
        </Stack>

        <Chip
          label={`${items.length} ${items.length === 1 ? 'skill' : 'skills'}`}
          color={items.length ? 'warning' : 'success'}
          size="small"
          variant="outlined"
        />
      </Stack>

      {items.length > 0 ? (
        <>
          <Typography variant="body2" color="text.secondary">
            These skills were identified as gaps in the matching results.
            Prioritize the ones most relevant to your target role.
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {items.map((skill) => (
              <Chip
                key={skill.toLowerCase()}
                icon={<LightbulbOutlinedIcon />}
                label={skill}
                color="warning"
                variant="outlined"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  py: 0.5,
                  '& .MuiChip-label': {
                    whiteSpace: 'normal',
                    overflowWrap: 'anywhere',
                    py: 0.5,
                  },
                }}
              />
            ))}
          </Stack>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'action.hover',
            }}
          >
            <LightbulbOutlinedIcon
              fontSize="small"
              color="warning"
              sx={{ mt: 0.2 }}
            />
            <Typography variant="body2" color="text.secondary">
              Learning these skills through practice projects and relevant
              coursework may help strengthen your resume for this role.
            </Typography>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: 'action.hover',
            textAlign: 'center',
          }}
        >
          <CheckCircleOutlineRoundedIcon
            sx={{ fontSize: 30, color: 'success.main', mb: 0.5 }}
          />

          <Typography fontWeight={700}>
            No skill gaps returned
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            The matching analysis did not identify missing skills. Review the
            overall score and job requirements as well.
          </Typography>
        </Box>
      )}
    </Stack>
  )
}
