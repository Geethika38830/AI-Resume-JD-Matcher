import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { Box, CircularProgress, CssBaseline } from '@mui/material'

import api from './services/api'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'

import Dashboard from './pages/Dashboard'
import History from './pages/History'
import JobDescription from './pages/JobDescription'
import Login from './pages/Login'
import Match from './pages/Match'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Resume from './pages/Resume'

const pagePaths: Record<string, string> = {
  Dashboard: '/',
  Resumes: '/resume',
  'Job Descriptions': '/jobs',
  'AI Matching': '/match',
  'Match History': '/history',
  Profile: '/profile',
}

const pathPages: Record<string, string> = {
  '/': 'Dashboard',
  '/resume': 'Resumes',
  '/jobs': 'Job Descriptions',
  '/match': 'AI Matching',
  '/history': 'Match History',
  '/profile': 'Profile',
}

function Workspace() {
  const navigate = useNavigate()
  const location = useLocation()

  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function checkSession() {
      const token = localStorage.getItem('access_token')

      if (!token) {
        if (!cancelled) {
          setLoggedIn(false)
          setCheckingSession(false)
        }
        return
      }

      try {
        await api.get('/auth/me')

        if (!cancelled) {
          setLoggedIn(true)
        }
      } catch {
        localStorage.removeItem('access_token')

        if (!cancelled) {
          setLoggedIn(false)
        }
      } finally {
        if (!cancelled) {
          setCheckingSession(false)
        }
      }
    }

    void checkSession()

    return () => {
      cancelled = true
    }
  }, [])

  function handleLogin() {
    setLoggedIn(true)
    navigate('/', { replace: true })
  }

  function handleLogout() {
    localStorage.removeItem('access_token')
    setLoggedIn(false)
    setMobileMenuOpen(false)
    navigate('/login', { replace: true })
  }

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register'

  const currentPage = pathPages[location.pathname] ?? 'Dashboard'

  function navigateToPage(page: string) {
    navigate(pagePaths[page] ?? '/')
  }

  if (checkingSession) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </>
    )
  }

  return (
    <>
      <CssBaseline />

      {loggedIn && !isAuthPage && (
        <>
          <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

          <Sidebar
            page={currentPage}
            onNavigate={navigateToPage}
            onLogout={handleLogout}
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
        </>
      )}

      <Box
        className={
          loggedIn && !isAuthPage
            ? 'app-shell main-content'
            : undefined
        }
        sx={
          loggedIn && !isAuthPage
            ? {
                pt: { xs: '80px', md: '88px' },
                pl: { xs: 0, md: '270px' },
                minHeight: '100vh',
              }
            : undefined
        }
      >
        <Routes>
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login
                  onLogin={handleLogin}
                  onRegister={() => navigate('/register')}
                />
              )
            }
          />

          <Route
            path="/register"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register
                  onRegistered={() => navigate('/login')}
                  onSignIn={() => navigate('/login')}
                />
              )
            }
          />

          <Route
            path="/"
            element={
              loggedIn ? (
                <Dashboard onNavigate={navigateToPage} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/resume"
            element={
              loggedIn ? <Resume /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/jobs"
            element={
              loggedIn ? (
                <JobDescription />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/match"
            element={
              loggedIn ? <Match /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/history"
            element={
              loggedIn ? <History /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/profile"
            element={
              loggedIn ? <Profile /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Box>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Workspace />
    </BrowserRouter>
  )
}