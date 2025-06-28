import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Upload, Palette, Heart, Share2, Users, Star, ChevronDown, ChevronUp, Instagram, Twitter, Mail } from "lucide-react"
import { DotGrid, Masonry } from "@/components"
import { LANDING_CONTENT } from "@/lib/content"

const PricingToggle = ({ isYearly, onToggle }) => (
  <div className="flex flex-col items-center justify-center gap-4 mb-8 sm:mb-12">
    <div className="flex items-center gap-3">
      <span className={`text-sm sm:text-base font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
        {LANDING_CONTENT.pricing.toggleLabels.monthly}
      </span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-12 sm:h-7 sm:w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isYearly ? 'bg-primary shadow-labubu' : 'bg-muted border border-border'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-background transition-transform shadow-sm border ${
            isYearly ? 'translate-x-7 sm:translate-x-8 border-primary/20' : 'translate-x-1 border-border'
          }`}
        />
      </button>
      <span className={`text-sm sm:text-base font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
        {LANDING_CONTENT.pricing.toggleLabels.yearly}
      </span>
    </div>
    {isYearly && (
      <Badge className="bg-gradient-to-r from-primary to-accent text-xs rounded-labubu shadow-labubu animate-fade-in">
        {LANDING_CONTENT.pricing.toggleLabels.saveBadge}
      </Badge>
    )}
  </div>
);

const FeatureItem = ({ included, children }) => (
  <li className="flex items-start gap-2 sm:gap-3 text-sm">
    {included ? (
      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
    ) : (
      <X className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
    )}
    <span className={included ? 'text-foreground' : 'text-muted-foreground leading-5'}>
      {children}
    </span>
  </li>
);

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <Card className="labubu-card mobile-card">
    <CardHeader 
      className="cursor-pointer hover:bg-muted/50 transition-colors p-4 sm:p-6"
      onClick={onToggle}
    >
      <CardTitle className="flex items-center justify-between text-sm sm:text-base lg:text-lg leading-6">
        <span className="pr-4">{question}</span>
        {isOpen ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />}
      </CardTitle>
    </CardHeader>
    {isOpen && (
      <CardContent className="pt-0 p-4 sm:p-6">
        <p className="text-muted-foreground text-sm leading-6">{answer}</p>
      </CardContent>
    )}
  </Card>
);

export default function Landing() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  // Import content from constants
  const plans = LANDING_CONTENT.pricing.plans;
  const galleryPreviews = LANDING_CONTENT.galleryPreview.galleries;
  const faqData = LANDING_CONTENT.faq.questions;

  // Create Masonry items for Labubu gallery
  const masonryItems = [
    {
      id: "1",
      img: "https://picsum.photos/id/237/600/800?grayscale",
      url: "https://example.com/labubu1",
      height: 400,
      title: "Classic Labubu",
      subtitle: "@sarah_labubu"
    },
    {
      id: "2", 
      img: "https://picsum.photos/id/1025/600/750?grayscale",
      url: "https://example.com/labubu2",
      height: 350,
      title: "Pink Dreams",
      subtitle: "@collector_mike"
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1015/600/900?grayscale", 
      url: "https://example.com/labubu3",
      height: 500,
      title: "Royal Collection",
      subtitle: "@luna_toys"
    },
    {
      id: "4",
      img: "https://picsum.photos/id/1011/600/700?grayscale",
      url: "https://example.com/labubu4", 
      height: 300,
      title: "Pastel Vibes",
      subtitle: "@kawaii_collector"
    },
    {
      id: "5",
      img: "https://picsum.photos/id/1020/600/850?grayscale",
      url: "https://example.com/labubu5",
      height: 450,
      title: "Vintage Series",
      subtitle: "@retro_labubu"
    },
    {
      id: "6",
      img: "https://picsum.photos/id/1018/600/650?grayscale",
      url: "https://example.com/labubu6",
      height: 280,
      title: "Minimalist",
      subtitle: "@clean_collections"
    },
    {
      id: "7",
      img: "https://picsum.photos/id/1016/600/750?grayscale",
      url: "https://example.com/labubu7",
      height: 380,
      title: "Cosmic Edition",
      subtitle: "@space_labubu"
    },
    {
      id: "8",
      img: "https://picsum.photos/id/1019/600/800?grayscale",
      url: "https://example.com/labubu8", 
      height: 420,
      title: "Garden Party",
      subtitle: "@floral_friend"
    },
    {
      id: "9",
      img: "https://picsum.photos/id/1021/600/700?grayscale",
      url: "https://example.com/labubu9",
      height: 320,
      title: "Urban Street",
      subtitle: "@city_collector"
    },
    {
      id: "10",
      img: "https://picsum.photos/id/1024/600/900?grayscale",
      url: "https://example.com/labubu10",
      height: 480,
      title: "Ocean Dreams",
      subtitle: "@blue_labubu"
    },
    {
      id: "11",
      img: "https://picsum.photos/id/1026/600/750?grayscale",
      url: "https://example.com/labubu11", 
      height: 360,
      title: "Sunset Collection",
      subtitle: "@golden_hour"
    },
    {
      id: "12",
      img: "https://picsum.photos/id/1027/600/650?grayscale",
      url: "https://example.com/labubu12",
      height: 290,
      title: "Monochrome",
      subtitle: "@minimal_vibes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-28 px-4 relative overflow-hidden min-h-[75vh] sm:min-h-[80vh]">
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
        
        <div className="container mx-auto text-center relative z-10 max-w-5xl px-4">
          <div className="mb-4 sm:mb-6">
            <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl animate-bounce">{LANDING_CONTENT.hero.emoji}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6 text-labubu-heading leading-tight">
            {LANDING_CONTENT.hero.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl lg:max-w-2xl mx-auto mb-8 sm:mb-10 text-labubu-body leading-relaxed px-4">
            {LANDING_CONTENT.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button asChild className="labubu-button labubu-gradient shadow-labubu hover:shadow-lg transition-all duration-200 text-base py-3 px-6 h-auto sm:px-8">
              <a href="/register">{LANDING_CONTENT.hero.primaryButton}</a>
            </Button>
            <Button asChild variant="outline" className="labubu-button rounded-labubu shadow-sm hover:shadow-md transition-all duration-200 text-base py-3 px-6 h-auto sm:px-8">
              <a href="/explore">{LANDING_CONTENT.hero.secondaryButton}</a>
            </Button>
          </div>
        </div>
        
        {/* Floating emoji decorations */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-16 sm:top-20 left-6 sm:left-10 text-2xl sm:text-3xl lg:text-4xl animate-float">🧸</div>
          <div className="absolute top-32 sm:top-40 right-6 sm:right-20 text-xl sm:text-2xl lg:text-3xl animate-float-delayed">✨</div>
          <div className="absolute bottom-24 sm:bottom-32 left-6 sm:left-20 text-xl sm:text-2xl lg:text-3xl animate-float">🎀</div>
          <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-10 text-2xl sm:text-3xl lg:text-4xl animate-float-delayed">🌸</div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/30 relative overflow-hidden">
        {/* Interactive Dot Grid Background */}
        <div className="absolute inset-0 w-full h-full opacity-15">
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
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-labubu-heading px-2">
            {LANDING_CONTENT.howItWorks.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {LANDING_CONTENT.howItWorks.steps.map((step, index) => {
              // Dynamic icon component mapping
              const IconComponent = { Upload, Palette, Heart, Share2 }[step.icon];
              
              return (
                <div key={index} className="text-center group px-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-accent rounded-labubu mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform shadow-labubu">
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-labubu-heading">{step.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Preview with GridMotion */}
      <section className="relative overflow-hidden">
        <div className="py-8 sm:py-12 lg:py-16 px-4">
          <div className="container mx-auto relative z-10 mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 sm:mb-4 lg:mb-6 text-labubu-heading px-2">
              {LANDING_CONTENT.galleryPreview.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground text-center max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto mb-4 sm:mb-6 lg:mb-8 px-4">
              Discover amazing collections from our community of passionate Labubu collectors
            </p>
          </div>
        </div>
        
        {/* Masonry Gallery Showcase - Mobile Feed Style */}
        <div className="h-[50vh] sm:h-[60vh] lg:h-[70vh] xl:h-screen w-screen relative left-1/2 transform -translate-x-1/2 px-2 sm:px-4">
          <Masonry 
            items={masonryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.03}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={1.02}
            blurToFocus={false}
            colorShiftOnHover={false}
            enableScrollAnimation={true}
          />
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/30 relative overflow-hidden">
        {/* Interactive Dot Grid Background */}
        <div className="absolute inset-0 w-full h-full opacity-15">
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
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="mb-4 sm:mb-6">
              <span className="text-3xl sm:text-4xl lg:text-5xl">{LANDING_CONTENT.pricing.emoji}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-labubu-heading px-2">
              {LANDING_CONTENT.pricing.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-4 text-labubu-body leading-relaxed">
              {LANDING_CONTENT.pricing.subtitle}
            </p>
            
            <PricingToggle 
              isYearly={isYearly} 
              onToggle={() => setIsYearly(!isYearly)} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`labubu-card mobile-card hover-lift relative overflow-hidden transition-all duration-300 ${
                  plan.popular ? 'border-primary shadow-xl md:scale-105 bg-gradient-to-br from-background to-muted/30' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground text-center py-2 text-xs sm:text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`pb-3 sm:pb-4 text-center ${plan.popular ? 'pt-10 sm:pt-12' : 'pt-4 sm:pt-6'}`}>
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{plan.emoji}</div>
                  <CardTitle className="text-xl sm:text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">{plan.description}</p>
                  
                  <div className="mb-4 sm:mb-6">
                    <div className="text-3xl sm:text-4xl font-bold labubu-gradient-text mb-1 sm:mb-2">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </div>
                    {plan.monthlyPrice > 0 && (
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {isYearly ? 'per year' : 'per month'}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 sm:p-6">
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <FeatureItem key={featureIndex} included={true}>
                        {feature}
                      </FeatureItem>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full labubu-button mobile-button py-2.5 sm:py-3 text-sm sm:text-base ${
                      plan.buttonVariant === 'default' 
                        ? 'labubu-gradient hover:opacity-90' 
                        : ''
                    }`}
                    variant={plan.buttonVariant}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden">
        {/* Interactive Dot Grid Background */}
        <div className="absolute inset-0 w-full h-full opacity-15">
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
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-labubu-heading px-2">
            {LANDING_CONTENT.faq.title}
          </h2>
          <div className="max-w-2xl lg:max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 lg:py-16 px-4 bg-muted/50 border-t relative overflow-hidden">
        {/* Interactive Dot Grid Background */}
        <div className="absolute inset-0 w-full h-full opacity-10">
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
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-accent rounded-labubu flex items-center justify-center text-base sm:text-lg">
                  {LANDING_CONTENT.footer.brand.emoji}
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {LANDING_CONTENT.footer.brand.name}
                </span>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
                {LANDING_CONTENT.footer.brand.description}
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">{LANDING_CONTENT.footer.quickLinks.title}</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-sm">
                {LANDING_CONTENT.footer.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">{LANDING_CONTENT.footer.connect.title}</h3>
              <div className="flex space-x-2 sm:space-x-3">
                <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                  <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                  <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 sm:pt-8 text-center">
            <p className="text-muted-foreground text-xs sm:text-sm">
              {LANDING_CONTENT.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 