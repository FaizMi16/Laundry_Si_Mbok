import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText } from '../atoms';

/** Satu langkah di linimasa status. Props: title, description, done, last, lineDone */
export default function TimelineStep({ title, description, done, last, lineDone }) {
  const { styles, colors } = useThemedStyles(makeStyles);
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <View style={[styles.node, done && styles.nodeOn]}>
          {done ? <Ionicons name="checkmark" size={14} color={colors.white} /> : null}
        </View>
        {!last ? <View style={[styles.line, lineDone && styles.lineOn]} /> : null}
      </View>
      <View style={styles.text}>
        <AppText variant="bodyBold" style={{ fontSize: 14 }} color={done ? 'text' : 'placeholder'}>{title}</AppText>
        <AppText variant="caption" color="muted" style={{ marginTop: 2 }}>{description}</AppText>
      </View>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  row: { flexDirection: 'row', gap: 14 },
  rail: { alignItems: 'center' },
  node: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  nodeOn: { backgroundColor: COLORS.primary },
  line: { width: 2, flex: 1, minHeight: 28, backgroundColor: COLORS.border },
  lineOn: { backgroundColor: COLORS.primary },
  text: { flex: 1, paddingBottom: 18 },
});
