// Labubu Showroom Design Tokens
// Based on design.json specification

export const DESIGN_TOKENS = {
  // Colors - Light Mode
  light: {
    primary: {
      base: '#d33682',
      foreground: '#ffffff'
    },
    secondary: {
      base: '#2aa198',
      foreground: '#ffffff'
    },
    accent: {
      base: '#cb4b16',
      foreground: '#ffffff'
    },
    base: {
      background: '#fdf6e3',
      foreground: '#073642'
    },
    card: {
      background: '#eee8d5',
      foreground: '#073642'
    },
    muted: {
      base: '#93a1a1',
      foreground: '#073642'
    },
    destructive: {
      base: '#dc322f',
      foreground: '#ffffff'
    },
    border: '#839496',
    ring: '#d33682'
  },

  // Colors - Dark Mode
  dark: {
    primary: {
      base: '#8c5cff',
      foreground: '#ffffff'
    },
    secondary: {
      base: '#2a2c33',
      foreground: '#f0f0f0'
    },
    accent: {
      base: '#1e293b',
      foreground: '#79c0ff'
    },
    base: {
      background: '#1a1b1e',
      foreground: '#f0f0f0'
    },
    card: {
      background: '#222327',
      foreground: '#f0f0f0'
    },
    muted: {
      base: '#2a2c33',
      foreground: '#a0a0a0'
    },
    destructive: {
      base: '#f87171',
      foreground: '#ffffff'
    },
    border: '#33353a',
    ring: '#8c5cff'
  },

  // Typography
  typography: {
    fontFamily: {
      sans: 'Plus Jakarta Sans',
      serif: 'Lora',
      mono: 'IBM Plex Mono'
    },
    letterSpacing: '-0.025em'
  },

  // Effects
  effects: {
    radius: '1.4rem',
    spacing: '0.27rem',
    shadow: {
      color: 'hsl(0 0% 0%)',
      opacity: 0.16,
      blur: '3px',
      spread: '0px',
      offsetX: '0px',
      offsetY: '2px'
    }
  },

  // Animations
  animations: {
    fadeIn: 'fade-in 0.5s ease-out',
    slideIn: 'slide-in 0.3s ease-out',
    themeTransition: 'transition-colors duration-300 ease-in-out'
  }
};

// Helper functions
export const getColorValue = (theme, colorPath) => {
  const paths = colorPath.split('.');
  let value = DESIGN_TOKENS[theme];
  
  for (const path of paths) {
    value = value?.[path];
  }
  
  return value;
};

export const getTypographyValue = (property) => {
  return DESIGN_TOKENS.typography[property];
};

export const getEffectValue = (property) => {
  return DESIGN_TOKENS.effects[property];
}; 