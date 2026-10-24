import React from 'react';
import { View } from 'react-native';
import { PaymentOption } from '../molecules';

/** Props: methods, selectedId, onSelect(id) */
export default function PaymentMethodList({ methods, selectedId, onSelect }) {
  return (
    <View>
      {methods.map((m) => (
        <PaymentOption key={m.id} method={m} selected={m.id === selectedId} onPress={() => onSelect(m.id)} />
      ))}
    </View>
  );
}
