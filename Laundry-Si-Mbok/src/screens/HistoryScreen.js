import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/ThemeContext';
import { HISTORY_ORDERS } from '../data/dummy';
import OrderCard from '../components/OrderCard';
import ScreenHeader from '../components/ScreenHeader';

export default function HistoryScreen({ navigation }) {
  const { colors: COLORS, isDark } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScreenHeader title="Riwayat pesanan" />
      <FlatList
        data={HISTORY_ORDERS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderCard order={item} onPress={() => navigation.navigate('DetailPesanan', { order: item })} />
        )}
      />
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: 24, paddingTop: 8 },
});
