import React from 'react';
import { View } from 'react-native';
import { AppText, Avatar, Badge } from '../atoms';
import { GradientHeader } from '../molecules';

/** Kepala halaman akun admin. Props: admin { name, email, title } */
export default function AdminProfileHero({ admin }) {
  return (
    <GradientHeader>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Avatar name={admin.name} size={76} ring />
        <View style={{ flex: 1, minWidth: 0, gap: 3 }}>
          <AppText variant="heading" color="white" numberOfLines={1}>{admin.name}</AppText>
          <AppText variant="caption" color="rgba(255,255,255,0.85)" numberOfLines={1}>{admin.email}</AppText>
          <Badge label={admin.title} tone="primary" style={{ alignSelf: 'flex-start', marginTop: 6 }} />
        </View>
      </View>
    </GradientHeader>
  );
}
