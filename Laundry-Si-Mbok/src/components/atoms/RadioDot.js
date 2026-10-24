import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

/** Tombol radio (visual saja). Props: selected */
export default function RadioDot({ selected }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: 22, height: 22, borderRadius: 11, borderWidth: 2,
        borderColor: selected ? colors.primary : colors.disabled, alignItems: 'center', justifyContent: 'center',
      }}
    >
      {selected ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary }} /> : null}
    </View>
  );
}
