import React from 'react';
import { ScrollView } from 'react-native';
import { Chip } from '../atoms';

/** Baris chip filter yang bisa digeser. Props: options [{ id, label, count }], value, onChange(id) */
export default function ChipRow({ options, value, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 24 }}>
      {options.map((o) => (
        <Chip
          key={o.id}
          label={o.count != null ? `${o.label} (${o.count})` : o.label}
          active={o.id === value}
          onPress={() => onChange(o.id)}
        />
      ))}
    </ScrollView>
  );
}
