import React from 'react';
import { useUser } from '../store/UserContext';
import { useMyOrders } from '../store/OrderContext';
import { EmptyState } from '../components/molecules';
import { OrderCard } from '../components/organisms';
import { ListTemplate } from '../components/templates';

export default function HistoryScreen({ navigation }) {
  const { user } = useUser();
  const { history } = useMyOrders(user.id);
  return (
    <ListTemplate
      title="Riwayat pesanan"
      data={history}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <OrderCard order={item} onPress={() => navigation.navigate('DetailPesanan', { order: item })} />
      )}
      empty={<EmptyState icon="time-outline" title="Belum ada riwayat" description="Pesanan yang sudah selesai akan muncul di sini." />}
    />
  );
}
