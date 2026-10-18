import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

export default function ScreenHeader({ title, onBack }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  return (
    <View style={styles.row}>
      {onBack ? (
        <TouchableOpacity style={styles.back} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  back: {
    width: 40, height: 40, borderRadius: 14, backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center',
  },
  spacer: { width: 40 },
  title: { fontFamily: FONTS.bold, fontSize: 17, color: COLORS.text },
});
