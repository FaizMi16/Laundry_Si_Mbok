import React, { useState } from 'react';
import { View } from 'react-native';
import { AppText, Avatar, Button } from '../atoms';
import { FormField } from '../molecules';
import { validateRequired, validatePhone, validateEmail, compact, hasErrors } from '../../utils/validators';

/** Props: initial {name, phone, email}, onSubmit(values) */
export default function EditProfileForm({ initial, onSubmit }) {
  const [form, setForm] = useState({ name: initial.name, phone: initial.phone, email: initial.email });
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
    });
    setErrors(e);
    if (!hasErrors(e)) onSubmit({ name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() });
  };

  return (
    <View>
      <View style={{ alignItems: 'center', marginBottom: 28, gap: 10 }}>
        <Avatar name={form.name} size={88} />
        <AppText variant="caption" color="muted">Avatar dibuat otomatis dari inisial namamu</AppText>
      </View>

      <FormField label="Nama lengkap" icon="person-outline" placeholder="Nama kamu" value={form.name} onChangeText={set('name')} error={errors.name} />
      <FormField label="Nomor HP" icon="call-outline" placeholder="08xxxxxxxxxx" keyboardType="phone-pad" value={form.phone} onChangeText={set('phone')} error={errors.phone} />
      <FormField label="Email" icon="mail-outline" placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={set('email')} error={errors.email} />

      <Button title="Simpan perubahan" icon="checkmark-circle-outline" onPress={submit} style={{ marginTop: 8 }} />
    </View>
  );
}
