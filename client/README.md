# 🧸 Labubu Showroom

Your digital gallery for designer toys and collectibles. Showcase your Labubu collection in a beautiful, minimalist interface.

## 🚀 Tech Stack

- **React 19** - Modern React with Vite
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Beautiful, accessible component library
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Supabase** - Backend as a service (planned)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # ShadCN UI components
│   ├── Navbar.jsx       # Main navigation
│   └── index.js         # Component exports
├── pages/               # Page components
│   ├── Landing.jsx      # Landing/home page
│   ├── Gallery.jsx      # User gallery page
│   └── Dashboard.jsx    # User dashboard
├── store/               # Zustand stores
│   └── authStore.js     # Authentication state
├── hooks/               # Custom hooks
│   └── useSupabase.js   # Supabase integration hook
├── lib/                 # Utilities and configuration
│   ├── utils.js         # ShadCN utility functions
│   └── constants.js     # App constants
├── assets/              # Static assets
└── App.jsx              # Main app component
```

## 🎯 Key Features

- **Beautiful Galleries** - Responsive grid layouts for collections
- **User Profiles** - Personal galleries with `/gallery/:username` URLs
- **Dashboard** - Manage collections and view analytics
- **Subscription System** - Free (5 items) vs Pro (unlimited) tiers
- **Authentication** - Secure user auth with Supabase
- **Mobile-First** - Optimized for all device sizes

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📄 Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Landing | Public | Homepage with features and pricing |
| `/gallery/:username` | Gallery | Public | User's public collection gallery |
| `/dashboard` | Dashboard | Protected | User management dashboard |

## 🎨 ShadCN Components Available

- `Button` - Primary and secondary buttons
- `Card` - Content containers
- `Input` & `Label` - Form components
- `Badge` - Status indicators
- `Dialog` - Modal dialogs
- `DropdownMenu` - Dropdown menus

## 🚀 Next Steps

1. **Supabase Integration** - Set up authentication and database
2. **Upload System** - Image upload for collection items
3. **Search & Filtering** - Browse collections efficiently
4. **Social Features** - Follow users, like collections
5. **Subscription Integration** - Polar payment system

## 📝 Environment Variables

Create a `.env.local` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

Built with ❤️ for the designer toy community
