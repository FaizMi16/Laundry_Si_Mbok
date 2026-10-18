import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FONTS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import { ACTIVE_ORDERS } from '../data/dummy';
import OrderCard from '../components/OrderCard';
import Button from '../components/Button';
import ScreenHeader from '../components/ScreenHeader';

export default function OrdersScreen({ navigation }) {
  const { colors: COLORS, isDark } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScreenHeader title="Pesanan saya" />
      <FlatList
        data={ACTIVE_ORDERS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderCard order={item} onPress={() => navigation.navigate('DetailPesanan', { order: item })} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={48} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>Belum ada pesanan aktif</Text>
            <Text style={styles.emptyDesc}>Buat pesanan pertamamu, status cucian akan tampil di sini.</Text>
            <Button title="Buat pesanan" onPress={() => navigation.navigate('Pemesanan')} style={{ marginTop: 20, alignSelf: 'stretch' }} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: 24, paddingTop: 8 },
  empty: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 12 },
  emptyTitle: { fontFamily: FONTS.bold, fontSize: 17, color: COLORS.text, marginTop: 16 },
  emptyDesc: { fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.muted, textAlign: 'center', marginTop: 6 },
});
