import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { AppText, IconBadge } from '../atoms';

/**
 * Satu baris menu. Props: icon, label, subtitle, value (teks kanan), tone ('primary' | 'danger' | 'success'),
 * onPress, right (node kustom mis. <Toggle/>), chevron (default: tampil bila onPress & tanpa right)
 */
export default function MenuItem({ icon, label, subtitle, value, tone = 'primary', onPress, right, chevron, style }) {
  const { colors } = useTheme();
  const showChevron = chevron ?? (!!onPress && !right);
  const Wrapper = onPress ? TouchableOpacity : View;
  const wrapperProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

  return (
    <Wrapper style={[styles.row, style]} {...wrapperProps}>
      <IconBadge name={icon} tone={tone} size={38} />
      <View style={styles.texts}>
        <AppText variant="item" color={tone === 'danger' ? 'danger' : 'text'}>{label}</AppText>
        {subtitle ? <AppText variant="caption" color="muted" style={{ marginTop: 2 }}>{subtitle}</AppText> : null}
      </View>
      {value ? <AppText variant="caption" color="muted" numberOfLines={1} style={styles.value}>{value}</AppText> : null}
      {right || null}
      {showChevron ? <Ionicons name="chevron-forward" size={18} color={colors.placeholder} /> : null}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  texts: { flex: 1, minWidth: 0 },
  value: { maxWidth: 120 },
});
