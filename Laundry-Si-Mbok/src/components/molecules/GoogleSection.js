import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText, Button } from '../atoms';
import { useTheme } from '../../theme/ThemeContext';

/** Pembatas "atau" + tombol Google. Props: title, onPress, loading, disabled */
export default function GoogleSection({ title, onPress, loading, disabled }) {
  const { colors } = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
        <AppText variant="caption" color="muted">atau</AppText>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
      </View>
      <Button
        title={title}
        icon="logo-google"
        iconPosition="left"
        variant="outline"
        onPress={onPress}
        loading={loading}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  line: { flex: 1, height: 1 },
});
