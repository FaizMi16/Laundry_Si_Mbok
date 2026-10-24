import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText, IconBadge } from '../atoms';

/** Kartu pilihan berbaris (layanan). Props: icon, title, description, trailing, active, onPress */
export default function OptionCard({ icon, title, description, trailing, active, onPress }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.card, active && styles.cardOn]}>
      <IconBadge name={icon} size={40} tone={active ? 'solid' : 'primary'} />
      <View style={{ flex: 1 }}>
        <AppText variant="bodyBold" style={{ fontSize: 14 }}>{title}</AppText>
        {description ? <AppText variant="caption" color="muted" style={{ marginTop: 2 }}>{description}</AppText> : null}
      </View>
      {trailing ? <AppText variant="small" color="primary" style={{ fontSize: 12 }}>{trailing}</AppText> : null}
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 18, backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border, marginBottom: 10 },
  cardOn: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
});
