import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { Divider } from '../atoms';
import { StatItem } from '../molecules';

/** Kartu ringkasan angka (menimpa tepi bawah header). Props: stats [{ value, label }], style (opsional) */
export default function StatsCard({ stats, style }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card, style]}>
      {stats.map((s, i) => (
        <React.Fragment key={s.label}>
          {i > 0 ? <Divider vertical /> : null}
          <StatItem value={s.value} label={s.label} />
        </React.Fragment>
      ))}
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, marginTop: -34, paddingVertical: 18, borderRadius: 22, backgroundColor: COLORS.surface },
});
