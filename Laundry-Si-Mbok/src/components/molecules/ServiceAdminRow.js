import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { formatRupiah } from '../../data/dummy';
import { AppText, Badge, IconBadge, IconButton, Toggle } from '../atoms';

/** Baris layanan di kelola layanan. Props: service, onPress (ubah), onToggle (aktif/nonaktif), onDelete (hapus) */
export default function ServiceAdminRow({ service, onPress, onToggle, onDelete }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, minWidth: 0 }}>
        {service.foto_url ? (
          <Image source={{ uri: service.foto_url }} style={{ width: 42, height: 42, borderRadius: 12 }} />
        ) : (
          <IconBadge name={service.icon} tone={service.active ? 'primary' : 'danger'} size={42} />
        )}
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <AppText variant="item" numberOfLines={1} style={{ flexShrink: 1 }}>{service.name}</AppText>
            {!service.active ? <Badge label="Nonaktif" tone="neutral" /> : null}
          </View>
          <AppText variant="caption" color="muted" style={{ marginTop: 2 }}>
            {formatRupiah(service.price)}/{service.unit}
          </AppText>
        </View>
      </TouchableOpacity>
      <Toggle value={service.active} onValueChange={onToggle} />
      <IconButton name="trash-outline" variant="surface" size={36} iconSize={18} radius={12} onPress={onDelete} />
    </View>
  );
}
