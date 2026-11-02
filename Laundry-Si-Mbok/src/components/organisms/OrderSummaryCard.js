import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { formatRupiah } from '../../data/dummy';
import { Divider } from '../atoms';
import { InfoRow } from '../molecules';

/** Ringkasan biaya di form pesanan. Jumlah & total dihitung admin setelah ditimbang. Props: serviceName, price, unit, fee */
export default function OrderSummaryCard({ serviceName, price, unit, fee }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card]}>
      <InfoRow label={serviceName} value={`${formatRupiah(price)}/${unit}`} />
      <InfoRow label="Ongkos jemput" value={fee ? formatRupiah(fee) : 'Gratis'} />
      <Divider style={{ marginVertical: 10 }} />
      <InfoRow label="Total" value="Setelah ditimbang" emphasis="total" />
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { marginTop: 24, padding: 18, borderRadius: 20, backgroundColor: COLORS.surface },
});
