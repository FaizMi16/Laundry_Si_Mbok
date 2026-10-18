import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const ICONS = {
  Beranda: ['home', 'home-outline'],
  Pesanan: ['receipt', 'receipt-outline'],
  Riwayat: ['time', 'time-outline'],
  Profil: ['person', 'person-outline'],
};

export default function MainTabs() {
  const { colors: COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.placeholder,
        tabBarLabelStyle: { fontFamily: FONTS.semi, fontSize: 11 },
        tabBarStyle: {
          height: 64 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom + 6,
          backgroundColor: COLORS.surface,
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: COLORS.primaryDark,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name={ICONS[route.name][focused ? 0 : 1]}
            size={22}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Beranda" component={HomeScreen} />
      <Tab.Screen name="Pesanan" component={OrdersScreen} />
      <Tab.Screen name="Riwayat" component={HistoryScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
