import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Trash2, 
  Download,
  LogOut,
  ArrowLeft,
  Save,
  Smartphone,
  Mail,
  Moon,
  Sun,
  Monitor,
  Crown,
  CreditCard,
  Calendar,
  TrendingUp,
  AlertCircle,
  Check,
  X,
  ChevronDown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/authStore"
import { useTheme } from "@/hooks/useTheme"
import LabubuLoading from "@/components/LabubuLoading"

export default function Settings() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const { signOut } = useAuthStore()
  
  const [settings, setSettings] = useState({
    theme: theme,
    username: "collector123",
    email: "user@example.com",
    privacy_level: "public",
    notifications: {
      likes: true,
      comments: true,
      follows: true,
      marketing: false
    }
  })
  
  const [subscriptionData, setSubscriptionData] = useState({
    plan: "free",
    status: "active",
    itemsLimit: 10,
    nextBillingDate: null
  })
  
  const [_isLoading, _setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update theme if changed
      if (settings.theme !== theme) {
        setTheme(settings.theme)
      }
      
      console.log("Settings saved successfully")
    } catch (_error) {
      console.error('Failed to save settings')
    } finally {
      setIsSaving(false)
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion requested")
          try {
      // Simulate account deletion
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Account deleted')
      navigate('/')
    } catch (_error) {
      console.error('Failed to delete account')
    }
    }
  }

  const handleExportData = () => {
    console.log("Data export requested")
  }

  const handleUpgradeToPro = async () => {
    setIsSubscriptionLoading(true)
    try {
      // TODO: Integrate with Polar API for subscription upgrade
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubscriptionData(prev => ({
        ...prev,
        plan: "pro",
        itemsLimit: null,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }))
      
      console.log("Upgraded to Pro successfully")
    } catch (_error) {
      setErrors({ subscription: "Failed to upgrade subscription" })
    } finally {
      setIsSubscriptionLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!window.confirm("Are you sure you want to cancel your Pro subscription? You'll lose access to Pro features at the end of your billing period.")) {
      return
    }

    setIsSubscriptionLoading(true)
    try {
      // TODO: Integrate with Polar API for subscription cancellation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubscriptionData(prev => ({
        ...prev,
        status: "cancelled"
      }))
      
      console.log("Subscription cancelled successfully")
    } catch (_error) {
      setErrors({ subscription: "Failed to cancel subscription" })
    } finally {
      setIsSubscriptionLoading(false)
    }
  }

  const handleManageBilling = () => {
    // TODO: Redirect to Polar customer portal
    console.log("Redirecting to billing portal...")
    window.open("https://polar.sh/billing", "_blank")
  }

  const getThemeIcon = (themeValue) => {
    switch (themeValue) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const _handleChangePassword = async () => {
    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPasswordData({ current: '', new: '', confirm: '' })
      console.log('Password changed successfully')
    } catch (_error) {
      console.error('Failed to change password')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">Settings</h1>
                <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
              </div>
            </div>
            
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="labubu-gradient"
            >
              {isSaving ? (
                <LabubuLoading size="small" text="Saving..." textColor="hsl(var(--primary-foreground))" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Account Settings */}
          <Card className="labubu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={settings.username}
                    onChange={(e) => handleSettingChange("username", e.target.value)}
                    placeholder="Enter username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange("email", e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Management */}
          <Card className="labubu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Subscription Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Plan */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-labubu">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-labubu flex items-center justify-center ${
                    subscriptionData.plan === "pro" 
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600" 
                      : "bg-gradient-to-br from-gray-400 to-gray-600"
                  }`}>
                    {subscriptionData.plan === "pro" ? (
                      <Crown className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {subscriptionData.plan === "pro" ? "Labubu Pro" : "Labubu Free"}
                      {subscriptionData.status === "cancelled" && (
                        <span className="text-xs px-2 py-1 bg-destructive/20 text-destructive rounded-full">
                          Cancelled
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {subscriptionData.plan === "pro" 
                        ? `$${subscriptionData.monthlyPrice}/month` 
                        : "Free forever"}
                    </div>
                  </div>
                </div>
                {subscriptionData.plan === "pro" && subscriptionData.nextBillingDate && (
                  <div className="text-right">
                    <div className="text-sm font-medium">Next billing</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(subscriptionData.nextBillingDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Usage Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Collection Usage</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      {subscriptionData.itemsUsed} / {subscriptionData.itemsLimit || "∞"} items
                    </span>
                  </div>
                </div>
                
                {subscriptionData.itemsLimit && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min((subscriptionData.itemsUsed / subscriptionData.itemsLimit) * 100, 100)}%` 
                      }}
                    />
                  </div>
                )}
                
                {subscriptionData.itemsLimit && subscriptionData.itemsUsed >= subscriptionData.itemsLimit && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-labubu">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive">
                      You've reached your item limit. Upgrade to Pro for unlimited items.
                    </span>
                  </div>
                )}
              </div>

              {/* Plan Features Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current Plan Features */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                    {subscriptionData.plan === "pro" ? "Your Pro Features" : "Free Plan Features"}
                  </h4>
                  <div className="space-y-2">
                    {subscriptionData.features[subscriptionData.plan].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Plan Features */}
                {subscriptionData.plan === "free" && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                      Pro Features
                    </h4>
                    <div className="space-y-2">
                      {subscriptionData.features.pro.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Crown className="w-4 h-4 text-yellow-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                {subscriptionData.plan === "free" ? (
                  <Button 
                    className="labubu-gradient w-full"
                    onClick={handleUpgradeToPro}
                    disabled={isSubscriptionLoading || subscriptionData.plan === 'pro'}
                  >
                    {isSubscriptionLoading ? (
                      <LabubuLoading size="small" text="Upgrading..." textColor="hsl(var(--primary-foreground))" />
                    ) : (
                      <>
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Pro
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleManageBilling}
                      className="flex-1"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Manage Billing
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/pricing')}
                      className="flex-1"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      View Plans
                    </Button>
                    {subscriptionData.status !== "cancelled" && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleCancelSubscription}
                        disabled={isSubscriptionLoading || subscriptionData.status === 'cancelled'}
                      >
                        {isSubscriptionLoading ? (
                          <LabubuLoading size="small" text="Cancelling..." textColor="hsl(var(--muted-foreground))" />
                        ) : (
                          <>
                            <X className="w-4 h-4 mr-2" />
                            Cancel Subscription
                          </>
                        )}
                      </Button>
                    )}
                  </>
                )}
              </div>

              {errors.subscription && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-labubu">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-destructive">{errors.subscription}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="labubu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Public Profile</div>
                  <div className="text-sm text-muted-foreground">
                    Allow others to find and view your profile
                  </div>
                </div>
                <Switch
                  checked={settings.profilePublic}
                  onCheckedChange={(checked) => handleSettingChange("profilePublic", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Show Email</div>
                  <div className="text-sm text-muted-foreground">
                    Display your email address on your profile
                  </div>
                </div>
                <Switch
                  checked={settings.showEmail}
                  onCheckedChange={(checked) => handleSettingChange("showEmail", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Allow Search</div>
                  <div className="text-sm text-muted-foreground">
                    Let others find you through search
                  </div>
                </div>
                <Switch
                  checked={settings.allowSearch}
                  onCheckedChange={(checked) => handleSettingChange("allowSearch", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="labubu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Notifications
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </div>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Push Notifications
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </div>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                />
              </div>
              
              <div className="ml-4 space-y-4 border-l-2 border-muted pl-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Likes on your items</div>
                  <Switch
                    checked={settings.likeNotifications}
                    onCheckedChange={(checked) => handleSettingChange("likeNotifications", checked)}
                    disabled={!settings.pushNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">New followers</div>
                  <Switch
                    checked={settings.followNotifications}
                    onCheckedChange={(checked) => handleSettingChange("followNotifications", checked)}
                    disabled={!settings.pushNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">Comments on your items</div>
                  <Switch
                    checked={settings.commentNotifications}
                    onCheckedChange={(checked) => handleSettingChange("commentNotifications", checked)}
                    disabled={!settings.pushNotifications}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card className="labubu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Theme</div>
                  <div className="text-sm text-muted-foreground">
                    Choose your preferred color scheme
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between pr-2">
                      <span className="flex items-center gap-2">
                        {getThemeIcon(settings.theme)}
                        {settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      <Sun className="w-4 h-4 mr-2" />
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('system')}>
                      <Monitor className="w-4 h-4 mr-2" />
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="labubu-card">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export My Data
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="flex-1"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {errors.submit && (
            <div className="text-sm text-destructive text-center">
              {errors.submit}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}