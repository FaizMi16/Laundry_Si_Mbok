import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { formatRupiah } from '../../data/dummy';
import { AppText, Button, Divider, TextButton } from '../atoms';
import { InfoRow, PaymentBadge } from '../molecules';

/**
 * Rincian pembayaran di detail pesanan.
 * Props: order, paymentName, onSetPaid(paid:boolean)
 */
export default function OrderPaymentCard({ order, paymentName, onSetPaid }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card]}>
      <InfoRow label="Metode bayar" value={paymentName} />
      <InfoRow label="Ongkos jemput" value={order.fee ? formatRupiah(order.fee) : 'Gratis'} />
      <View style={styles.statusRow}>
        <AppText variant="caption" color="muted" style={{ fontSize: 13 }}>Status</AppText>
        <PaymentBadge paid={order.paid} />
      </View>
      <Divider style={{ marginVertical: 10 }} />
      <InfoRow label="Total" value={formatRupiah(order.total)} emphasis="total" />

      <View style={{ marginTop: 16 }}>
        {order.paid ? (
          <TextButton label="Batalkan status lunas" icon="close-circle-outline" tone="muted" onPress={() => onSetPaid(false)} />
        ) : (
          <Button title="Tandai sudah dibayar" variant="outline" icon="cash-outline" iconPosition="left" onPress={() => onSetPaid(true)} />
        )}
      </View>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 22, padding: 18 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
});
