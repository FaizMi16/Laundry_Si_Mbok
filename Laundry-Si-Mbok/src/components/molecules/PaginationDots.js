import React from 'react';
import { View } from 'react-native';

/** Indikator halaman onboarding (di atas latar biru). Props: count, index */
export default function PaginationDots({ count, index }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
      {Array.from({ length: count }).map((_, i) => {
        const active = i === index;
        return (
          <View
            key={i}
            style={{
              width: active ? 12 : 8, height: active ? 12 : 8, borderRadius: 6,
              backgroundColor: active ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
            }}
          />
        );
      })}
    </View>
  );
}
