import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { STEPS } from '../../data/dummy';
import { TimelineStep } from '../molecules';

/** Linimasa status pesanan. Props: step (indeks langkah saat ini) */
export default function OrderTimeline({ step }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card]}>
      {STEPS.map((s, i) => (
        <TimelineStep
          key={s.title}
          title={s.title}
          description={s.desc}
          done={i <= step}
          last={i === STEPS.length - 1}
          lineDone={i < step}
        />
      ))}
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 22, padding: 18 },
});
