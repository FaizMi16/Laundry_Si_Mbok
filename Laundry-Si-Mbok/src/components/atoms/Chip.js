import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { RADIUS } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import AppText from './AppText';

/** Props: label, active, onPress */
export default function Chip({ label, active, onPress }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.chip, active && styles.chipOn]}>
      <AppText variant="label" color={active ? 'white' : 'text'}>{label}</AppText>
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  chip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: RADIUS.sm + 2, backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border },
  chipOn: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
});
