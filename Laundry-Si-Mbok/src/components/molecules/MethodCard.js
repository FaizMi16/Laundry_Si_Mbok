import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText } from '../atoms';

/** Kartu pilihan bertumpuk (cara penyerahan). Props: icon, title, description, active, onPress */
export default function MethodCard({ icon, title, description, active, onPress }) {
  const { styles, colors } = useThemedStyles(makeStyles);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.card, active && styles.cardOn]}>
      <Ionicons name={icon} size={26} color={active ? colors.primary : colors.muted} />
      <AppText variant="bodyBold" style={{ fontSize: 14 }}>{title}</AppText>
      <AppText variant="caption" color="muted">{description}</AppText>
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { flex: 1, gap: 4, padding: 14, borderRadius: 18, backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border },
  cardOn: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
});
