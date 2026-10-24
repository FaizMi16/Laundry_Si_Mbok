import React from 'react';
import { View } from 'react-native';
import { AppText, Badge, IconButton } from '../atoms';
import { GradientHeader } from '../molecules';

/** Kepala dasbor admin. Props: firstName, newCount, onBellPress */
export default function AdminHeader({ firstName, newCount = 0, onBellPress }) {
  return (
    <GradientHeader>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Badge label="Admin" tone="primary" style={{ alignSelf: 'flex-start', marginBottom: 10 }} />
          <AppText variant="caption" color="rgba(255,255,255,0.8)" style={{ fontSize: 14, marginBottom: 6 }}>
            Halo, {firstName} 👋
          </AppText>
          <AppText variant="display" color="white">{'Kelola gerai,\ncucian lancar.'}</AppText>
        </View>
        <IconButton name="notifications-outline" variant="glass" size={44} radius={15} dot={newCount > 0} onPress={onBellPress} />
      </View>
    </GradientHeader>
  );
}
