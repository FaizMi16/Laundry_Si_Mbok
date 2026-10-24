import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useOrders } from '../../store/OrderContext';
import { groupCustomers } from '../../utils/orders';
import { EmptyState, SearchBar } from '../../components/molecules';
import { CustomerCard } from '../../components/organisms';
import { FilteredListTemplate } from '../../components/templates';

export default function AdminCustomersScreen({ navigation }) {
  const { orders } = useOrders();
  const [query, setQuery] = useState('');

  const customers = useMemo(() => groupCustomers(orders), [orders]);
  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? customers.filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q)) : customers;
  }, [customers, query]);

  return (
    <FilteredListTemplate
      title="Pelanggan"
      filters={
        <View style={{ paddingHorizontal: 24, paddingBottom: 12 }}>
          <SearchBar value={query} onChangeText={setQuery} placeholder="Cari nama atau nomor HP" />
        </View>
      }
      data={data}
      keyExtractor={(c) => c.id}
      renderItem={({ item }) => (
        <CustomerCard customer={item} onPress={() => navigation.navigate('AdminDetailPelanggan', { customerId: item.id })} />
      )}
      empty={<EmptyState icon="people-outline" style={{ paddingTop: 60 }} title="Pelanggan tidak ditemukan" description="Pelanggan muncul otomatis setelah membuat pesanan." />}
    />
  );
}
