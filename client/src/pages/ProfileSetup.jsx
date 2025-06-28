import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Mail, 
  MapPin, 
  Instagram, 
  Twitter, 
  Globe, 
  Eye, 
  EyeOff, 
  Upload,
  Sun,
  Moon,
  Heart,
  Camera,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react"
import { DotGrid } from "@/components"
import { useAuthStore } from "@/store/authStore"
import { useTheme } from "@/hooks/useTheme"
import LabubuLoading from "@/components/LabubuLoading"

export default function ProfileSetup() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)
  const { theme, setTheme } = useTheme()
  
  const [formData, setFormData] = useState({
    username: user?.username || "",
    displayName: user?.displayName || "",
    bio: "",
    avatar: null,
    location: "",
    socialLinks: {
      instagram: "",
      twitter: "",
      website: ""
    },
    isPublic: true,
    themePreference: theme,
    favoriteToyLine: "",
    email: user?.email || ""
  })
  
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
    
    // Apply theme change immediately when user selects it
    if (field === 'themePreference') {
      setTheme(value)
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, avatar: "Image must be under 5MB" }))
        return
      }
      
      setFormData(prev => ({ ...prev, avatar: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setAvatarPreview(e.target.result)
      reader.readAsDataURL(file)
      
      // Clear any previous errors
      setErrors(prev => ({ ...prev, avatar: "" }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.username) {
        newErrors.username = "Username is required"
      } else if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters"
      }
      
      if (!formData.displayName) {
        newErrors.displayName = "Display name is required"
      }
    }
    
    return newErrors
  }

  const handleNext = () => {
    const stepErrors = validateStep(currentStep)
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    // Apply theme preference immediately
    if (formData.themePreference !== theme) {
      setTheme(formData.themePreference)
    }
    
    // Simulate API call
    setTimeout(() => {
      updateProfile(formData)
      setIsLoading(false)
      navigate('/home')
    }, 1500)
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === currentStep 
              ? 'bg-primary text-primary-foreground' 
              : step < currentStep 
                ? 'bg-green-500 text-white' 
                : 'bg-muted text-muted-foreground'
          }`}>
            {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-green-500' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-labubu-heading mb-2">
          Basic Information
        </h2>
        <p className="text-muted-foreground">
          Let's start with the essentials
        </p>
      </div>

      {/* Avatar Upload */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Profile Picture</Label>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-labubu bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden shadow-labubu">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-8 h-8 text-white" />
              )}
            </div>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => document.getElementById('avatar').click()}
          >
            <Upload className="w-3 h-3 mr-1" />
            Upload Photo
          </Button>
          {errors.avatar && (
            <p className="text-xs text-destructive">{errors.avatar}</p>
          )}
        </div>
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">
          Username *
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="@your_username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className={`pl-10 labubu-button ${errors.username ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username}</p>
        )}
      </div>

      {/* Display Name */}
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-sm font-medium">
          Display Name *
        </Label>
        <div className="relative">
          <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="displayName"
            type="text"
            placeholder="Your display name"
            value={formData.displayName}
            onChange={(e) => handleInputChange("displayName", e.target.value)}
            className={`pl-10 labubu-button ${errors.displayName ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.displayName && (
          <p className="text-xs text-destructive">{errors.displayName}</p>
        )}
      </div>

      {/* Email (read-only) */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            className="pl-10 labubu-button bg-muted"
            disabled
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Email cannot be changed here
        </p>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-labubu-heading mb-2">
          About You
        </h2>
        <p className="text-muted-foreground">
          Tell the community about yourself
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium">
          Bio
        </Label>
        <textarea
          id="bio"
          placeholder="Tell us about your Labubu journey..."
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          className="w-full min-h-[100px] px-3 py-2 rounded-labubu border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.bio.length}/500 characters
        </p>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-medium">
          Location <span className="text-muted-foreground">(optional)</span>
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            type="text"
            placeholder="City, Country"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="pl-10 labubu-button"
          />
        </div>
      </div>

      {/* Favorite Toy Line */}
      <div className="space-y-2">
        <Label htmlFor="favoriteToyLine" className="text-sm font-medium">
          Favorite Toy Line / Tagline <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="favoriteToyLine"
          type="text"
          placeholder="e.g., 'Labubu enthusiast since day one!' or 'Pop Mart collector'"
          value={formData.favoriteToyLine}
          onChange={(e) => handleInputChange("favoriteToyLine", e.target.value)}
          className="labubu-button"
          maxLength={100}
        />
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">
          Social Links <span className="text-muted-foreground">(optional)</span>
        </Label>
        
        <div className="space-y-3">
          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Instagram username"
              value={formData.socialLinks.instagram}
              onChange={(e) => handleInputChange("socialLinks.instagram", e.target.value)}
              className="pl-10 labubu-button"
            />
          </div>
          
          <div className="relative">
            <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Twitter/X username"
              value={formData.socialLinks.twitter}
              onChange={(e) => handleInputChange("socialLinks.twitter", e.target.value)}
              className="pl-10 labubu-button"
            />
          </div>
          
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="url"
              placeholder="Website URL"
              value={formData.socialLinks.website}
              onChange={(e) => handleInputChange("socialLinks.website", e.target.value)}
              className="pl-10 labubu-button"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-labubu-heading mb-2">
          Preferences
        </h2>
        <p className="text-muted-foreground">
          Customize your experience
        </p>
      </div>

      {/* Gallery Visibility */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Gallery Visibility</Label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleInputChange("isPublic", true)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-labubu border transition-all ${
              formData.isPublic 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border hover:bg-muted/50'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Public</span>
          </button>
          <button
            type="button"
            onClick={() => handleInputChange("isPublic", false)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-labubu border transition-all ${
              !formData.isPublic 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border hover:bg-muted/50'
            }`}
          >
            <EyeOff className="w-4 h-4" />
            <span className="text-sm font-medium">Private</span>
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          {formData.isPublic 
            ? "Your gallery will be visible to everyone and searchable" 
            : "Only you can see your gallery"}
        </p>
      </div>

      {/* Theme Preference */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Theme Preference</Label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleInputChange("themePreference", "light")}
            className={`flex items-center space-x-2 px-4 py-3 rounded-labubu border transition-all ${
              formData.themePreference === "light" 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border hover:bg-muted/50'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span className="text-sm font-medium">Light</span>
          </button>
          <button
            type="button"
            onClick={() => handleInputChange("themePreference", "dark")}
            className={`flex items-center space-x-2 px-4 py-3 rounded-labubu border transition-all ${
              formData.themePreference === "dark" 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border hover:bg-muted/50'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span className="text-sm font-medium">Dark</span>
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-muted/50 p-4 rounded-labubu space-y-2">
        <h3 className="font-medium text-sm">Profile Summary:</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>@{formData.username}</strong> • {formData.displayName}</p>
          {formData.bio && <p>"{formData.bio}"</p>}
          {formData.location && <p>📍 {formData.location}</p>}
          <p>🌐 {formData.isPublic ? "Public gallery" : "Private gallery"}</p>
        </div>
      </div>
    </div>
  )

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
        <div className="max-w-lg mx-auto">
          {/* Skip Link */}
          <div className="text-right mb-6">
            <Button
              variant="ghost"
              size="sm"
                              onClick={() => navigate('/home')}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </Button>
          </div>

          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-xl sm:text-2xl shadow-labubu">
                🧸
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Labubu Showroom
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-labubu-heading mb-2">
              Complete Your Profile
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Let's set up your collection showcase
            </p>
          </div>

          {/* Progress Indicator */}
          {renderStepIndicator()}

          {/* Setup Form */}
          <Card className="labubu-card mobile-card">
            <CardContent className="p-6 sm:p-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="labubu-button"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className="labubu-button labubu-gradient"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full labubu-button mobile-button labubu-gradient hover:opacity-90 text-base"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <LabubuLoading size="small" text="Creating Profile..." textColor="hsl(var(--primary-foreground))" />
                      </div>
                    ) : (
                      "Complete Profile"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 