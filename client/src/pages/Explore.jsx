import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Sparkles } from "lucide-react";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // TODO: Implement search functionality
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-4 sm:mb-6">
            <span className="text-4xl sm:text-5xl lg:text-6xl">🔍</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-labubu-heading">
            Explore Collections
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0 text-labubu-body leading-relaxed">
            Discover amazing Labubu collections from creators around the world.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 sm:py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search collections, creators, or Labubu series..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-base border-2 focus:border-primary rounded-labubu shadow-sm hover:shadow-md transition-all duration-200"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              <Button
                type="button"
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('all')}
                className="labubu-button text-sm h-9"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                All Collections
              </Button>
              <Button
                type="button"
                variant={selectedFilter === 'featured' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('featured')}
                className="labubu-button text-sm h-9"
              >
                Featured
              </Button>
              <Button
                type="button"
                variant={selectedFilter === 'trending' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('trending')}
                className="labubu-button text-sm h-9"
              >
                Trending
              </Button>
              <Button
                type="button"
                variant={selectedFilter === 'recent' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('recent')}
                className="labubu-button text-sm h-9"
              >
                Recent
              </Button>
              <Button
                type="button"
                variant={selectedFilter === 'pro' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('pro')}
                className="labubu-button text-sm h-9"
              >
                Pro Only
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-labubu-heading">Featured Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="labubu-card hover-lift">
                <CardHeader className="pb-3">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-labubu mb-3 flex items-center justify-center">
                    <span className="text-4xl">🧸</span>
                  </div>
                  <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                    Collection #{item}
                    <Badge className="labubu-gradient text-xs">Pro</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm sm:text-base text-labubu-body leading-relaxed mb-4">
                    A beautiful collection of rare Labubu figurines curated by passionate collectors.
                  </p>
                  <Button variant="outline" className="w-full labubu-button">
                    View Collection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 