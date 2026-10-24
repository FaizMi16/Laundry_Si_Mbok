import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useThemedStyles } from '../../theme/ThemeContext';

/** Halaman autentikasi: header merek di atas + lembar putih melengkung. Props: header, children */
export default function AuthSheetTemplate({ header, children }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {header}
        <View style={styles.sheet}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primaryDark },
  sheet: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -28, padding: 24, paddingTop: 28 },
});
