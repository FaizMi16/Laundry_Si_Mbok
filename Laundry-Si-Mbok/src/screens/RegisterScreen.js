import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FONTS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import Input from '../components/Input';
import Button from '../components/Button';
import ScreenHeader from '../components/ScreenHeader';

export default function RegisterScreen({ navigation }) {
  const { colors: COLORS, isDark } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const set = (key) => (v) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nama lengkap wajib diisi';
    if (!form.phone.trim()) e.phone = 'Nomor HP wajib diisi';
    else if (!/^08\d{8,11}$/.test(form.phone)) e.phone = 'Gunakan format 08xxxxxxxxxx';
    if (!form.email.trim()) e.email = 'Email wajib diisi';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Format email tidak valid';
    if (form.password.length < 8) e.password = 'Minimal 8 karakter';
    if (form.confirm !== form.password || !form.confirm) e.confirm = 'Kata sandi tidak sama';
    if (!agree) e.agree = 'Kamu harus menyetujui syarat & ketentuan';
    setErrors(e);
    if (Object.keys(e).length === 0) navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScreenHeader title="Buat akun" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Yuk, mulai laundry</Text>
          <Text style={styles.desc}>Isi data di bawah untuk membuat akun barumu.</Text>

          <Input label="Nama lengkap" icon="person-outline" placeholder="Nama kamu" value={form.name} onChangeText={set('name')} error={errors.name} />
          <Input label="Nomor HP" icon="call-outline" placeholder="08xxxxxxxxxx" keyboardType="phone-pad" value={form.phone} onChangeText={set('phone')} error={errors.phone} />
          <Input label="Email" icon="mail-outline" placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={set('email')} error={errors.email} />
          <Input label="Kata sandi" icon="lock-closed-outline" placeholder="Minimal 8 karakter" secure value={form.password} onChangeText={set('password')} error={errors.password} />
          <Input label="Konfirmasi kata sandi" icon="shield-checkmark-outline" placeholder="Ulangi kata sandi" secure value={form.confirm} onChangeText={set('confirm')} error={errors.confirm} />

          <TouchableOpacity style={styles.agreeRow} onPress={() => { setAgree(!agree); setErrors((e) => ({ ...e, agree: undefined })); }} activeOpacity={0.7}>
            <View style={[styles.check, agree && styles.checkOn, errors.agree && styles.checkError]}>
              {agree && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
            </View>
            <Text style={styles.agreeText}>
              Aku setuju dengan <Text style={styles.link}>Syarat & Ketentuan</Text> dan <Text style={styles.link}>Kebijakan Privasi</Text>.
            </Text>
          </TouchableOpacity>
          {errors.agree ? <Text style={styles.agreeError}>{errors.agree}</Text> : null}

          <Button title="Daftar" onPress={submit} />

          <View style={styles.footerRow}>
            <Text style={styles.desc2}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, paddingTop: 8, paddingBottom: 40 },
  title: { fontFamily: FONTS.extra, fontSize: 24, color: COLORS.text },
  desc: { fontFamily: FONTS.regular, fontSize: 14, color: COLORS.muted, marginTop: 6, marginBottom: 24 },
  desc2: { fontFamily: FONTS.regular, fontSize: 14, color: COLORS.muted },
  agreeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 24 },
  check: { width: 22, height: 22, borderRadius: 7, borderWidth: 1.5, borderColor: COLORS.disabled, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  checkError: { borderColor: COLORS.danger },
  agreeError: { fontFamily: FONTS.medium, fontSize: 12, color: COLORS.danger, marginTop: -16, marginBottom: 20 },
  checkOn: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  agreeText: { flex: 1, fontFamily: FONTS.regular, fontSize: 13, lineHeight: 20, color: COLORS.muted },
  link: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.primary },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
});
