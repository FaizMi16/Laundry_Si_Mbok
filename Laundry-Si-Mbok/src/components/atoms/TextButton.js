import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import AppText from './AppText';

/** Tombol berupa teks (tautan / aksi kecil). tone: 'primary' | 'danger' | 'muted' */
export default function TextButton({ label, onPress, icon, tone = 'primary', style }) {
  const { colors } = useTheme();
  const color = colors[tone] || colors.primary;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} hitSlop={8} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        {icon ? <Ionicons name={icon} size={16} color={color} /> : null}
        <AppText variant="label" color={color}>{label}</AppText>
      </View>
    </TouchableOpacity>
  );
}
