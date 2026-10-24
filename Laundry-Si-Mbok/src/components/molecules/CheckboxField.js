import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppText, Checkbox } from '../atoms';

/** Checkbox + teks (children) + pesan error. Props: checked, onToggle, error */
export default function CheckboxField({ checked, onToggle, error, children }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
        <View style={{ marginTop: 1 }}><Checkbox checked={checked} invalid={!!error} /></View>
        <AppText variant="body" color="muted" style={{ flex: 1, fontSize: 13, lineHeight: 20 }}>{children}</AppText>
      </TouchableOpacity>
      {error ? <AppText variant="caption" color="danger" style={{ marginTop: 8 }}>{error}</AppText> : null}
    </View>
  );
}
