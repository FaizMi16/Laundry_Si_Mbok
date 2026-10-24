import React, { useState } from 'react';
import { View } from 'react-native';
import { AppText, Button } from '../atoms';
import { FormField } from '../molecules';
import { validatePassword, compact, hasErrors } from '../../utils/validators';

/** Props: onSubmit({ current, next }) */
export default function ChangePasswordForm({ onSubmit }) {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = () => {
    const e = compact({
      current: form.current ? undefined : 'Kata sandi saat ini wajib diisi',
      next: validatePassword(form.next) || (form.next === form.current ? 'Harus berbeda dari kata sandi saat ini' : undefined),
      confirm: form.confirm && form.confirm === form.next ? undefined : 'Kata sandi tidak sama',
    });
    setErrors(e);
    if (!hasErrors(e)) onSubmit({ current: form.current, next: form.next });
  };

  return (
    <View>
      <AppText variant="body" color="muted" style={{ marginBottom: 24 }}>
        Gunakan minimal 8 karakter dan jangan bagikan kata sandimu ke siapa pun.
      </AppText>
      <FormField label="Kata sandi saat ini" icon="lock-closed-outline" placeholder="Masukkan kata sandi lama" secure value={form.current} onChangeText={set('current')} error={errors.current} />
      <FormField label="Kata sandi baru" icon="key-outline" placeholder="Minimal 8 karakter" secure value={form.next} onChangeText={set('next')} error={errors.next} />
      <FormField label="Konfirmasi kata sandi baru" icon="shield-checkmark-outline" placeholder="Ulangi kata sandi baru" secure value={form.confirm} onChangeText={set('confirm')} error={errors.confirm} />
      <Button title="Ubah kata sandi" icon="checkmark-circle-outline" onPress={submit} style={{ marginTop: 8 }} />
    </View>
  );
}
