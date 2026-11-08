import { Alert } from 'react-native';

/** Pesan error Supabase yang bisa dipahami pengguna. */
export const pesanError = (error) => {
  const msg = error?.message || '';
  if (!error) return 'Terjadi kesalahan.';
  if (error.code === '42501' || /row-level security/i.test(msg)) {
    return 'Ditolak oleh kebijakan keamanan (RLS) di database.';
  }
  if (/network|fetch/i.test(msg)) return 'Tidak bisa terhubung ke server. Periksa koneksi internet.';
  return msg || 'Terjadi kesalahan.';
};

/** Tampilkan Alert gagal + catat di Metro console. Dipakai store yang tidak melempar error. */
export const laporGagal = (judul, error) => {
  console.log(`${judul}:`, error?.message ?? error);
  Alert.alert(judul, pesanError(error));
};
