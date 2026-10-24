import React from 'react';
import { View } from 'react-native';
import { MetricTile } from '../molecules';

/** Grid 2 kolom kartu angka. Props: metrics [{ id, icon, tone, value, label, onPress }] */
export default function MetricGrid({ metrics }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
      {metrics.map((m) => (
        <MetricTile key={m.id} icon={m.icon} tone={m.tone} value={m.value} label={m.label} onPress={m.onPress} />
      ))}
    </View>
  );
}
