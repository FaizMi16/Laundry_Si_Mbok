import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

/** Saklar bertema. Props: value, onValueChange */
export default function Toggle({ value, onValueChange, disabled }) {
  const { colors } = useTheme();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: colors.disabled, true: colors.primary }}
      thumbColor={colors.white}
    />
  );
}
