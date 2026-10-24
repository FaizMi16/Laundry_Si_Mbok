import React, { useState } from 'react';
import { View } from 'react-native';
import { AppText, Button, TextButton } from '../atoms';
import { CheckboxField, FormField } from '../molecules';
import {
  validateRequired, validatePhone, validateEmail, compact, hasErrors,
} from '../../utils/validators';

/** Props: onSubmit({name, phone, email, password}), onLogin */
export default function RegisterForm({ onSubmit, onLogin }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = () => {
    const e = compact({
      name: validateRequired('Nama lengkap')(form.name),
      phone: validatePhone(form.phone),
      email: validateEmail(form.email),
      password: form.password.length < 8 ? 'Minimal 8 karakter' : undefined,
      confirm: !form.confirm || form.confirm !== form.password ? 'Kata sandi tidak sama' : undefined,
      agree: agree ? undefined : 'Kamu harus menyetujui syarat & ketentuan',
    });
    setErrors(e);
    if (!hasErrors(e)) {
      const { confirm, ...payload } = form;
      onSubmit(payload);
    }
  };

  return (
    <View>
      <AppText variant="display" style={{ fontSize: 24 }}>Yuk, mulai laundry</AppText>
      <AppText variant="body" color="muted" style={{ marginTop: 6, marginBottom: 24 }}>
        Isi data di bawah untuk membuat akun barumu.
      </AppText>

      <FormField label="Nama lengkap" icon="person-outline" placeholder="Nama kamu" value={form.name} onChangeText={set('name')} error={errors.name} />
      <FormField label="Nomor HP" icon="call-outline" placeholder="08xxxxxxxxxx" keyboardType="phone-pad" value={form.phone} onChangeText={set('phone')} error={errors.phone} />
      <FormField label="Email" icon="mail-outline" placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={set('email')} error={errors.email} />
      <FormField label="Kata sandi" icon="lock-closed-outline" placeholder="Minimal 8 karakter" secure value={form.password} onChangeText={set('password')} error={errors.password} />
      <FormField label="Konfirmasi kata sandi" icon="shield-checkmark-outline" placeholder="Ulangi kata sandi" secure value={form.confirm} onChangeText={set('confirm')} error={errors.confirm} />

      <CheckboxField
        checked={agree}
        error={errors.agree}
        onToggle={() => { setAgree(!agree); setErrors((e) => ({ ...e, agree: undefined })); }}
      >
        Aku setuju dengan <AppText variant="label" color="primary">Syarat & Ketentuan</AppText> dan{' '}
        <AppText variant="label" color="primary">Kebijakan Privasi</AppText>.
      </CheckboxField>

      <Button title="Daftar" onPress={submit} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
        <AppText variant="body" color="muted">Sudah punya akun? </AppText>
        <TextButton label="Masuk" onPress={onLogin} />
      </View>
    </View>
  );
}
