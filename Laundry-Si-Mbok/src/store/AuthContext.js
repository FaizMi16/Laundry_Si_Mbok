import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AppState, NativeModules } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';

/** Menutup tab browser setelah Google mengembalikan kode ke aplikasi. */
WebBrowser.maybeCompleteAuthSession();

/**
 * Sesi login satu pintu untuk user & admin (halaman Login yang sama), memakai Supabase Auth.
 * - Login = email + kata sandi; kata sandi di-hash oleh Supabase, tidak pernah ada di kode.
 * - Role ('user' | 'admin') dibaca dari kolom `role` tabel `pengguna`, BUKAN dari input pengguna.
 * - Pesan gagal login sengaja generik (tidak membedakan email tak terdaftar / sandi salah).
 * Semua action async dan TIDAK melempar error: hasilnya { ok: true, ... } atau { ok: false, error }.
 */
const AuthContext = createContext(null);

const JUDUL_ADMIN = 'Pemilik & admin gerai';

// Jalur login Google. true = lewat proxy Expo (auth.expo.io), cara di modul praktikum; halaman proxy bisa
// meminta ketukan manual "Return to the app". false = Supabase langsung mengembalikan ke Expo Go (butuh Redirect
// URL exp://** di Supabase); di sebagian HP tab browser macet loading. Bila satu jalur bermasalah, coba yang lain.
const PAKAI_PROXY = true;
const PROXY_URL = 'https://auth.expo.io/@anonymous/Laundry-Si-Mbok';

// Perangkat uji = Expo Go. Ubah ke false bila nanti memakai development build / aplikasi rilis.
const UJI_DI_EXPO_GO = true;

/** Alamat Metro (mis. 192.168.101.9:8081), diambil dari konfigurasi Expo atau alamat bundle JS. */
function alamatMetro() {
  const dariConfig = Constants.expoConfig?.hostUri ?? Constants.expoGoConfig?.debuggerHost;
  if (dariConfig) return dariConfig;
  const bundle = NativeModules?.SourceCode?.scriptURL ?? '';
  return /^https?:\/\/([^/]+)/.exec(bundle)?.[1] ?? null;
}

/**
 * Alamat tujuan kembali ke aplikasi setelah login Google.
 * Di Expo Go WAJIB exp://<ip>:<port>/--/auth/callback: Expo Go tidak bisa membuka scheme custom
 * (laundrysimbok://). `scheme` diberikan eksplisit di cabang lain agar tidak bergantung pada app.json.
 */
function buatReturnUrl() {
  const host = alamatMetro();
  if (UJI_DI_EXPO_GO && host) return `exp://${host}/--/auth/callback`;
  return AuthSession.makeRedirectUri({ scheme: 'laundrysimbok', path: 'auth/callback' });
}

async function muatProfil(userId) {
  const { data, error } = await supabase
    .from('pengguna')
    .select('id, nama, email, telepon, role')
    .eq('id', userId)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

export function AuthProvider({ children }) {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true); // true selama sesi tersimpan dipulihkan

  useEffect(() => {
    let aktif = true;

    (async () => {
      let p = null;
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) p = await muatProfil(data.session.user.id);
      } catch (e) {
        console.log('Gagal memulihkan sesi:', e?.message ?? e);
      }
      if (aktif) { setProfil(p); setLoading(false); }
    })();

    // Token kedaluwarsa / keluar dari tempat lain -> kosongkan sesi.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') setProfil(null);
    });

    // Di HP, refresh token hanya berjalan saat aplikasi aktif.
    const appState = AppState.addEventListener('change', (state) => {
      if (state === 'active') supabase.auth.startAutoRefresh();
      else supabase.auth.stopAutoRefresh();
    });

    return () => { aktif = false; sub.subscription.unsubscribe(); appState.remove(); };
  }, []);

  /** Mengembalikan { ok, role } atau { ok: false, error }. */
  const login = useCallback(async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error || !data.user) {
      const msg = error?.message ?? '';
      if (/email not confirmed/i.test(msg)) return { ok: false, error: 'Email belum diverifikasi. Cek kotak masuk emailmu.' };
      if (/network|fetch/i.test(msg)) return { ok: false, error: 'Tidak bisa terhubung ke server. Periksa koneksi internet.' };
      return { ok: false, error: 'Email atau kata sandi salah.' };
    }
    const p = await muatProfil(data.user.id);
    if (!p) {
      await supabase.auth.signOut();
      return { ok: false, error: 'Profil akun tidak ditemukan. Hubungi admin.' };
    }
    setProfil(p);
    return { ok: true, role: p.role };
  }, []);

  /** Daftar akun pelanggan. Baris `pengguna` dibuat trigger di database (role selalu 'user'). */
  const register = useCallback(async ({ name, phone, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { nama: name.trim(), telepon: phone.trim() } },
    });
    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('already registered')) return { ok: false, error: 'Email ini sudah terdaftar. Silakan masuk.' };
      if (msg.includes('password')) return { ok: false, error: 'Kata sandi terlalu lemah.' };
      if (msg.includes('rate limit')) return { ok: false, error: 'Terlalu banyak percobaan. Coba lagi nanti.' };
      if (msg.includes('database error')) return { ok: false, error: 'Pendaftaran gagal. Email atau nomor ini mungkin sudah dipakai.' };
      return { ok: false, error: 'Pendaftaran gagal. Silakan coba lagi.' };
    }
    // "Confirm email" mati -> signUp langsung memberi sesi: langsung masuk ke beranda.
    // Menyala -> akun harus diverifikasi lewat email dulu, lalu masuk lewat halaman Login.
    if (data.session?.user) {
      const p = await muatProfil(data.session.user.id);
      if (p) { setProfil(p); return { ok: true, role: p.role }; }
    }
    await supabase.auth.signOut();
    return { ok: true };
  }, []);

  /** Login / daftar dengan akun Google (OAuth 2.0 + PKCE). Akun baru otomatis dibuatkan profil oleh trigger. */
  const masukGoogle = useCallback(async () => {
    try {
      const returnUrl = buatReturnUrl();
      console.log('[google] returnUrl:', returnUrl, '| proxy:', PAKAI_PROXY);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: PAKAI_PROXY ? PROXY_URL : returnUrl, skipBrowserRedirect: true },
      });
      if (error || !data?.url) return { ok: false, error: 'Tidak bisa membuka Google. Coba lagi.' };

      const bukaUrl = PAKAI_PROXY
        ? `${PROXY_URL}/start?${new URLSearchParams({ authUrl: data.url, returnUrl }).toString()}`
        : data.url;
      // Di Android, tab browser sering tertutup SEBELUM URL kembali tiba di aplikasi, sehingga hasilnya
      // 'dismiss' padahal login berhasil. Karena itu URL juga ditangkap langsung dari Linking dan ditunggu sebentar.
      let urlKembali = null;
      const langganan = Linking.addEventListener('url', ({ url }) => {
        if (url && url.includes('code=')) urlKembali = url;
      });
      try {
        const hasil = await WebBrowser.openAuthSessionAsync(bukaUrl, returnUrl);
        console.log('[google] hasil browser:', hasil.type, '| url dari browser:', hasil.url ? 'ada' : 'tidak ada');
        if (hasil.type === 'success' && hasil.url) urlKembali = hasil.url;
        for (let i = 0; i < 20 && !urlKembali; i += 1) {
          await new Promise((selesai) => setTimeout(selesai, 250)); // tunggu s.d. 5 detik
        }
      } finally {
        langganan.remove();
      }
      console.log('[google] url kembali:', urlKembali ? 'ada' : 'tidak ada');
      if (!urlKembali) return { ok: false, error: 'Login Google dibatalkan.' };

      const code = new URL(urlKembali).searchParams.get('code');
      if (!code) return { ok: false, error: 'Kode otorisasi tidak ditemukan. Coba lagi.' };

      const { data: tukar, error: tukarError } = await supabase.auth.exchangeCodeForSession(code);
      if (tukarError || !tukar.user) return { ok: false, error: 'Gagal menyelesaikan login Google. Coba lagi.' };

      const p = await muatProfil(tukar.user.id);
      if (!p) {
        await supabase.auth.signOut();
        return { ok: false, error: 'Profil akun tidak ditemukan. Hubungi admin.' };
      }
      setProfil(p);
      return { ok: true, role: p.role };
    } catch (e) {
      console.log('[google] error:', e?.message ?? e);
      return { ok: false, error: 'Login Google gagal. Coba lagi.' };
    }
  }, []);

  /** Lupa kata sandi, langkah 1: kirim kode ke email. Hasil sukses SELALU sama (tidak membocorkan email terdaftar). */
  const kirimKodeReset = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase());
    if (error) {
      const msg = error.message.toLowerCase();
      if (error.status === 429 || msg.includes('rate limit')) return { ok: false, error: 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.' };
      if (/network|fetch/.test(msg)) return { ok: false, error: 'Tidak bisa terhubung ke server. Periksa koneksi internet.' };
      return { ok: false, error: 'Gagal mengirim kode. Silakan coba lagi.' };
    }
    return { ok: true };
  }, []);

  /** Lupa kata sandi, langkah 2: verifikasi kode dari email, ganti kata sandi, lalu keluar (harus login ulang). */
  const resetPassword = useCallback(async ({ email, kode, next }) => {
    const { error: otpError } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: kode,
      type: 'recovery',
    });
    if (otpError) return { ok: false, error: 'Kode salah atau sudah kedaluwarsa.' };
    const { error } = await supabase.auth.updateUser({ password: next });
    await supabase.auth.signOut();
    if (error) {
      return { ok: false, error: /different|same/i.test(error.message) ? 'Kata sandi baru harus berbeda dari yang lama.' : 'Gagal mengubah kata sandi. Coba lagi.' };
    }
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setProfil(null);
  }, []);

  /** Verifikasi kata sandi lama (Supabase tidak memeriksanya), lalu ganti dengan yang baru. */
  const changePassword = useCallback(async ({ current, next }) => {
    if (!profil) return { ok: false, error: 'Silakan masuk terlebih dahulu.' };
    const { error: verifError } = await supabase.auth.signInWithPassword({ email: profil.email, password: current });
    if (verifError) return { ok: false, error: 'Kata sandi saat ini salah.' };
    const { error } = await supabase.auth.updateUser({ password: next });
    if (error) {
      return { ok: false, error: /different|same/i.test(error.message) ? 'Kata sandi baru harus berbeda.' : 'Gagal mengubah kata sandi. Coba lagi.' };
    }
    return { ok: true };
  }, [profil]);

  const admin = useMemo(() => ({
    id: profil?.id ?? '',
    name: profil?.nama ?? '',
    email: profil?.email ?? '',
    phone: profil?.telepon ?? '',
    role: 'admin',
    title: JUDUL_ADMIN,
  }), [profil]);

  const value = useMemo(
    () => ({ profil, role: profil?.role ?? null, loading, admin, login, register, masukGoogle, kirimKodeReset, resetPassword, logout, changePassword }),
    [profil, loading, admin, login, register, masukGoogle, kirimKodeReset, resetPassword, logout, changePassword]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>');
  return ctx;
}
