import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./ThemeToggle"
import { useAuthStore } from "@/store/authStore"
import { 
  Compass, 
  LineChart, 
  BookOpen, 
  DollarSign,
  Upload,
  Home,
  Image,
  Settings,
  LogOut,
  User
} from "lucide-react"

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 6-12 12"/>
    <path d="m6 6 12 12"/>
  </svg>
)

export default function Navbar() {
  const { user, session, signOut } = useAuthStore()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const isAuthenticated = !!(user && session)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
      navigate('/')
    }
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-xs">
              🧸
            </div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Labubu Showroom
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/50">
              Explore
            </Link>
            <Link to="/home" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/50">
              Home
            </Link>
            <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/50">
              Profile
            </Link>
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/50">
              Pricing
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden sm:flex items-center space-x-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex rounded-lg shadow-sm hover:shadow-md transition-all duration-200 h-8 px-3 text-xs"
                  onClick={() => navigate('/upload')}
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Upload
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-lg hover:scale-105 transition-transform duration-200 p-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-xs shadow-sm">
                        🧸
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-xs">
                        🧸
                      </div>
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">{user?.display_name || user?.username}</p>
                        {user?.is_pro && (
                          <Badge className="w-fit bg-gradient-to-r from-primary to-accent text-xs rounded-md shadow-sm animate-fade-in">
                            PRO
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenuItem onClick={() => navigate('/home')}>
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="w-4 h-4 mr-2" />
                      My Gallery
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <LineChart className="w-4 h-4 mr-2" />
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden md:flex rounded-lg hover:bg-muted/50 transition-all duration-200 h-8 px-3 text-xs">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="rounded-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-sm hover:shadow-md transition-all duration-200 h-8 px-3 text-xs">
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-8 w-8 p-0 rounded-lg"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-4 py-3 space-y-3">
              {/* Navigation Links */}
              <div className="space-y-1">
                <Link to="/explore" className="flex items-center py-2 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <Compass className="w-4 h-4 mr-2" />
                  Explore
                </Link>
                {isAuthenticated && (
                  <>
                    <Link to="/home" className="flex items-center py-2 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </Link>
                    <Link to="/dashboard" className="flex items-center py-2 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      <LineChart className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </>
                )}
                <Link to="/pricing" className="flex items-center py-2 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pricing
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="space-y-2 pt-2 border-t">
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full rounded-lg shadow-sm h-9"
                      onClick={() => {
                        navigate('/upload');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-xs">
                        🧸
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium text-sm">{user?.display_name || user?.username}</p>
                        {user?.is_pro && (
                          <Badge className="w-fit bg-gradient-to-r from-primary to-accent text-xs rounded-md shadow-sm animate-fade-in">
                            PRO
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full rounded-lg text-left justify-start h-9"
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" size="sm" className="w-full rounded-lg h-9">
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild className="w-full rounded-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-sm hover:shadow-md transition-all duration-200 h-9">
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 