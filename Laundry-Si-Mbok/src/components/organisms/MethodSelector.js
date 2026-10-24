import React from 'react';
import { View } from 'react-native';
import { MethodCard } from '../molecules';

/** Pilihan cara penyerahan. Props: methods, selectedId, onSelect(method) */
export default function MethodSelector({ methods, selectedId, onSelect }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {methods.map((m) => (
        <MethodCard
          key={m.id}
          icon={m.icon}
          title={m.name}
          description={m.desc}
          active={m.id === selectedId}
          onPress={() => onSelect(m)}
        />
      ))}
    </View>
  );
}
