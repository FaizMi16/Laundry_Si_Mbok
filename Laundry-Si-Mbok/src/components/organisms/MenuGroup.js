import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText, Divider } from '../atoms';
import { MenuItem } from '../molecules';

/**
 * Kartu berisi beberapa MenuItem dengan pemisah.
 * Props: title (opsional), items [{ icon, label, subtitle, value, tone, onPress, right }]
 */
export default function MenuGroup({ title, items, style }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[{ marginTop: 24 }, style]}>
      {title ? <AppText variant="small" color="muted" style={styles.title}>{title.toUpperCase()}</AppText> : null}
      <View style={[styles.card, SHADOW.card]}>
        {items.map((item, i) => (
          <React.Fragment key={item.label}>
            {i > 0 ? <Divider /> : null}
            <MenuItem {...item} />
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  title: { marginBottom: 10, marginLeft: 4, letterSpacing: 0.8 },
  card: { borderRadius: 22, backgroundColor: COLORS.surface, paddingHorizontal: 16 },
});
