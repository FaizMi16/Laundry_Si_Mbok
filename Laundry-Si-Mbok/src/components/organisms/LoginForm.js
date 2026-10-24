import React, { useState } from 'react';
import { View } from 'react-native';
import { AppText, Button, TextButton } from '../atoms';
import { FormField } from '../molecules';
import { validateEmail, validatePassword, compact, hasErrors } from '../../utils/validators';

/** Props: onSubmit({email, password}), onForgotPassword, onRegister */
export default function LoginForm({ onSubmit, onForgotPassword, onRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = () => {
    const e = compact({ email: validateEmail(form.email), password: validatePassword(form.password) });
    setErrors(e);
    if (!hasErrors(e)) onSubmit(form);
  };

  return (
    <View>
      <AppText variant="title">Selamat datang kembali</AppText>
      <AppText variant="body" color="muted" style={{ marginTop: 6, marginBottom: 24 }}>
        Masuk untuk mengelola pesanan laundry kamu.
      </AppText>

      <FormField
        label="Email" icon="mail-outline" placeholder="nama@email.com"
        keyboardType="email-address" autoCapitalize="none"
        value={form.email} onChangeText={set('email')} error={errors.email}
      />
      <FormField
        label="Kata sandi" icon="lock-closed-outline" placeholder="Masukkan kata sandi" secure
        value={form.password} onChangeText={set('password')} error={errors.password}
      />

      <TextButton label="Lupa kata sandi?" onPress={onForgotPassword} style={{ alignSelf: 'flex-end', marginBottom: 20, marginTop: -4 }} />

      <Button title="Masuk" onPress={submit} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
        <AppText variant="body" color="muted">Belum punya akun? </AppText>
        <TextButton label="Daftar" onPress={onRegister} />
      </View>
    </View>
  );
}
