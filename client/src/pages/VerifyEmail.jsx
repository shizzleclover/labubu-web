import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Mail, ArrowLeft, Loader2 } from "lucide-react"
import { DotGrid } from "@/components"
import LabubuLoading from "@/components/LabubuLoading"

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const [verificationStatus, setVerificationStatus] = useState('verifying') // 'verifying', 'success', 'error'
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error')
      return
    }

    // Simulate email verification
    const timer = setTimeout(() => {
      // In real app, verify with API
      setVerificationStatus('success')
    }, 2000)

    return () => clearTimeout(timer)
  }, [token])

  useEffect(() => {
    // Cooldown timer for resend button
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleResendEmail = async () => {
    setIsResending(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      setResendCooldown(60) // 60 second cooldown
      console.log("Resend verification email to:", email)
    }, 1500)
  }

  // Verifying state
  if (verificationStatus === 'verifying') {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <DotGrid
          dotSize={5}
          gap={12}
          proximity={120}
          shockRadius={310}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />

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
                <LabubuLoading size="large" text="Please wait while we verify your email address..." textColor="hsl(var(--muted-foreground))" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (verificationStatus === 'success') {
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
                  Email Verified! 🎉
                </h1>
                
                <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                  Your email has been successfully verified. Welcome to the Labubu community! You can now access all features.
                </p>

                <div className="space-y-4">
                  <Link to="/dashboard">
                    <Button className="w-full labubu-button mobile-button labubu-gradient">
                      Go to Dashboard
                    </Button>
                  </Link>
                  
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full labubu-button mobile-button"
                    >
                      Sign In
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
          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Card className="labubu-card mobile-card text-center">
            <CardContent className="p-8 sm:p-10">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-labubu-heading mb-4">
                Verification Failed
              </h1>
              
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                This verification link is invalid or has expired. 
                {email && (
                  <>
                    <br />
                    <span className="font-medium text-foreground">{email}</span>
                  </>
                )}
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground mb-8">
                Need a new verification email? We can send you another one.
              </p>

              <div className="space-y-4">
                <Button
                  onClick={handleResendEmail}
                  disabled={isResending || resendCooldown > 0}
                  className="w-full labubu-button mobile-button labubu-gradient"
                >
                  {isResending ? (
                    <div className="flex items-center gap-2">
                      <LabubuLoading size="small" text="Sending..." textColor="hsl(var(--primary-foreground))" />
                    </div>
                  ) : (
                    resendCooldown > 0 
                      ? `Resend Email (${resendCooldown}s)` 
                      : "Resend Verification Email"
                  )}
                </Button>
                
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="w-full labubu-button mobile-button"
                  >
                    Create New Account
                  </Button>
                </Link>
                
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="w-full labubu-button mobile-button"
                  >
                    Back to Sign In
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