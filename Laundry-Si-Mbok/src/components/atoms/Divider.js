import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

/** Garis pemisah. Props: vertical, style */
export default function Divider({ vertical = false, style }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        vertical ? { width: 1, alignSelf: 'stretch' } : { height: 1 },
        { backgroundColor: colors.border },
        style,
      ]}
    />
  );
}
