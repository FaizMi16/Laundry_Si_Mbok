import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { formatRupiah } from '../../data/dummy';
import { AppText, Divider } from '../atoms';
import { CustomerRow } from '../molecules';

/** Kartu pelanggan di daftar. Props: customer, onPress */
export default function CustomerCard({ customer, onPress }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card]}>
      <CustomerRow customer={customer} onPress={onPress} />
      <Divider style={{ marginVertical: 12 }} />
      <View style={styles.foot}>
        <AppText variant="caption" color="muted">Total transaksi</AppText>
        <AppText variant="heading" style={{ fontSize: 14 }}>{formatRupiah(customer.totalSpend)}</AppText>
      </View>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 16, marginBottom: 14 },
  foot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
