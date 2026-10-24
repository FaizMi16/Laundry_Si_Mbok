import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../atoms';

/** Satu pertanyaan akordeon. Props: question, answer, expanded, onPress */
export default function FaqItem({ question, answer, expanded, onPress }) {
  const { colors } = useTheme();
  return (
    <View style={{ paddingVertical: 14 }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <AppText variant="item" style={{ flex: 1 }}>{question}</AppText>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={expanded ? colors.primary : colors.placeholder} />
      </TouchableOpacity>
      {expanded ? <AppText variant="body" color="muted" style={{ marginTop: 10 }}>{answer}</AppText> : null}
    </View>
  );
}
