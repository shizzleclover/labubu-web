import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { DotGrid } from "@/components"
import { useAuthStore } from "@/store/authStore"
import LabubuLoading from "@/components/LabubuLoading"

export default function ResetPassword() {
  const { resetPassword } = useAuthStore()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email) {
      setError("Email is required")
      setIsLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      const result = await resetPassword(email)
      if (result.success) {
        setIsEmailSent(true)
      }
    } catch (error) {
      setError(error.message || "Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Interactive Dot Grid Background */}
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
              <CardContent className="p-6 sm:p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-labubu-heading mb-4">
                  Check Your Email
                </h1>
                
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  We've sent a password reset link to <br />
                  <span className="font-medium text-foreground">{email}</span>
                </p>
                
                <p className="text-xs sm:text-sm text-muted-foreground mb-8">
                  Didn't receive the email? Check your spam folder or try again.
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() => {
                      setIsEmailSent(false)
                      setEmail("")
                    }}
                    variant="outline"
                    className="w-full labubu-button mobile-button"
                  >
                    Send Again
                  </Button>
                  
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Interactive Dot Grid Background */}
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
          {/* Back to Login */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>

          {/* Brand Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-xl sm:text-2xl shadow-labubu">
                🧸
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Labubu Showroom
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-labubu-heading mb-2">
              Reset Password
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {/* Reset Form */}
          <Card className="labubu-card mobile-card">
            <CardHeader className="text-center p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">Forgot Password?</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                No worries, we'll help you get back in
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 labubu-button ${error ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-destructive">{error}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full labubu-button mobile-button labubu-gradient hover:opacity-90 text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <LabubuLoading size="small" text="Sending Reset Link..." textColor="hsl(var(--primary-foreground))" />
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>

              {/* Back to Login Link */}
              <div className="text-center mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 