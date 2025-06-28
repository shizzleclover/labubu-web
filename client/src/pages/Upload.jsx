import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Upload as UploadIcon, 
  Camera, 
  X, 
  ArrowLeft,
  Save,
  Eye
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LabubuLoading from "@/components/LabubuLoading"

const RARITY_OPTIONS = [
  { value: "Common", label: "Common", color: "bg-gray-500" },
  { value: "Rare", label: "Rare", color: "bg-blue-500" },
  { value: "Epic", label: "Epic", color: "bg-purple-500" },
  { value: "Legendary", label: "Legendary", color: "bg-yellow-500" }
]

const SERIES_OPTIONS = [
  "Galaxy Series",
  "Dreams Collection", 
  "Mystery Line",
  "Sunshine Collection",
  "Ocean Series",
  "Nature Line",
  "Retro Collection",
  "Crystal Series",
  "Mini Series",
  "Royalty Line"
]

export default function Upload() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    character: "Labubu",
    series: "",
    rarity: "Common",
    description: "",
    isPublic: true
  })
  const [images, setImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    
    files.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, images: "Each image must be under 10MB" }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file,
          preview: e.target.result,
          name: file.name
        }
        setImages(prev => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.series.trim()) newErrors.series = "Series is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (images.length === 0) newErrors.images = "At least one image is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsUploading(true)
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Navigate to home after successful upload
      navigate('/home')
    } catch (error) {
      console.error('Upload failed:', error)
      setErrors({ submit: "Failed to upload. Please try again." })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    handleImageUpload({ target: { files } })
  }

  const getRarityColor = (rarity) => {
    const option = RARITY_OPTIONS.find(opt => opt.value === rarity)
    return option ? option.color : "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4">
          {/* Mobile Header Layout */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-between mb-3">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="hover:bg-muted p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-center flex-1">
                <h1 className="text-lg font-bold">Upload New Item</h1>
                <p className="text-xs text-muted-foreground">Add a new Labubu to your collection</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/home')}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              form="upload-form" 
              type="submit" 
              disabled={isUploading}
              className="labubu-gradient w-full"
              size="lg"
            >
              {isUploading ? (
                <LabubuLoading size="small" text="Uploading..." textColor="hsl(var(--primary-foreground))" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Item
                </>
              )}
            </Button>
          </div>

          {/* Desktop Header Layout */}
          <div className="hidden sm:flex items-center justify-between">
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
                <h1 className="text-xl font-bold">Upload New Item</h1>
                <p className="text-sm text-muted-foreground">Add a new Labubu to your collection</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/home')}>
                <Eye className="w-4 h-4 mr-2" />
                View Gallery
              </Button>
              <Button 
                form="upload-form" 
                type="submit" 
                disabled={isUploading}
                className="labubu-gradient"
              >
                {isUploading ? (
                  <LabubuLoading size="small" text="Uploading..." textColor="hsl(var(--primary-foreground))" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Item
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} id="upload-form" className="space-y-8">
            {/* Image Upload Section */}
            <Card className="labubu-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Item Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-labubu text-muted-foreground cursor-pointer hover:border-primary transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <UploadIcon className="w-8 h-8 mb-3" />
                  <p className="text-sm font-medium mb-1">Drag & drop images here, or click to browse</p>
                  <p className="text-xs">Max 10MB per image, up to 5 images</p>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                {errors.images && (
                  <p className="text-xs text-destructive text-center">{errors.images}</p>
                )}
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map(image => (
                    <div key={image.id} className="relative group rounded-labubu overflow-hidden shadow-sm aspect-w-1 aspect-h-1 w-full">
                      <img src={image.preview} alt={image.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm rounded-full p-1 text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Item Details Section */}
            <Card className="labubu-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Item Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Space Traveler Labubu"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`${errors.name ? 'border-destructive' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="character">Character</Label>
                    <Input
                      id="character"
                      value={formData.character}
                      onChange={(e) => handleInputChange("character", e.target.value)}
                      disabled // Labubu is fixed for now
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="series">Series *</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {formData.series || "Select a series"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                        {SERIES_OPTIONS.map(series => (
                          <DropdownMenuItem 
                            key={series} 
                            onSelect={() => handleInputChange("series", series)}
                          >
                            {series}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {errors.series && (
                      <p className="text-xs text-destructive">{errors.series}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rarity">Rarity</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between flex items-center">
                          <Badge className={`${getRarityColor(formData.rarity)} mr-2`}>{formData.rarity}</Badge>
                          {formData.rarity}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                        {RARITY_OPTIONS.map(option => (
                          <DropdownMenuItem 
                            key={option.value} 
                            onSelect={() => handleInputChange("rarity", option.value)}
                            className="flex items-center"
                          >
                            <Badge className={`${option.color} mr-2`}>{option.label}</Badge>
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    placeholder="Tell us more about your Labubu, its story, special features..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={5}
                    className={`flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.description ? 'border-destructive' : ''}`}
                  />
                  {errors.description && (
                    <p className="text-xs text-destructive">{errors.description}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="public-mode"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                  />
                  <Label htmlFor="public-mode">Make this item public</Label>
                </div>
              </CardContent>
            </Card>

            {errors.submit && (
              <div className="text-sm text-destructive text-center p-3 bg-destructive/10 rounded-labubu border border-destructive/20">
                {errors.submit}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
} 