import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeContext';
import { AppText, Input } from '../atoms';

/**
 * Label + Input + pesan error.
 * Props: label, error (string), style (untuk pembungkus) + semua props Input / TextInput
 */
export default function FormField({ label, error, style, ...inputProps }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrap, style]}>
      {label ? <AppText variant="label" style={{ marginBottom: SPACING.sm }}>{label}</AppText> : null}
      <Input invalid={!!error} {...inputProps} />
      {error ? (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={14} color={colors.danger} />
          <AppText variant="caption" color="danger" style={{ flex: 1 }}>{error}</AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: SPACING.lg },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
});
