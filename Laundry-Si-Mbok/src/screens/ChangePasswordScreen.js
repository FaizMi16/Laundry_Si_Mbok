import React from 'react';
import { Alert } from 'react-native';
import { ChangePasswordForm } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function ChangePasswordScreen({ navigation }) {
  // TODO(backend): POST /me/password; tampilkan error server bila kata sandi lama salah
  const handleSubmit = () =>
    Alert.alert('Berhasil', 'Kata sandimu sudah diubah.', [{ text: 'OK', onPress: () => navigation.goBack() }]);

  return (
    <ScreenTemplate title="Ubah kata sandi" onBack={() => navigation.goBack()} keyboard>
      <ChangePasswordForm onSubmit={handleSubmit} />
    </ScreenTemplate>
  );
}
