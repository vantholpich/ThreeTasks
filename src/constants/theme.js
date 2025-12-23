export const COLORS = {
  primary: '#007AFF', // iOS Blue
  secondary: '#5856D6', // iOS Indigo
  background: '#F2F2F7', // iOS System Grouped Background
  surface: '#FFFFFF',
  onBackground: '#000000',
  onSurface: '#3C3C43', // Label Color (Secondary)
  error: '#FF3B30',
  success: '#34C759',
  border: '#C6C6C8',
  shadow: '#000000',
};

export const SIZES = {
  h1: 34, // Large Title
  h2: 28, // Title 1
  h3: 22, // Title 2
  body: 17, // Body
  caption: 13, // Caption 1
  radius: 12,
  padding: 16,
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};
