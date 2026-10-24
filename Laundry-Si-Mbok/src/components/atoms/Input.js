import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, RADIUS } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';

/**
 * Kotak input polos (tanpa label & pesan error — itu tugas molecule FormField).
 * Props: icon, secure, multiline, invalid, style + semua props TextInput
 * State visual: default, focus (biru), invalid (merah)
 */
export default function Input({ icon, secure, multiline, invalid, style, onFocus, onBlur, ...props }) {
  const { styles, colors } = useThemedStyles(makeStyles);
  const [hidden, setHidden] = useState(!!secure);
  const [focused, setFocused] = useState(false);
  const iconColor = invalid ? colors.danger : focused ? colors.primary : colors.muted;

  return (
    <View
      style={[
        styles.box,
        multiline && styles.boxMulti,
        focused && styles.boxFocused,
        invalid && styles.boxInvalid,
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={20} color={iconColor} style={multiline && { marginTop: 14 }} /> : null}
      <TextInput
        style={[styles.input, multiline && styles.inputMulti]}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={hidden}
        multiline={multiline}
        onFocus={(e) => { setFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); onBlur?.(e); }}
        {...props}
      />
      {secure ? (
        <TouchableOpacity onPress={() => setHidden(!hidden)} hitSlop={10}>
          <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.muted} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  box: {
    minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14,
    borderRadius: RADIUS.md, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.surface,
  },
  boxMulti: { alignItems: 'flex-start' },
  boxFocused: { borderColor: COLORS.primary, backgroundColor: COLORS.primarySoft },
  boxInvalid: { borderColor: COLORS.danger, backgroundColor: COLORS.dangerSoft },
  input: { flex: 1, fontFamily: FONTS.medium, fontSize: 14, color: COLORS.text, paddingVertical: 12 },
  inputMulti: { minHeight: 84, textAlignVertical: 'top' },
});
