import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { AppText, Avatar, Badge } from '../atoms';

/** Satu baris pelanggan. Props: customer { name, phone, orderCount, activeCount }, onPress */
export default function CustomerRow({ customer, onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
      <Avatar name={customer.name} size={48} />
      <View style={{ flex: 1, minWidth: 0 }}>
        <AppText variant="bodyBold" numberOfLines={1}>{customer.name}</AppText>
        <AppText variant="caption" color="muted" numberOfLines={1} style={{ marginTop: 2 }}>
          {customer.phone} • {customer.orderCount} pesanan
        </AppText>
      </View>
      {customer.activeCount > 0 ? <Badge label={`${customer.activeCount} aktif`} tone="warning" /> : null}
      <Ionicons name="chevron-forward" size={18} color={colors.placeholder} />
    </TouchableOpacity>
  );
}
