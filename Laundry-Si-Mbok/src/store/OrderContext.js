import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { supabase } from '../lib/supabase';
import { formatDateID } from '../utils/format';
import { laporGagal } from '../utils/laporGagal';
import { computeTotal, formatQty, isFinished, nextStep, prevStep, unitPriceOf } from '../utils/orders';

/**
 * Store pesanan bersama user & admin (sumber: tabel `pesanan` di Supabase).
 * - User membuat pesanan lewat createOrder().
 * - Admin memajukan status / menandai lunas lewat advanceOrder(), revertOrder(), setPaid().
 * - Admin mengisi berat cucian lewat setWeight(); total dihitung dari harga layanan saat dipesan.
 * Semua action async, TIDAK melempar error: bila gagal, Alert ditampilkan di sini dan hasilnya `false`.
 * Perubahan status memakai pembaruan langsung di layar (optimistik) lalu dibatalkan bila database menolak.
 */
const OrderContext = createContext(null);

const SELECT = '*, pelanggan(id, nama, telepon)';

const angka = (v) => (v == null ? null : Number(v));

// 'YYYY-MM-DD' (kolom date) -> Date lokal, supaya tidak bergeser sehari karena zona waktu
const tanggalLokal = (iso) => {
  const [y, m, d] = String(iso).split('-').map(Number);
  return new Date(y, m - 1, d);
};

// Baris database (snake_case) -> bentuk pesanan yang dipakai seluruh layar. Pemetaan hanya di sini.
export const keOrder = (row) => {
  const qty = angka(row.qty);
  return {
    id: row.id,
    customer: {
      id: row.pelanggan?.id ?? row.pelanggan_id,
      name: row.pelanggan?.nama ?? '',
      phone: row.pelanggan?.telepon ?? '',
    },
    serviceId: row.layanan_id,
    service: row.layanan_nama,
    price: angka(row.harga),
    qty,
    unit: row.satuan,
    amount: qty != null ? `${formatQty(qty)} ${row.satuan}` : null,
    fee: angka(row.ongkos) ?? 0,
    total: angka(row.total),
    step: row.langkah,
    date: formatDateID(tanggalLokal(row.tanggal)),
    methodId: row.metode_id,
    method: row.metode,
    address: row.alamat ?? '',
    pickup: row.jemput_tanggal ? { date: row.jemput_tanggal, time: row.jemput_jam } : null,
    note: row.catatan ?? '',
    paymentId: row.pembayaran_id,
    paid: row.lunas,
  };
};

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const ordersRef = useRef(orders);
  ordersRef.current = orders;

  const refresh = useCallback(async () => {
    const { data, error } = await supabase.from('pesanan').select(SELECT).order('id', { ascending: false });
    if (error) console.log('Gagal memuat pesanan:', error.message);
    else if (data) setOrders(data.map(keOrder));
    setMemuat(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  // Admin & pelanggan memakai perangkat berbeda: muat ulang saat aplikasi kembali dibuka.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => { if (state === 'active') refresh(); });
    return () => sub.remove();
  }, [refresh]);

  const createOrder = useCallback(async ({ customer, service, qty, method, address, pickup, note, paymentId, total }) => {
    const { data, error } = await supabase
      .from('pesanan')
      .insert({
        pelanggan_id: customer.id,
        layanan_id: String(service.id),
        layanan_nama: service.name,
        // Berat belum diketahui saat dipesan: qty/total null sampai admin menimbang
        harga: service.price,
        satuan: service.unit,
        qty: qty ?? null,
        ongkos: method.fee,
        total: total ?? null,
        langkah: 0,
        metode_id: method.id,
        metode: method.name,
        alamat: address,
        jemput_tanggal: pickup?.date ?? null,
        jemput_jam: pickup?.time ?? null,
        catatan: note,
        pembayaran_id: paymentId,
        lunas: false,
      })
      .select(SELECT)
      .single();
    if (error) { laporGagal('Gagal membuat pesanan', error); return false; }
    setOrders((list) => [keOrder(data), ...list]);
    return true;
  }, []);

  // `bentuk(order)` mengembalikan { lokal, kolom } (perubahan di layar & di database) atau null bila tidak perlu.
  const ubah = useCallback(async (id, bentuk) => {
    const order = ordersRef.current.find((o) => o.id === id);
    const hasil = order ? bentuk(order) : null;
    if (!hasil) return false;
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, ...hasil.lokal } : o)));
    const { error } = await supabase.from('pesanan').update(hasil.kolom).eq('id', id);
    if (error) {
      laporGagal('Gagal menyimpan perubahan', error);
      await refresh(); // kembalikan layar ke keadaan database
      return false;
    }
    return true;
  }, [refresh]);

  const advanceOrder = useCallback(
    (id) => ubah(id, (o) => {
      if (isFinished(o)) return null;
      const step = nextStep(o);
      return { lokal: { step }, kolom: { langkah: step } };
    }),
    [ubah]
  );

  const revertOrder = useCallback(
    (id) => ubah(id, (o) => {
      if (o.step <= 0) return null;
      const step = prevStep(o);
      return { lokal: { step }, kolom: { langkah: step } };
    }),
    [ubah]
  );

  const setPaid = useCallback(
    (id, paid) => ubah(id, () => ({ lokal: { paid }, kolom: { lunas: paid } })),
    [ubah]
  );

  /** Admin mengisi berat/jumlah; total dihitung ulang dari harga satuan + ongkos jemput. */
  const setWeight = useCallback(
    (id, qty) => ubah(id, (o) => {
      const price = unitPriceOf(o);
      if (price == null) return null;
      const total = computeTotal(price, qty, o.fee);
      return {
        lokal: { price, qty, amount: `${formatQty(qty)} ${o.unit}`, total },
        kolom: { harga: price, qty, total },
      };
    }),
    [ubah]
  );

  const value = useMemo(
    () => ({ orders, memuat, refresh, createOrder, advanceOrder, revertOrder, setPaid, setWeight }),
    [orders, memuat, refresh, createOrder, advanceOrder, revertOrder, setPaid, setWeight]
  );
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders harus dipakai di dalam <OrderProvider>');
  return ctx;
}

/** Pesanan milik satu pelanggan, dipisah aktif / riwayat. */
export function useMyOrders(customerId) {
  const { orders } = useOrders();
  return useMemo(() => {
    const mine = orders.filter((o) => o.customer.id === customerId);
    return {
      all: mine,
      active: mine.filter((o) => !isFinished(o)),
      history: mine.filter(isFinished),
    };
  }, [orders, customerId]);
}
