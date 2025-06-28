import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import { MobileDock, Dock } from '@/components'
import LabubuLoading from '@/components/LabubuLoading'
import { 
  Home as HomeIcon, 
  Search, 
  User, 
  Bell, 
  MessageCircle, 
  Settings as SettingsIcon, 
  Upload as UploadIcon,
  BarChart3,
  Camera
} from 'lucide-react'
import Landing from '@/pages/Landing'
import Gallery from '@/pages/Gallery'
import Dashboard from '@/pages/Dashboard'
import Home from '@/pages/Home'
import Explore from '@/pages/Explore'
import Pricing from '@/pages/Pricing'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ResetPassword from '@/pages/ResetPassword'
import UpdatePassword from '@/pages/UpdatePassword'
import VerifyEmail from '@/pages/VerifyEmail'
import AuthCallback from '@/pages/AuthCallback'
import ProfileSetup from '@/pages/ProfileSetup'
import ItemDetails from '@/pages/ItemDetails'
import Upload from '@/pages/Upload'
import Profile from '@/pages/Profile'
import Notifications from '@/pages/Notifications'
import Settings from '@/pages/Settings'
import { useAuthStore } from '@/store/authStore'
import { ThemeProvider } from '@/contexts/ThemeContext'


function AppContent() {
  const { user, session, isLoading, isInitialized, initialize } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  
  const isAuthenticated = !!(user && session)

  useEffect(() => {
    if (!isInitialized) {
      initialize()
    }
  }, [isInitialized, initialize])
  
  // Hide navbar on auth pages and home page
  const isAuthPage = ['/login', '/register', '/reset-password', '/update-password', '/verify-email', '/auth/callback', '/profile-setup'].includes(location.pathname)
  const isHomePage = location.pathname === '/home'
  
  // Define pages where dock should be shown (only authenticated main pages)
  const isMainAuthPage = isAuthenticated && ['/home', '/dashboard', '/upload', '/explore', '/profile', '/settings', '/notifications'].some(path => location.pathname.startsWith(path))

  // Desktop Dock Items (only show when authenticated)
  const dockItems = isAuthenticated ? [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      label: "Home",
      onClick: () => navigate('/home'),
      className: "labubu-button-hover"
    },
    {
      icon: <UploadIcon className="w-5 h-5" />,
      label: "Upload",
      onClick: () => navigate('/upload'),
      className: "labubu-button-hover"
    },
    {
      icon: <Search className="w-5 h-5" />,
      label: "Explore",
      onClick: () => navigate('/explore'),
      className: "labubu-button-hover"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Dashboard",
      onClick: () => navigate('/dashboard'),
      className: "labubu-button-hover"
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "Profile",
      onClick: () => navigate('/profile'),
      className: "labubu-button-hover"
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
      onClick: () => navigate('/notifications'),
      className: "labubu-button-hover"
    },
    {
      icon: <SettingsIcon className="w-5 h-5" />,
      label: "Settings",
      onClick: () => navigate('/settings'),
      className: "labubu-button-hover"
    }
  ] : []

  // Show loading screen while initializing auth
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LabubuLoading size="large" text="Loading your collection..." textColor="hsl(var(--muted-foreground))" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {!isAuthPage && !isHomePage && <Navbar />}
      <main className={`${!isAuthPage && !isHomePage ? 'pb-20 sm:pb-0' : ''}`}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/gallery/:username" element={<Gallery />} />
              <Route path="/item/:id" element={<ItemDetails />} />
              
              {/* Authentication Routes */}
              <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} 
              />
              <Route 
                path="/register" 
                element={isAuthenticated ? <Navigate to="/home" replace /> : <Register />} 
              />
              <Route 
                path="/reset-password" 
                element={isAuthenticated ? <Navigate to="/home" replace /> : <ResetPassword />} 
              />
              <Route 
                path="/update-password" 
                element={isAuthenticated ? <Navigate to="/home" replace /> : <UpdatePassword />} 
              />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route 
                path="/profile-setup" 
                element={isAuthenticated ? <ProfileSetup /> : <Navigate to="/login" replace />} 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/home" 
                element={
                  isAuthenticated ? <Home /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/upload" 
                element={
                  isAuthenticated ? <Upload /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/profile" 
                element={
                  isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  isAuthenticated ? <Notifications /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/settings" 
                element={
                  isAuthenticated ? <Settings /> : <Navigate to="/login" replace />
                } 
              />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
      </main>
      
      {/* Mobile Dock Navigation - Show only on main auth pages */}
      {isMainAuthPage && <MobileDock />}
      
      {/* Desktop Dock Navigation - Hidden on mobile, show only on main auth pages */}
      {isMainAuthPage && dockItems.length > 0 && (
        <div className="hidden sm:block">
          <Dock
            items={dockItems}
            magnification={60}
            distance={150}
            panelHeight={68}
            baseItemSize={48}
            spring={{ mass: 0.1, stiffness: 150, damping: 12 }}
          />
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
