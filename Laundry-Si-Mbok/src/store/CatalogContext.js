import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { File } from 'expo-file-system';
import { supabase } from '../lib/supabase';

/**
 * Katalog layanan bersama (sumber: tabel `layanan` di Supabase + bucket Storage `layanan`).
 * Admin mengubah katalog, user melihat hasilnya di Beranda & form pesanan — semuanya lewat Context ini.
 * Semua action async dan MELEMPAR error bila Supabase menolak; pemanggil yang menampilkan Alert.
 */
const BUCKET = 'layanan';

// Pemetaan kolom database (snake_case) -> field aplikasi. Hanya terjadi di sini.
const keService = (row) => ({
  id: row.id,
  name: row.nama,
  price: Number(row.harga),
  unit: row.satuan,
  desc: row.deskripsi ?? '',
  icon: row.ikon ?? 'pricetag-outline',
  active: row.aktif,
  foto_url: row.foto_url ?? null,
});

const CONTENT_TYPE = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

const ekstensi = (uri) => {
  const ext = (uri.split('.').pop()?.split('?')[0] ?? '').toLowerCase();
  return /^[a-z0-9]{2,5}$/.test(ext) ? ext : 'jpg';
};

// timestamp + acak mencegah tabrakan nama file di bucket
const namaFile = (ext) => `${Date.now()}-${Math.floor(Math.random() * 1e6)}.${ext}`;

const uploadFoto = async (uri) => {
  const ext = ekstensi(uri);
  const bytes = await new File(uri).bytes();
  const path = namaFile(ext);
  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, { contentType: CONTENT_TYPE[ext] ?? 'image/jpeg' });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
};

const pathDariUrl = (url) => url.split(`/object/public/${BUCKET}/`)[1];

const hapusFoto = async (url) => {
  const path = url ? pathDariUrl(url) : null;
  if (path) await supabase.storage.from(BUCKET).remove([path]);
};

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [services, setServices] = useState([]);
  const [memuat, setMemuat] = useState(true);

  const refresh = useCallback(async () => {
    setMemuat(true);
    const { data, error } = await supabase.from('layanan').select('*').order('created_at', { ascending: true });
    if (error) console.log('Gagal memuat layanan:', error.message);
    else if (data) setServices(data.map(keService));
    setMemuat(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Urutan: upload foto baru -> insert/update baris -> hapus foto lama PALING AKHIR.
  // Keputusan foto dibaca dari fotoUri (keadaan form) dan foto_url (keadaan database sebelum diubah).
  const saveService = useCallback(async (svc) => {
    let foto_url = svc.foto_url ?? null;
    let fotoLama = null;
    if (svc.fotoUri && svc.fotoUri !== svc.foto_url) {
      const up = await uploadFoto(svc.fotoUri);
      foto_url = up.url;
      if (svc.foto_url) fotoLama = svc.foto_url;
    } else if (svc.fotoUri === null && svc.foto_url) {
      fotoLama = svc.foto_url;
      foto_url = null;
    }
    const payload = {
      nama: svc.name, harga: svc.price, satuan: svc.unit, deskripsi: svc.desc,
      ikon: svc.icon ?? 'pricetag-outline', aktif: svc.active, foto_url,
    };
    if (svc.id) {
      const { error } = await supabase.from('layanan').update(payload).eq('id', svc.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('layanan').insert(payload);
      if (error) throw error;
    }
    if (fotoLama) await hapusFoto(fotoLama);
    await refresh();
  }, [refresh]);

  // Menerima OBJEK service (bukan id) karena nilai aktif baru dihitung dari service.active.
  const toggleService = useCallback(async (service) => {
    const { error } = await supabase.from('layanan').update({ aktif: !service.active }).eq('id', service.id);
    if (error) throw error;
    await refresh();
  }, [refresh]);

  const deleteService = useCallback(async (service) => {
    const { error } = await supabase.from('layanan').delete().eq('id', service.id);
    if (error) throw error;
    await hapusFoto(service.foto_url);
    await refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      services, activeServices: services.filter((s) => s.active),
      saveService, toggleService, deleteService, memuat, refresh,
    }),
    [services, saveService, toggleService, deleteService, memuat, refresh]
  );
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog harus dipakai di dalam <CatalogProvider>');
  return ctx;
}
