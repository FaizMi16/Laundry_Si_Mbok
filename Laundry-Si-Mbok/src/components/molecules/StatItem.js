import React from 'react';
import { View } from 'react-native';
import { AppText } from '../atoms';

/** Angka ringkasan + keterangan. Props: value, label */
export default function StatItem({ value, label }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
      <AppText variant="heading" color="primary">{value}</AppText>
      <AppText variant="caption" color="muted">{label}</AppText>
    </View>
  );
}
