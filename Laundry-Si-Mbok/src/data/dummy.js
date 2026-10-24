export const formatRupiah = (n) =>
  'Rp ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const SERVICES = [
  { id: 'kiloan', name: 'Cuci Kiloan', icon: 'basket-outline', price: 7000, unit: 'kg', desc: 'Cuci bersih, dilipat rapi', active: true },
  { id: 'setrika', name: 'Cuci + Setrika', icon: 'flame-outline', price: 9000, unit: 'kg', desc: 'Siap langsung dipakai', active: true },
  { id: 'satuan', name: 'Satuan', icon: 'shirt-outline', price: 15000, unit: 'pcs', desc: 'Jaket, selimut, bedcover', active: true },
  { id: 'dryclean', name: 'Dry Clean', icon: 'sparkles-outline', price: 25000, unit: 'pcs', desc: 'Untuk bahan khusus', active: true },
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

// ───────────────────────── Pesanan (dummy, dipakai user & admin) ─────────────────────────
// Satu sumber data untuk dua role: pesanan yang dibuat user muncul di admin,
// dan perubahan status dari admin terlihat di aplikasi user.
// step: 0 diterima · 1 dijemput · 2 dicuci · 3 diantar · 4 selesai
// Untuk "Antar sendiri", step 1 & 3 dilewati (0 → 2 → 4).
const C = {
  budi: { id: 'USR-001', name: 'Budi Santoso', phone: '081234567890' },
  siti: { id: 'CUS-002', name: 'Siti Rahayu', phone: '081298765432' },
  agus: { id: 'CUS-003', name: 'Agus Pratama', phone: '081377712345' },
  dewi: { id: 'CUS-004', name: 'Dewi Lestari', phone: '085711122233' },
  rina: { id: 'CUS-005', name: 'Rina Marlina', phone: '082144455566' },
};
const JEMPUT = 'Jemput & antar';
const ANTAR = 'Antar sendiri';

export const SEED_ORDERS = [
  { id: 'LSM-1020', customer: C.siti, serviceId: 'kiloan', service: 'Cuci Kiloan', qty: 6, unit: 'kg', amount: '6 kg', fee: 5000, total: 47000, step: 0, date: '24 Okt 2026', methodId: 'jemput', method: JEMPUT, address: 'Jl. Kenanga No. 7, Cilandak, Jakarta Selatan 12430', pickup: { date: 'Hari ini', time: '10.00 – 12.00' }, note: 'Pisahkan baju putih', paymentId: 'qris', paid: false },
  { id: 'LSM-1019', customer: C.agus, serviceId: 'setrika', service: 'Cuci + Setrika', qty: 5, unit: 'kg', amount: '5 kg', fee: 0, total: 45000, step: 0, date: '24 Okt 2026', methodId: 'antar', method: ANTAR, address: '', pickup: null, note: '', paymentId: 'cash', paid: false },
  { id: 'LSM-1018', customer: C.budi, serviceId: 'setrika', service: 'Cuci + Setrika', qty: 4, unit: 'kg', amount: '4 kg', fee: 5000, total: 41000, step: 2, date: '18 Okt 2026', methodId: 'jemput', method: JEMPUT, address: 'Jl. Melati No. 12, RT 03/RW 05, Kebayoran Baru, Jakarta Selatan 12120', pickup: { date: 'Hari ini', time: '08.00 – 10.00' }, note: 'Pagar hijau, titip ke satpam bila tidak ada orang', paymentId: 'cash', paid: false },
  { id: 'LSM-1017', customer: C.budi, serviceId: 'satuan', service: 'Satuan', qty: 2, unit: 'pcs', amount: '2 pcs', fee: 5000, total: 35000, step: 1, date: '18 Okt 2026', methodId: 'jemput', method: JEMPUT, address: 'Jl. Melati No. 12, RT 03/RW 05, Kebayoran Baru, Jakarta Selatan 12120', pickup: { date: 'Hari ini', time: '13.00 – 15.00' }, note: 'Jaket dan selimut', paymentId: 'cash', paid: false },
  { id: 'LSM-1016', customer: C.dewi, serviceId: 'satuan', service: 'Satuan', qty: 3, unit: 'pcs', amount: '3 pcs', fee: 5000, total: 50000, step: 3, date: '23 Okt 2026', methodId: 'jemput', method: JEMPUT, address: 'Apartemen Green Park Tower B Lt. 12 No. 1208, Jakarta Selatan', pickup: { date: 'Kemarin', time: '16.00 – 18.00' }, note: 'Bedcover & 2 selimut', paymentId: 'ewallet', paid: true },
  { id: 'LSM-1015', customer: C.rina, serviceId: 'dryclean', service: 'Dry Clean', qty: 2, unit: 'pcs', amount: '2 pcs', fee: 5000, total: 55000, step: 2, date: '22 Okt 2026', methodId: 'jemput', method: JEMPUT, address: 'Jl. Cempaka Putih No. 3, Pasar Minggu, Jakarta Selatan', pickup: { date: '22 Okt', time: '10.00 – 12.00' }, note: 'Blazer wol, jangan disetrika uap', paymentId: 'transfer', paid: true },
  { id: 'LSM-1014', customer: C.agus, serviceId: 'kiloan', service: 'Cuci Kiloan', qty: 8, unit: 'kg', amount: '8 kg', fee: 0, total: 56000, step: 2, date: '22 Okt 2026', methodId: 'antar', method: ANTAR, address: '', pickup: null, note: '', paymentId: 'cash', paid: false },
  { id: 'LSM-1013', customer: C.siti, serviceId: 'setrika', service: 'Cuci + Setrika', qty: 4, unit: 'kg', amount: '4 kg', fee: 5000, total: 41000, step: 4, date: '20 Okt 2026', methodId: 'jemput', method: JEMPUT, address: 'Jl. Kenanga No. 7, Cilandak, Jakarta Selatan 12430', pickup: { date: '20 Okt', time: '08.00 – 10.00' }, note: '', paymentId: 'qris', paid: true },
  { id: 'LSM-1012', customer: C.dewi, serviceId: 'kiloan', service: 'Cuci Kiloan', qty: 10, unit: 'kg', amount: '10 kg', fee: 0, total: 70000, step: 4, date: '19 Okt 2026', methodId: 'jemput', method: JEMPUT, address: 'Apartemen Green Park Tower B Lt. 12 No. 1208, Jakarta Selatan', pickup: { date: '19 Okt', time: '16.00 – 18.00' }, note: 'Gratis ongkos jemput (promo)', paymentId: 'ewallet', paid: true },
  { id: 'LSM-1009', customer: C.budi, serviceId: 'kiloan', service: 'Cuci Kiloan', qty: 5, unit: 'kg', amount: '5 kg', fee: 0, total: 35000, step: 4, date: '10 Okt 2026', methodId: 'antar', method: ANTAR, address: '', pickup: null, note: '', paymentId: 'cash', paid: true },
  { id: 'LSM-0998', customer: C.budi, serviceId: 'dryclean', service: 'Dry Clean', qty: 1, unit: 'pcs', amount: '1 pcs', fee: 5000, total: 30000, step: 4, date: '2 Okt 2026', methodId: 'jemput', method: JEMPUT, address: 'Gedung Graha Sentosa Lt. 7, Jl. Jend. Sudirman Kav. 52, Jakarta Selatan 12190', pickup: { date: '2 Okt', time: '10.00 – 12.00' }, note: '', paymentId: 'cash', paid: true },
  { id: 'LSM-0981', customer: C.budi, serviceId: 'setrika', service: 'Cuci + Setrika', qty: 3, unit: 'kg', amount: '3 kg', fee: 5000, total: 32000, step: 4, date: '24 Sep 2026', methodId: 'jemput', method: JEMPUT, address: 'Jl. Melati No. 12, RT 03/RW 05, Kebayoran Baru, Jakarta Selatan 12120', pickup: { date: '24 Sep', time: '08.00 – 10.00' }, note: '', paymentId: 'cash', paid: true },
];

// ───────────────────────── Data admin (dummy) ─────────────────────────
// Akun admin masuk lewat halaman Login yang sama dengan user.
// TODO(backend): hapus kredensial ini; server yang menentukan role dari token/respons login.
export const ADMIN_ACCOUNT = {
  id: 'ADM-001',
  name: 'Mbok Sari',
  email: 'admin@laundrysimbok.id',
  password: 'admin12345',
  phone: '081200000001',
  role: 'admin',
  title: 'Pemilik & admin gerai',
};

// Filter daftar pesanan di admin
export const ORDER_FILTERS = [
  { id: 'all', label: 'Semua' },
  { id: 'new', label: 'Baru' },
  { id: 'process', label: 'Diproses' },
  { id: 'done', label: 'Selesai' },
  { id: 'unpaid', label: 'Belum bayar' },
];

export const SERVICE_UNITS = ['kg', 'pcs'];

// ───────────────────────── Data profil (dummy) ─────────────────────────
// Semua di bawah ini akan diganti response API saat backend terhubung.

export const USER = {
  id: 'USR-001',
  name: 'Budi Santoso',
  email: 'budi@email.com',
  phone: '081234567890',
  memberSince: 'Agu 2026',
  points: 120,
};

export const ADDRESS_LABELS = ['Rumah', 'Kantor', 'Kos', 'Lainnya'];

export const ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Rumah',
    recipient: 'Budi Santoso',
    phone: '081234567890',
    detail: 'Jl. Melati No. 12, RT 03/RW 05, Kebayoran Baru, Jakarta Selatan 12120',
    note: 'Pagar hijau, titip ke satpam bila tidak ada orang',
    isPrimary: true,
  },
  {
    id: 'addr-2',
    label: 'Kantor',
    recipient: 'Budi Santoso',
    phone: '081234567890',
    detail: 'Gedung Graha Sentosa Lt. 7, Jl. Jend. Sudirman Kav. 52, Jakarta Selatan 12190',
    note: '',
    isPrimary: false,
  },
];

export const PAYMENT_METHODS = [
  { id: 'cash', name: 'Tunai', icon: 'cash-outline', desc: 'Bayar ke kurir atau kasir gerai' },
  { id: 'qris', name: 'QRIS', icon: 'qr-code-outline', desc: 'Scan dari e-wallet atau m-banking' },
  { id: 'ewallet', name: 'E-Wallet', icon: 'wallet-outline', desc: 'OVO, GoPay, DANA, ShopeePay' },
  { id: 'transfer', name: 'Transfer bank', icon: 'business-outline', desc: 'BCA, Mandiri, BNI, BRI' },
];

export const NOTIFICATION_SETTINGS = [
  { id: 'orderStatus', icon: 'receipt-outline', label: 'Status pesanan', desc: 'Kabar saat cucian dijemput, dicuci, dan diantar' },
  { id: 'reminder', icon: 'alarm-outline', label: 'Pengingat jemput', desc: 'Diingatkan 1 jam sebelum kurir datang' },
  { id: 'promo', icon: 'pricetag-outline', label: 'Promo & penawaran', desc: 'Diskon dan gratis ongkos jemput' },
  { id: 'email', icon: 'mail-outline', label: 'Notifikasi email', desc: 'Ringkasan pesanan dikirim ke email' },
];

export const DEFAULT_NOTIFICATIONS = { orderStatus: true, reminder: true, promo: true, email: false };

export const FAQS = [
  { id: 'f1', q: 'Berapa lama cucian selesai?', a: 'Cuci kiloan dan cuci + setrika selesai dalam 1–2 hari kerja. Dry clean dan layanan satuan membutuhkan 2–3 hari kerja.' },
  { id: 'f2', q: 'Bagaimana cara jemput & antar?', a: 'Pilih "Jemput & antar" saat membuat pesanan, isi alamat dan jadwal. Kurir akan datang sesuai jam yang kamu pilih dan mengantar kembali setelah selesai.' },
  { id: 'f3', q: 'Bagaimana jika pakaian rusak atau hilang?', a: 'Hubungi kami maksimal 1×24 jam setelah pakaian diterima. Tim kami akan memeriksa dan memberi penggantian sesuai ketentuan.' },
  { id: 'f4', q: 'Apakah ada minimum cucian?', a: 'Layanan kiloan minimal 1 kg. Gratis ongkos jemput berlaku untuk cucian di atas 5 kg selama promo berlangsung.' },
  { id: 'f5', q: 'Metode pembayaran apa yang tersedia?', a: 'Tunai, QRIS, e-wallet, dan transfer bank. Kamu bisa mengatur metode utama di menu Profil › Metode pembayaran.' },
];

export const CONTACT = {
  whatsapp: '6281234567890',
  email: 'halo@laundrysimbok.id',
  hours: '07.00 – 21.00 WIB',
};

export const APP_INFO = { name: 'Laundry Si Mbok', version: '1.0.0' };
