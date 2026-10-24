import React, { useEffect, useMemo, useState } from 'react';
import { ORDER_FILTERS } from '../../data/dummy';
import { useOrders } from '../../store/OrderContext';
import { matchesFilter, matchesQuery } from '../../utils/orders';
import { EmptyState } from '../../components/molecules';
import { AdminOrderCard, OrderFilterBar } from '../../components/organisms';
import { FilteredListTemplate } from '../../components/templates';

export default function AdminOrdersScreen({ navigation, route }) {
  const { orders, advanceOrder } = useOrders();
  const [query, setQuery] = useState('');
  const [filterId, setFilterId] = useState('all');

  // Dasbor bisa membuka tab ini langsung pada filter tertentu.
  useEffect(() => {
    if (route.params?.filter) setFilterId(route.params.filter);
  }, [route.params?.filter, route.params?.ts]);

  const filters = useMemo(
    () => ORDER_FILTERS.map((f) => ({ ...f, count: orders.filter((o) => matchesFilter(o, f.id)).length })),
    [orders]
  );
  const data = useMemo(
    () => orders.filter((o) => matchesFilter(o, filterId) && matchesQuery(o, query)),
    [orders, filterId, query]
  );

  return (
    <FilteredListTemplate
      title="Kelola pesanan"
      filters={
        <OrderFilterBar
          query={query}
          onQueryChange={setQuery}
          filters={filters}
          filterId={filterId}
          onFilterChange={setFilterId}
        />
      }
      data={data}
      keyExtractor={(o) => o.id}
      renderItem={({ item }) => (
        <AdminOrderCard
          order={item}
          onPress={() => navigation.navigate('AdminDetailPesanan', { orderId: item.id })}
          onAdvance={() => advanceOrder(item.id)}
        />
      )}
      empty={
        <EmptyState
          style={{ paddingTop: 60 }}
          title="Pesanan tidak ditemukan"
          description="Coba ganti kata kunci atau filter status."
        />
      }
    />
  );
}
