import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

/** Ikon di dalam kotak membulat. tone: primary | success | warning | danger | solid */
export default function IconBadge({ name, size = 40, tone = 'primary', radius, iconSize, style }) {
  const { colors: c } = useTheme();
  const tones = {
    primary: { bg: c.primarySoft, fg: c.primary },
    success: { bg: c.successSoft, fg: c.success },
    warning: { bg: c.warningSoft, fg: c.warning },
    danger: { bg: c.dangerSoft, fg: c.danger },
    solid: { bg: c.primary, fg: c.white },
  };
  const t = tones[tone] || tones.primary;
  return (
    <View
      style={[
        { width: size, height: size, borderRadius: radius ?? Math.round(size * 0.32), backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
    >
      <Ionicons name={name} size={iconSize ?? Math.round(size * 0.5)} color={t.fg} />
    </View>
  );
}
