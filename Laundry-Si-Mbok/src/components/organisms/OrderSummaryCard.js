import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { formatRupiah } from '../../data/dummy';
import { Divider } from '../atoms';
import { InfoRow } from '../molecules';

/** Ringkasan biaya di form pesanan. Props: serviceName, qty, subtotal, fee, total */
export default function OrderSummaryCard({ serviceName, qty, subtotal, fee, total }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card]}>
      <InfoRow label={`${serviceName} × ${qty}`} value={formatRupiah(subtotal)} />
      <InfoRow label="Ongkos jemput" value={fee ? formatRupiah(fee) : 'Gratis'} />
      <Divider style={{ marginVertical: 10 }} />
      <InfoRow label="Total" value={formatRupiah(total)} emphasis="total" />
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { marginTop: 24, padding: 18, borderRadius: 20, backgroundColor: COLORS.surface },
});
