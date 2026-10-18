import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import { STEPS } from '../data/dummy';

export default function StatusBadge({ step }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const done = step >= STEPS.length - 1;
  const bg = done ? COLORS.successSoft : COLORS.warningSoft;
  const color = done ? COLORS.success : COLORS.warning;

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]} numberOfLines={1}>{STEPS[step].title}</Text>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  badge: { flexShrink: 0, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontFamily: FONTS.bold, fontSize: 11 },
});
