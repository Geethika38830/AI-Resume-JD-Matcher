import { Box, Chip, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'

interface SidebarProps { page: string; onNavigate: (page: string) => void; onLogout: () => void; open?: boolean; onClose?: () => void }
const items = [
  { label: 'Dashboard', icon: <DashboardRoundedIcon /> },
  { label: 'Resumes', icon: <DescriptionRoundedIcon /> },
  { label: 'Job Descriptions', icon: <WorkRoundedIcon /> },
  { label: 'AI Matching', icon: <AutoAwesomeRoundedIcon /> },
  { label: 'Match History', icon: <HistoryRoundedIcon /> },
  { label: 'Profile', icon: <AccountCircleRoundedIcon /> },
]

export default function Sidebar({ page, onNavigate, onLogout, open = false, onClose }: SidebarProps) {
  const contents = (
    <Box className="sidebar-content" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ mx: 1.2, mt: 2.2, mb: 1.6, px: 1.1 }}>
        <Typography variant="overline" sx={{ color: '#aaa5c5', fontSize: '.66rem', fontWeight: 800, letterSpacing: '1.8px' }}>YOUR WORKSPACE</Typography>
      </Box>
      <List sx={{ px: .4, py: 0 }}>
        {items.map((item, index) => (
          <ListItemButton key={item.label} selected={page === item.label} className="nav-item" onClick={() => { onNavigate(item.label); onClose?.() }} sx={{ animation: `riseIn .35s ease ${index * 45}ms both` }}>
            <ListItemIcon>{item.icon}</ListItemIcon><ListItemText primary={item.label} />
            {page === item.label && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#8b76ef', mr: .4 }} />}
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1, minHeight: 24 }} />
      <Box sx={{ mx: 1, mb: 1.5, p: 1.8, borderRadius: 3.5, background: 'linear-gradient(145deg,#f2efff,#faf8ff)', border: '1px solid #e9e3ff' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: .7 }}><TipsAndUpdatesRoundedIcon sx={{ color: '#7c66e8', fontSize: 19 }} /><Typography sx={{ fontSize: '.8rem', fontWeight: 800, color: '#4a3c8d' }}>Small steps, big goals</Typography></Box>
        <Typography sx={{ fontSize: '.73rem', color: '#8882a6', lineHeight: 1.6 }}>Every match can help you discover your next career move.</Typography>
        <Chip size="small" label="Keep growing ✦" sx={{ mt: 1.2, bgcolor: '#fff', color: '#7964dc', border: '1px solid #e5ddff', fontSize: '.68rem' }} />
      </Box>
      <Divider sx={{ borderColor: '#eeeaf8', mx: 1, mb: 1 }} />
      <List sx={{ px: .4, pb: 1 }}><ListItemButton className="nav-item" onClick={onLogout}><ListItemIcon><LogoutRoundedIcon /></ListItemIcon><ListItemText primary="Sign out" /></ListItemButton></List>
    </Box>
  )
  return <>
    <Drawer variant="permanent" open className="desktop-drawer" sx={{ display: { xs: 'none', md: 'block' } }}>{contents}</Drawer>
    <Drawer variant="temporary" open={open} onClose={onClose} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 278, border: 0, background: '#fff' } }}><Box sx={{ width: 278, height: '100%' }}>{contents}</Box></Drawer>
  </>
}
