import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function LoginScreen({ navigation }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email wajib diisi';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Format email tidak valid';
    if (!password) e.password = 'Kata sandi wajib diisi';
    else if (password.length < 8) e.password = 'Minimal 8 karakter';
    setErrors(e);
    if (Object.keys(e).length === 0) navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 32 }]}
        >
          <View style={[styles.bubble, { width: 120, height: 120, top: -30, right: -30 }]} />
          <View style={[styles.bubble, { width: 50, height: 50, bottom: 50, left: 30 }]} />
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={styles.brand}>Laundry Si Mbok</Text>
          <Text style={styles.headerSub}>Bersih, wangi, tanpa ribet.</Text>
        </LinearGradient>

        <View style={styles.sheet}>
          <Text style={styles.title}>Selamat datang kembali</Text>
          <Text style={styles.desc}>Masuk untuk mengelola pesanan laundry kamu.</Text>

          <Input
            label="Email"
            icon="mail-outline"
            placeholder="nama@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { setEmail(t); setErrors((x) => ({ ...x, email: undefined })); }}
            error={errors.email}
          />
          <Input
            label="Kata sandi"
            icon="lock-closed-outline"
            placeholder="Masukkan kata sandi"
            secure
            value={password}
            onChangeText={(t) => { setPassword(t); setErrors((x) => ({ ...x, password: undefined })); }}
            error={errors.password}
          />

          <TouchableOpacity style={styles.forgot} onPress={() => {}}>
            <Text style={styles.link}>Lupa kata sandi?</Text>
          </TouchableOpacity>

          <Button title="Masuk" onPress={submit} />

          <View style={styles.footerRow}>
            <Text style={styles.desc}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primaryDark },
  header: { alignItems: 'center', paddingBottom: 56, overflow: 'hidden' },
  bubble: { position: 'absolute', borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.14)' },
  logo: { width: 72, height: 72, borderRadius: 24, marginBottom: 14 },
  brand: { fontFamily: FONTS.extra, fontSize: 22, color: COLORS.white },
  headerSub: { fontFamily: FONTS.medium, fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  sheet: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -28, padding: 24, paddingTop: 28 },
  title: { fontFamily: FONTS.extra, fontSize: 22, color: COLORS.text },
  desc: { fontFamily: FONTS.regular, fontSize: 14, color: COLORS.muted, marginTop: 6, marginBottom: 24 },
  forgot: { alignSelf: 'flex-end', marginBottom: 20, marginTop: -4 },
  link: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.primary },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
});
