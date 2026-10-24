import React from 'react';
import { View } from 'react-native';
import { AppText, TextButton } from '../atoms';

/** Judul seksi + aksi opsional. size: 'lg' (beranda) | 'md' (form) */
export default function SectionHeader({ title, actionLabel, onActionPress, size = 'lg', style }) {
  const isLg = size === 'lg';
  return (
    <View
      style={[
        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        isLg ? { marginBottom: 14 } : { marginTop: 20, marginBottom: 12 },
        style,
      ]}
    >
      <AppText variant={isLg ? 'heading' : 'subheading'}>{title}</AppText>
      {actionLabel ? <TextButton label={actionLabel} onPress={onActionPress} /> : null}
    </View>
  );
}
