import React from 'react';
import { useUser } from '../store/UserContext';
import { useMyOrders } from '../store/OrderContext';
import { EmptyState } from '../components/molecules';
import { OrderCard } from '../components/organisms';
import { ListTemplate } from '../components/templates';

export default function OrdersScreen({ navigation }) {
  const { user } = useUser();
  const { active } = useMyOrders(user.id);
  return (
    <ListTemplate
      title="Pesanan saya"
      data={active}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <OrderCard order={item} onPress={() => navigation.navigate('DetailPesanan', { order: item })} />
      )}
      empty={
        <EmptyState
          style={{ paddingTop: 80 }}
          title="Belum ada pesanan aktif"
          description="Buat pesanan pertamamu, status cucian akan tampil di sini."
          actionLabel="Buat pesanan"
          onActionPress={() => navigation.navigate('Pemesanan')}
        />
      }
    />
  );
}
