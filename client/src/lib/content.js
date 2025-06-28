export const LANDING_CONTENT = {
  // Hero Section
  hero: {
    emoji: "🧸",
    title: "Flex Your Collection, Your Way",
    subtitle: "Upload, customize, and show off your Labubu lineup with style",
    primaryButton: "Start Your Showroom",
    secondaryButton: "See It In Action"
  },

  // How It Works Section
  howItWorks: {
    title: "How It Works",
    subtitle: "Build your dream gallery in four easy steps",
    steps: [
      {
        emoji: "📸",
        icon: "Upload",
        title: "Snap & Upload",
        description: "Take crisp photos of your Labubus and start uploading to your digital vault."
      },
      {
        emoji: "🎨",
        icon: "Palette",
        title: "Style Your Space",
        description: "Organize your collection, pick themes, and curate your gallery exactly how you want it."
      },
      {
        emoji: "❤️",
        icon: "Heart",
        title: "Engage & Explore",
        description: "Like, comment on, and save your favorite collections from other Labubu lovers."
      },
      {
        emoji: "🚀",
        icon: "Share2",
        title: "Go Public",
        description: "Drop your gallery link anywhere and flex your shelf with the world."
      }
    ]
  },

  // Gallery Preview Section
  galleryPreview: {
    title: "What the Community is Flexing",
    galleries: [
      {
        name: "Sarah's Collection",
        username: "@sarah_labubu",
        itemCount: 47,
        avatar: "🧸",
        items: ["🧸", "🎀", "✨", "🌸"]
      },
      {
        name: "Mike's Vault",
        username: "@collector_mike",
        itemCount: 32,
        avatar: "🎨",
        items: ["🧸", "🎪", "🎭", "🎨"]
      },
      {
        name: "Luna's Gallery",
        username: "@luna_toys",
        itemCount: 68,
        avatar: "🌙",
        items: ["🧸", "🌟", "🦄", "💫"]
      }
    ],
    gridMotionItems: [/* unchanged */]
  },

  // Pricing Section
  pricing: {
    emoji: "💳",
    title: "Pick Your Flex Level",
    subtitle: "Start small, go big — upgrade when you're ready to level up your display",
    toggleLabels: {
      monthly: "Monthly",
      yearly: "Yearly",
      saveBadge: "Save 20%"
    },
    plans: [
      {
        name: 'Free',
        emoji: '🆓',
        description: 'Get started with a single shelf',
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
          'Up to 5 uploads',
          '1 gallery layout',
          'Public profile',
          'Like & comment on others'
        ],
        buttonText: 'Start Free',
        buttonVariant: 'outline',
        popular: false
      },
      {
        name: 'Plus',
        emoji: '💎',
        description: 'For collectors with a growing vault',
        monthlyPrice: 25,
        yearlyPrice: 240,
        features: [
          '50 uploads',
          'Custom themes & layout',
          'Basic analytics',
          'Priority support'
        ],
        buttonText: 'Upgrade to Plus',
        buttonVariant: 'default',
        popular: true
      },
      {
        name: 'Pro',
        emoji: '🧠',
        description: 'Go full curator mode',
        monthlyPrice: 50,
        yearlyPrice: 480,
        features: [
          'Unlimited uploads',
          'Premium tools & themes',
          'Advanced analytics',
          'Featured placement'
        ],
        buttonText: 'Go Pro',
        buttonVariant: 'default',
        popular: false
      }
    ]
  },

  // FAQ Section
  faq: {
    title: "Got Questions?",
    questions: [
      {
        question: "Is this really free?",
        answer: "Yup! You can use the free plan to start flexing with up to 5 items. No credit card needed."
      },
      {
        question: "Do I need to own a real Labubu?",
        answer: "Not at all — many users share wishlists, customs, or dream setups. It’s about the vibe, not just the shelf."
      },
      {
        question: "What changes when I upgrade?",
        answer: "You’ll unlock more uploads, custom styling, analytics, and access to premium features — all while keeping your current gallery intact."
      },
      {
        question: "Can I keep my gallery private?",
        answer: "Yes. You control what’s public or private. Flex publicly, or keep things lowkey."
      }
    ]
  },

  // Footer Section
  footer: {
    brand: {
      emoji: "🧸",
      name: "Labubu Showroom",
      description: "A digital space for toy lovers to flex their collections, discover others, and build their shelf online — together."
    },
    quickLinks: {
      title: "Quick Links",
      links: [
        { text: "About", href: "#" },
        { text: "Terms", href: "#" },
        { text: "Privacy", href: "#" },
        { text: "Support", href: "#" }
      ]
    },
    connect: {
      title: "Connect"
    },
    copyright: "© 2025 Labubu Showroom. Built by collectors, for collectors."
  }
};
