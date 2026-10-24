import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { STEPS, formatRupiah } from '../../data/dummy';
import { nextActionLabel } from '../../utils/orders';
import { AppText, Avatar, Divider, ProgressBar, TextButton } from '../atoms';
import { PaymentBadge, StatusBadge } from '../molecules';

/**
 * Kartu pesanan untuk admin. Props: order, onPress, onAdvance (opsional — tampilkan aksi cepat)
 */
export default function AdminOrderCard({ order, onPress, onAdvance }) {
  const { styles } = useThemedStyles(makeStyles);
  const progress = ((order.step + 1) / STEPS.length) * 100;
  const action = onAdvance ? nextActionLabel(order) : null;

  return (
    <TouchableOpacity style={[styles.card, SHADOW.card]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.top}>
        <Avatar name={order.customer.name} size={44} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <AppText variant="bodyBold" numberOfLines={1}>{order.customer.name}</AppText>
          <AppText variant="caption" color="muted" numberOfLines={1} style={{ marginTop: 2 }}>
            {order.id} • {order.service} • {order.amount}
          </AppText>
        </View>
        <StatusBadge step={order.step} />
      </View>

      <ProgressBar value={progress} style={{ marginTop: 14 }} />

      <View style={styles.bottom}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 }}>
          <PaymentBadge paid={order.paid} />
          <AppText variant="caption" color="muted" numberOfLines={1} style={{ flexShrink: 1 }}>{order.method}</AppText>
        </View>
        <AppText variant="heading" style={{ fontSize: 14 }}>{formatRupiah(order.total)}</AppText>
      </View>

      {action ? (
        <>
          <Divider style={{ marginTop: 12, marginBottom: 12 }} />
          <TextButton label={action} icon="arrow-forward-circle-outline" onPress={onAdvance} />
        </>
      ) : null}
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 16, marginBottom: 14 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 12 },
});
