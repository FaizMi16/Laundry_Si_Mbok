import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

/** Props: value (0–100), height */
export default function ProgressBar({ value = 0, height = 6, style }) {
  const { colors } = useTheme();
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={[{ height, borderRadius: height / 2, backgroundColor: colors.border, overflow: 'hidden' }, style]}>
      <View style={{ width: `${pct}%`, height, borderRadius: height / 2, backgroundColor: colors.primary }} />
    </View>
  );
}
