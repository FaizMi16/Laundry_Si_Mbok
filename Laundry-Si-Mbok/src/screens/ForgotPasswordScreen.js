import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useAuth } from '../store/AuthContext';
import { AppText, Button, TextButton } from '../components/atoms';
import { FormField } from '../components/molecules';
import { ScreenTemplate } from '../components/templates';
import { validateEmail, validatePassword, compact, hasErrors } from '../utils/validators';

const KODE_RE = /^\d{6,10}$/;

/** Lupa kata sandi dua langkah: (1) kirim kode ke email, (2) kode + kata sandi baru. */
export default function ForgotPasswordScreen({ navigation }) {
  const { kirimKodeReset, resetPassword } = useAuth();
  const [langkah, setLangkah] = useState(1);
  const [form, setForm] = useState({ email: '', kode: '', next: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [sibuk, setSibuk] = useState(false);

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const kirimKode = async () => {
    if (sibuk) return false;
    const e = compact({ email: validateEmail(form.email) });
    setErrors(e);
    if (hasErrors(e)) return false;
    setSibuk(true);
    const hasil = await kirimKodeReset(form.email);
    setSibuk(false);
    if (!hasil.ok) { Alert.alert('Gagal', hasil.error); return false; }
    return true;
  };

  const lanjut = async () => { if (await kirimKode()) setLangkah(2); };

  const kirimUlang = async () => {
    if (await kirimKode()) Alert.alert('Kode dikirim', 'Bila email terdaftar, kode baru sudah dikirim.');
  };

  const simpan = async () => {
    if (sibuk) return;
    const e = compact({
      kode: KODE_RE.test(form.kode.trim()) ? undefined : 'Masukkan kode angka dari email',
      next: validatePassword(form.next),
      confirm: form.confirm && form.confirm === form.next ? undefined : 'Kata sandi tidak sama',
    });
    setErrors(e);
    if (hasErrors(e)) return;
    setSibuk(true);
    const hasil = await resetPassword({ email: form.email, kode: form.kode.trim(), next: form.next });
    setSibuk(false);
    if (!hasil.ok) { Alert.alert('Gagal', hasil.error); return; }
    Alert.alert('Berhasil', 'Kata sandimu sudah diubah. Silakan masuk dengan kata sandi baru.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScreenTemplate title="Lupa kata sandi" onBack={() => navigation.goBack()} keyboard>
      {langkah === 1 ? (
        <View>
          <AppText variant="body" color="muted" style={{ marginBottom: 24 }}>
            Masukkan email akunmu. Kami akan mengirim kode untuk membuat kata sandi baru.
          </AppText>
          <FormField
            label="Email" icon="mail-outline" placeholder="nama@email.com"
            keyboardType="email-address" autoCapitalize="none"
            value={form.email} onChangeText={set('email')} error={errors.email}
          />
          <Button title="Kirim kode" onPress={lanjut} loading={sibuk} />
        </View>
      ) : (
        <View>
          <AppText variant="body" color="muted" style={{ marginBottom: 24 }}>
            Bila email terdaftar, kode sudah dikirim ke {form.email.trim()}. Cek kotak masuk dan folder spam.
          </AppText>
          <FormField
            label="Kode dari email" icon="keypad-outline" placeholder="Masukkan kode" keyboardType="number-pad"
            value={form.kode} onChangeText={set('kode')} error={errors.kode}
          />
          <FormField
            label="Kata sandi baru" icon="key-outline" placeholder="Minimal 8 karakter" secure
            value={form.next} onChangeText={set('next')} error={errors.next}
          />
          <FormField
            label="Konfirmasi kata sandi baru" icon="shield-checkmark-outline" placeholder="Ulangi kata sandi baru" secure
            value={form.confirm} onChangeText={set('confirm')} error={errors.confirm}
          />
          <Button title="Ubah kata sandi" icon="checkmark-circle-outline" onPress={simpan} loading={sibuk} style={{ marginTop: 8 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 20 }}>
            <TextButton label="Kirim ulang kode" onPress={kirimUlang} />
            <TextButton label="Ganti email" onPress={() => setLangkah(1)} />
          </View>
        </View>
      )}
    </ScreenTemplate>
  );
}
