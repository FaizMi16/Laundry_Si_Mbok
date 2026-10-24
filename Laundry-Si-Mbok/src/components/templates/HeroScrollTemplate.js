import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useThemedStyles } from '../../theme/ThemeContext';

/** Halaman tab dengan kepala gradient di atas (Beranda, Profil). Props: header, children */
export default function HeroScrollTemplate({ header, children }) {
  const { styles } = useThemedStyles(makeStyles);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {header}
        {children}
      </ScrollView>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 32 },
});
