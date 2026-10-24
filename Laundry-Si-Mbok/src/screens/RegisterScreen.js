import React from 'react';
import { useUser } from '../store/UserContext';
import { RegisterForm } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function RegisterScreen({ navigation }) {
  const { updateUser } = useUser();

  // TODO(backend): kirim data ke API register; sementara disimpan ke store dummy
  const handleSubmit = ({ name, phone, email }) => {
    updateUser({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    navigation.replace('MainTabs');
  };

  return (
    <ScreenTemplate title="Buat akun" onBack={() => navigation.goBack()} keyboard>
      <RegisterForm onSubmit={handleSubmit} onLogin={() => navigation.goBack()} />
    </ScreenTemplate>
  );
}
