import React from 'react';
import { View } from 'react-native';
import { AppText } from '../atoms';

/** Baris label–nilai. emphasis: 'normal' | 'bold' (nilai tebal biru) | 'total' (lebih besar) */
export default function InfoRow({ label, value, emphasis = 'normal', style }) {
  const isTotal = emphasis === 'total';
  const isBold = emphasis === 'bold';
  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingVertical: isTotal ? 0 : 6 }, style]}>
      <AppText variant={isTotal ? 'bodyBold' : 'caption'} color={isTotal ? 'text' : 'muted'} style={!isTotal && { fontSize: 13 }}>
        {label}
      </AppText>
      <AppText
        variant={isBold || isTotal ? 'heading' : 'label'}
        color={isBold || isTotal ? 'primary' : 'text'}
        style={[{ flexShrink: 1, textAlign: 'right' }, isBold && { fontSize: 13 }]}
      >
        {value}
      </AppText>
    </View>
  );
}
