
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import History from '../pages/History'
import JobDescription from '../pages/JobDescription'
import Login from '../pages/Login'
import Match from '../pages/Match'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Resume from '../pages/Resume'

interface AppRoutesProps {
  loggedIn: boolean
  onLogin: () => void
  onLogout: () => void
}

export default function AppRoutes({
  loggedIn,
  onLogin,
  onLogout,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          loggedIn
            ? <Navigate to="/" replace />
            : <Login
                onLogin={onLogin}
                onRegister={() => window.location.assign('/register')}
              />
        }
      />

      <Route
        path="/register"
        element={
          loggedIn
            ? <Navigate to="/" replace />
            : <Register
                onRegistered={onLogin}
                onSignIn={() => window.location.assign('/login')}
              />
        }
      />

      <Route
        path="/"
        element={
          loggedIn
            ? <Dashboard onNavigate={page => {
                const routes: Record<string, string> = {
                  Dashboard: '/',
                  Resumes: '/resume',
                  'Job Descriptions': '/jobs',
                  'AI Matching': '/match',
                  'Match History': '/history',
                }
                window.location.assign(routes[page] ?? '/')
              }} />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/resume"
        element={loggedIn ? <Resume /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/jobs"
        element={loggedIn ? <JobDescription /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/match"
        element={loggedIn ? <Match /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/history"
        element={loggedIn ? <History /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profile"
        element={loggedIn ? <Profile /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/logout"
        element={<LogoutRedirect onLogout={onLogout} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function LogoutRedirect({ onLogout }: { onLogout: () => void }) {
  onLogout()
  return <Navigate to="/login" replace />
}
