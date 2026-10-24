import React from 'react';
import { Alert } from 'react-native';
import { useUser } from '../store/UserContext';
import { EditProfileForm } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function EditProfileScreen({ navigation }) {
  const { user, updateUser } = useUser();

  // TODO(backend): PATCH /me, lalu perbarui store dari response
  const handleSubmit = (values) => {
    updateUser(values);
    Alert.alert('Berhasil', 'Profilmu sudah diperbarui.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <ScreenTemplate title="Ubah profil" onBack={() => navigation.goBack()} keyboard>
      <EditProfileForm initial={user} onSubmit={handleSubmit} />
    </ScreenTemplate>
  );
}
