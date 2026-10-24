import React from 'react';
import { View } from 'react-native';
import { AppText, Avatar, Badge, IconButton } from '../atoms';
import { GradientHeader } from '../molecules';

/** Kepala halaman profil. Props: user, onEditPress */
export default function ProfileHero({ user, onEditPress }) {
  return (
    <GradientHeader>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Avatar name={user.name} size={76} ring />
        <View style={{ flex: 1, minWidth: 0, gap: 3 }}>
          <AppText variant="heading" color="white" numberOfLines={1}>{user.name}</AppText>
          <AppText variant="caption" color="rgba(255,255,255,0.85)" numberOfLines={1}>{user.email}</AppText>
          <Badge label={`Member sejak ${user.memberSince}`} tone="primary" style={{ alignSelf: 'flex-start', marginTop: 6 }} />
        </View>
        <IconButton name="create-outline" variant="glass" size={44} radius={15} onPress={onEditPress} />
      </View>
    </GradientHeader>
  );
}
