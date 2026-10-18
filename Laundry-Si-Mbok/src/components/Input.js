import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, RADIUS, SPACING } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

/**
 * Props: label, icon, secure, multiline, error (string), style, + semua props TextInput
 * State visual: default, focus (biru), error (merah + pesan)
 */
export default function Input({ label, icon, secure, multiline, error, style, onFocus, onBlur, ...props }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const [hidden, setHidden] = useState(!!secure);
  const [focused, setFocused] = useState(false);
  const hasError = !!error;
  const iconColor = hasError ? COLORS.danger : focused ? COLORS.primary : COLORS.muted;

  return (
    <View style={[styles.wrap, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.box,
          multiline && styles.boxMulti,
          focused && styles.boxFocused,
          hasError && styles.boxError,
        ]}
      >
        {icon ? (
          <Ionicons name={icon} size={20} color={iconColor} style={multiline && { marginTop: 14 }} />
        ) : null}
        <TextInput
          style={[styles.input, multiline && styles.inputMulti]}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={hidden}
          multiline={multiline}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          {...props}
        />
        {secure ? (
          <TouchableOpacity onPress={() => setHidden(!hidden)} hitSlop={10}>
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.muted} />
          </TouchableOpacity>
        ) : null}
      </View>
      {hasError ? (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={14} color={COLORS.danger} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  wrap: { marginBottom: SPACING.lg },
  label: { fontFamily: FONTS.semi, fontSize: 13, color: COLORS.text, marginBottom: SPACING.sm },
  box: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  boxMulti: { alignItems: 'flex-start' },
  boxFocused: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  boxError: { borderColor: COLORS.danger, backgroundColor: COLORS.dangerSoft },
  input: { flex: 1, fontFamily: FONTS.medium, fontSize: 14, color: COLORS.text, paddingVertical: 12 },
  inputMulti: { minHeight: 84, textAlignVertical: 'top' },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  errorText: { flex: 1, fontFamily: FONTS.medium, fontSize: 12, color: COLORS.danger },
});
