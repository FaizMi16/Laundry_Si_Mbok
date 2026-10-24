import React from 'react';
import { useOrders } from '../store/OrderContext';
import { SectionHeader } from '../components/molecules';
import { OrderInfoCard, OrderTimeline } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function OrderDetailScreen({ navigation, route }) {
  const { orders } = useOrders();
  // Ambil versi terbaru dari store agar perubahan status dari admin langsung tampil
  const passed = route.params?.order;
  const order = orders.find((o) => o.id === passed?.id) || passed || orders[0];

  return (
    <ScreenTemplate title="Detail pesanan" onBack={() => navigation.goBack()}>
      <OrderInfoCard order={order} />
      <SectionHeader title="Status pesanan" size="md" style={{ marginTop: 24 }} />
      <OrderTimeline step={order.step} />
    </ScreenTemplate>
  );
}
