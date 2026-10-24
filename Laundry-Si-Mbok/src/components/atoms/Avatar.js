import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { getInitials } from '../../utils/format';
import AppText from './AppText';

/** Avatar inisial. Props: name, size, ring (cincin putih untuk latar berwarna) */
export default function Avatar({ name, size = 60, ring = false, style }) {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={[colors.primary, colors.aqua]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        { width: size, height: size, borderRadius: Math.round(size / 3), alignItems: 'center', justifyContent: 'center' },
        ring && { borderWidth: 3, borderColor: 'rgba(255,255,255,0.9)' },
        style,
      ]}
    >
      <AppText variant="heading" color="white" style={{ fontSize: Math.round(size * 0.4) }}>
        {getInitials(name)}
      </AppText>
    </LinearGradient>
  );
}
