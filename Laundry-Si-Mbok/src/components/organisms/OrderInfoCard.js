import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { formatRupiah } from '../../data/dummy';
import { AppText, Divider } from '../atoms';
import { InfoRow, StatusBadge } from '../molecules';

/** Rincian pesanan di halaman detail. Props: order */
export default function OrderInfoCard({ order }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card]}>
      <View style={styles.head}>
        <View>
          <AppText variant="heading" style={{ fontSize: 17 }}>{order.id}</AppText>
          <AppText variant="caption" color="muted" style={{ marginTop: 3 }}>{order.date}</AppText>
        </View>
        <StatusBadge step={order.step} />
      </View>
      <Divider style={{ marginVertical: 14 }} />
      <InfoRow label="Layanan" value={order.service} />
      <InfoRow label="Jumlah" value={order.amount} />
      <InfoRow label="Penyerahan" value={order.method} />
      <InfoRow label="Total" value={formatRupiah(order.total)} emphasis="bold" />
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 22, padding: 18 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
