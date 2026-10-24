import React from 'react';
import { View } from 'react-native';

/** Lingkaran dekoratif semi-transparan untuk latar gradient. Atur posisi lewat style. */
export default function Bubble({ size, opacity = 0.14, style }) {
  return (
    <View
      pointerEvents="none"
      style={[
        { position: 'absolute', width: size, height: size, borderRadius: size / 2, backgroundColor: `rgba(255,255,255,${opacity})` },
        style,
      ]}
    />
  );
}
