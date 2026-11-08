import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { formatRupiah } from '../../data/dummy';
import { AppText, IconBadge } from '../atoms';

/** Kartu layanan di beranda. Props: service, onPress */
export default function ServiceTile({ service, onPress }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <TouchableOpacity style={[styles.card, SHADOW.card]} activeOpacity={0.85} onPress={onPress}>
      {service.foto_url ? (
        <Image source={{ uri: service.foto_url }} style={{ width: 42, height: 42, borderRadius: 12, marginBottom: 12 }} />
      ) : (
        <IconBadge name={service.icon} size={42} style={{ marginBottom: 12 }} />
      )}
      <AppText variant="bodyBold" style={{ fontSize: 14 }}>{service.name}</AppText>
      <AppText variant="caption" color="muted" style={{ marginTop: 4 }}>
        {formatRupiah(service.price)}/{service.unit}
      </AppText>
    </TouchableOpacity>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { width: '47.5%', backgroundColor: COLORS.surface, borderRadius: 20, padding: 16 },
});
