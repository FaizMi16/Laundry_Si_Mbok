import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabs from './MainTabs';
import OrderFormScreen from '../screens/OrderFormScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';

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
    </Stack.Navigator>
  );
}
