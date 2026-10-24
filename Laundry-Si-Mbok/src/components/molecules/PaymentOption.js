import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText, IconBadge, RadioDot } from '../atoms';

/** Satu pilihan metode pembayaran. Props: method {name, icon, desc}, selected, onPress */
export default function PaymentOption({ method, selected, onPress }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.card, selected && styles.cardOn]}>
      <IconBadge name={method.icon} size={44} tone={selected ? 'solid' : 'primary'} />
      <View style={{ flex: 1 }}>
        <AppText variant="item">{method.name}</AppText>
        <AppText variant="caption" color="muted" style={{ marginTop: 2 }}>{method.desc}</AppText>
      </View>
      <RadioDot selected={selected} />
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 18, backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border, marginBottom: 12 },
  cardOn: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
});
