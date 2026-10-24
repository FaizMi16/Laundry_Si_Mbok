import React from 'react';
import { TouchableOpacity, View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import AppText from './AppText';

/**
 * Props: title, onPress, icon, iconPosition ('left' | 'right'), loading, disabled, style
 * variant: 'primary' (gradien) | 'outline' | 'hero' (pil, untuk latar berwarna) | 'danger'
 */
export default function Button({
  title,
  onPress,
  icon,
  iconPosition = 'right',
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) {
  const { styles, colors } = useThemedStyles(makeStyles);
  const textColor =
    variant === 'outline' ? colors.primary : variant === 'danger' ? colors.danger : colors.white;
  const inactive = disabled || loading;
  const handlePress = inactive ? undefined : onPress;
  const dim = inactive && styles.dim;

  const iconEl = icon ? <Ionicons name={icon} size={20} color={textColor} /> : null;
  const content = (
    <View style={styles.row}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {iconPosition === 'left' ? iconEl : null}
          <AppText variant="bodyBold" color={textColor}>{title}</AppText>
          {iconPosition === 'right' ? iconEl : null}
        </>
      )}
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85} style={[SHADOW.button, style, dim]}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.btn}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyle = { hero: styles.hero, outline: styles.outline, danger: styles.danger }[variant];
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={variant === 'hero' ? 0.85 : 0.7}
      style={[styles.btn, variantStyle, style, dim]}
    >
      {content}
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  btn: { minHeight: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  outline: { backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.primary },
  danger: { backgroundColor: COLORS.dangerSoft },
  hero: { backgroundColor: COLORS.heroButton, borderRadius: 999 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dim: { opacity: 0.55 },
});
