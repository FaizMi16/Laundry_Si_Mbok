import React from 'react';
import { View } from 'react-native';
import { formatRupiah } from '../../data/dummy';
import { OptionCard } from '../molecules';

/** Daftar pilihan layanan. Props: services, selectedId, onSelect(service) */
export default function ServiceSelector({ services, selectedId, onSelect }) {
  return (
    <View>
      {services.map((s) => (
        <OptionCard
          key={s.id}
          icon={s.icon}
          title={s.name}
          description={s.desc}
          trailing={`${formatRupiah(s.price)}/${s.unit}`}
          active={s.id === selectedId}
          onPress={() => onSelect(s)}
        />
      ))}
    </View>
  );
}
