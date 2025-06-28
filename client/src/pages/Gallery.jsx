import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Gallery() {
  // Mock data for demonstration
  const user = {
    username: "labubu_lover",
    displayName: "Labubu Collector",
    bio: "Designer toy enthusiast with a passion for Labubu and Pop Mart collectibles",
    totalItems: 24,
    isProUser: true
  }

  const galleryItems = [
    {
      id: 1,
      name: "Labubu Graduates Series",
      character: "Labubu",
      series: "Graduates",
      rarity: "Rare",
      image: "https://via.placeholder.com/300x300?text=Labubu+1"
    },
    {
      id: 2,
      name: "Labubu Baby Series Pink",
      character: "Labubu",
      series: "Baby",
      rarity: "Common",
      image: "https://via.placeholder.com/300x300?text=Labubu+2"
    },
    {
      id: 3,
      name: "Labubu Winter Collection",
      character: "Labubu",
      series: "Winter",
      rarity: "Ultra Rare",
      image: "https://via.placeholder.com/300x300?text=Labubu+3"
    },
    {
      id: 4,
      name: "Labubu Space Adventure",
      character: "Labubu",
      series: "Space",
      rarity: "Rare",
      image: "https://via.placeholder.com/300x300?text=Labubu+4"
    },
    {
      id: 5,
      name: "Labubu Halloween Special",
      character: "Labubu",
      series: "Halloween",
      rarity: "Limited",
      image: "https://via.placeholder.com/300x300?text=Labubu+5"
    },
    {
      id: 6,
      name: "Labubu Summer Vibes",
      character: "Labubu",
      series: "Summer",
      rarity: "Common",
      image: "https://via.placeholder.com/300x300?text=Labubu+6"
    }
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Ultra Rare": return "bg-purple-500"
      case "Rare": return "bg-blue-500"
      case "Limited": return "bg-orange-500"
      case "Common": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
              🧸
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{user.displayName}</h1>
                {user.isProUser && <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">PRO</Badge>}
              </div>
              <p className="text-muted-foreground text-base sm:text-lg mb-2">@{user.username}</p>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">{user.bio}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 mt-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold">{user.totalItems}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Items</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold">1.2K</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold">856</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Following</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-center md:justify-end md:self-start mt-4 md:mt-0">
              <Button variant="outline" className="min-w-[100px]">Follow</Button>
              <Button className="min-w-[100px]">Message</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Collection Gallery</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Sort</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-square relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 text-white ${getRarityColor(item.rarity)}`}
                  >
                    {item.rarity}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{item.character}</p>
                  <p className="text-xs text-muted-foreground">{item.series} Series</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline">Load More Items</Button>
          </div>
        </div>
      </section>
    </div>
  )
} 