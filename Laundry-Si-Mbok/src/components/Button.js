import React, { useMemo } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SHADOW } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

export default function Button({ title, onPress, icon, variant = 'primary', style }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const isPrimary = variant === 'primary';
  const isHero = variant === 'hero'; // tombol solid berbentuk pil, untuk latar berwarna
  const textColor = isPrimary || isHero ? COLORS.white : COLORS.primary;

  const content = (
    <View style={styles.row}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      {icon ? <Ionicons name={icon} size={20} color={textColor} /> : null}
    </View>
  );

  if (isHero) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.btn, styles.hero, style]}>
        {content}
      </TouchableOpacity>
    );
  }

  if (isPrimary) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[SHADOW.button, style]}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.btn}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.btn, styles.outline, style]}
    >
      {content}
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  btn: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  outline: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  hero: { backgroundColor: COLORS.heroButton, borderRadius: 999 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  text: { fontFamily: FONTS.bold, fontSize: 15 },
});
