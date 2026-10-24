import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../theme/ThemeContext';

/**
 * Latar gradient layar penuh (Splash, Onboarding). Ikon status bar selalu terang.
 * Props: colors (default hero), start, end, style
 */
export default function GradientTemplate({ colors, start = { x: 0, y: 0 }, end = { x: 1, y: 1 }, style, children }) {
  const { colors: theme } = useTheme();
  return (
    <LinearGradient colors={colors || [theme.primary, theme.primaryDark]} start={start} end={end} style={[{ flex: 1 }, style]}>
      <StatusBar style="light" />
      {children}
    </LinearGradient>
  );
}
