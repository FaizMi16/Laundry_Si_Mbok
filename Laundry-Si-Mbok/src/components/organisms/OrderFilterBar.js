import React from 'react';
import { View } from 'react-native';
import { ChipRow, SearchBar } from '../molecules';

/**
 * Pencarian + filter status daftar pesanan.
 * Props: query, onQueryChange, filters [{ id, label, count }], filterId, onFilterChange
 */
export default function OrderFilterBar({ query, onQueryChange, filters, filterId, onFilterChange }) {
  return (
    <View style={{ paddingHorizontal: 24, paddingBottom: 12, gap: 12 }}>
      <SearchBar value={query} onChangeText={onQueryChange} placeholder="Cari nama, no. pesanan, layanan" />
      <ChipRow options={filters} value={filterId} onChange={onFilterChange} />
    </View>
  );
}
