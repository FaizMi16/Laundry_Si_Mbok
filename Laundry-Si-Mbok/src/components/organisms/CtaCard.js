import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText, IconBadge, IconButton } from '../atoms';

/** Kartu ajakan membuat pesanan (menimpa tepi bawah header). Props: onPress */
export default function CtaCard({ onPress }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card]}>
      <IconBadge name="shirt-outline" size={52} radius={16} iconSize={28} />
      <View style={{ flex: 1 }}>
        <AppText variant="subheading">Laundry sekarang</AppText>
        <AppText variant="caption" color="muted" style={{ marginTop: 3 }}>Antar sendiri atau dijemput kurir.</AppText>
      </View>
      <IconButton name="add" variant="solid" size={44} iconSize={24} onPress={onPress} />
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 24, marginTop: -34, padding: 16, borderRadius: 22, backgroundColor: COLORS.surface },
});
