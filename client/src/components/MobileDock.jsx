import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Image, 
  User, 
  Plus 
} from 'lucide-react';
import Dock from './Dock';
import { useAuthStore } from '@/store/authStore';

const MobileDock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, session } = useAuthStore()
  const isAuthenticated = !!(user && session);

  const dockItems = [
    {
      icon: <Home size={20} />,
      label: 'Home',
      onClick: () => navigate(isAuthenticated ? '/home' : '/'),
      isActive: isAuthenticated ? location.pathname === '/home' : location.pathname === '/'
    },
    {
      icon: <Search size={20} />,
      label: 'Explore',
      onClick: () => navigate('/explore'),
      isActive: location.pathname === '/explore'
    },
    ...(isAuthenticated ? [
      {
        icon: <Plus size={20} />,
        label: 'Upload',
        onClick: () => navigate('/upload'),
        isActive: location.pathname === '/upload',
        className: 'labubu-gradient'
      }
    ] : []),
    {
      icon: <Image size={20} />,
      label: 'Gallery',
      onClick: () => navigate('/gallery'),
      isActive: location.pathname.includes('/gallery')
    },
    {
      icon: <User size={20} />,
      label: isAuthenticated ? 'Profile' : 'Sign In',
      onClick: () => navigate(isAuthenticated ? '/profile' : '/login'),
      isActive: location.pathname === '/profile' || location.pathname === '/login' || location.pathname === '/auth'
    }
  ];

  // Enhanced items with active state styling
  const enhancedItems = dockItems.map(item => ({
    ...item,
    className: `${item.className || ''} ${
      item.isActive 
        ? 'bg-primary/20 border-primary/50 text-primary' 
        : 'hover:bg-accent/20'
    } transition-all duration-200`,
    icon: React.cloneElement(item.icon, {
      className: item.isActive ? 'text-primary' : 'text-muted-foreground'
    })
  }));

  return (
    <div className="sm:hidden">
      <Dock 
        items={enhancedItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
        distance={150}
        spring={{ mass: 0.1, stiffness: 200, damping: 15 }}
      />
    </div>
  );
};

export default MobileDock; 