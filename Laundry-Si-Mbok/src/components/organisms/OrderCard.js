import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { STEPS, formatRupiah } from '../../data/dummy';
import { AppText, IconBadge, ProgressBar } from '../atoms';
import { StatusBadge } from '../molecules';

/** Kartu ringkas pesanan. Props: order, onPress */
export default function OrderCard({ order, onPress }) {
  const { styles } = useThemedStyles(makeStyles);
  const progress = ((order.step + 1) / STEPS.length) * 100;

  return (
    <TouchableOpacity style={[styles.card, SHADOW.card]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.top}>
        <IconBadge name="shirt-outline" size={44} radius={14} iconSize={22} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <AppText variant="bodyBold" numberOfLines={1}>{order.service}</AppText>
          <AppText variant="caption" color="muted" numberOfLines={1} style={{ marginTop: 2 }}>
            {order.id} • {order.amount}
          </AppText>
        </View>
        <StatusBadge step={order.step} />
      </View>

      <ProgressBar value={progress} style={{ marginTop: 16 }} />

      <View style={styles.bottom}>
        <AppText variant="caption" color="muted">{order.date}</AppText>
        <AppText variant="heading" style={{ fontSize: 14 }}>{formatRupiah(order.total)}</AppText>
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 16, marginBottom: 14 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
});
