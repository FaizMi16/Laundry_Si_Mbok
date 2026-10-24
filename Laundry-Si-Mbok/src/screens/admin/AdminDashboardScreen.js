import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { formatRupiah } from '../../data/dummy';
import { useAuth } from '../../store/AuthContext';
import { useCatalog } from '../../store/CatalogContext';
import { useOrders } from '../../store/OrderContext';
import { getFirstName } from '../../utils/format';
import { groupCustomers, summarizeOrders } from '../../utils/orders';
import { EmptyState, SectionHeader } from '../../components/molecules';
import { AdminHeader, AdminOrderCard, MetricGrid, StatsCard } from '../../components/organisms';
import { HeroScrollTemplate } from '../../components/templates';

export default function AdminDashboardScreen({ navigation }) {
  const { admin } = useAuth();
  const { orders, advanceOrder } = useOrders();
  const { activeServices } = useCatalog();

  const summary = useMemo(() => summarizeOrders(orders), [orders]);
  const customers = useMemo(() => groupCustomers(orders), [orders]);
  const newOrders = useMemo(() => orders.filter((o) => o.step === 0), [orders]);
  const pickups = useMemo(
    () => orders.filter((o) => o.methodId === 'jemput' && o.step <= 1 && o.pickup?.date === 'Hari ini'),
    [orders]
  );

  const openOrders = (filter) => navigation.navigate('AdminPesanan', { filter, ts: Date.now() });
  const openDetail = (o) => navigation.navigate('AdminDetailPesanan', { orderId: o.id });

  const metrics = [
    { id: 'revenue', icon: 'cash-outline', tone: 'success', value: formatRupiah(summary.revenue), label: 'Pendapatan (lunas)' },
    { id: 'unpaid', icon: 'alert-circle-outline', tone: 'danger', value: formatRupiah(summary.outstanding), label: `Belum dibayar (${summary.unpaid})`, onPress: () => openOrders('unpaid') },
    { id: 'customers', icon: 'people-outline', tone: 'primary', value: String(customers.length), label: 'Pelanggan', onPress: () => navigation.navigate('AdminPelanggan') },
    { id: 'services', icon: 'pricetags-outline', tone: 'warning', value: String(activeServices.length), label: 'Layanan aktif', onPress: () => navigation.navigate('AdminLayanan') },
  ];

  return (
    <HeroScrollTemplate
      header={<AdminHeader firstName={getFirstName(admin.name)} newCount={summary.fresh} onBellPress={() => openOrders('new')} />}
    >
      <StatsCard
        stats={[
          { value: String(summary.fresh), label: 'Baru' },
          { value: String(summary.process), label: 'Diproses' },
          { value: String(summary.done), label: 'Selesai' },
        ]}
      />

      <View style={styles.section}>
        <MetricGrid metrics={metrics} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Pesanan baru" actionLabel="Lihat semua" onActionPress={() => openOrders('new')} />
        {newOrders.length === 0 ? (
          <EmptyState icon="checkmark-done-outline" title="Semua pesanan sudah ditangani" style={{ paddingTop: 12 }} />
        ) : (
          newOrders.slice(0, 3).map((o) => (
            <AdminOrderCard key={o.id} order={o} onPress={() => openDetail(o)} onAdvance={() => advanceOrder(o.id)} />
          ))
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Jadwal jemput hari ini" />
        {pickups.length === 0 ? (
          <EmptyState icon="bicycle-outline" title="Tidak ada jadwal jemput" description="Penjemputan hari ini akan tampil di sini." style={{ paddingTop: 12 }} />
        ) : (
          pickups.map((o) => (
            <AdminOrderCard key={o.id} order={o} onPress={() => openDetail(o)} onAdvance={() => advanceOrder(o.id)} />
          ))
        )}
      </View>
    </HeroScrollTemplate>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 24, marginTop: 28 },
});
