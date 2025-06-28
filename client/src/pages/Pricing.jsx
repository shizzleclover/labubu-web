import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const PricingToggle = ({ isYearly, onToggle }) => (
  <div className="flex items-center justify-center mb-8 sm:mb-12">
    <span className={`mr-3 text-sm sm:text-base ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
      Monthly
    </span>
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isYearly ? 'bg-primary' : 'bg-muted'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
          isYearly ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
    <span className={`ml-3 text-sm sm:text-base ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
      Yearly
    </span>
    {isYearly && (
      <Badge className="ml-2 labubu-gradient text-xs">Save 20%</Badge>
    )}
  </div>
);

const FeatureItem = ({ included, children }) => (
  <li className="flex items-center gap-3 text-sm sm:text-base">
    {included ? (
      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
    ) : (
      <X className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
    )}
    <span className={included ? 'text-foreground' : 'text-muted-foreground'}>
      {children}
    </span>
  </li>
);

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free',
      emoji: '🆓',
      description: 'Casual collectors & browsers',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { text: 'Up to 5 items', included: true },
        { text: '1 collection/gallery', included: true },
        { text: 'Like & favorite items', included: true },
        { text: 'Basic comments', included: true },
        { text: 'Basic public profile', included: true },
        { text: 'Default theme only', included: true },
        { text: 'Analytics', included: false },
        { text: 'Featured placement', included: false },
        { text: 'Priority support', included: false },
        { text: 'Scheduled uploads', included: false }
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      popular: false
    },
    {
      name: 'Plus',
      emoji: '💎',
      description: 'Active collectors with mid-size galleries',
      monthlyPrice: 25,
      yearlyPrice: 240,
      features: [
        { text: 'Up to 50 items', included: true },
        { text: '3 collections/galleries', included: true },
        { text: 'Like & favorite items', included: true },
        { text: 'Full commenting system', included: true },
        { text: 'Custom profile (name, bio)', included: true },
        { text: 'Basic theme options', included: true },
        { text: 'Analytics', included: false },
        { text: 'Optional featured placement', included: true },
        { text: 'Priority support', included: false },
        { text: 'Scheduled uploads', included: false }
      ],
      buttonText: 'Purchase',
      buttonVariant: 'default',
      popular: true
    },
    {
      name: 'Pro',
      emoji: '🧠',
      description: 'Serious collectors, curators, creators',
      monthlyPrice: 50,
      yearlyPrice: 480,
      features: [
        { text: 'Unlimited items', included: true },
        { text: 'Unlimited collections', included: true },
        { text: 'Like & favorite items', included: true },
        { text: 'Full commenting system', included: true },
        { text: 'Custom + verified profile', included: true },
        { text: 'Premium styles & themes', included: true },
        { text: 'Analytics (views, likes)', included: true },
        { text: 'Featured placement', included: true },
        { text: 'Priority support', included: true },
        { text: 'Scheduled uploads', included: true }
      ],
      buttonText: 'Purchase',
      buttonVariant: 'default',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-4 sm:mb-6">
            <span className="text-4xl sm:text-5xl lg:text-6xl">💳</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-labubu-heading">
            Pricing
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl lg:max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0 text-labubu-body leading-relaxed">
            Check out our affordable pricing plans
          </p>
          
          <PricingToggle 
            isYearly={isYearly} 
            onToggle={() => setIsYearly(!isYearly)} 
          />
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-12 sm:pb-16 lg:pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name} 
                className={`labubu-card hover-lift relative overflow-hidden ${
                  plan.popular ? 'border-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`pb-4 ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-2">{plan.emoji}</div>
                    <CardTitle className="text-xl sm:text-2xl mb-2">
                      {plan.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-3xl sm:text-4xl font-bold labubu-gradient-text mb-1">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </div>
                      {plan.monthlyPrice > 0 && (
                        <>
                          <div className="text-sm text-muted-foreground">
                            {isYearly ? 'per year' : 'per month'}
                          </div>
                          {isYearly && plan.monthlyPrice > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Billed ${plan.yearlyPrice} annually
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <FeatureItem 
                        key={featureIndex} 
                        included={feature.included}
                      >
                        {feature.text}
                      </FeatureItem>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full labubu-button py-3 ${
                      plan.buttonVariant === 'default' 
                        ? 'labubu-gradient hover:opacity-90' 
                        : ''
                    }`}
                    variant={plan.buttonVariant}
                  >
                    {plan.buttonText}
                    {plan.buttonText === 'Purchase' && (
                      <span className="ml-2">→</span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-labubu-heading">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="labubu-card text-left">
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>
            
            <Card className="labubu-card text-left">
              <CardHeader>
                <CardTitle className="text-lg">What happens to my data if I downgrade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Your data is safe! Items beyond your plan limit become private but aren't deleted.
                </p>
              </CardContent>
            </Card>
            
            <Card className="labubu-card text-left">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  We offer a 14-day money-back guarantee for all paid plans, no questions asked.
                </p>
              </CardContent>
            </Card>
            
            <Card className="labubu-card text-left">
              <CardHeader>
                <CardTitle className="text-lg">Is there a student discount?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Yes! Students get 50% off Plus and Pro plans with a valid student email address.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 