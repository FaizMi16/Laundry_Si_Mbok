import React from 'react';
import { Alert, Linking } from 'react-native';
import { PAYMENT_METHODS } from '../../data/dummy';
import { useOrders } from '../../store/OrderContext';
import { EmptyState, SectionHeader } from '../../components/molecules';
import {
  OrderCustomerCard, OrderInfoCard, OrderPaymentCard, OrderStatusActions, OrderTimeline,
} from '../../components/organisms';
import { ScreenTemplate } from '../../components/templates';

const open = async (url, failMessage) => {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('Tidak dapat membuka', failMessage);
  }
};

const toIntlPhone = (phone) => phone.replace(/^0/, '62');

export default function AdminOrderDetailScreen({ navigation, route }) {
  const { orders, advanceOrder, revertOrder, setPaid } = useOrders();
  const order = orders.find((o) => o.id === route.params?.orderId);

  if (!order) {
    return (
      <ScreenTemplate title="Detail pesanan" onBack={() => navigation.goBack()}>
        <EmptyState title="Pesanan tidak ditemukan" />
      </ScreenTemplate>
    );
  }

  const payment = PAYMENT_METHODS.find((p) => p.id === order.paymentId);

  return (
    <ScreenTemplate
      title="Detail pesanan"
      onBack={() => navigation.goBack()}
      footer={
        <OrderStatusActions
          order={order}
          onAdvance={() => advanceOrder(order.id)}
          onRevert={() => revertOrder(order.id)}
        />
      }
    >
      <OrderInfoCard order={order} />

      <SectionHeader title="Pelanggan & penjemputan" size="md" style={{ marginTop: 24 }} />
      <OrderCustomerCard
        order={order}
        onCall={() => open(`tel:${order.customer.phone}`, 'Panggilan telepon tidak tersedia di perangkat ini.')}
        onWhatsApp={() => open(`https://wa.me/${toIntlPhone(order.customer.phone)}`, 'WhatsApp tidak tersedia di perangkat ini.')}
      />

      <SectionHeader title="Pembayaran" size="md" />
      <OrderPaymentCard order={order} paymentName={payment?.name || '-'} onSetPaid={(paid) => setPaid(order.id, paid)} />

      <SectionHeader title="Status pesanan" size="md" />
      <OrderTimeline step={order.step} />
    </ScreenTemplate>
  );
}
