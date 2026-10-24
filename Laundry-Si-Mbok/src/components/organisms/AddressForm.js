import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { ADDRESS_LABELS } from '../../data/dummy';
import { AppText, Button, Chip, Toggle } from '../atoms';
import { FormField, MenuItem } from '../molecules';
import { validateRequired, validatePhone, compact, hasErrors } from '../../utils/validators';

const EMPTY = { label: 'Rumah', recipient: '', phone: '', detail: '', note: '', isPrimary: false };

/** Form tambah/ubah alamat. Props: initial, submitLabel, onSubmit(values) */
export default function AddressForm({ initial, submitLabel = 'Simpan alamat', onSubmit }) {
  const { styles } = useThemedStyles(makeStyles);
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = () => {
    const e = compact({
      recipient: validateRequired('Nama penerima')(form.recipient),
      phone: validatePhone(form.phone),
      detail: form.detail.trim().length < 10 ? 'Alamat wajib diisi lengkap (minimal 10 karakter)' : undefined,
    });
    setErrors(e);
    if (!hasErrors(e)) onSubmit(form);
  };

  return (
    <View>
      <AppText variant="label" style={{ marginBottom: 8 }}>Label alamat</AppText>
      <View style={styles.chips}>
        {ADDRESS_LABELS.map((l) => (
          <Chip key={l} label={l} active={form.label === l} onPress={() => set('label')(l)} />
        ))}
      </View>

      <FormField label="Nama penerima" icon="person-outline" placeholder="Nama penerima" value={form.recipient} onChangeText={set('recipient')} error={errors.recipient} />
      <FormField label="Nomor HP" icon="call-outline" placeholder="08xxxxxxxxxx" keyboardType="phone-pad" value={form.phone} onChangeText={set('phone')} error={errors.phone} />
      <FormField label="Alamat lengkap" icon="location-outline" placeholder="Jalan, nomor, RT/RW, kecamatan, kota" multiline value={form.detail} onChangeText={set('detail')} error={errors.detail} />
      <FormField label="Catatan untuk kurir (opsional)" icon="create-outline" placeholder="Contoh: pagar hijau, titip ke satpam" multiline value={form.note} onChangeText={set('note')} />

      <View style={[styles.toggleCard, SHADOW.card]}>
        <MenuItem
          icon="star-outline"
          label="Jadikan alamat utama"
          subtitle={initial?.isPrimary ? 'Pilih alamat lain untuk mengganti alamat utama' : 'Dipakai otomatis saat membuat pesanan'}
          right={<Toggle value={form.isPrimary} disabled={!!initial?.isPrimary} onValueChange={set('isPrimary')} />}
        />
      </View>

      <Button title={submitLabel} icon="checkmark-circle-outline" onPress={submit} style={{ marginTop: 24 }} />
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  toggleCard: { backgroundColor: COLORS.surface, borderRadius: 20, paddingHorizontal: 16 },
});
