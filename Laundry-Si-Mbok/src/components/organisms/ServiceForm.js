import React, { useState } from 'react';
import { View } from 'react-native';
import { SERVICE_UNITS } from '../../data/dummy';
import { validatePrice, validateRequired, compact, hasErrors } from '../../utils/validators';
import { AppText, Button, Chip, Divider, Toggle } from '../atoms';
import { FormField, MenuItem } from '../molecules';

/**
 * Form tambah / ubah layanan.
 * Props: initial (opsional: layanan yang diubah), onSubmit({ name, price, unit, desc, active })
 */
export default function ServiceForm({ initial, onSubmit }) {
  const editing = !!initial;
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    price: initial ? String(initial.price) : '',
    unit: initial?.unit ?? SERVICE_UNITS[0],
    desc: initial?.desc ?? '',
    active: initial?.active ?? true,
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = () => {
    const e = compact({
      name: validateRequired('Nama layanan')(form.name),
      price: validatePrice(form.price),
    });
    setErrors(e);
    if (hasErrors(e)) return;
    onSubmit({
      name: form.name.trim(),
      price: Number(form.price),
      unit: form.unit,
      desc: form.desc.trim(),
      active: form.active,
    });
  };

  return (
    <View>
      <FormField label="Nama layanan" icon="pricetag-outline" placeholder="Contoh: Cuci Sepatu" value={form.name} onChangeText={set('name')} error={errors.name} />
      <FormField label="Harga (Rp)" icon="cash-outline" placeholder="7000" keyboardType="number-pad" value={form.price} onChangeText={set('price')} error={errors.price} />

      <AppText variant="label" style={{ marginBottom: 8 }}>Satuan</AppText>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
        {SERVICE_UNITS.map((u) => (
          <Chip key={u} label={u === 'kg' ? 'Per kg' : 'Per pcs'} active={form.unit === u} onPress={() => set('unit')(u)} />
        ))}
      </View>

      <FormField label="Deskripsi singkat" icon="document-text-outline" placeholder="Tampil di bawah nama layanan" value={form.desc} onChangeText={set('desc')} />

      <Divider style={{ marginBottom: 4 }} />
      <MenuItem
        icon="eye-outline"
        label="Tampilkan ke pelanggan"
        subtitle={form.active ? 'Layanan bisa dipesan' : 'Disembunyikan dari aplikasi pelanggan'}
        right={<Toggle value={form.active} onValueChange={set('active')} />}
      />
      <Divider style={{ marginBottom: 20 }} />

      <Button title={editing ? 'Simpan perubahan' : 'Tambah layanan'} icon="checkmark-circle-outline" onPress={submit} />
    </View>
  );
}
