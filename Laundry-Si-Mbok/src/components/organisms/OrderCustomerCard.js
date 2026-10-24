import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText, Avatar, Divider, TextButton } from '../atoms';
import { InfoRow } from '../molecules';

/**
 * Data pelanggan + penjemputan di detail pesanan.
 * Props: order, onCall, onWhatsApp
 */
export default function OrderCustomerCard({ order, onCall, onWhatsApp }) {
  const { styles } = useThemedStyles(makeStyles);
  const pickup = order.pickup ? `${order.pickup.date}, ${order.pickup.time}` : null;

  return (
    <View style={[styles.card, SHADOW.card]}>
      <View style={styles.head}>
        <Avatar name={order.customer.name} size={48} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <AppText variant="bodyBold" numberOfLines={1}>{order.customer.name}</AppText>
          <AppText variant="caption" color="muted" style={{ marginTop: 2 }}>{order.customer.phone}</AppText>
        </View>
      </View>

      <View style={styles.actions}>
        <TextButton label="Telepon" icon="call-outline" onPress={onCall} />
        <TextButton label="WhatsApp" icon="logo-whatsapp" onPress={onWhatsApp} />
      </View>

      <Divider style={{ marginVertical: 12 }} />
      <InfoRow label="Penyerahan" value={order.method} />
      {order.methodId === 'jemput' ? (
        <>
          <InfoRow label="Jadwal jemput" value={pickup} />
          <View style={{ paddingVertical: 6, gap: 4 }}>
            <AppText variant="caption" color="muted" style={{ fontSize: 13 }}>Alamat</AppText>
            <AppText variant="item">{order.address}</AppText>
          </View>
        </>
      ) : null}
      {order.note ? (
        <View style={{ paddingVertical: 6, gap: 4 }}>
          <AppText variant="caption" color="muted" style={{ fontSize: 13 }}>Catatan pelanggan</AppText>
          <AppText variant="item">{order.note}</AppText>
        </View>
      ) : null}
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 22, padding: 18 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  actions: { flexDirection: 'row', gap: 22, marginTop: 14 },
});
