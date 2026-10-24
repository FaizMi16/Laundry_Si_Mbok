import React from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../store/AuthContext';
import { BrandHeader, LoginForm } from '../components/organisms';
import { AuthSheetTemplate } from '../components/templates';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  // TODO(backend): panggil API login di sini; role (user/admin) ditentukan server
  const handleSubmit = (credentials) => {
    const result = login(credentials);
    if (!result.ok) {
      Alert.alert('Gagal masuk', result.error);
      return;
    }
    navigation.replace(result.role === 'admin' ? 'AdminTabs' : 'MainTabs');
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
