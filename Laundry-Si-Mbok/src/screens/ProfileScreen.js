import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { PAYMENT_METHODS, APP_INFO } from '../data/dummy';
import { useTheme } from '../theme/ThemeContext';
import { useAuth } from '../store/AuthContext';
import { useMyOrders } from '../store/OrderContext';
import { useUser } from '../store/UserContext';
import { AppText, Button, Toggle } from '../components/atoms';
import { MenuGroup, ProfileHero, StatsCard } from '../components/organisms';
import { HeroScrollTemplate } from '../components/templates';

export default function ProfileScreen({ navigation }) {
  const { isDark, toggle } = useTheme();
  const { user, addresses, paymentId } = useUser();
  const { logout } = useAuth();
  const { all, active } = useMyOrders(user.id);
  const payment = PAYMENT_METHODS.find((p) => p.id === paymentId);
  const go = (route) => () => navigation.getParent()?.navigate(route);

  const stats = [
    { value: String(all.length), label: 'Pesanan' },
    { value: String(active.length), label: 'Aktif' },
    { value: String(user.points), label: 'Poin' },
  ];

  const confirmLogout = () =>
    Alert.alert('Keluar dari akun?', 'Kamu perlu masuk lagi untuk melihat pesananmu.', [
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
    <HeroScrollTemplate header={<ProfileHero user={user} onEditPress={go('UbahProfil')} />}>
      <StatsCard stats={stats} />

      <View style={styles.body}>
        <MenuGroup
          title="Akun"
          items={[
            { icon: 'person-outline', label: 'Ubah profil', onPress: go('UbahProfil') },
            { icon: 'location-outline', label: 'Alamat tersimpan', value: `${addresses.length} alamat`, onPress: go('AlamatTersimpan') },
            { icon: 'card-outline', label: 'Metode pembayaran', value: payment?.name, onPress: go('MetodePembayaran') },
            { icon: 'lock-closed-outline', label: 'Ubah kata sandi', onPress: go('UbahKataSandi') },
          ]}
        />

        <MenuGroup
          title="Preferensi"
          items={[
            { icon: 'notifications-outline', label: 'Notifikasi', onPress: go('PengaturanNotifikasi') },
            {
              icon: isDark ? 'sunny-outline' : 'moon-outline',
              label: 'Mode gelap',
              right: <Toggle value={isDark} onValueChange={toggle} />,
            },
          ]}
        />

        <MenuGroup title="Dukungan" items={[{ icon: 'help-circle-outline', label: 'Bantuan', onPress: go('Bantuan') }]} />

        <Button variant="danger" title="Keluar" icon="log-out-outline" iconPosition="left" onPress={confirmLogout} style={{ marginTop: 28 }} />

        <AppText variant="caption" color="placeholder" align="center" style={{ marginTop: 20 }}>
          {APP_INFO.name} • v{APP_INFO.version}
        </AppText>
      </View>
    </HeroScrollTemplate>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24 },
});
