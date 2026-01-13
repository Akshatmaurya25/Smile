export const colors = {
  // Base dark theme backgrounds
  background: {
    primary: '#0A0A0F',
    secondary: '#12121A',
    tertiary: '#1A1A24',
    elevated: '#22222E',
  },

  // Neon gradient colors
  gradient: {
    cyan: '#00FFD1',
    pink: '#FF006E',
    purple: '#A855F7',
    blue: '#3B82F6',
  },

  // Pre-defined gradient combinations
  gradients: {
    primary: ['#00FFD1', '#A855F7'] as const,
    secondary: ['#FF006E', '#A855F7'] as const,
    accent: ['#00FFD1', '#FF006E'] as const,
    warm: ['#FF006E', '#FFB800'] as const,
    cool: ['#3B82F6', '#00FFD1'] as const,
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0B0',
    muted: '#606070',
    inverse: '#0A0A0F',
  },

  // Status colors
  status: {
    success: '#00FFD1',
    error: '#FF006E',
    warning: '#FFB800',
    info: '#3B82F6',
  },

  // Border and divider colors
  border: {
    primary: '#2A2A36',
    secondary: '#1A1A24',
    focus: '#00FFD1',
  },

  // Category colors for expenses
  category: {
    food: '#FF6B6B',
    transport: '#4ECDC4',
    shopping: '#A855F7',
    entertainment: '#FF006E',
    bills: '#00FFD1',
    health: '#45B7D1',
    education: '#96CEB4',
    other: '#606070',
  },

  // Transparent variations
  transparent: {
    white10: 'rgba(255, 255, 255, 0.1)',
    white20: 'rgba(255, 255, 255, 0.2)',
    white50: 'rgba(255, 255, 255, 0.5)',
    black50: 'rgba(0, 0, 0, 0.5)',
    cyan20: 'rgba(0, 255, 209, 0.2)',
    pink20: 'rgba(255, 0, 110, 0.2)',
    purple20: 'rgba(168, 85, 247, 0.2)',
  },
} as const;

export type Colors = typeof colors;
