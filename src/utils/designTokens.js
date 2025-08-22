// Design Tokens Utility
// This file provides a centralized way to access design tokens

// Import design tokens
let tokens = null;

try {
  // Try to import the master tokens file
  tokens = require('../../Json/master.tokens.json');
} catch (error) {
  console.warn('Could not load design tokens, using fallback values');
  // Fallback tokens if the JSON file can't be loaded
  tokens = {
    colors: {
      primary: { value: '#ffffe3' },
      secondary: { value: '#ccccb6' },
      tertiary: { value: '#999988' },
      base: { value: '#0e0e10' },
      hover: { value: '#1e1e1e' },
      inactive: { value: '#30302a' }
    },
    typography: {
      heading: {
        h3: {
          value: {
            fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
            fontSize: '24px',
            fontWeight: '700'
          }
        }
      },
      body: {
        sm: {
          value: {
            fontFamily: 'Satoshi, Helvetica, Arial, sans-serif',
            fontSize: '20px',
            fontWeight: '400'
          }
        }
      },
      other: {
        s1: {
          value: {
            fontFamily: 'SF Mono, Menlo, Monaco, Consolas, monospace',
            fontSize: '14px',
            fontWeight: '400'
          }
        }
      }
    },
    spacing: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      xxl: '32px'
    },
    sizing: {
      card: {
        default: '540px',
        expanded: '1136px',
        'head-expanded': '352px'
      },
      icon: {
        default: '72px',
        small: '24px'
      },
      button: {
        height: '64px'
      }
    },
    transitions: {
      fast: 'all 0.3s ease'
    }
  };
}

// Helper function to safely get token values
export const getToken = (path, fallback = '') => {
  try {
    const keys = path.split('.');
    let value = tokens;
    
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) break;
    }
    
    return value || fallback;
  } catch (error) {
    console.warn(`Token not found: ${path}, using fallback:`, fallback);
    return fallback;
  }
};

// Helper function to get color tokens
export const getColor = (colorName, fallback = '#000000') => {
  return getToken(`colors.${colorName}.value`, fallback);
};

// Helper function to get typography tokens
export const getTypography = (typographyPath, fallback = {}) => {
  return getToken(`typography.${typographyPath}.value`, fallback);
};

// Helper function to get spacing tokens
export const getSpacing = (spacingName, fallback = '0px') => {
  return getToken(`spacing.${spacingName}`, fallback);
};

// Helper function to get sizing tokens
export const getSizing = (sizingPath, fallback = '0px') => {
  return getToken(`sizing.${sizingPath}`, fallback);
};

// Helper function to get transition tokens
export const getTransition = (transitionName, fallback = 'all 0.3s ease') => {
  return getToken(`transitions.${transitionName}`, fallback);
};

// Export the raw tokens object for direct access
export { tokens };

// Export commonly used token combinations
export const cardStyles = {
  index: {
    fontFamily: getTypography('other.s1', {}).fontFamily || 'SF Mono, Menlo, Monaco, Consolas, monospace',
    fontSize: getTypography('other.s1', {}).fontSize || '14px',
    fontWeight: getTypography('other.s1', {}).fontWeight || '400',
    color: getColor('tertiary', '#999988')
  },
  heading: {
    fontFamily: getTypography('heading.h3', {}).fontFamily || 'Satoshi, Helvetica, Arial, sans-serif',
    fontSize: getTypography('heading.h3', {}).fontSize || '24px',
    fontWeight: getTypography('heading.h3', {}).fontWeight || '700',
    color: getColor('primary', '#ffffe3')
  },
  body: {
    fontFamily: getTypography('body.sm', {}).fontFamily || 'Satoshi, Helvetica, Arial, sans-serif',
    fontSize: getTypography('body.sm', {}).fontSize || '20px',
    fontWeight: getTypography('body.sm', {}).fontWeight || '400',
    color: getColor('primary', '#ffffe3')
  }
};
