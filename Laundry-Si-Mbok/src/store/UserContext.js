import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MONTHS_ID } from '../utils/format';
import { laporGagal } from '../utils/laporGagal';

/**
 * Data pelanggan yang sedang masuk (sumber: tabel `pelanggan` + `alamat` di Supabase).
 * Belum ada login sungguhan: masuk() mencari pelanggan dari email; email yang belum terdaftar
 * memakai akun demo (perilaku lama aplikasi). Semua action async dan TIDAK melempar error:
 * bila gagal, Alert ditampilkan di sini dan hasilnya `false`.
 * TODO(auth): ganti masuk()/daftar() dengan Supabase Auth, lalu kunci RLS per pengguna.
 */
const UserContext = createContext(null);

export const DEMO_ID = 'USR-001';
const NOTIF_AWAL = { orderStatus: true, reminder: true, promo: true, email: false };
const GUEST = { id: '', name: '', email: '', phone: '', memberSince: '', points: 0 };

// 'YYYY-MM-DD' -> 'Agu 2026'
const bulanTahun = (iso) => {
  if (!iso) return '';
  const [y, m] = String(iso).split('-').map(Number);
  return `${MONTHS_ID[m - 1]} ${y}`;
};

// Pemetaan kolom database (snake_case) -> bentuk yang dipakai layar. Hanya terjadi di sini.
export const keUser = (row) => ({
  id: row.id,
  name: row.nama,
  email: row.email ?? '',
  phone: row.telepon ?? '',
  memberSince: bulanTahun(row.bergabung),
  points: row.poin ?? 0,
});

export const keAlamat = (row) => ({
  id: row.id,
  label: row.label,
  recipient: row.penerima,
  phone: row.telepon ?? '',
  detail: row.detail,
  note: row.catatan ?? '',
  isPrimary: row.utama,
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(GUEST);
  const [addresses, setAddresses] = useState([]);
  const [paymentId, setPaymentIdState] = useState('cash');
  const [notifications, setNotifications] = useState(NOTIF_AWAL);
  const userIdRef = useRef('');
  userIdRef.current = user.id;
  const notifRef = useRef(notifications);
  notifRef.current = notifications;
  const paymentRef = useRef(paymentId);
  paymentRef.current = paymentId;

  // Ambil alamat milik pelanggan; pastikan selalu tepat satu alamat utama selama daftar tidak kosong.
  const muatAlamat = useCallback(async (pelangganId) => {
    const { data, error } = await supabase
      .from('alamat').select('*').eq('pelanggan_id', pelangganId)
      .order('created_at', { ascending: true }).order('id', { ascending: true });
    if (error) { console.log('Gagal memuat alamat:', error.message); return null; }
    const list = data.map(keAlamat);
    if (list.length === 0) return list;
    const first = list.findIndex((a) => a.isPrimary);
    const idx = first === -1 ? 0 : first;
    const rapi = list.map((a, i) => ({ ...a, isPrimary: i === idx }));
    for (let i = 0; i < rapi.length; i += 1) {
      if (rapi[i].isPrimary !== list[i].isPrimary) {
        await supabase.from('alamat').update({ utama: rapi[i].isPrimary }).eq('id', rapi[i].id);
      }
    }
    return rapi;
  }, []);

  const muatUlangAlamat = useCallback(async () => {
    const list = await muatAlamat(userIdRef.current);
    if (list) setAddresses(list);
  }, [muatAlamat]);

  const bukaPelanggan = useCallback(async (row) => {
    userIdRef.current = row.id;
    setUser(keUser(row));
    setPaymentIdState(row.pembayaran_id ?? 'cash');
    setNotifications({ ...NOTIF_AWAL, ...(row.notif || {}) });
    setAddresses((await muatAlamat(row.id)) ?? []);
  }, [muatAlamat]);

  /** Masuk sebagai pelanggan dengan email ini; email belum terdaftar -> akun demo (USR-001). */
  const masuk = useCallback(async (email) => {
    const cari = (kolom, nilai) => supabase.from('pelanggan').select('*').eq(kolom, nilai).maybeSingle();
    let { data, error } = await cari('email', email.trim().toLowerCase());
    if (!error && !data) ({ data, error } = await cari('id', DEMO_ID));
    if (error) { laporGagal('Gagal masuk', error); return false; }
    if (!data) {
      laporGagal('Gagal masuk', { message: 'Data pelanggan belum ada di database. Jalankan SQL tahap 2 di Supabase.' });
      return false;
    }
    await bukaPelanggan(data);
    return true;
  }, [bukaPelanggan]);

  /** Buat pelanggan baru lalu langsung masuk sebagai pelanggan itu. */
  const daftar = useCallback(async ({ name, phone, email }) => {
    const { data, error } = await supabase
      .from('pelanggan')
      .insert({ nama: name.trim(), telepon: phone.trim(), email: email.trim().toLowerCase() })
      .select('*').single();
    if (error) {
      laporGagal('Gagal mendaftar', error.code === '23505' ? { message: 'Email ini sudah terdaftar. Silakan masuk.' } : error);
      return false;
    }
    await bukaPelanggan(data);
    return true;
  }, [bukaPelanggan]);

  const updateUser = useCallback(async (patch) => {
    const kolom = {};
    const lokal = { ...patch };
    if (patch.name !== undefined) kolom.nama = patch.name;
    if (patch.phone !== undefined) kolom.telepon = patch.phone;
    if (patch.email !== undefined) { lokal.email = patch.email.toLowerCase(); kolom.email = lokal.email; }
    const { error } = await supabase.from('pelanggan').update(kolom).eq('id', userIdRef.current);
    if (error) {
      laporGagal('Gagal menyimpan profil', error.code === '23505' ? { message: 'Email ini sudah dipakai pelanggan lain.' } : error);
      return false;
    }
    setUser((u) => ({ ...u, ...lokal }));
    return true;
  }, []);

  const saveAddress = useCallback(async (addr) => {
    const pelangganId = userIdRef.current;
    const kolom = {
      label: addr.label, penerima: addr.recipient, telepon: addr.phone,
      detail: addr.detail, catatan: addr.note ?? '', utama: !!addr.isPrimary,
    };
    let id = addr.id;
    if (id) {
      const { error } = await supabase.from('alamat').update(kolom).eq('id', id);
      if (error) { laporGagal('Gagal menyimpan alamat', error); return false; }
    } else {
      const { data, error } = await supabase.from('alamat').insert({ pelanggan_id: pelangganId, ...kolom }).select('id').single();
      if (error) { laporGagal('Gagal menyimpan alamat', error); return false; }
      id = data.id;
    }
    // Bila alamat ini dijadikan utama, yang lain otomatis dilepas.
    if (addr.isPrimary) {
      const { error } = await supabase.from('alamat').update({ utama: false }).eq('pelanggan_id', pelangganId).neq('id', id);
      if (error) { laporGagal('Gagal menyimpan alamat', error); return false; }
    }
    await muatUlangAlamat();
    return true;
  }, [muatUlangAlamat]);

  const removeAddress = useCallback(async (id) => {
    const { error } = await supabase.from('alamat').delete().eq('id', id);
    if (error) { laporGagal('Gagal menghapus alamat', error); return false; }
    await muatUlangAlamat();
    return true;
  }, [muatUlangAlamat]);

  const setPrimaryAddress = useCallback(async (id) => {
    setAddresses((list) => list.map((a) => ({ ...a, isPrimary: a.id === id })));
    const a = await supabase.from('alamat').update({ utama: true }).eq('id', id);
    const b = a.error ? a : await supabase.from('alamat').update({ utama: false }).eq('pelanggan_id', userIdRef.current).neq('id', id);
    if (b.error) {
      laporGagal('Gagal mengubah alamat utama', b.error);
      await muatUlangAlamat();
      return false;
    }
    return true;
  }, [muatUlangAlamat]);

  // Pengaturan kecil: tampil langsung di layar, lalu disimpan; dibatalkan bila gagal.
  const setPaymentId = useCallback(async (id) => {
    const lama = paymentRef.current;
    setPaymentIdState(id);
    const { error } = await supabase.from('pelanggan').update({ pembayaran_id: id }).eq('id', userIdRef.current);
    if (error) {
      laporGagal('Gagal menyimpan metode pembayaran', error);
      setPaymentIdState(lama);
      return false;
    }
    return true;
  }, []);

  const setNotification = useCallback(async (key, value) => {
    const lama = notifRef.current;
    const baru = { ...lama, [key]: value };
    setNotifications(baru);
    const { error } = await supabase.from('pelanggan').update({ notif: baru }).eq('id', userIdRef.current);
    if (error) {
      laporGagal('Gagal menyimpan pengaturan notifikasi', error);
      setNotifications(lama);
      return false;
    }
    return true;
  }, []);

  const value = useMemo(
    () => ({
      user,
      addresses,
      primaryAddress: addresses.find((a) => a.isPrimary) || null,
      paymentId,
      notifications,
      masuk,
      daftar,
      updateUser,
      saveAddress,
      removeAddress,
      setPrimaryAddress,
      setPaymentId,
      setNotification,
    }),
    [user, addresses, paymentId, notifications, masuk, daftar, updateUser, saveAddress, removeAddress, setPrimaryAddress, setPaymentId, setNotification]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser harus dipakai di dalam <UserProvider>');
  return ctx;
}
