import { useState, useEffect } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2, ArrowLeft } from "lucide-react"
import { DotGrid } from "@/components"

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [authStatus, setAuthStatus] = useState('processing') // 'processing', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const provider = searchParams.get('provider') || 'Google'

  useEffect(() => {
    // Handle OAuth callback
    if (error) {
      setAuthStatus('error')
      setErrorMessage(errorDescription || 'Authentication failed')
      return
    }

    if (!code) {
      setAuthStatus('error')
      setErrorMessage('No authorization code received')
      return
    }

    // Simulate OAuth exchange
    const timer = setTimeout(() => {
      // In real app, exchange code for tokens
      setAuthStatus('success')
      
      // Redirect to dashboard after success
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [code, error, errorDescription, navigate])

  // Processing state
  if (authStatus === 'processing') {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-20">
          <DotGrid
            dotSize={5}
            gap={12}
            proximity={120}
            shockRadius={310}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Floating emoji decorations */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl animate-float">🧸</div>
          <div className="absolute top-40 right-20 text-3xl animate-float-delayed">✨</div>
          <div className="absolute bottom-32 left-20 text-3xl animate-float">🎀</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-float-delayed">🌸</div>
        </div>

        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
          <div className="max-w-md mx-auto">
            <Card className="labubu-card mobile-card text-center">
              <CardContent className="p-8 sm:p-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-labubu-heading mb-4">
                  Signing You In
                </h1>
                
                <p className="text-muted-foreground text-sm sm:text-base">
                  Processing your {provider} authentication...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (authStatus === 'success') {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-20">
          <DotGrid
            dotSize={5}
            gap={12}
            proximity={120}
            shockRadius={310}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Floating emoji decorations */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl animate-float">🧸</div>
          <div className="absolute top-40 right-20 text-3xl animate-float-delayed">✨</div>
          <div className="absolute bottom-32 left-20 text-3xl animate-float">🎀</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-float-delayed">🌸</div>
        </div>

        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
          <div className="max-w-md mx-auto">
            <Card className="labubu-card mobile-card text-center">
              <CardContent className="p-8 sm:p-10">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-labubu-heading mb-4">
                  Welcome! 🎉
                </h1>
                
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  You've successfully signed in with {provider}. Redirecting you to your dashboard...
                </p>

                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />

                <Link to="/dashboard">
                  <Button className="w-full labubu-button mobile-button labubu-gradient">
                    Go to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-20">
        <DotGrid
          dotSize={5}
          gap={12}
          proximity={120}
          shockRadius={310}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Back to Login */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>

          <Card className="labubu-card mobile-card text-center">
            <CardContent className="p-8 sm:p-10">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-labubu-heading mb-4">
                Authentication Failed
              </h1>
              
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                {errorMessage || 'Something went wrong during authentication.'}
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground mb-8">
                Please try signing in again or contact support if the problem persists.
              </p>

              <div className="space-y-4">
                <Link to="/login">
                  <Button className="w-full labubu-button mobile-button labubu-gradient">
                    Try Again
                  </Button>
                </Link>
                
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="w-full labubu-button mobile-button"
                  >
                    Create Account Instead
                  </Button>
                </Link>
                
                <Link to="/">
                  <Button
                    variant="ghost"
                    className="w-full labubu-button mobile-button"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 