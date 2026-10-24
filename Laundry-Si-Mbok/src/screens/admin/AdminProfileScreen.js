import React, { useMemo } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { APP_INFO, CONTACT } from '../../data/dummy';
import { useTheme } from '../../theme/ThemeContext';
import { useAuth } from '../../store/AuthContext';
import { useOrders } from '../../store/OrderContext';
import { summarizeOrders } from '../../utils/orders';
import { AppText, Button, Toggle } from '../../components/atoms';
import { AdminProfileHero, MenuGroup, StatsCard } from '../../components/organisms';
import { HeroScrollTemplate } from '../../components/templates';

export default function AdminProfileScreen({ navigation }) {
  const { isDark, toggle } = useTheme();
  const { admin, logout } = useAuth();
  const { orders } = useOrders();
  const summary = useMemo(() => summarizeOrders(orders), [orders]);
  const go = (route) => () => navigation.getParent()?.navigate(route);

  const confirmLogout = () =>
    Alert.alert('Keluar dari akun admin?', 'Kamu perlu masuk lagi untuk mengelola pesanan.', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        // TODO(backend): hapus token sesi sebelum reset navigasi
        onPress: () => {
          logout();
          navigation.getParent()?.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);

  return (
    <HeroScrollTemplate header={<AdminProfileHero admin={admin} />}>
      <StatsCard
        stats={[
          { value: String(orders.length), label: 'Total pesanan' },
          { value: String(summary.fresh + summary.process), label: 'Aktif' },
          { value: String(summary.unpaid), label: 'Belum bayar' },
        ]}
      />

      <View style={styles.body}>
        <MenuGroup
          title="Akun"
          items={[
            { icon: 'call-outline', label: 'Nomor HP', value: admin.phone },
            { icon: 'lock-closed-outline', label: 'Ubah kata sandi', onPress: go('UbahKataSandi') },
          ]}
        />

        <MenuGroup
          title="Gerai"
          items={[
            { icon: 'time-outline', label: 'Jam layanan', value: CONTACT.hours },
            { icon: 'mail-outline', label: 'Email gerai', value: CONTACT.email },
          ]}
        />

        <MenuGroup
          title="Preferensi"
          items={[
            {
              icon: isDark ? 'sunny-outline' : 'moon-outline',
              label: 'Mode gelap',
              right: <Toggle value={isDark} onValueChange={toggle} />,
            },
          ]}
        />

        <Button variant="danger" title="Keluar" icon="log-out-outline" iconPosition="left" onPress={confirmLogout} style={{ marginTop: 28 }} />

        <AppText variant="caption" color="placeholder" align="center" style={{ marginTop: 20 }}>
          {APP_INFO.name} Admin • v{APP_INFO.version}
        </AppText>
      </View>
    </HeroScrollTemplate>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24 },
});
