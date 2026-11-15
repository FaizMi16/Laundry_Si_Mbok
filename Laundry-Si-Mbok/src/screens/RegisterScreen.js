import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../store/AuthContext';
import { RegisterForm } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function RegisterScreen({ navigation }) {
  const { register, masukGoogle } = useAuth();
  const sibuk = useRef(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Membuat akun Supabase Auth (profil pengguna dibuat trigger). Sesi aktif -> langsung ke beranda; bila perlu verifikasi email -> kembali ke Login.
  const handleSubmit = async ({ name, phone, email, password }) => {
    if (sibuk.current) return;
    sibuk.current = true;
    try {
      const result = await register({ name, phone, email, password });
      if (!result.ok) {
        Alert.alert('Gagal mendaftar', result.error);
        return;
      }
      if (result.role) {
        navigation.replace(result.role === 'admin' ? 'AdminTabs' : 'MainTabs'); // sesi langsung aktif
        return;
      }
      Alert.alert(
        'Akun dibuat',
        'Silakan masuk dengan email dan kata sandimu. Bila diminta, verifikasi emailmu dulu.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } finally {
      sibuk.current = false;
    }
  };

  // Daftar lewat Google = langsung masuk (akun Google sudah terverifikasi).
  const handleGoogle = async () => {
    if (sibuk.current) return;
    sibuk.current = true;
    setGoogleLoading(true);
    try {
      const result = await masukGoogle();
      if (!result.ok) {
        Alert.alert('Gagal mendaftar dengan Google', result.error);
        return;
      }
      navigation.replace(result.role === 'admin' ? 'AdminTabs' : 'MainTabs');
    } finally {
      sibuk.current = false;
      setGoogleLoading(false);
    }
  };

  return (
    <ScreenTemplate title="Buat akun" onBack={() => navigation.goBack()} keyboard>
      <RegisterForm
        onSubmit={handleSubmit}
        onLogin={() => navigation.goBack()}
        onGoogle={handleGoogle}
        googleLoading={googleLoading}
      />
    </ScreenTemplate>
  );
}
