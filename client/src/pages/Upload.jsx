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
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading...
                </>
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
                Preview
              </Button>
              <Button 
                form="upload-form" 
                type="submit" 
                disabled={isUploading}
                className="labubu-gradient"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
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
      <div className="container mx-auto px-4 py-4 sm:py-8 pb-24 sm:pb-8">
        <form id="upload-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            
            {/* Left Side - Images */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="labubu-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Photos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Upload Area */}
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-labubu p-6 sm:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer active:border-primary active:bg-primary/5"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="space-y-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-2xl mx-auto">
                        <UploadIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">Click to upload or drag & drop</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
                      </div>
                    </div>
                  </div>

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {images.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.preview}
                            alt={image.name}
                            className="w-full aspect-square object-cover rounded-labubu"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 sm:opacity-0 opacity-100 transition-opacity w-8 h-8 p-0 shadow-lg"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.images && (
                    <p className="text-sm text-destructive">{errors.images}</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Details */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="labubu-card">
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g., Cosmic Labubu Adventure"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Character */}
                  <div className="space-y-2">
                    <Label htmlFor="character">Character</Label>
                    <Input
                      id="character"
                      value={formData.character}
                      onChange={(e) => handleInputChange("character", e.target.value)}
                      placeholder="Labubu"
                    />
                  </div>

                  {/* Series */}
                  <div className="space-y-2">
                    <Label htmlFor="series">Series *</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          {formData.series || "Select series..."}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {SERIES_OPTIONS.map((series) => (
                          <DropdownMenuItem
                            key={series}
                            onClick={() => handleInputChange("series", series)}
                          >
                            {series}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {errors.series && (
                      <p className="text-sm text-destructive">{errors.series}</p>
                    )}
                  </div>

                  {/* Rarity */}
                  <div className="space-y-2">
                    <Label>Rarity</Label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {RARITY_OPTIONS.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={formData.rarity === option.value ? "default" : "outline"}
                          onClick={() => handleInputChange("rarity", option.value)}
                          className="justify-start h-10 sm:h-9 text-sm"
                        >
                          <div className={`w-3 h-3 rounded-full ${option.color} mr-2`} />
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Tell the story of this Labubu..."
                      rows={4}
                      className={`w-full rounded-labubu border border-input bg-background px-3 py-3 sm:py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${errors.description ? "border-destructive" : ""}`}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">{errors.description}</p>
                    )}
                  </div>

                  {/* Visibility */}
                  <div className="space-y-2">
                    <Label>Visibility</Label>
                    <div className="flex gap-2 sm:gap-3">
                      <Button
                        type="button"
                        variant={formData.isPublic ? "default" : "outline"}
                        onClick={() => handleInputChange("isPublic", true)}
                        className="flex-1 h-10 sm:h-9 text-sm"
                      >
                        Public
                      </Button>
                      <Button
                        type="button"
                        variant={!formData.isPublic ? "default" : "outline"}
                        onClick={() => handleInputChange("isPublic", false)}
                        className="flex-1 h-10 sm:h-9 text-sm"
                      >
                        Private
                      </Button>
                    </div>
                  </div>

                  {errors.submit && (
                    <p className="text-sm text-destructive">{errors.submit}</p>
                  )}
                </CardContent>
              </Card>

              {/* Preview Card */}
              {formData.name && images.length > 0 && (
                <Card className="labubu-card">
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <img
                        src={images[0].preview}
                        alt={formData.name}
                        className="w-full aspect-square object-cover rounded-labubu"
                      />
                      <Badge className={`absolute top-2 right-2 ${getRarityColor(formData.rarity)} text-white`}>
                        {formData.rarity}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <h3 className="font-semibold">{formData.name}</h3>
                      <p className="text-sm text-muted-foreground">{formData.series}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 