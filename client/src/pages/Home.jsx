import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Heart, 
  Eye, 
  Share2, 
  Bookmark,
  Grid3X3,
  TrendingUp
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/authStore"
import { ThemeToggle } from "@/components/ThemeToggle"

// Better dummy images for masonry layout with rarity system
const sampleGalleryItems = [
  {
    id: 1,
    img: "https://picsum.photos/400/600?random=1",
    height: 320,
    title: "Cosmic Labubu Adventure",
    creator: "@space_collector",
    likes: 234,
    views: 1.2,
    series: "Galaxy Series",
    rarity: "Legendary",
    isLiked: false,
    description: "A rare cosmic Labubu that was discovered during the great space expedition of 2024. This limited edition piece features holographic details and glow-in-the-dark elements."
  },
  {
    id: 2,
    img: "https://picsum.photos/400/400?random=2",
    height: 250,
    title: "Pink Dreams Labubu",
    creator: "@kawaii_world",
    likes: 456,
    views: 2.1,
    series: "Dreams Collection",
    rarity: "Epic",
    isLiked: true,
    description: "Part of the exclusive Dreams Collection, this pink Labubu represents hope and joy. Hand-painted with special pearl finish."
  },
  {
    id: 3,
    img: "https://picsum.photos/400/700?random=3",
    height: 400,
    title: "Midnight Mystery Labubu",
    creator: "@dark_arts",
    likes: 189,
    views: 0.8,
    series: "Mystery Line",
    rarity: "Rare",
    isLiked: false,
    description: "Shrouded in mystery, this midnight variant appears only during special events. Features unique texture and mysterious markings."
  },
  {
    id: 4,
    img: "https://picsum.photos/400/300?random=4",
    height: 200,
    title: "Rainbow Bridge Labubu",
    creator: "@colorful_dreams",
    likes: 678,
    views: 3.4,
    series: "Pride Collection",
    rarity: "Regular",
    isLiked: true,
    description: "Celebrating diversity and love, this rainbow edition brings joy to every collection."
  },
  {
    id: 5,
    img: "https://picsum.photos/400/550?random=5",
    height: 350,
    title: "Golden Sunset Labubu",
    creator: "@sunset_vibes",
    likes: 345,
    views: 1.7,
    series: "Sunset Series",
    rarity: "Legendary",
    isLiked: false,
    description: "Crafted during the golden hour, this legendary piece captures the essence of a perfect sunset with real gold accents."
  },
  {
    id: 6,
    img: "https://picsum.photos/400/320?random=6",
    height: 220,
    title: "Ocean Blue Labubu",
    creator: "@ocean_depths",
    likes: 567,
    views: 2.8,
    series: "Water Collection",
    rarity: "Regular",
    isLiked: true,
    description: "Inspired by the deep ocean, this calming blue variant brings tranquility to any space."
  },
  {
    id: 7,
    img: "https://picsum.photos/400/480?random=7",
    height: 300,
    title: "Neon City Labubu",
    creator: "@cyber_punk",
    likes: 234,
    views: 1.1,
    series: "Future Collection",
    rarity: "Epic",
    isLiked: false,
    description: "From the cyberpunk future, this neon-enhanced Labubu glows with electric energy and features LED elements."
  },
  {
    id: 8,
    img: "https://picsum.photos/400/380?random=8",
    height: 280,
    title: "Forest Spirit Labubu",
    creator: "@nature_spirit",
    likes: 445,
    views: 2.2,
    series: "Nature Line",
    rarity: "Rare",
    isLiked: true,
    description: "Connected to ancient forest spirits, this earth-toned Labubu is made from sustainable materials."
  },
  {
    id: 9,
    img: "https://picsum.photos/400/450?random=9",
    height: 260,
    title: "Vintage Rose Labubu",
    creator: "@vintage_vibes",
    likes: 298,
    views: 1.5,
    series: "Retro Collection",
    rarity: "Regular",
    isLiked: false,
    description: "A throwback to classic designs, this vintage rose edition features antique finishing touches."
  },
  {
    id: 10,
    img: "https://picsum.photos/400/650?random=10",
    height: 380,
    title: "Crystal Dreams Labubu",
    creator: "@crystal_magic",
    likes: 512,
    views: 2.9,
    series: "Crystal Series",
    rarity: "Legendary",
    isLiked: true,
    description: "Forged from magical crystals, this transparent Labubu shimmers with otherworldly beauty and contains real crystal fragments."
  },
  {
    id: 11,
    img: "https://picsum.photos/400/280?random=11",
    height: 180,
    title: "Mini Explorer Labubu",
    creator: "@tiny_world",
    likes: 167,
    views: 0.7,
    series: "Mini Series",
    rarity: "Regular",
    isLiked: false,
    description: "Perfect for on-the-go adventures, this pocket-sized Labubu is ready for any journey."
  },
  {
    id: 12,
    img: "https://picsum.photos/400/500?random=12",
    height: 320,
    title: "Royal Purple Labubu",
    creator: "@royal_collection",
    likes: 789,
    views: 4.1,
    series: "Royalty Line",
    rarity: "Epic",
    isLiked: true,
    description: "Fit for royalty, this purple edition features velvet textures and golden crown accessories."
  }
]

export default function Home() {
  const { user, getUserStats, signOut } = useAuthStore()
  const navigate = useNavigate()
  
  const [items, setItems] = useState(sampleGalleryItems)
  const [activeFilter, setActiveFilter] = useState("all")
  const [userStats, setUserStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await getUserStats()
      setUserStats(stats)
    }
    fetchStats()
  }, [getUserStats])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
      navigate('/')
    }
  }

  const handleLike = (itemId) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
        : item
    ))
  }

  const handleCardClick = (item) => {
    navigate(`/item/${item.id}`)
  }

  const getRarityStyles = (rarity) => {
    switch (rarity) {
      case 'Legendary':
        return {
          border: 'border-2 border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.5)]',
          glow: 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400/20 before:to-yellow-600/20 before:animate-pulse before:rounded-labubu',
          badge: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold'
        }
      case 'Epic':
        return {
          border: 'border-2 border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.4)]',
          glow: 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400/15 before:to-purple-600/15 before:animate-pulse before:rounded-labubu',
          badge: 'bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold'
        }
      case 'Rare':
        return {
          border: 'border-2 border-gray-300 shadow-[0_0_10px_rgba(192,192,192,0.3)]',
          glow: 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-300/10 before:to-gray-500/10 before:animate-pulse before:rounded-labubu',
          badge: 'bg-gradient-to-r from-gray-300 to-gray-500 text-black font-medium'
        }
      default:
        return {
          border: '',
          glow: '',
          badge: 'bg-gradient-to-r from-primary to-accent'
        }
    }
  }

  const filteredItems = items.filter(item => {
    if (activeFilter === "all") return true
    if (activeFilter === "liked") return item.isLiked
    if (activeFilter === "trending") return item.likes > 400
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with Navbar Elements */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          {/* Top Row - Logo, Brand, Theme Toggle, User Avatar */}
          <div className="flex items-center justify-between mb-4">
            {/* Logo and Brand */}
            <Link to={user ? "/home" : "/"} className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-base sm:text-lg">
                🧸
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Labubu Showroom
              </span>
            </Link>

            {/* Right Side - Theme Toggle and User Avatar */}
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              
              {/* User Avatar Dropdown */}
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
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-labubu-heading mb-1">
              Welcome back, {user?.display_name || user?.username}! 🧸
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Discover amazing Labubu collections from the community
            </p>
          </div>

          {/* Filters and Upload Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Filter Buttons with Slide Animation */}
              <div className="relative flex p-1 bg-muted rounded-labubu">
                {/* Animated Background Slider */}
                <div 
                  className="absolute top-1 bottom-1 bg-gradient-to-r from-primary to-accent rounded-labubu shadow-labubu transition-all duration-300 ease-out"
                  style={{
                    width: 'calc(33.333% - 4px)',
                    left: `calc(${['all', 'liked', 'trending'].indexOf(activeFilter) * 33.333}% + 2px)`
                  }}
                />
                
                {[
                  { key: "all", label: "All", icon: Grid3X3 },
                  { key: "liked", label: "Liked", icon: Heart },
                  { key: "trending", label: "Trending", icon: TrendingUp }
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    size="sm"
                    variant="ghost"
                    onClick={() => setActiveFilter(filter.key)}
                    className={`relative z-10 flex-1 text-xs rounded-labubu transition-colors duration-300 ${
                      activeFilter === filter.key 
                        ? 'text-white hover:text-white' 
                        : 'hover:bg-transparent hover:text-foreground'
                    }`}
                  >
                    <filter.icon className="w-3 h-3 mr-1" />
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              size="sm"
              className="labubu-button labubu-gradient shadow-labubu hover:shadow-lg transition-all duration-200"
              onClick={() => navigate('/upload')}
            >
              <Plus className="w-4 h-4 mr-1" />
              Upload
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Stats Bar for Mobile */}
        <div className="sm:hidden mb-6">
          <Card className="labubu-card mobile-card">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold">{userStats?.totalItems || 0}</p>
                  <p className="text-xs text-muted-foreground">Items</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{userStats?.totalFollowers || 0}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{(userStats?.totalViews || 0).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} collection{filteredItems.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Pinterest-Style Masonry Grid */}
        <div className="pb-24 sm:pb-8">
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredItems.map((item) => {
              const rarityStyles = getRarityStyles(item.rarity)
              return (
                <div 
                  key={item.id} 
                  className="break-inside-avoid mb-4"
                >
                  <Card 
                    className={`group overflow-hidden labubu-card hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm cursor-pointer relative ${rarityStyles.border} ${rarityStyles.glow}`}
                    onClick={() => handleCardClick(item)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ height: `${item.height}px` }}
                      />
                      
                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 rounded-labubu"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLike(item.id)
                            }}
                          >
                            <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 rounded-labubu"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20 rounded-labubu"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Rarity badge */}
                      <Badge className={`absolute top-2 left-2 text-xs rounded-labubu shadow-labubu ${rarityStyles.badge}`}>
                        {item.rarity}
                      </Badge>
                    </div>

                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base text-labubu-heading mb-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                        {item.creator}
                      </p>
                      <div className="text-xs text-muted-foreground mb-2">
                        {item.series}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{item.views}k</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>


    </div>
  )
} 