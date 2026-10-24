import { STEPS } from '../data/dummy';

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
  revenue: orders.filter((o) => o.paid).reduce((sum, o) => sum + o.total, 0),
  outstanding: orders.filter((o) => !o.paid).reduce((sum, o) => sum + o.total, 0),
});

/** Kelompokkan pesanan menjadi daftar pelanggan (urutan: pesanan terbaru dulu). */
export const groupCustomers = (orders) => {
  const map = new Map();
  orders.forEach((o) => {
    const c = map.get(o.customer.id) || { ...o.customer, orderCount: 0, activeCount: 0, totalSpend: 0, lastDate: o.date };
    c.orderCount += 1;
    if (!isFinished(o)) c.activeCount += 1;
    c.totalSpend += o.total;
    map.set(o.customer.id, c);
  });
  return Array.from(map.values());
};
