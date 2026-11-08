import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { Divider } from '../atoms';
import { ServiceAdminRow } from '../molecules';

/** Daftar layanan dalam satu kartu. Props: services, onEdit(service), onToggle(service), onDelete(service) */
export default function ServiceAdminList({ services, onEdit, onToggle, onDelete }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card]}>
      {services.map((s, i) => (
        <React.Fragment key={s.id}>
          {i > 0 ? <Divider /> : null}
          <ServiceAdminRow service={s} onPress={() => onEdit(s)} onToggle={() => onToggle(s)} onDelete={() => onDelete(s)} />
        </React.Fragment>
      ))}
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { borderRadius: 22, backgroundColor: COLORS.surface, paddingHorizontal: 16 },
});
