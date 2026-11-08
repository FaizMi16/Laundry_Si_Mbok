# Arsitektur — Atomic Design

```
src/
├─ components/
│  ├─ atoms/       elemen terkecil, berdiri sendiri
│  │               AppText, Button, TextButton, Chip, Input, IconBadge, IconButton, Avatar,
│  │               Badge, Divider, ProgressBar, Checkbox, RadioDot, Toggle, Logo, Bubble
│  ├─ molecules/   gabungan atom dengan satu fungsi
│  │               ScreenHeader, SectionHeader, FormField, CheckboxField, MenuItem, InfoRow,
│  │               StatItem, ServiceTile, OptionCard, MethodCard, PaymentOption, QuantityStepper,
│  │               TimelineStep, StatusBadge, PaginationDots, EmptyState, FaqItem, GradientHeader
│  ├─ organisms/   bagian UI utuh dari atom + molecule
│  │               OrderCard, MenuGroup, ProfileHero, StatsCard, AddressCard, AddressForm,
│  │               LoginForm, RegisterForm, EditProfileForm, ChangePasswordForm, FaqList, ...
│  └─ templates/   kerangka tata letak halaman (tanpa data)
│                  ScreenTemplate, ListTemplate, HeroScrollTemplate, AuthSheetTemplate, GradientTemplate
├─ screens/        PAGES — template + organism + data (dari store / dummy)
├─ navigation/     RootNavigator (stack) + MainTabs
├─ store/          UserContext — "backend palsu" di memori (user, alamat, pembayaran, notifikasi)
├─ data/dummy.js   seluruh data dummy
├─ utils/          validators.js, format.js
└─ theme/          theme.js (token), ThemeContext.js (+ hook useThemedStyles)
```

## Aturan impor (satu arah, ke bawah)
`screens → templates → organisms → molecules → atoms`
Level yang lebih rendah **tidak boleh** mengimpor level di atasnya. Atom tidak mengimpor atom lain
kecuali `AppText` (tipografi dasar). Screen tidak berisi styling rumit — hanya menyusun komponen.

## Pola komponen
- Warna & gelap/terang: `const { styles, colors } = useThemedStyles(makeStyles)`
  (`makeStyles` adalah fungsi level-modul `(COLORS) => StyleSheet.create({...})`).
- Teks selalu lewat `<AppText variant="..." color="...">`.
- Form: organism memegang state & validasi (`utils/validators.js`), screen hanya menerima `onSubmit`.

## Menyambung ke backend
Cari penanda `TODO(backend)` di `src/screens`. Data dummy ada di `data/dummy.js`; state yang bisa
diubah pengguna ada di `store/UserContext.js` — ganti isi tiap action dengan request API,
komponen UI tidak perlu diubah.

## Rute baru (sub-halaman Profil)
`UbahProfil`, `AlamatTersimpan`, `FormAlamat` (param `addressId` untuk ubah), `MetodePembayaran`,
`PengaturanNotifikasi`, `UbahKataSandi`, `Bantuan`.

---

# Role Admin

Admin memakai **halaman Login yang sama** dengan user. `store/AuthContext` menentukan role dari akun:
email admin → `AdminTabs`, selain itu → `MainTabs` (user). Tidak ada halaman login terpisah.

## Alur kerja admin (mengikuti alur user)
```
User: buat pesanan ──▶ Admin: Pesanan baru (step 0 "Pesanan diterima")
Admin: majukan status ─▶ dijemput → dicuci → diantar → selesai
User: melihat status berubah di Detail Pesanan (linimasa yang sama)
Selesai ──▶ pindah dari "Pesanan" ke "Riwayat" milik user
```
- **Jemput & antar**: 0 → 1 → 2 → 3 → 4. **Antar sendiri**: 0 → 2 → 4 (langkah jemput/antar dilewati).
- Admin juga menandai **lunas / belum bayar**, bisa **mengembalikan** status bila salah klik.
- Admin mengatur **layanan** (harga, aktif/nonaktif, tambah baru). Layanan nonaktif hilang dari Beranda & form pesanan user.

## Rute admin
`AdminTabs` (AdminDasbor · AdminPesanan · AdminPelanggan · AdminLayanan · AdminAkun),
`AdminDetailPesanan` (param `orderId`), `AdminDetailPelanggan` (param `customerId`),
`AdminFormLayanan` (param `serviceId` untuk ubah). `UbahKataSandi` dipakai ulang.

## Store bersama (user & admin)
| Store | Isi | Dipakai |
|---|---|---|
| `AuthContext` | role, login/logout, profil admin | Login, Profil user & admin |
| `OrderContext` | semua pesanan: `createOrder`, `advanceOrder`, `revertOrder`, `setPaid`, `useMyOrders(userId)` | user & admin |
| `CatalogContext` | layanan dari Supabase: `saveService`, `toggleService(service)`, `deleteService(service)`, `activeServices`, `memuat`, `refresh` | user & admin |
| `UserContext` | profil, alamat, pembayaran (tetap khusus user) | user |

Aturan alur ada di `utils/orders.js` (`nextStep`, `prevStep`, `nextActionLabel`, filter, ringkasan) agar user & admin
memakai logika yang sama. Cari `TODO(backend)` untuk titik sambung API.

## Komponen baru (atomic)
- **atoms**: tidak ada yang baru — seluruhnya memakai ulang atom yang ada.
- **molecules**: `SearchBar`, `ChipRow`, `MetricTile`, `PaymentBadge`, `CustomerRow`, `ServiceAdminRow`
- **organisms**: `AdminHeader`, `AdminProfileHero`, `MetricGrid`, `AdminOrderCard`, `OrderFilterBar`,
  `OrderCustomerCard`, `OrderPaymentCard`, `OrderStatusActions`, `CustomerCard`, `ServiceAdminList`, `ServiceForm`
  (+ memakai ulang `StatsCard`, `OrderInfoCard`, `OrderTimeline`, `MenuGroup`)
- **templates**: `FilteredListTemplate` (daftar + area pencarian/filter); selebihnya memakai ulang `HeroScrollTemplate`, `ScreenTemplate`
- **pages**: `src/screens/admin/*`

## Akun admin (dummy)
`admin@laundrysimbok.id` / `admin12345` — didefinisikan di `data/dummy.js` (`ADMIN_ACCOUNT`), hapus saat backend siap.

## Katalog layanan di Supabase (modul Pertemuan 9)
- `lib/supabase.js` — klien Supabase (Project URL + anon key). Jangan pernah menaruh `service_role` key di aplikasi.
- Tabel `layanan` (`nama`, `harga`, `satuan`, `deskripsi`, `ikon`, `aktif`, `foto_url`) dan bucket Storage publik `layanan`; pemetaan snake_case -> camelCase hanya di `keService` pada `CatalogContext`.
- Alur simpan dengan foto: upload -> insert/update baris -> hapus foto lama paling akhir (tidak ada baris tanpa foto, hanya kemungkinan file yatim).
- Layar lain (Beranda, form pesanan, dashboard admin) tidak berubah karena tetap membaca `useCatalog()`.
- Yang masih lokal: pesanan, pelanggan, alamat, pembayaran, autentikasi.
- Kebijakan RLS di modul bersifat longgar (publik) dan hanya untuk praktikum.

## Tahap 2: pelanggan, alamat, pesanan di Supabase
- SQL: `supabase/pesanan-pelanggan-alamat.sql` (tabel `pelanggan`, `alamat`, `pesanan`, penomoran otomatis USR-xxx / LSM-xxxx, RLS, dan data awal). Jalankan sekali di SQL Editor; tabel `layanan` tidak disentuh.
- `UserContext`: profil, alamat, metode pembayaran, dan pengaturan notifikasi dari/ke Supabase. `masuk(email)` mencari pelanggan; email yang belum terdaftar memakai akun demo `USR-001` (perilaku lama).
- `OrderContext`: pesanan user & admin dari satu tabel. Perubahan status tampil langsung (optimistik) dan dibatalkan lewat `refresh()` bila database menolak.
- Aksi store TIDAK melempar error: kegagalan ditampilkan lewat `utils/laporGagal.js` (Alert) dan hasilnya `false`; layar hanya berpindah/menampilkan sukses bila hasilnya `true`.
- Pemetaan snake_case -> camelCase hanya di `keOrder`, `keUser`, `keAlamat`.
- Pesanan menyimpan salinan nama/harga/satuan layanan saat dipesan (tanpa FK ke `layanan`), jadi layanan boleh dihapus tanpa merusak riwayat.

### Yang masih lokal / catatan keamanan
- Login belum memakai Supabase Auth: admin masih dicek lokal (`AuthContext`) dan kata sandinya ada di kode. TODO(auth).
- Kebijakan RLS bersifat TERBUKA untuk publik (siapa pun yang memegang publishable key bisa membaca & mengubah pelanggan, alamat, dan pesanan). Hanya untuk praktikum; wajib diganti kebijakan per pengguna setelah login sungguhan ada.
