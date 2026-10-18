import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';

import RootNavigator from './src/navigation/RootNavigator';
import { LIGHT } from './src/theme/theme';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

// Dipisah dari App agar bisa memakai useTheme()
// (hook hanya bisa dipakai di dalam ThemeProvider)
function Root() {
  const { colors, isDark } = useTheme();
  const base = isDark ? DarkTheme : DefaultTheme;

  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: LIGHT.background }}>
        <ActivityIndicator color={LIGHT.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
