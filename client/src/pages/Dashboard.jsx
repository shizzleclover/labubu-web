import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Camera, 
  BarChart3, 
  Palette, 
  CreditCard, 
  Share2,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Calendar,
  MoreHorizontal
} from "lucide-react"
import { useAuthStore } from "@/store/authStore"

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)

  const userStats = {
    totalItems: 24,
    totalViews: 12543,
    followers: 1234,
    subscriptionStatus: "pro",
    itemsThisWeek: 2,
    viewsGrowth: 12,
    followersThisWeek: 23
  }

  const recentItems = [
    { 
      id: 1, 
      name: "Labubu Space Series", 
      views: 234, 
      likes: 45,
      image: "🚀",
      uploadedAt: "2 days ago"
    },
    { 
      id: 2, 
      name: "Labubu Halloween", 
      views: 189, 
      likes: 32,
      image: "🎃",
      uploadedAt: "5 days ago"
    },
    { 
      id: 3, 
      name: "Labubu Baby Pink", 
      views: 156, 
      likes: 28,
      image: "💖",
      uploadedAt: "1 week ago"
    }
  ]

  const quickActions = [
    { icon: Camera, label: "Upload New Item", color: "from-blue-500 to-cyan-500" },
    { icon: BarChart3, label: "View Analytics", color: "from-green-500 to-emerald-500" },
    { icon: Palette, label: "Customize Gallery", color: "from-purple-500 to-violet-500" },
    { icon: CreditCard, label: "Manage Subscription", color: "from-orange-500 to-amber-500" },
    { icon: Share2, label: "Share Gallery", color: "from-pink-500 to-rose-500" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-First Container */}
      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-7xl">
        
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-labubu-heading mb-2">
                Welcome back, {user?.displayName || user?.username}! 🧸
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Here's what's happening with your collection
              </p>
            </div>
            
            {/* Action Buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button 
                size="sm" 
                className="labubu-button labubu-gradient shadow-labubu hover:shadow-lg transition-all duration-200 order-2 sm:order-1"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="labubu-button shadow-labubu hover:shadow-lg transition-all duration-200 order-1 sm:order-2"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {/* Total Items */}
          <Card className="labubu-card mobile-card">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-labubu flex items-center justify-center">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <MoreHorizontal className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{userStats.totalItems}</p>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{userStats.itemsThisWeek} this week
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Total Views */}
          <Card className="labubu-card mobile-card">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-labubu flex items-center justify-center">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <MoreHorizontal className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{userStats.totalViews.toLocaleString()}</p>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{userStats.viewsGrowth}% this month
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Followers */}
          <Card className="labubu-card mobile-card">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-labubu flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <MoreHorizontal className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Followers</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{userStats.followers}</p>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{userStats.followersThisWeek} this week
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="labubu-card mobile-card">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-labubu flex items-center justify-center">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <MoreHorizontal className="w-4 h-4 text-muted-foreground hidden sm:block" />
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Subscription</p>
                <Badge className="bg-gradient-to-r from-primary to-accent text-xs sm:text-sm rounded-labubu shadow-labubu">
                  PRO
                </Badge>
                <p className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Renews Dec 15
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Recent Items */}
          <Card className="labubu-card">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl">Recent Items</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {recentItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-labubu border border-border hover:bg-muted/50 transition-all duration-200">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-lg sm:text-xl shadow-labubu">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base truncate">{item.name}</h4>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {item.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {item.likes}
                      </span>
                      <span className="hidden sm:block">{item.uploadedAt}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="labubu-button shrink-0">
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:ml-2 sm:inline">Edit</span>
                  </Button>
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full labubu-button mt-4 text-primary hover:text-primary/80"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="labubu-card">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="w-full justify-start h-auto p-3 sm:p-4 labubu-button hover:shadow-labubu transition-all duration-200"
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${action.color} rounded-labubu flex items-center justify-center mr-3 sm:mr-4 shadow-labubu`}>
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-sm sm:text-base font-medium">{action.label}</span>
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Mobile-specific bottom spacing for dock */}
        <div className="h-20 sm:h-0" />
      </div>
    </div>
  )
} 