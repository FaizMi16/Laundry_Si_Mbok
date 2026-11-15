import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../store/AuthContext';
import { BrandHeader, LoginForm } from '../components/organisms';
import { AuthSheetTemplate } from '../components/templates';

export default function LoginScreen({ navigation }) {
  const { login, masukGoogle } = useAuth();
  const sibuk = useRef(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const keBeranda = (role) => navigation.replace(role === 'admin' ? 'AdminTabs' : 'MainTabs');

  // Supabase Auth memverifikasi email + kata sandi; role (user/admin) datang dari database.
  const handleSubmit = async (credentials) => {
    if (sibuk.current) return;
    sibuk.current = true;
    try {
      const result = await login(credentials);
      if (!result.ok) {
        Alert.alert('Gagal masuk', result.error);
        return;
      }
      keBeranda(result.role);
    } finally {
      sibuk.current = false;
    }
  };

  // Google OAuth: akun baru otomatis dibuatkan profil pelanggan; role tetap dari database.
  const handleGoogle = async () => {
    if (sibuk.current) return;
    sibuk.current = true;
    setGoogleLoading(true);
    try {
      const result = await masukGoogle();
      if (!result.ok) {
        Alert.alert('Gagal masuk dengan Google', result.error);
        return;
      }
      keBeranda(result.role);
    } finally {
      sibuk.current = false;
      setGoogleLoading(false);
    }
  };

  return (
    <AuthSheetTemplate header={<BrandHeader />}>
      <LoginForm
        onSubmit={handleSubmit}
        onForgotPassword={() => navigation.navigate('LupaKataSandi')}
        onRegister={() => navigation.navigate('Register')}
        onGoogle={handleGoogle}
        googleLoading={googleLoading}
      />
    </AuthSheetTemplate>
  );
}
