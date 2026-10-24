import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText, IconButton } from '../atoms';

/** Props: value, unit, onChange(n), min */
export default function QuantityStepper({ value, unit, onChange, min = 1 }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={styles.wrap}>
      <IconButton name="remove" variant="soft" size={44} onPress={() => onChange(Math.max(min, value - 1))} />
      <AppText variant="heading">{value} {unit}</AppText>
      <IconButton name="add" variant="soft" size={44} onPress={() => onChange(value + 1)} />
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: 18, backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.border },
});
