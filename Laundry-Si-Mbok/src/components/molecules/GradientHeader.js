import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { Bubble } from '../atoms';

/** Kepala bergradien biru dengan gelembung dekoratif & padding safe-area. Dipakai Beranda & Profil. */
export default function GradientHeader({ children, paddingBottom = 64 }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.header, { paddingTop: insets.top + 16, paddingBottom }]}
    >
      <Bubble size={130} style={{ top: -40, right: -30 }} />
      <Bubble size={56} style={{ bottom: 70, right: 80 }} />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden' },
});
