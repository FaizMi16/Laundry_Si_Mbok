export const formatRupiah = (n) =>
  'Rp ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const SERVICES = [
  { id: 'kiloan', name: 'Cuci Kiloan', icon: 'basket-outline', price: 7000, unit: 'kg', desc: 'Cuci bersih, dilipat rapi' },
  { id: 'setrika', name: 'Cuci + Setrika', icon: 'flame-outline', price: 9000, unit: 'kg', desc: 'Siap langsung dipakai' },
  { id: 'satuan', name: 'Satuan', icon: 'shirt-outline', price: 15000, unit: 'pcs', desc: 'Jaket, selimut, bedcover' },
  { id: 'dryclean', name: 'Dry Clean', icon: 'sparkles-outline', price: 25000, unit: 'pcs', desc: 'Untuk bahan khusus' },
];

export const METHODS = [
  { id: 'antar', name: 'Antar sendiri', icon: 'walk-outline', desc: 'Bawa ke gerai kami', fee: 0 },
  { id: 'jemput', name: 'Jemput & antar', icon: 'bicycle-outline', desc: 'Kurir datang ke rumah', fee: 5000 },
];

export const DATES = ['Hari ini', 'Besok', 'Lusa'];
export const TIMES = ['08.00 – 10.00', '10.00 – 12.00', '13.00 – 15.00', '16.00 – 18.00'];

export const STEPS = [
  { title: 'Pesanan diterima', desc: 'Kami sudah menerima pesananmu' },
  { title: 'Dijemput', desc: 'Kurir mengambil pakaianmu' },
  { title: 'Sedang dicuci', desc: 'Pakaian sedang diproses' },
  { title: 'Diantar', desc: 'Kurir menuju alamatmu' },
  { title: 'Selesai', desc: 'Pakaian sudah kamu terima' },
];

export const ACTIVE_ORDERS = [
  { id: 'LSM-1018', service: 'Cuci + Setrika', amount: '4 kg', total: 41000, step: 2, date: '18 Okt 2026', method: 'Jemput & antar' },
  { id: 'LSM-1017', service: 'Satuan', amount: '2 pcs', total: 35000, step: 1, date: '18 Okt 2026', method: 'Jemput & antar' },
];

export const HISTORY_ORDERS = [
  { id: 'LSM-1009', service: 'Cuci Kiloan', amount: '5 kg', total: 35000, step: 4, date: '10 Okt 2026', method: 'Antar sendiri' },
  { id: 'LSM-0998', service: 'Dry Clean', amount: '1 pcs', total: 30000, step: 4, date: '2 Okt 2026', method: 'Jemput & antar' },
  { id: 'LSM-0981', service: 'Cuci + Setrika', amount: '3 kg', total: 32000, step: 4, date: '24 Sep 2026', method: 'Jemput & antar' },
];
