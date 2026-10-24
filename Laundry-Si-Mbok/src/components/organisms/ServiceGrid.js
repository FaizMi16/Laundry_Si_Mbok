import React from 'react';
import { View } from 'react-native';
import { ServiceTile } from '../molecules';

/** Grid 2 kolom layanan. Props: services, onSelect(service) */
export default function ServiceGrid({ services, onSelect }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
      {services.map((s) => (
        <ServiceTile key={s.id} service={s} onPress={() => onSelect(s)} />
      ))}
    </View>
  );
}
