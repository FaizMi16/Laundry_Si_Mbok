import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useCatalog } from '../store/CatalogContext';
import { useMyOrders } from '../store/OrderContext';
import { useUser } from '../store/UserContext';
import { getFirstName } from '../utils/format';
import { SectionHeader } from '../components/molecules';
import { CtaCard, HomeHeader, OrderCard, PromoBanner, ServiceGrid } from '../components/organisms';
import { HeroScrollTemplate } from '../components/templates';

export default function HomeScreen({ navigation }) {
  const { user } = useUser();
  const { activeServices } = useCatalog();
  const { active } = useMyOrders(user.id);

  return (
    <HeroScrollTemplate header={<HomeHeader firstName={getFirstName(user.name)} />}>
      <CtaCard onPress={() => navigation.navigate('Pemesanan')} />

      <View style={styles.section}>
        <SectionHeader title="Pilih layanan" />
        <ServiceGrid services={activeServices} onSelect={(s) => navigation.navigate('Pemesanan', { serviceId: s.id })} />
      </View>

      <PromoBanner title="Gratis ongkos jemput" description="Untuk cucian di atas 5 kg minggu ini." />

      <View style={styles.section}>
        <SectionHeader title="Pesanan aktif" actionLabel="Lihat semua" onActionPress={() => navigation.navigate('Pesanan')} />
        {active.slice(0, 1).map((o) => (
          <OrderCard key={o.id} order={o} onPress={() => navigation.navigate('DetailPesanan', { order: o })} />
        ))}
      </View>
    </HeroScrollTemplate>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, marginTop: 28 },
});
