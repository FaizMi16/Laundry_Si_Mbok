import React from 'react';
import { View } from 'react-native';
import { AppText, IconButton } from '../atoms';
import { GradientHeader } from '../molecules';

/** Kepala beranda. Props: firstName, onBellPress */
export default function HomeHeader({ firstName, onBellPress }) {
  return (
    <GradientHeader>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View>
          <AppText variant="caption" color="rgba(255,255,255,0.8)" style={{ fontSize: 14, marginBottom: 6 }}>
            Halo, {firstName} 👋
          </AppText>
          <AppText variant="display" color="white">{'Laundry bersih,\nhati tenang.'}</AppText>
        </View>
        <IconButton name="notifications-outline" variant="glass" size={44} radius={15} dot onPress={onBellPress} />
      </View>
    </GradientHeader>
  );
}
