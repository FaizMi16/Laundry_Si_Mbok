import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../store/AuthContext';
import { ChangePasswordForm } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function ChangePasswordScreen({ navigation }) {
  const { changePassword } = useAuth();
  const sibuk = useRef(false);

  // Kata sandi lama diverifikasi ke Supabase; gagal -> pesan jelas, bukan "berhasil" palsu.
  const handleSubmit = async ({ current, next }) => {
    if (sibuk.current) return;
    sibuk.current = true;
    try {
      const result = await changePassword({ current, next });
      if (!result.ok) {
        Alert.alert('Gagal', result.error);
        return;
      }
      Alert.alert('Berhasil', 'Kata sandimu sudah diubah.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } finally {
      sibuk.current = false;
    }
  };

  return (
    <ScreenTemplate title="Ubah kata sandi" onBack={() => navigation.goBack()} keyboard>
      <ChangePasswordForm onSubmit={handleSubmit} />
    </ScreenTemplate>
  );
}
