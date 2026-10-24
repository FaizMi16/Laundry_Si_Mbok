import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import AppText from './AppText';

/** Pil status kecil. tone: success | warning | danger | primary | neutral */
export default function Badge({ label, tone = 'primary', dot = false, style }) {
  const { colors: c } = useTheme();
  const tones = {
    success: { bg: c.successSoft, fg: c.success },
    warning: { bg: c.warningSoft, fg: c.warning },
    danger: { bg: c.dangerSoft, fg: c.danger },
    primary: { bg: c.primarySoft, fg: c.primary },
    neutral: { bg: c.border, fg: c.muted },
  };
  const t = tones[tone] || tones.primary;
  return (
    <View
      style={[
        { flexShrink: 0, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, backgroundColor: t.bg },
        style,
      ]}
    >
      {dot ? <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: t.fg }} /> : null}
      <AppText variant="small" color={t.fg} numberOfLines={1}>{label}</AppText>
    </View>
  );
}
