import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { formatRupiah } from '../../data/dummy';
import { AppText, Badge, IconBadge, Toggle } from '../atoms';

/** Baris layanan di kelola layanan. Props: service, onPress (ubah), onToggle (aktif/nonaktif) */
export default function ServiceAdminRow({ service, onPress, onToggle }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 14, minWidth: 0 }}>
        <IconBadge name={service.icon} tone={service.active ? 'primary' : 'danger'} size={42} />
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
    </View>
  );
}
