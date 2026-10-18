import React, { useMemo } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTS, RADIUS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

/** Props: label, active, onPress */
export default function Chip({ label, active, onPress }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.chip, active && styles.chipOn]}>
      <Text style={[styles.text, active && styles.textOn]}>{label}</Text>
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  chip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: RADIUS.sm + 2, backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border },
  chipOn: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  text: { fontFamily: FONTS.semi, fontSize: 13, color: COLORS.text },
  textOn: { color: COLORS.white },
});
