import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SERVICE_UNITS } from '../../data/dummy';
import { useTheme } from '../../theme/ThemeContext';
import { validatePrice, validateRequired, compact, hasErrors } from '../../utils/validators';
import { AppText, Button, Chip, Divider, Toggle } from '../atoms';
import { FormField, MenuItem } from '../molecules';

/**
 * Form tambah / ubah layanan (+ foto opsional, validasi realtime).
 * Props: initial (opsional: layanan yang diubah),
 *        onSubmit(async)({ name, price, unit, desc, active, fotoUri, foto_url })
 */
export default function ServiceForm({ initial, onSubmit }) {
  const editing = !!initial;
  const { colors: COLORS } = useTheme();
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    price: initial ? String(initial.price) : '',
    unit: initial?.unit ?? SERVICE_UNITS[0],
    desc: initial?.desc ?? '',
    active: initial?.active ?? true,
  });
  const [errors, setErrors] = useState({});
  const [fotoUri, setFotoUri] = useState(initial?.foto_url ?? null);
  const [menyimpan, setMenyimpan] = useState(false);
  const [touched, setTouched] = useState({});

  // Field tanpa validasi (satuan, deskripsi, aktif)
  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Validasi REALTIME: validator yang sudah ada dipanggil di setiap perubahan nilai.
  const tandaiSentuh = (key) => setTouched((t) => ({ ...t, [key]: true }));
  const validasiField = (key, value) => {
    if (key === 'name') return validateRequired('Nama layanan')(value);
    if (key === 'price') return validatePrice(value);
    return undefined;
  };
  const ubahField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: validasiField(key, value) }));
    tandaiSentuh(key); // mulai mengetik = sudah disentuh, jadi error langsung tampil
  };

  // Tombol nonaktif selama ADA error aktif. Form kosong yang belum disentuh masih bisa
  // ditekan: submit() lalu menampilkan semua error sekaligus (uji realtime ke-3).
  // Ingin ketat (nonaktif juga saat kosong)? Tambahkan: && form.name.trim() !== '' && form.price.trim() !== ''
  const formValid = !hasErrors(errors);

  const pilihFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7,
    });
    if (!result.canceled) setFotoUri(result.assets[0].uri);
  };

  const submit = async () => {
    const e = compact({
      name: validateRequired('Nama layanan')(form.name),
      price: validatePrice(form.price),
    });
    setErrors(e);
    setTouched({ name: true, price: true });
    if (hasErrors(e) || menyimpan) return;
    setMenyimpan(true);
    try {
      await onSubmit({
        name: form.name.trim(),
        price: Number(form.price),
        unit: form.unit,
        desc: form.desc.trim(),
        active: form.active,
        fotoUri,
        foto_url: initial?.foto_url ?? null,
      });
    } finally {
      setMenyimpan(false);
    }
  };

  return (
    <View>
      <FormField label="Nama layanan" icon="pricetag-outline" placeholder="Contoh: Cuci Sepatu" value={form.name} onChangeText={(v) => ubahField('name', v)} onBlur={() => tandaiSentuh('name')} error={touched.name ? errors.name : undefined} />
      <FormField label="Harga (Rp)" icon="cash-outline" placeholder="7000" keyboardType="number-pad" value={form.price} onChangeText={(v) => ubahField('price', v)} onBlur={() => tandaiSentuh('price')} error={touched.price ? errors.price : undefined} />

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

      <AppText variant="label" style={{ marginBottom: 8 }}>Foto layanan (opsional)</AppText>
      <TouchableOpacity
        onPress={pilihFoto}
        style={{
          width: 110, height: 110, borderRadius: 20, borderWidth: 1.5, borderStyle: 'dashed',
          borderColor: COLORS.primary, backgroundColor: COLORS.surface,
          alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 8,
        }}
      >
        {fotoUri ? (
          <Image source={{ uri: fotoUri }} style={{ width: '100%', height: '100%' }} />
        ) : (
          <AppText variant="caption" color="muted">Tambah foto</AppText>
        )}
      </TouchableOpacity>
      {fotoUri ? (
        <TouchableOpacity onPress={() => setFotoUri(null)} style={{ marginBottom: 16 }}>
          <AppText variant="caption" style={{ color: COLORS.danger }}>Hapus foto</AppText>
        </TouchableOpacity>
      ) : null}

      <Button title={editing ? 'Simpan perubahan' : 'Tambah layanan'} icon="checkmark-circle-outline" onPress={submit} loading={menyimpan} disabled={!formValid} style={{ marginTop: 8 }} />
    </View>
  );
}
