import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, AppText } from '../atoms';

/** Props: title, onBack, right (node opsional di sisi kanan) */
export default function ScreenHeader({ title, onBack, right }) {
  return (
    <View style={styles.row}>
      {onBack ? <IconButton name="chevron-back" onPress={onBack} /> : <View style={styles.spacer} />}
      <AppText variant="bodyBold" style={{ fontSize: 17 }}>{title}</AppText>
      {right || <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  spacer: { width: 40 },
});
