import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SHADOW } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import { STEPS, formatRupiah } from '../data/dummy';
import StatusBadge from './StatusBadge';

export default function OrderCard({ order, onPress }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const progress = ((order.step + 1) / STEPS.length) * 100;

  return (
    <TouchableOpacity style={[styles.card, SHADOW.card]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.top}>
        <View style={styles.iconBox}>
          <Ionicons name="shirt-outline" size={22} color={COLORS.primary} />
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.service} numberOfLines={1}>{order.service}</Text>
          <Text style={styles.meta} numberOfLines={1}>{order.id} • {order.amount}</Text>
        </View>
        <StatusBadge step={order.step} />
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.meta}>{order.date}</Text>
        <Text style={styles.total}>{formatRupiah(order.total)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 16, marginBottom: 14 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center' },
  service: { fontFamily: FONTS.bold, fontSize: 15, color: COLORS.text },
  meta: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.muted, marginTop: 2 },
  track: { height: 6, borderRadius: 3, backgroundColor: COLORS.border, marginTop: 16, overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3, backgroundColor: COLORS.primary },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  total: { fontFamily: FONTS.extra, fontSize: 14, color: COLORS.text },
});
