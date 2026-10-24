import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import { useOrders } from '../store/OrderContext';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminOrdersScreen from '../screens/admin/AdminOrdersScreen';
import AdminCustomersScreen from '../screens/admin/AdminCustomersScreen';
import AdminServicesScreen from '../screens/admin/AdminServicesScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';

const Tab = createBottomTabNavigator();

const TABS = {
  AdminDasbor: { label: 'Dasbor', icons: ['grid', 'grid-outline'] },
  AdminPesanan: { label: 'Pesanan', icons: ['receipt', 'receipt-outline'] },
  AdminPelanggan: { label: 'Pelanggan', icons: ['people', 'people-outline'] },
  AdminLayanan: { label: 'Layanan', icons: ['pricetags', 'pricetags-outline'] },
  AdminAkun: { label: 'Akun', icons: ['person', 'person-outline'] },
};

export default function AdminTabs() {
  const { colors: COLORS } = useTheme();
  const insets = useSafeAreaInsets();
  const { orders } = useOrders();
  const newCount = orders.filter((o) => o.step === 0).length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.placeholder,
        tabBarLabel: TABS[route.name].label,
        tabBarLabelStyle: { fontFamily: FONTS.semi, fontSize: 11 },
        tabBarBadgeStyle: { backgroundColor: COLORS.danger, color: COLORS.white, fontFamily: FONTS.bold, fontSize: 10 },
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
          <Ionicons name={TABS[route.name].icons[focused ? 0 : 1]} size={22} color={color} />
        ),
      })}
    >
      <Tab.Screen name="AdminDasbor" component={AdminDashboardScreen} />
      <Tab.Screen name="AdminPesanan" component={AdminOrdersScreen} options={{ tabBarBadge: newCount > 0 ? newCount : undefined }} />
      <Tab.Screen name="AdminPelanggan" component={AdminCustomersScreen} />
      <Tab.Screen name="AdminLayanan" component={AdminServicesScreen} />
      <Tab.Screen name="AdminAkun" component={AdminProfileScreen} />
    </Tab.Navigator>
  );
}
