import React, { useRef } from 'react';
import { useUser } from '../store/UserContext';
import { RegisterForm } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function RegisterScreen({ navigation }) {
  const { daftar } = useUser();
  const sibuk = useRef(false);

  // Membuat pelanggan baru di Supabase lalu masuk sebagai pelanggan itu (gagal -> Alert dari store)
  const handleSubmit = async ({ name, phone, email }) => {
    if (sibuk.current) return;
    sibuk.current = true;
    const ok = await daftar({ name, phone, email });
    sibuk.current = false;
    if (ok) navigation.replace('MainTabs');
  };

  return (
    <ScreenTemplate title="Buat akun" onBack={() => navigation.goBack()} keyboard>
      <RegisterForm onSubmit={handleSubmit} onLogin={() => navigation.goBack()} />
    </ScreenTemplate>
  );
}
