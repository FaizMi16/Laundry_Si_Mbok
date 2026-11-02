import { STEPS, formatRupiah } from '../data/dummy';
import { MONTH_NAMES_ID, parseDateID } from './format';

// Fungsi murni untuk logika alur pesanan — dipakai user & admin agar aturannya satu.
export const LAST_STEP = STEPS.length - 1;

export const isFinished = (order) => order.step >= LAST_STEP;

/** Langkah berikutnya. "Antar sendiri" melewati Dijemput (1) dan Diantar (3). */
export const nextStep = (order) => {
  if (isFinished(order)) return null;
  if (order.methodId === 'antar') return order.step === 0 ? 2 : LAST_STEP;
  return order.step + 1;
};

export const prevStep = (order) => {
  if (order.step <= 0) return null;
  if (order.methodId === 'antar') return order.step === LAST_STEP ? 2 : 0;
  return order.step - 1;
};

/** Teks tombol aksi admin untuk memajukan pesanan. */
export const nextActionLabel = (order) => {
  const next = nextStep(order);
  if (next === null) return null;
  const walkIn = order.methodId === 'antar';
  if (next === 1) return 'Tandai sudah dijemput';
  if (next === 2) return walkIn ? 'Terima cucian & mulai cuci' : 'Mulai proses cuci';
  if (next === 3) return 'Kirim ke pelanggan';
  return walkIn ? 'Tandai sudah diambil' : 'Tandai selesai';
};

// ───────────────────────── Berat & total (diisi admin setelah cucian ditimbang) ─────────────────────────
// Pesanan baru dari user belum punya qty/total (null). Admin mengisinya di Detail Pesanan.

/** Sudah ditimbang = jumlah dan total sudah terisi. */
export const isWeighed = (order) => order.qty != null && order.total != null;

/** Harga satuan. Pesanan baru menyimpan `price`; data contoh diturunkan dari total. */
export const unitPriceOf = (order) => {
  if (order.price != null) return order.price;
  if (order.qty && order.total != null) return (order.total - (order.fee || 0)) / order.qty;
  return null;
};

/** Total = harga satuan × jumlah + ongkos jemput (dibulatkan ke rupiah). */
export const computeTotal = (price, qty, fee) => Math.round(price * qty) + (fee || 0);

/** 2.5 -> "2,5" (format angka Indonesia). */
export const formatQty = (qty) => String(qty).replace('.', ',');

/** Teks jumlah untuk ditampilkan; aman untuk pesanan yang belum ditimbang. */
export const formatAmount = (order) =>
  order.qty != null ? `${formatQty(order.qty)} ${order.unit}` : 'Belum ditimbang';

/** Teks total untuk ditampilkan; aman untuk pesanan yang belum ditimbang. */
export const formatTotal = (order) =>
  order.total != null ? formatRupiah(order.total) : 'Belum dihitung';

/**
 * Baca input admin. kg: bilangan bulat atau 1 angka desimal ("2,5" / "2.5");
 * pcs: bilangan bulat. Mengembalikan null bila tidak valid atau 0.
 */
export const parseQty = (text, unit) => {
  const t = String(text).trim();
  const pattern = unit === 'pcs' ? /^\d+$/ : /^\d+([.,]\d)?$/;
  if (!pattern.test(t)) return null;
  const n = Number(t.replace(',', '.'));
  return n > 0 ? n : null;
};

export const FILTER_MATCHERS = {
  all: () => true,
  new: (o) => o.step === 0,
  process: (o) => o.step > 0 && o.step < LAST_STEP,
  done: (o) => o.step === LAST_STEP,
  unpaid: (o) => !o.paid,
};

export const matchesFilter = (order, filterId) => (FILTER_MATCHERS[filterId] || FILTER_MATCHERS.all)(order);

export const matchesQuery = (order, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [order.id, order.customer.name, order.customer.phone, order.service]
    .some((v) => String(v).toLowerCase().includes(q));
};

export const summarizeOrders = (orders) => ({
  fresh: orders.filter(FILTER_MATCHERS.new).length,
  process: orders.filter(FILTER_MATCHERS.process).length,
  done: orders.filter(FILTER_MATCHERS.done).length,
  unpaid: orders.filter(FILTER_MATCHERS.unpaid).length,
  revenue: orders.filter((o) => o.paid).reduce((sum, o) => sum + (o.total || 0), 0),
  outstanding: orders.filter((o) => !o.paid).reduce((sum, o) => sum + (o.total || 0), 0),
});

/** Kelompokkan pesanan menjadi daftar pelanggan (urutan: pesanan terbaru dulu). */
export const groupCustomers = (orders) => {
  const map = new Map();
  orders.forEach((o) => {
    const c = map.get(o.customer.id) || { ...o.customer, orderCount: 0, activeCount: 0, totalSpend: 0, lastDate: o.date };
    c.orderCount += 1;
    if (!isFinished(o)) c.activeCount += 1;
    c.totalSpend += o.total || 0;
    map.set(o.customer.id, c);
  });
  return Array.from(map.values());
};

// ───────────────────────── Filter periode (Report Keuangan) ─────────────────────────
// Periode memakai tanggal pesanan dibuat (order.date). 'all' = tanpa filter.

/** Daftar tahun yang punya pesanan, terbaru dulu. */
export const availableYears = (orders) => {
  const years = orders.map((o) => parseDateID(o.date)?.year).filter(Boolean);
  return Array.from(new Set(years)).sort((a, b) => b - a);
};

/** Pesanan pada tahun (dan bulan 0–11) tertentu. year 'all' = semua pesanan. */
export const filterByPeriod = (orders, year = 'all', month = 'all') => {
  if (year === 'all') return orders;
  return orders.filter((o) => {
    const d = parseDateID(o.date);
    return d && d.year === year && (month === 'all' || d.month === month);
  });
};

export const periodLabel = (year = 'all', month = 'all') => {
  if (year === 'all') return 'Semua periode';
  return month === 'all' ? `Tahun ${year}` : `${MONTH_NAMES_ID[month]} ${year}`;
};
