import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SHADOW } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import { STEPS, ACTIVE_ORDERS, formatRupiah } from '../data/dummy';
import ScreenHeader from '../components/ScreenHeader';
import StatusBadge from '../components/StatusBadge';

export default function OrderDetailScreen({ navigation, route }) {
  const { colors: COLORS, isDark } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const order = route.params?.order || ACTIVE_ORDERS[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScreenHeader title="Detail pesanan" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, SHADOW.card]}>
          <View style={styles.headRow}>
            <View>
              <Text style={styles.id}>{order.id}</Text>
              <Text style={styles.meta}>{order.date}</Text>
            </View>
            <StatusBadge step={order.step} />
          </View>
          <View style={styles.divider} />
          <Row label="Layanan" value={order.service} />
          <Row label="Jumlah" value={order.amount} />
          <Row label="Penyerahan" value={order.method} />
          <Row label="Total" value={formatRupiah(order.total)} bold />
        </View>

        <Text style={styles.sectionTitle}>Status pesanan</Text>
        <View style={[styles.card, SHADOW.card]}>
          {STEPS.map((s, i) => {
            const done = i <= order.step;
            const last = i === STEPS.length - 1;
            return (
              <View key={s.title} style={styles.stepRow}>
                <View style={styles.rail}>
                  <View style={[styles.node, done && styles.nodeOn]}>
                    {done && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                  </View>
                  {!last && <View style={[styles.line, i < order.step && styles.lineOn]} />}
                </View>
                <View style={styles.stepText}>
                  <Text style={[styles.stepTitle, !done && { color: COLORS.placeholder }]}>{s.title}</Text>
                  <Text style={styles.stepDesc}>{s.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value, bold }) {
  const { colors: COLORS, isDark } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, bold && { fontFamily: FONTS.extra, color: COLORS.primary }]}>{value}</Text>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, paddingTop: 8, paddingBottom: 40 },
  card: { backgroundColor: COLORS.surface, borderRadius: 22, padding: 18 },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  id: { fontFamily: FONTS.extra, fontSize: 17, color: COLORS.text },
  meta: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.muted, marginTop: 3 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  rowLabel: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.muted },
  rowValue: { fontFamily: FONTS.semi, fontSize: 13, color: COLORS.text },
  sectionTitle: { fontFamily: FONTS.extra, fontSize: 16, color: COLORS.text, marginTop: 24, marginBottom: 12 },
  stepRow: { flexDirection: 'row', gap: 14 },
  rail: { alignItems: 'center' },
  node: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  nodeOn: { backgroundColor: COLORS.primary },
  line: { width: 2, flex: 1, minHeight: 28, backgroundColor: COLORS.border },
  lineOn: { backgroundColor: COLORS.primary },
  stepText: { flex: 1, paddingBottom: 18 },
  stepTitle: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.text },
  stepDesc: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.muted, marginTop: 2 },
});
