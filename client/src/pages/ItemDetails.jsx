import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Eye, 
  Share2, 
  Bookmark,
  Download,
  MoreHorizontal,
  ArrowLeft,
  ExternalLink
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data - this would typically come from an API
const sampleGalleryItems = [
  {
    id: 1,
    img: "https://picsum.photos/400/600?random=1",
    title: "Cosmic Labubu Adventure",
    creator: "@space_collector",
    likes: 234,
    views: 1.2,
    series: "Galaxy Series",
    rarity: "Legendary",
    isLiked: false,
    description: "A rare cosmic Labubu that was discovered during the great space expedition of 2024. This limited edition piece features holographic details and glow-in-the-dark elements that make it truly special for any collector."
  },
  {
    id: 2,
    img: "https://picsum.photos/400/400?random=2",
    title: "Pink Dreams Labubu",
    creator: "@kawaii_world",
    likes: 456,
    views: 2.1,
    series: "Dreams Collection",
    rarity: "Epic",
    isLiked: true,
    description: "Part of the exclusive Dreams Collection, this pink Labubu represents hope and joy. Hand-painted with special pearl finish that shimmers in different lighting conditions."
  },
  {
    id: 3,
    img: "https://picsum.photos/400/700?random=3",
    title: "Dark Knight Labubu",
    creator: "@dark_arts",
    likes: 189,
    views: 0.8,
    series: "Mystery Line",
    rarity: "Rare",
    isLiked: false,
    description: "Shrouded in mystery, this midnight variant appears only during special events. Features unique texture and mysterious markings that glow under UV light."
  },
  {
    id: 4,
    img: "https://picsum.photos/400/300?random=4",
    title: "Sunshine Labubu",
    creator: "@sunny_days",
    likes: 312,
    views: 1.8,
    series: "Sunshine Collection",
    rarity: "Epic",
    isLiked: false,
    description: "Bright and cheerful, this sunshine variant brings joy to any collection with its vibrant colors."
  },
  {
    id: 5,
    img: "https://picsum.photos/400/550?random=5",
    title: "Ocean Breeze Labubu",
    creator: "@sea_lover",
    likes: 278,
    views: 1.4,
    series: "Ocean Series",
    rarity: "Rare",
    isLiked: true,
    description: "Inspired by the calming ocean waves, this aqua-blue Labubu captures the essence of the sea."
  }
]

export default function ItemDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [relatedItems, setRelatedItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch item details
    const fetchItemDetails = async () => {
      setIsLoading(true)
      // Find the item by ID
      const foundItem = sampleGalleryItems.find(item => item.id === parseInt(id))
      if (foundItem) {
        setItem(foundItem)
        // Get related items (excluding current item)
        const related = sampleGalleryItems.filter(i => i.id !== foundItem.id).slice(0, 8)
        setRelatedItems(related)
      }
      setIsLoading(false)
    }

    fetchItemDetails()
  }, [id])

  const handleLike = () => {
    if (item) {
      setItem(prev => ({
        ...prev,
        isLiked: !prev.isLiked,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
      }))
    }
  }

  const getRarityStyles = (rarity) => {
    switch (rarity) {
      case 'Legendary':
        return {
          badge: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold'
        }
      case 'Epic':
        return {
          badge: 'bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold'
        }
      case 'Rare':
        return {
          badge: 'bg-gradient-to-r from-gray-300 to-gray-500 text-black font-medium'
        }
      default:
        return {
          badge: 'bg-gradient-to-r from-primary to-accent'
        }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-2xl shadow-labubu mb-4 animate-bounce">
            🧸
          </div>
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading item details...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Item not found</h1>
          <Button onClick={() => navigate('/home')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="hover:bg-muted"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Original
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Left Side - Image */}
          <div className="space-y-6">
            <div className="relative rounded-labubu overflow-hidden bg-black">
              <img 
                src={item.img} 
                alt={item.title}
                className="w-full h-auto object-contain max-h-[70vh]"
                style={{ aspectRatio: 'auto' }}
              />
            </div>

            {/* Mobile Actions - Show only on small screens */}
            <div className="grid grid-cols-5 gap-2 lg:hidden">
              <Button 
                className="col-span-3 labubu-gradient h-10"
                onClick={handleLike}
              >
                <Heart className={`w-4 h-4 mr-2 ${item.isLiked ? 'fill-white' : ''}`} />
                {item.isLiked ? 'Liked' : 'Like'}
              </Button>
              <Button variant="outline" className="h-10">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="h-10">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Right Side - Details */}
          <div className="space-y-6">
            {/* Creator Info */}
            <div className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-lg flex-shrink-0">
                🧸
              </div>
              <div className="flex-1">
                <Link 
                  to={`/gallery/${item.creator.replace('@', '')}`}
                  className="font-semibold text-base hover:text-primary transition-colors"
                >
                  {item.creator}
                </Link>
                <p className="text-xs text-muted-foreground">Creator</p>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>

            {/* Title and Rarity */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">{item.title}</h1>
              <Badge className={`text-sm px-3 py-1 ${getRarityStyles(item.rarity).badge}`}>
                {item.rarity}
              </Badge>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-lg">
              {item.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 p-3 bg-muted rounded-labubu">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span className="font-medium text-sm">{item.likes} likes</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="font-medium text-sm">{item.views}k views</span>
              </div>
            </div>

            {/* Desktop Actions - Show only on large screens */}
            <div className="hidden lg:grid grid-cols-5 gap-2">
              <Button 
                className="col-span-3 labubu-gradient"
                onClick={handleLike}
              >
                <Heart className={`w-4 h-4 mr-2 ${item.isLiked ? 'fill-white' : ''}`} />
                {item.isLiked ? 'Liked' : 'Like'}
              </Button>
              <Button variant="outline">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Series Info */}
            <div className="space-y-4 pt-4 border-t">
              <div>
                <p className="font-medium mb-1">Series</p>
                <p className="text-muted-foreground">{item.series}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Rarity</p>
                <p className="text-muted-foreground">{item.rarity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">More like this</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedItems.map((relatedItem) => (
                <Card 
                  key={relatedItem.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => navigate(`/item/${relatedItem.id}`)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={relatedItem.img} 
                      alt={relatedItem.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-2">
                    <h4 className="font-medium text-xs line-clamp-1 mb-1">{relatedItem.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{relatedItem.creator}</p>
                    <Badge className={`text-xs ${getRarityStyles(relatedItem.rarity).badge}`}>
                      {relatedItem.rarity}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 