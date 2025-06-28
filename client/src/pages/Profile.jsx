import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LabubuLoading from "@/components/LabubuLoading"
import { 
  Edit, 
  Settings as SettingsIcon, 
  Share2, 
  Heart, 
  Eye, 
  Trophy,
  Calendar,
  MapPin,
  ExternalLink,
  Plus,
  Grid3X3,
  BarChart3
} from "lucide-react"

const mockUserData = {
  id: 1,
  username: "labubu_collector",
  displayName: "Sarah Chen",
  bio: "Passionate collector of Labubu and Pop Mart designer toys. Love discovering rare finds and sharing the joy of collecting! 🧸✨",
  location: "Singapore",
  joinDate: "2024-01-15",
  website: "https://labubu-world.com",
  isProUser: true,
  stats: {
    totalItems: 47,
    totalLikes: 2834,
    totalViews: 18592,
    followers: 1247,
    following: 389,
    rareLegendary: 3,
    rareEpic: 12,
    rareRare: 18,
    rareCommon: 14
  },
  recentItems: [
    {
      id: 1,
      img: "https://picsum.photos/300/300?random=1",
      title: "Cosmic Labubu",
      likes: 234,
      views: 1200
    },
    {
      id: 2,
      img: "https://picsum.photos/300/300?random=2", 
      title: "Pink Dreams",
      likes: 456,
      views: 2100
    },
    {
      id: 3,
      img: "https://picsum.photos/300/300?random=3",
      title: "Dark Knight",
      likes: 189,
      views: 800
    },
    {
      id: 4,
      img: "https://picsum.photos/300/300?random=4",
      title: "Sunshine Vibes",
      likes: 312,
      views: 1800
    }
  ]
}

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [userData] = useState(mockUserData)

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LabubuLoading size="large" text="Loading profile..." textColor="hsl(var(--muted-foreground))" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary/20 to-accent/20 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 rounded-labubu shadow-labubu">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-white">
                  {userData.displayName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl lg:text-3xl font-bold">{userData.displayName}</h1>
                  {userData.isProUser && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Trophy className="w-3 h-3 mr-1" />
                      PRO
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">@{userData.username}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {userData.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {userData.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {formatDate(userData.joinDate)}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 lg:ml-auto w-full lg:w-auto">
              <Button variant="outline" onClick={() => navigate('/settings')}>
                <SettingsIcon className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={() => navigate('/profile-setup')}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Bio and Website */}
          {userData.bio && (
            <div className="mt-4 sm:mt-6 max-w-2xl">
              <p className="text-foreground leading-relaxed text-sm sm:text-base">{userData.bio}</p>
              {userData.website && (
                <a 
                  href={userData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline mt-2 sm:mt-3 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  {userData.website.replace('https://', '')}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card className="text-center labubu-card">
            <CardContent className="p-3 sm:p-4">
              <div className="text-2xl font-bold text-primary">{userData.stats.totalItems}</div>
              <div className="text-xs text-muted-foreground">Items</div>
            </CardContent>
          </Card>
          <Card className="text-center labubu-card">
            <CardContent className="p-3 sm:p-4">
              <div className="text-2xl font-bold text-primary">{formatNumber(userData.stats.totalLikes)}</div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </CardContent>
          </Card>
          <Card className="text-center labubu-card">
            <CardContent className="p-3 sm:p-4">
              <div className="text-2xl font-bold text-primary">{formatNumber(userData.stats.totalViews)}</div>
              <div className="text-xs text-muted-foreground">Views</div>
            </CardContent>
          </Card>
          <Card className="text-center labubu-card">
            <CardContent className="p-3 sm:p-4">
              <div className="text-2xl font-bold text-primary">{formatNumber(userData.stats.followers)}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </CardContent>
          </Card>
          <Card className="text-center labubu-card">
            <CardContent className="p-3 sm:p-4">
              <div className="text-2xl font-bold text-primary">{userData.stats.following}</div>
              <div className="text-xs text-muted-foreground">Following</div>
            </CardContent>
          </Card>
          <Card className="text-center labubu-card">
            <CardContent className="p-3 sm:p-4">
              <div className="text-2xl font-bold text-yellow-500">{userData.stats.rareLegendary}</div>
              <div className="text-xs text-muted-foreground">Legendary</div>
            </CardContent>
          </Card>
          <Card className="text-center labubu-card">
            <CardContent className="p-3 sm:p-4">
              <div className="text-2xl font-bold text-purple-500">{userData.stats.rareEpic}</div>
              <div className="text-xs text-muted-foreground">Epic</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
            <Button
              variant={activeTab === "grid" ? "default" : "ghost"}
              onClick={() => setActiveTab("grid")}
              size="default"
              className="flex-1 sm:flex-none"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={activeTab === "analytics" ? "default" : "ghost"}
              onClick={() => setActiveTab("analytics")}
              size="default"
              className="flex-1 sm:flex-none"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
          
          <Button onClick={() => navigate('/upload')} className="labubu-gradient w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {userData.recentItems.map((item) => (
              <Card 
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm line-clamp-1 mb-2">{item.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {item.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatNumber(item.views)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="labubu-card">
              <CardHeader>
                <CardTitle>Collection Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Legendary</span>
                    </div>
                    <span className="font-medium">{userData.stats.rareLegendary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Epic</span>
                    </div>
                    <span className="font-medium">{userData.stats.rareEpic}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Rare</span>
                    </div>
                    <span className="font-medium">{userData.stats.rareRare}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm">Common</span>
                    </div>
                    <span className="font-medium">{userData.stats.rareCommon}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="labubu-card">
              <CardHeader>
                <CardTitle>Engagement Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Likes per Item</span>
                    <span className="font-medium">{Math.round(userData.stats.totalLikes / userData.stats.totalItems)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Views per Item</span>
                    <span className="font-medium">{Math.round(userData.stats.totalViews / userData.stats.totalItems)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Engagement Rate</span>
                    <span className="font-medium">{((userData.stats.totalLikes / userData.stats.totalViews) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}