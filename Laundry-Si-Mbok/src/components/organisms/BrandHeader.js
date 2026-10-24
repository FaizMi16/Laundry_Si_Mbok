import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import { AppText, Bubble, Logo } from '../atoms';

/** Kepala merek (logo + nama + tagline) untuk halaman autentikasi. */
export default function BrandHeader() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.header, { paddingTop: insets.top + 32 }]}
    >
      <Bubble size={120} style={{ top: -30, right: -30 }} />
      <Bubble size={50} style={{ bottom: 50, left: 30 }} />
      <Logo size={72} radius={24} style={{ marginBottom: 14 }} />
      <AppText variant="title" color="white" style={{ fontSize: 22 }}>Laundry Si Mbok</AppText>
      <AppText variant="caption" color="rgba(255,255,255,0.8)" style={{ fontSize: 13, marginTop: 4 }}>
        Bersih, wangi, tanpa ribet.
      </AppText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingBottom: 56, overflow: 'hidden' },
});
