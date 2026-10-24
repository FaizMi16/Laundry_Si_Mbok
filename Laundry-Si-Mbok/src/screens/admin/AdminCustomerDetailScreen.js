import React, { useMemo } from 'react';
import { View } from 'react-native';
import { formatRupiah } from '../../data/dummy';
import { useOrders } from '../../store/OrderContext';
import { groupCustomers } from '../../utils/orders';
import { AppText, Avatar } from '../../components/atoms';
import { EmptyState, SectionHeader } from '../../components/molecules';
import { AdminOrderCard, StatsCard } from '../../components/organisms';
import { ScreenTemplate } from '../../components/templates';

export default function AdminCustomerDetailScreen({ navigation, route }) {
  const { orders } = useOrders();
  const customerId = route.params?.customerId;

  const mine = useMemo(() => orders.filter((o) => o.customer.id === customerId), [orders, customerId]);
  const customer = useMemo(() => groupCustomers(mine)[0], [mine]);

  if (!customer) {
    return (
      <ScreenTemplate title="Detail pelanggan" onBack={() => navigation.goBack()}>
        <EmptyState icon="people-outline" title="Pelanggan tidak ditemukan" />
      </ScreenTemplate>
    );
  }

  return (
    <ScreenTemplate title="Detail pelanggan" onBack={() => navigation.goBack()}>
      <View style={{ alignItems: 'center', gap: 6, marginBottom: 20 }}>
        <Avatar name={customer.name} size={80} />
        <AppText variant="heading" style={{ marginTop: 8 }}>{customer.name}</AppText>
        <AppText variant="caption" color="muted">{customer.phone}</AppText>
      </View>

      <StatsCard
        style={{ marginHorizontal: 0, marginTop: 0 }}
        stats={[
          { value: String(customer.orderCount), label: 'Pesanan' },
          { value: String(customer.activeCount), label: 'Aktif' },
          { value: formatRupiah(customer.totalSpend), label: 'Transaksi' },
        ]}
      />

      <SectionHeader title="Riwayat pesanan" size="md" style={{ marginTop: 28 }} />
      {mine.map((o) => (
        <AdminOrderCard key={o.id} order={o} onPress={() => navigation.navigate('AdminDetailPesanan', { orderId: o.id })} />
      ))}
    </ScreenTemplate>
  );
}
