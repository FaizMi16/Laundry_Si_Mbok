import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useThemedStyles } from '../../theme/ThemeContext';
import { ScreenHeader } from '../molecules';

/**
 * Kerangka halaman standar: SafeArea + StatusBar + ScreenHeader + isi + footer opsional.
 * Props:
 *  - title, onBack, headerRight
 *  - scroll (default true) — false bila isi sudah scrollable sendiri (mis. FlatList)
 *  - padded (default true) — padding isi 24px
 *  - keyboard — bungkus dengan KeyboardAvoidingView (untuk halaman form)
 *  - footer — node yang menempel di bawah (mis. tombol utama)
 *  - edges — default: semua sisi bila ada tombol kembali, hanya atas bila halaman tab
 */
export default function ScreenTemplate({
  title, onBack, headerRight, children, footer,
  scroll = true, padded = true, keyboard = false, edges, contentContainerStyle,
}) {
  const { styles, isDark } = useThemedStyles(makeStyles);
  const safeEdges = edges || (onBack ? ['top', 'bottom', 'left', 'right'] : ['top']);

  const body = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[padded && styles.content, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, padded && styles.content, contentContainerStyle]}>{children}</View>
  );

  const main = (
    <>
      {body}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={safeEdges}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScreenHeader title={title} onBack={onBack} right={headerRight} />
      {keyboard ? (
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {main}
        </KeyboardAvoidingView>
      ) : (
        main
      )}
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  content: { padding: 24, paddingTop: 8, paddingBottom: 40 },
  footer: { padding: 20, paddingTop: 12, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border },
});
