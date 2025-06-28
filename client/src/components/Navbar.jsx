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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-labubu">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-base sm:text-lg">
              🧸
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Labubu Showroom
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link to="/home" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Button variant="outline" size="sm" className="hidden md:flex rounded-labubu shadow-labubu hover:shadow-lg transition-all duration-200">
                  Upload
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-labubu hover:scale-105 transition-transform duration-200">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-sm shadow-labubu">
                        🧸
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.display_name || user?.username}</p>
                        {user?.is_pro && (
                          <Badge className="w-fit bg-gradient-to-r from-primary to-accent text-xs rounded-labubu shadow-labubu animate-fade-in">
                            PRO
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenuItem onClick={() => navigate('/home')}>Home</DropdownMenuItem>
                    <DropdownMenuItem>My Gallery</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Analytics</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="hidden md:flex rounded-labubu hover:bg-muted/50 transition-all duration-200">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="rounded-labubu bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-labubu hover:shadow-lg transition-all duration-200 text-sm px-3 sm:px-4">
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
              className="p-2"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-4 py-4 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Link to="/explore" className="block py-2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <Compass className="w-4 h-4 inline-block mr-2" />
                  Explore
                </Link>
                {isAuthenticated && (
                  <>
                    <Link to="/home" className="block py-2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      <Home className="w-4 h-4 inline-block mr-2" />
                      Home
                    </Link>
                    <Link to="/dashboard" className="block py-2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      <LineChart className="w-4 h-4 inline-block mr-2" />
                      Dashboard
                    </Link>
                  </>
                )}
                <Link to="/pricing" className="block py-2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <DollarSign className="w-4 h-4 inline-block mr-2" />
                  Pricing
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="space-y-2 pt-4 border-t">
                {isAuthenticated ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full rounded-labubu shadow-labubu"
                      onClick={() => {
                        navigate('/upload');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <div className="flex items-center gap-2 p-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-sm">
                        🧸
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium text-sm">{user?.display_name || user?.username}</p>
                        {user?.is_pro && (
                          <Badge className="w-fit bg-gradient-to-r from-primary to-accent text-xs rounded-labubu">
                            PRO
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <button onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm hover:bg-muted rounded"><User className="w-4 h-4 inline-block mr-2" />My Profile</button>
                      <button onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-sm hover:bg-muted rounded"><Settings className="w-4 h-4 inline-block mr-2" />Settings</button>
                      <button onClick={handleSignOut} className="block w-full text-left py-2 text-sm hover:bg-muted rounded"><LogOut className="w-4 h-4 inline-block mr-2" />Sign out</button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full rounded-labubu" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button asChild className="w-full rounded-labubu bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-labubu" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to="/register">Get Started</Link>
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