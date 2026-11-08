import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { useUser } from '../store/UserContext';
import { EditProfileForm } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function EditProfileScreen({ navigation }) {
  const { user, updateUser } = useUser();
  const sibuk = useRef(false);

  // Disimpan ke Supabase; pesan berhasil hanya bila database menerima (gagal -> Alert dari store)
  const handleSubmit = async (values) => {
    if (sibuk.current) return;
    sibuk.current = true;
    const ok = await updateUser(values);
    sibuk.current = false;
    if (ok) Alert.alert('Berhasil', 'Profilmu sudah diperbarui.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <ScreenTemplate title="Ubah profil" onBack={() => navigation.goBack()} keyboard>
      <EditProfileForm initial={user} onSubmit={handleSubmit} />
    </ScreenTemplate>
  );
}
