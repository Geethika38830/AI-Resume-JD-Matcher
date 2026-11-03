
import { useMemo } from 'react'
import {
  Box,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded'

interface SkillMatchProps {
  skills?: string | string[] | null
}

export default function SkillMatch({ skills = '' }: SkillMatchProps) {
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
          <CheckCircleRoundedIcon color="success" />
          <Typography variant="subtitle1" fontWeight={800}>
            Matching skills
          </Typography>
        </Stack>

        <Chip
          label={`${items.length} ${items.length === 1 ? 'skill' : 'skills'}`}
          color="success"
          size="small"
          variant="outlined"
        />
      </Stack>

      {items.length > 0 ? (
        <>
          <Typography variant="body2" color="text.secondary">
            Skills identified in your resume that match the job requirements.
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {items.map((skill) => (
              <Chip
                key={skill.toLowerCase()}
                icon={<CheckCircleRoundedIcon />}
                label={skill}
                color="success"
                variant="outlined"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  py: 0.5,
                  '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    overflowWrap: 'anywhere',
                    py: 0.5,
                  },
                }}
              />
            ))}
          </Stack>
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
          <PsychologyRoundedIcon
            sx={{ fontSize: 30, color: 'text.secondary', mb: 0.5 }}
          />

          <Typography fontWeight={700}>
            No matching skills found yet
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Add relevant skills to your resume and compare it with the job
            description again.
          </Typography>
        </Box>
      )}
    </Stack>
  )
}
