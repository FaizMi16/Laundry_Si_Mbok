import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../../theme/ThemeContext';

/**
 * Tombol ikon persegi membulat.
 * variant: 'surface' (tombol kembali) | 'soft' | 'solid' | 'glass' (di atas latar biru)
 * Props: name, onPress, size, iconSize, radius, dot (titik notifikasi), disabled
 */
export default function IconButton({ name, onPress, variant = 'surface', size = 40, iconSize = 22, radius = 14, dot, disabled, style }) {
  const { styles, colors } = useThemedStyles(makeStyles);
  const color = { surface: colors.text, soft: colors.primary, solid: colors.white, glass: colors.white }[variant];
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      style={[styles.base, styles[variant], { width: size, height: size, borderRadius: radius }, disabled && { opacity: 0.5 }, style]}
    >
      <Ionicons name={name} size={iconSize} color={color} />
      {dot ? <View style={styles.dot} /> : null}
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  surface: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  soft: { backgroundColor: COLORS.primarySoft },
  solid: { backgroundColor: COLORS.primary },
  glass: { backgroundColor: 'rgba(255,255,255,0.18)' },
  dot: { position: 'absolute', top: 11, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent, borderWidth: 1.5, borderColor: COLORS.primary },
});
