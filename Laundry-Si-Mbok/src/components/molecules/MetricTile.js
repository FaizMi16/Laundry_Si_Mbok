import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText, IconBadge } from '../atoms';

/** Kartu angka ringkasan di dasbor. Props: icon, tone, value, label, onPress */
export default function MetricTile({ icon, tone = 'primary', value, label, onPress }) {
  const { styles } = useThemedStyles(makeStyles);
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper style={[styles.card, SHADOW.card]} {...(onPress ? { onPress, activeOpacity: 0.85 } : {})}>
      <IconBadge name={icon} tone={tone} size={40} style={{ marginBottom: 12 }} />
      <AppText variant="heading" numberOfLines={1} adjustsFontSizeToFit>{value}</AppText>
      <AppText variant="caption" color="muted" style={{ marginTop: 3 }}>{label}</AppText>
    </Wrapper>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { width: '47.5%', backgroundColor: COLORS.surface, borderRadius: 20, padding: 16 },
});
