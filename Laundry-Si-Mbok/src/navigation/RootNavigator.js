import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabs from './MainTabs';
import AdminTabs from './AdminTabs';
import OrderFormScreen from '../screens/OrderFormScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddressListScreen from '../screens/AddressListScreen';
import AddressFormScreen from '../screens/AddressFormScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import NotificationSettingsScreen from '../screens/NotificationSettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import HelpScreen from '../screens/HelpScreen';
import AdminOrderDetailScreen from '../screens/admin/AdminOrderDetailScreen';
import AdminCustomerDetailScreen from '../screens/admin/AdminCustomerDetailScreen';
import AdminServiceFormScreen from '../screens/admin/AdminServiceFormScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { colors: COLORS } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Pemesanan" component={OrderFormScreen} />
      <Stack.Screen name="DetailPesanan" component={OrderDetailScreen} />

      {/* Sub-halaman Profil */}
      <Stack.Screen name="UbahProfil" component={EditProfileScreen} />
      <Stack.Screen name="AlamatTersimpan" component={AddressListScreen} />
      <Stack.Screen name="FormAlamat" component={AddressFormScreen} />
      <Stack.Screen name="MetodePembayaran" component={PaymentMethodScreen} />
      <Stack.Screen name="PengaturanNotifikasi" component={NotificationSettingsScreen} />
      <Stack.Screen name="UbahKataSandi" component={ChangePasswordScreen} />
      <Stack.Screen name="Bantuan" component={HelpScreen} />

      {/* Role admin (masuk lewat halaman Login yang sama) */}
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="AdminDetailPesanan" component={AdminOrderDetailScreen} />
      <Stack.Screen name="AdminDetailPelanggan" component={AdminCustomerDetailScreen} />
      <Stack.Screen name="AdminFormLayanan" component={AdminServiceFormScreen} />
    </Stack.Navigator>
  );
}
