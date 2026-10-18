import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS, SHADOW } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import { SERVICES, ACTIVE_ORDERS, formatRupiah } from '../data/dummy';
import OrderCard from '../components/OrderCard';

export default function HomeScreen({ navigation }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 16 }]}
        >
          <View style={[styles.bubble, { width: 130, height: 130, top: -40, right: -30 }]} />
          <View style={[styles.bubble, { width: 56, height: 56, bottom: 70, right: 80 }]} />

          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>Halo, Budi 👋</Text>
              <Text style={styles.headline}>Laundry bersih,{'\n'}hati tenang.</Text>
            </View>
            <TouchableOpacity style={styles.bell} activeOpacity={0.8}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={[styles.ctaCard, SHADOW.card]}>
          <View style={styles.ctaIcon}>
            <Ionicons name="shirt-outline" size={28} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>Laundry sekarang</Text>
            <Text style={styles.ctaDesc}>Antar sendiri atau dijemput kurir.</Text>
          </View>
          <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate('Pemesanan')} activeOpacity={0.85}>
            <Ionicons name="add" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pilih layanan</Text>
          <View style={styles.grid}>
            {SERVICES.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.serviceCard, SHADOW.card]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('Pemesanan', { serviceId: s.id })}
              >
                <View style={styles.serviceIcon}>
                  <Ionicons name={s.icon} size={22} color={COLORS.primary} />
                </View>
                <Text style={styles.serviceName}>{s.name}</Text>
                <Text style={styles.servicePrice}>{formatRupiah(s.price)}/{s.unit}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <LinearGradient
          colors={[COLORS.aqua, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promo}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>Gratis ongkos jemput</Text>
            <Text style={styles.promoDesc}>Untuk cucian di atas 5 kg minggu ini.</Text>
          </View>
          <Image source={require('../../assets/promo.png')} style={styles.promoImg} resizeMode="contain" />
        </LinearGradient>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Pesanan aktif</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Pesanan')}>
              <Text style={styles.seeAll}>Lihat semua</Text>
            </TouchableOpacity>
          </View>
          {ACTIVE_ORDERS.slice(0, 1).map((o) => (
            <OrderCard key={o.id} order={o} onPress={() => navigation.navigate('DetailPesanan', { order: o })} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 24, paddingBottom: 64, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden' },
  bubble: { position: 'absolute', borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.14)' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { fontFamily: FONTS.medium, fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 6 },
  headline: { fontFamily: FONTS.extra, fontSize: 26, lineHeight: 34, color: COLORS.white },
  bell: { width: 44, height: 44, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  bellDot: { position: 'absolute', top: 11, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent, borderWidth: 1.5, borderColor: COLORS.primary },
  ctaCard: { flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 24, marginTop: -34, padding: 16, borderRadius: 22, backgroundColor: COLORS.surface },
  ctaIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center' },
  ctaTitle: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.text },
  ctaDesc: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.muted, marginTop: 3 },
  ctaBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  section: { paddingHorizontal: 24, marginTop: 28 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontFamily: FONTS.extra, fontSize: 18, color: COLORS.text, marginBottom: 14 },
  seeAll: { fontFamily: FONTS.semi, fontSize: 13, color: COLORS.primary, marginBottom: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  serviceCard: { width: '47.5%', backgroundColor: COLORS.surface, borderRadius: 20, padding: 16 },
  serviceIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  serviceName: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.text },
  servicePrice: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.muted, marginTop: 4 },
  promo: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 24, marginTop: 24, paddingLeft: 18, paddingRight: 8, paddingVertical: 8, borderRadius: 20, overflow: 'hidden' },
  promoTitle: { fontFamily: FONTS.extra, fontSize: 15, color: COLORS.white },
  promoDesc: { fontFamily: FONTS.medium, fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  promoImg: { width: 110, height: 70 },
});
