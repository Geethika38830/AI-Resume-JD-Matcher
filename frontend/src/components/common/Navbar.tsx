import { AppBar, Avatar, Box, IconButton, Toolbar, Typography, Tooltip, Chip } from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'

interface NavbarProps { onMenuClick?: () => void; email?: string }

export default function Navbar({ onMenuClick, email = '' }: NavbarProps) {
  const initial = email.trim().charAt(0).toUpperCase() || 'U'
  return (
    <AppBar position="fixed" elevation={0} className="topbar">
      <Toolbar>
        <IconButton color="inherit" aria-label="Open navigation menu" onClick={onMenuClick} sx={{ display: { md: 'none' }, mr: 1 }}>
          <MenuRoundedIcon />
        </IconButton>
        <Box className="brand-mark small"><AutoAwesomeRoundedIcon /></Box>
        <Box sx={{ ml: 1.25, display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <Typography variant="h6" sx={{ fontWeight: 850, letterSpacing: '-.65px', lineHeight: 1.15 }}>
            Resume<span className="accent-text">IQ</span>
          </Typography>
          <Typography sx={{ color: '#9994b4', fontSize: '.64rem', fontWeight: 700, letterSpacing: '1.3px', mt: .25 }}>
            CAREER INTELLIGENCE
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Chip icon={<FiberManualRecordRoundedIcon sx={{ '&&': { fontSize: 9, color: '#35b69b' } }} />} label="AI workspace" size="small" sx={{ display: { xs: 'none', sm: 'inline-flex' }, mr: 2, bgcolor: '#effbf7', color: '#398b79', border: '1px solid #dcf5ed', fontSize: '.73rem' }} />
        <Tooltip title={email || 'Signed-in user'}>
          <Avatar sx={{ width: 39, height: 39, fontWeight: 800, fontSize: '.9rem', color: '#fff', background: 'linear-gradient(135deg,#aa9bff,#6d56df)', boxShadow: '0 5px 13px rgba(118,99,233,.25)' }}>{initial}</Avatar>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
