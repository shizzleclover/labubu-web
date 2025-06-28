// App constants and configuration

export const APP_NAME = "Labubu Showroom"
export const APP_DESCRIPTION = "Your digital gallery for designer toys and collectibles"

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: "Free Gallery",
    price: 0,
    itemLimit: 5,
    features: [
      "Up to 5 items",
      "Basic gallery",
      "Public profile"
    ]
  },
  PRO: {
    name: "Pro Collector", 
    price: 25,
    itemLimit: null, // unlimited
    features: [
      "Unlimited items",
      "Advanced analytics",
      "Custom themes",
      "Priority support"
    ]
  }
}

// Item rarities
export const RARITY_TYPES = {
  COMMON: { name: "Common", color: "bg-gray-500" },
  RARE: { name: "Rare", color: "bg-blue-500" },
  ULTRA_RARE: { name: "Ultra Rare", color: "bg-purple-500" },
  LIMITED: { name: "Limited", color: "bg-orange-500" },
  EXCLUSIVE: { name: "Exclusive", color: "bg-red-500" }
}

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup", 
    LOGOUT: "/auth/logout"
  },
  USERS: {
    PROFILE: "/users/profile",
    GALLERY: "/users/gallery"
  },
  ITEMS: {
    LIST: "/items",
    CREATE: "/items",
    UPDATE: "/items/:id",
    DELETE: "/items/:id"
  }
}

// Routes
export const ROUTES = {
  HOME: "/",
  GALLERY: "/gallery/:username",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRICING: "/pricing"
} 