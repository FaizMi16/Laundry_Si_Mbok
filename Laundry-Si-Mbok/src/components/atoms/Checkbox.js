import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

/** Kotak centang (visual saja). Props: checked, invalid */
export default function Checkbox({ checked, invalid }) {
  const { colors } = useTheme();
  const border = invalid ? colors.danger : checked ? colors.primary : colors.disabled;
  return (
    <View
      style={{
        width: 22, height: 22, borderRadius: 7, borderWidth: 1.5, borderColor: border,
        backgroundColor: checked ? colors.primary : colors.surface, alignItems: 'center', justifyContent: 'center',
      }}
    >
      {checked ? <Ionicons name="checkmark" size={14} color={colors.white} /> : null}
    </View>
  );
}
