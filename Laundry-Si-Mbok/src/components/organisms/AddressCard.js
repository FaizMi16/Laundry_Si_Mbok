import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { AppText, Badge, Divider, IconBadge, TextButton } from '../atoms';

const LABEL_ICONS = { Rumah: 'home-outline', Kantor: 'briefcase-outline', Kos: 'bed-outline' };

/** Kartu alamat tersimpan. Props: address, onEdit, onDelete, onSetPrimary */
export default function AddressCard({ address, onEdit, onDelete, onSetPrimary }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={[styles.card, SHADOW.card]}>
      <View style={styles.head}>
        <IconBadge name={LABEL_ICONS[address.label] || 'location-outline'} size={40} />
        <AppText variant="bodyBold" style={{ flex: 1 }}>{address.label}</AppText>
        {address.isPrimary ? <Badge label="Utama" tone="success" /> : null}
      </View>

      <AppText variant="item" style={{ marginTop: 14 }}>
        {address.recipient} <AppText variant="caption" color="muted">• {address.phone}</AppText>
      </AppText>
      <AppText variant="body" color="muted" style={{ marginTop: 4 }}>{address.detail}</AppText>
      {address.note ? (
        <AppText variant="caption" color="muted" style={{ marginTop: 6, fontStyle: 'italic' }}>Catatan: {address.note}</AppText>
      ) : null}

      <Divider style={{ marginVertical: 14 }} />
      <View style={styles.actions}>
        {!address.isPrimary ? <TextButton label="Jadikan utama" icon="star-outline" onPress={onSetPrimary} /> : <View />}
        <View style={styles.actionRight}>
          <TextButton label="Ubah" icon="create-outline" onPress={onEdit} />
          <TextButton label="Hapus" icon="trash-outline" tone="danger" onPress={onDelete} />
        </View>
      </View>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 22, padding: 18, marginBottom: 14 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actionRight: { flexDirection: 'row', gap: 18 },
});
