import { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import api from '../services/api'

interface DashboardStats {
  total_resumes: number
  total_job_descriptions: number
  total_matches: number
  average_match_score: number
}

interface DashboardProps {
  onNavigate: (page: string) => void
}

const actions = [
  {
    title: 'Resume Library',
    description:
      'Upload your resume and manage your career documents in one place.',
    icon: <DescriptionRoundedIcon />,
    page: 'Resumes',
    label: 'Manage resumes',
    color: '#635bdb',
    background: '#eeedff',
    step: '01',
  },
  {
    title: 'Job Descriptions',
    description:
      'Save target roles and explore the skills employers are looking for.',
    icon: <WorkRoundedIcon />,
    page: 'Job Descriptions',
    label: 'Explore roles',
    color: '#0e9f83',
    background: '#e1f7ef',
    step: '02',
  },
  {
    title: 'AI Resume Matching',
    description:
      'Compare a resume with a job and discover relevant skill gaps.',
    icon: <AutoAwesomeRoundedIcon />,
    page: 'AI Matching',
    label: 'Analyze a match',
    color: '#e08b37',
    background: '#fff0df',
    step: '03',
  },
  {
    title: 'Match History',
    description:
      'Review previous analyses and revisit your saved match results.',
    icon: <HistoryRoundedIcon />,
    page: 'Match History',
    label: 'View history',
    color: '#3879dc',
    background: '#e8f1ff',
    step: '04',
  },
]

const workflow = [
  {
    number: '01',
    title: 'Add your resume',
    description: 'Start with a PDF of your current resume.',
    icon: <CloudUploadRoundedIcon />,
    page: 'Resumes',
  },
  {
    number: '02',
    title: 'Choose a target role',
    description: 'Save a job description you want to pursue.',
    icon: <WorkRoundedIcon />,
    page: 'Job Descriptions',
  },
  {
    number: '03',
    title: 'Run AI analysis',
    description: 'Review matching skills and improvement areas.',
    icon: <PsychologyRoundedIcon />,
    page: 'AI Matching',
  },
]

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [statsError, setStatsError] = useState('')

  useEffect(() => {
    let active = true
    api.get<DashboardStats>('/dashboard/')
      .then(data => {
        if (active) setStats(data)
      })
      .catch(() => {
        if (active) setStatsError('Live statistics are temporarily unavailable.')
      })
    return () => {
      active = false
    }
  }, [])

  const statCards = [
    { label: 'Resumes', value: stats?.total_resumes ?? '—', icon: <DescriptionRoundedIcon />, tint: '#eeedff', color: '#635bdb' },
    { label: 'Job descriptions', value: stats?.total_job_descriptions ?? '—', icon: <WorkRoundedIcon />, tint: '#e1f7ef', color: '#0e9f83' },
    { label: 'Saved analyses', value: stats?.total_matches ?? '—', icon: <HistoryRoundedIcon />, tint: '#e8f1ff', color: '#3879dc' },
    { label: 'Average match', value: stats ? `${stats.average_match_score.toFixed(1)}%` : '—', icon: <TrendingUpRoundedIcon />, tint: '#fff0df', color: '#e08b37' },
  ]

  return (
    <Stack spacing={3.5} sx={{ width: '100%', minWidth: 0, pb: 4 }}>
      {/* Page heading */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ color: '#6558d9', fontWeight: 800, letterSpacing: 1.5 }}
          >
            CAREER INTELLIGENCE PLATFORM
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 850,
              letterSpacing: '-1.2px',
              mt: 0.5,
              fontSize: { xs: '1.8rem', md: '2.3rem' },
            }}
          >
            Your career workspace
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Turn your experience into your next opportunity.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<AccountCircleRoundedIcon />}
          onClick={() => onNavigate('Profile')}
          sx={{ borderRadius: 2.5, textTransform: 'none', fontWeight: 700 }}
        >
          My profile
        </Button>
      </Box>

      {/* Hero banner */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          p: { xs: 3, md: 4.5 },
          color: 'white',
          background:
            'linear-gradient(120deg, #29265e 0%, #5145b9 52%, #7669ed 100%)',
          boxShadow: '0 18px 45px rgba(74, 62, 170, 0.19)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 270,
            height: 270,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
            right: { xs: -150, md: 40 },
            top: -130,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            width: 210,
            height: 210,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
            right: { xs: -120, md: 70 },
            top: -100,
          }}
        />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
          gap={3}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box sx={{ maxWidth: 590 }}>
            <Chip
              icon={<AutoAwesomeRoundedIcon />}
              label="AI-POWERED CAREER INSIGHTS"
              size="small"
              sx={{
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.18)',
                fontWeight: 750,
                mb: 2.5,
                '& .MuiChip-icon': { color: '#f7d58a' },
              }}
            />

            <Typography
              variant="h3"
              sx={{
                fontWeight: 850,
                letterSpacing: '-1.2px',
                lineHeight: 1.15,
                fontSize: { xs: '2rem', md: '2.8rem' },
              }}
            >
              Make your next
              <br />
              career move count.
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: 'rgba(255,255,255,0.79)',
                lineHeight: 1.8,
                maxWidth: 510,
              }}
            >
              Understand how your experience aligns with your target jobs.
              Discover skill gaps, explore recommendations, and prepare for
              your next opportunity.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} mt={3.5}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => onNavigate('AI Matching')}
                sx={{
                  bgcolor: 'white',
                  color: '#4338a8',
                  px: 2.5,
                  py: 1.2,
                  borderRadius: 2.5,
                  fontWeight: 800,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#f0efff' },
                }}
              >
                Start AI matching
              </Button>

              <Button
                variant="outlined"
                startIcon={<DescriptionRoundedIcon />}
                onClick={() => onNavigate('Resumes')}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.4)',
                  px: 2.5,
                  py: 1.2,
                  borderRadius: 2.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                Manage resumes
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: 150,
              height: 150,
              borderRadius: 5,
              flexShrink: 0,
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.17)',
              transform: 'rotate(4deg)',
            }}
          >
            <InsightsRoundedIcon sx={{ fontSize: 94, color: '#e0dcff' }} />
          </Box>
        </Stack>
      </Box>

      {/* Live statistics from the current account */}
      <Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
            gap: 2,
          }}
        >
          {statCards.map(card => (
            <Card key={card.label} sx={{ border: '1px solid #e9eaf2', borderRadius: 3.5, boxShadow: '0 4px 18px rgba(29, 34, 67, 0.035)' }}>
              <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">{card.label}</Typography>
                    <Typography variant="h4" fontWeight={850} mt={0.75}>
                      {card.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: card.tint, color: card.color, width: 44, height: 44 }}>
                    {card.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
        {statsError && (
          <Typography variant="caption" color="text.secondary" display="block" mt={1}>
            {statsError}
          </Typography>
        )}
      </Box>

      {/* Workspace shortcuts */}
      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          gap={1}
          mb={2}
        >
          <Box>
            <Typography variant="h6" fontWeight={850}>
              Your workspace
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Everything you need to prepare for your next role.
            </Typography>
          </Box>

          <Chip
            size="small"
            variant="outlined"
            icon={<CheckCircleOutlineRoundedIcon />}
            label="Workspace shortcuts"
            sx={{ borderRadius: 2, fontWeight: 650 }}
          />
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              xl: 'repeat(4, minmax(0, 1fr))',
            },
            gap: 2,
          }}
        >
          {actions.map(action => (
            <Card
              key={action.title}
              onClick={() => onNavigate(action.page)}
              sx={{
                height: '100%',
                cursor: 'pointer',
                border: '1px solid #e9eaf2',
                borderRadius: 3.5,
                boxShadow: '0 4px 18px rgba(29, 34, 67, 0.035)',
                transition: 'transform 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 14px 30px rgba(29, 34, 67, 0.09)',
                },
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      bgcolor: action.background,
                      color: action.color,
                    }}
                  >
                    {action.icon}
                  </Avatar>

                  <Typography
                    variant="caption"
                    sx={{ color: '#a0a4b6', fontWeight: 800 }}
                  >
                    {action.step}
                  </Typography>
                </Stack>

                <Typography fontWeight={800} mt={2.5}>
                  {action.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, lineHeight: 1.75, minHeight: 60 }}
                >
                  {action.description}
                </Typography>

                <Button
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    mt: 1.5,
                    p: 0,
                    textTransform: 'none',
                    fontWeight: 800,
                    color: action.color,
                  }}
                  onClick={event => {
                    event.stopPropagation()
                    onNavigate(action.page)
                  }}
                >
                  {action.label}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Getting started workflow */}
      <Box>
        <Typography variant="h6" fontWeight={850}>
          Your path to a stronger application
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={0.5} mb={2}>
          Follow these steps to get useful results from ResumeIQ.
        </Typography>

        <Card
          sx={{
            border: '1px solid #e9eaf2',
            borderRadius: 3.5,
            boxShadow: '0 4px 18px rgba(29, 34, 67, 0.035)',
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(3, minmax(0, 1fr))',
                },
                gap: 3,
              }}
            >
              {workflow.map((item, index) => (
                <Box key={item.number}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2.5,
                        bgcolor: '#eeedff',
                        color: '#635bdb',
                      }}
                    >
                      {item.icon}
                    </Avatar>

                    <Box flex={1}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        fontWeight={800}
                      >
                        STEP {item.number}
                      </Typography>

                      <Typography fontWeight={800} mt={0.5}>
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.75}
                        lineHeight={1.7}
                      >
                        {item.description}
                      </Typography>

                      <Button
                        size="small"
                        endIcon={<ArrowForwardRoundedIcon />}
                        onClick={() => onNavigate(item.page)}
                        sx={{
                          mt: 1.5,
                          px: 0,
                          textTransform: 'none',
                          fontWeight: 750,
                        }}
                      >
                        Continue
                      </Button>
                    </Box>
                  </Stack>

                  {index < workflow.length - 1 && (
                    <Divider
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        mt: 2.5,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Insight panel */}
      <Card
        sx={{
          border: '1px solid #e9eaf2',
          borderRadius: 3.5,
          bgcolor: '#fafaff',
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              sx={{
                bgcolor: '#eeedff',
                color: '#635bdb',
                width: 48,
                height: 48,
              }}
            >
              <TipsAndUpdatesRoundedIcon />
            </Avatar>

            <Box flex={1}>
              <Typography fontWeight={850}>
                Make your resume work harder
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.75}
                lineHeight={1.8}
              >
                A useful first step is to compare your resume with a specific
                job description. Review the skills you already demonstrate,
                identify missing requirements, and prioritize improvements
                that are relevant to your target role.
              </Typography>

              <Button
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => onNavigate('AI Matching')}
                sx={{
                  mt: 1.5,
                  px: 0,
                  fontWeight: 800,
                  textTransform: 'none',
                }}
              >
                Analyze a target job
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Footer */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={1}
        sx={{ pt: 0.5 }}
      >
        <Typography variant="caption" color="text.secondary">
          ResumeIQ · AI-powered resume and job analysis
        </Typography>

        <Button
          size="small"
          startIcon={<HistoryRoundedIcon />}
          onClick={() => onNavigate('Match History')}
          sx={{ textTransform: 'none', fontWeight: 700 }}
        >
          Previous analyses
        </Button>
      </Stack>

      {/* Used to preserve a consistent visual vocabulary across actions */}
      <Box sx={{ display: 'none' }}>
        <TrendingUpRoundedIcon />
        <RocketLaunchRoundedIcon />
      </Box>
    </Stack>
  )
}