// Validator form terpusat. Mengembalikan pesan error (string) atau undefined bila valid.
export const EMAIL_RE = /^\S+@\S+\.\S+$/;
export const PHONE_RE = /^08\d{8,11}$/;

export const validateRequired = (label) => (v = '') =>
  v.trim() ? undefined : `${label} wajib diisi`;

export const validateEmail = (v = '') => {
  if (!v.trim()) return 'Email wajib diisi';
  if (!EMAIL_RE.test(v)) return 'Format email tidak valid';
  return undefined;
};

export const validatePhone = (v = '') => {
  if (!v.trim()) return 'Nomor HP wajib diisi';
  if (!PHONE_RE.test(v)) return 'Gunakan format 08xxxxxxxxxx';
  return undefined;
};

export const validatePassword = (v = '') => {
  if (!v) return 'Kata sandi wajib diisi';
  if (v.length < 8) return 'Minimal 8 karakter';
  return undefined;
};

/** Hapus key yang bernilai undefined, lalu cek apakah masih ada error. */
export const compact = (errors) =>
  Object.fromEntries(Object.entries(errors).filter(([, v]) => v));
export const hasErrors = (errors) => Object.keys(compact(errors)).length > 0;

/** Harga layanan: angka bulat, minimal Rp 1.000. */
export const validatePrice = (v = '') => {
  const raw = String(v).trim();
  if (!raw) return 'Harga wajib diisi';
  if (!/^\d+$/.test(raw)) return 'Harga hanya boleh angka';
  if (Number(raw) < 1000) return 'Minimal Rp 1.000';
  return undefined;
};
