import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../store/AuthContext';
import { useUser } from '../store/UserContext';
import { BrandHeader, LoginForm } from '../components/organisms';
import { AuthSheetTemplate } from '../components/templates';

export default function LoginScreen({ navigation }) {
  const { login, logout } = useAuth();
  const { masuk } = useUser();
  const sibuk = useRef(false);

  // Admin masih dicek lokal. Pelanggan dimuat dari Supabase (email belum terdaftar -> akun demo).
  // TODO(auth): ganti dengan Supabase Auth; role (user/admin) ditentukan server
  const handleSubmit = async (credentials) => {
    if (sibuk.current) return;
    sibuk.current = true;
    try {
      const result = login(credentials);
      if (!result.ok) {
        Alert.alert('Gagal masuk', result.error);
        return;
      }
      if (result.role === 'user' && !(await masuk(credentials.email))) {
        logout(); // pesan error sudah ditampilkan oleh store
        return;
      }
      navigation.replace(result.role === 'admin' ? 'AdminTabs' : 'MainTabs');
    } finally {
      sibuk.current = false;
    }
  };

  return (
    <AuthSheetTemplate header={<BrandHeader />}>
      <LoginForm
        onSubmit={handleSubmit}
        onForgotPassword={() =>
          Alert.alert('Segera hadir', 'Pemulihan kata sandi akan tersedia setelah aplikasi terhubung ke server.')
        }
        onRegister={() => navigation.navigate('Register')}
      />
    </AuthSheetTemplate>
  );
}
