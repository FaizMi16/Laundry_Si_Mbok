# Laporan Proyek: Laundry Si Mbok

Aplikasi mobile layanan laundry berbasis **React Native (Expo)**. Proyek ini hanya mencakup **antarmuka (UI)** dengan data dummy, tanpa backend dan tanpa penyimpanan data.

|                     |                                       |
| ------------------- | ------------------------------------- |
| **Kelompok**        | Kelompok 4                            |
| **Project Manager** | Faiz Muzaki Irsyad (2488010047)       |
| **Anggota**         | Tanu Hasyim (2488010011)              |
| **Anggota**         | Mohammad Satria Dinilhaq (2488010064) |
| **Mata Kuliah**     | Pemrograman Mobile                    |
| **Dosen Pengampu**  | M.Firdaus                             |
| **Tanggal**         | 18 Oktober 2026                       |

---

## Daftar Isi

1. [Ringkasan Pemenuhan Ketentuan](#1-ringkasan-pemenuhan-ketentuan)
2. [Teknologi, Instalasi, dan Cara Menjalankan](#2-teknologi-instalasi-dan-cara-menjalankan)
3. [Struktur Proyek](#3-struktur-proyek)
4. [Fitur Wajib](#4-fitur-wajib)
   - [4.1 Navigasi Multi-Screen](#41-navigasi-multi-screen)
   - [4.2 Layout Responsif](#42-layout-responsif)
   - [4.3 Komponen Reusable](#43-komponen-reusable)
   - [4.4 Daftar / List](#44-daftar--list)
   - [4.5 Form UI](#45-form-ui)
   - [4.6 Konsistensi Desain](#46-konsistensi-desain)
5. [Nilai Tambah](#5-nilai-tambah)
   - [5.1 Animasi Dasar](#51-animasi-dasar)
   - [5.2 Mode Gelap (Dark Mode)](#52-mode-gelap-dark-mode)
6. [Kesimpulan dan Keterbatasan](#7-kesimpulan-dan-keterbatasan)

---

## 1. Ringkasan Pemenuhan Ketentuan

| No  | Ketentuan                                                    | Status    | Bukti Implementasi                                                    |
| --- | ------------------------------------------------------------ | --------- | --------------------------------------------------------------------- |
| 1   | Navigasi multi-screen (min. 5 screen, stack dan/atau tab)    | Terpenuhi | 10 screen; Stack Navigator + Bottom Tab Navigator                     |
| 2   | Layout responsif (Flexbox, tidak terpotong/tumpang tindih)   | Terpenuhi | Seluruh layar memakai Flexbox, safe area, dan `useWindowDimensions`   |
| 3   | Komponen reusable (min. 3, menerima props)                   | Terpenuhi | 6 komponen: Button, Input, Chip, ScreenHeader, OrderCard, StatusBadge |
| 4   | Daftar/list (FlatList, item dapat ditekan menuju detail)     | Terpenuhi | Pesanan dan Riwayat memakai `FlatList` menuju Detail Pesanan          |
| 5   | Form UI (label, placeholder, focus/error)                    | Terpenuhi | Login, Register, dan Form Pesanan                                     |
| 6   | Konsistensi desain (palet, tipografi, spacing, ikon, gambar) | Terpenuhi | `theme.js`, font Plus Jakarta Sans, Ionicons, aset gambar             |
| +   | Animasi dasar (opsional)                                     | Terpenuhi | Animasi logo di Splash (`Animated` API)                               |
| +   | Mode gelap (opsional)                                        | Terpenuhi | `ThemeProvider` + toggle di tab Profil                                |

---

## 2. Teknologi, Instalasi, dan Cara Menjalankan

### Teknologi

| Kebutuhan | Library                                                    |
| --------- | ---------------------------------------------------------- |
| Framework | React Native + Expo                                        |
| Navigasi  | `@react-navigation/native`, `native-stack`, `bottom-tabs`  |
| Ikon      | `@expo/vector-icons` (Ionicons)                            |
| Gradient  | `expo-linear-gradient`                                     |
| Font      | Plus Jakarta Sans (`@expo-google-fonts/plus-jakarta-sans`) |
| Safe area | `react-native-safe-area-context`, `react-native-screens`   |
| Animasi   | `Animated` API bawaan React Native                         |

### Instalasi

Prasyarat: **Node.js** (disarankan versi LTS) dan **npm**.

```bash
# 1. Pasang dependensi (gunakan expo install agar versi cocok dengan Expo SDK)
npx expo install expo-linear-gradient expo-font expo-status-bar @expo-google-fonts/plus-jakarta-sans react-native-safe-area-context react-native-screens @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs

# 2. (Opsional) untuk menjalankan di browser
npx expo install react-dom react-native-web @expo/metro-runtime
```

Di `app.json`, tambahkan di dalam `"expo"` agar dark mode mengikuti pengaturan sistem:

```json
"userInterfaceStyle": "automatic"
```

### Menjalankan

```bash
npx expo start -c
```

Tekan `a` (Android), `i` (iOS), atau `w` (browser). Atau pindai QR code dengan aplikasi **Expo Go**.

---

## 3. Struktur Proyek

```
.
├── App.js                      # Entry point: font, ThemeProvider, NavigationContainer
├── assets/
│   ├── logo.png                # Logo (splash dan login)
│   ├── promo.png               # Banner promo di beranda
│   └── onboarding-1..3.png     # Ilustrasi onboarding
└── src/
    ├── components/
    │   ├── Button.js           # Tombol: primary, outline, hero
    │   ├── Input.js            # Input: label, ikon, focus, error
    │   ├── Chip.js             # Pilihan kecil (tanggal, jam)
    │   ├── ScreenHeader.js     # Header layar dengan tombol kembali
    │   ├── OrderCard.js        # Kartu pesanan dengan progress
    │   └── StatusBadge.js      # Label status pesanan
    ├── data/
    │   └── dummy.js            # Data dummy layanan dan pesanan
    ├── navigation/
    │   ├── RootNavigator.js    # Stack navigator utama
    │   └── MainTabs.js         # Bottom tab navigator
    ├── screens/                # 10 screen (lihat bagian 4.1)
    └── theme/
        ├── theme.js            # Palet LIGHT/DARK, font, spacing, radius, shadow
        └── ThemeContext.js     # ThemeProvider dan hook useTheme()
```

---

## 4. Fitur Wajib

### 4.1 Navigasi Multi-Screen

**Ketentuan:** minimal 5 screen, memakai navigasi stack dan/atau tab yang terstruktur.

**Implementasi:** aplikasi memiliki **10 screen**. Navigasi dibagi dua lapis:

- **Stack Navigator** (`RootNavigator.js`) untuk alur masuk (Splash, Onboarding, Login, Register) dan layar di luar tab (Pemesanan, DetailPesanan).
- **Bottom Tab Navigator** (`MainTabs.js`) untuk 4 menu utama: Beranda, Pesanan, Riwayat, Profil.

| No  | Screen           | File                   | Navigator |
| --- | ---------------- | ---------------------- | --------- |
| 1   | Splash           | `SplashScreen.js`      | Stack     |
| 2   | Onboarding       | `OnboardingScreen.js`  | Stack     |
| 3   | Login            | `LoginScreen.js`       | Stack     |
| 4   | Register         | `RegisterScreen.js`    | Stack     |
| 5   | Beranda (Home)   | `HomeScreen.js`        | Tab       |
| 6   | Pesanan (Daftar) | `OrdersScreen.js`      | Tab       |
| 7   | Riwayat (Daftar) | `HistoryScreen.js`     | Tab       |
| 8   | Profil           | `ProfileScreen.js`     | Tab       |
| 9   | Pemesanan (Form) | `OrderFormScreen.js`   | Stack     |
| 10  | Detail Pesanan   | `OrderDetailScreen.js` | Stack     |

**Alur navigasi:**

```
Stack (RootNavigator)
├── Splash ──► Onboarding ──► Login ◄──► Register
│                               │
│                               ▼
├── MainTabs (Bottom Tab)
│   ├── Beranda
│   ├── Pesanan
│   ├── Riwayat
│   └── Profil
├── Pemesanan       (dari Beranda)
└── DetailPesanan   (dari Beranda, Pesanan, dan Riwayat)
```

#### Dokumentasi Kode

**File:** `src/navigation/RootNavigator.js`. Mendaftarkan seluruh screen pada stack, dengan Splash sebagai layar awal.

```js
<Stack.Navigator
  initialRouteName="Splash"
  screenOptions={{
    headerShown: false,
    animation: "slide_from_right",
    contentStyle: { backgroundColor: COLORS.background },
  }}
>
  <Stack.Screen
    name="Splash"
    component={SplashScreen}
    options={{ animation: "fade" }}
  />
  <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Register" component={RegisterScreen} />
  <Stack.Screen name="MainTabs" component={MainTabs} />
  <Stack.Screen name="Pemesanan" component={OrderFormScreen} />
  <Stack.Screen name="DetailPesanan" component={OrderDetailScreen} />
</Stack.Navigator>
```

**File:** `src/navigation/MainTabs.js`. Empat tab dengan ikon Ionicons yang berganti bentuk (terisi/garis) saat aktif.

```js
const ICONS = {
  Beranda: ["home", "home-outline"],
  Pesanan: ["receipt", "receipt-outline"],
  Riwayat: ["time", "time-outline"],
  Profil: ["person", "person-outline"],
};

<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color }) => (
      <Ionicons
        name={ICONS[route.name][focused ? 0 : 1]}
        size={22}
        color={color}
      />
    ),
  })}
>
  <Tab.Screen name="Beranda" component={HomeScreen} />
  <Tab.Screen name="Pesanan" component={OrdersScreen} />
  <Tab.Screen name="Riwayat" component={HistoryScreen} />
  <Tab.Screen name="Profil" component={ProfileScreen} />
</Tab.Navigator>;
```

**Contoh perpindahan antar screen** (dari `HomeScreen.js`):

```js
navigation.navigate("Pemesanan", { serviceId: s.id }); // ke Form Pesanan + kirim parameter
navigation.navigate("DetailPesanan", { order: o }); // ke Detail + kirim data pesanan
navigation.navigate("Pesanan"); // pindah tab
```

---

### 4.2 Layout Responsif

**Ketentuan:** seluruh screen memakai Flexbox dan tampil rapi di berbagai ukuran layar; tidak ada elemen terpotong atau tumpang tindih.

**Implementasi:**

- Semua layout memakai `flexDirection`, `flex`, `justifyContent`, `alignItems`, `gap`, dan `flexWrap`.
- **Safe area** ditangani lewat `SafeAreaView` dan `useSafeAreaInsets`, sehingga konten tidak tertutup notch atau gesture bar.
- Lebar layar dibaca lewat `useWindowDimensions` untuk slide onboarding.
- Teks panjang dipotong rapi (`numberOfLines`) dan elemen penting tidak menyusut (`flexShrink: 0`), sehingga tidak tumpang tindih.
- Form memakai `KeyboardAvoidingView` dan `ScrollView` agar field tidak tertutup keyboard.

#### Dokumentasi Kode

**File:** `src/screens/HomeScreen.js`. Grid layanan 2 kolom yang otomatis turun baris.

```js
grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
serviceCard: { width: '47.5%', borderRadius: 20, padding: 16 },
```

**File:** `src/components/OrderCard.js` dan `StatusBadge.js`. Mencegah teks menabrak badge status.

```js
// OrderCard.js
<View style={{ flex: 1, minWidth: 0 }}>
  <Text style={styles.service} numberOfLines={1}>{order.service}</Text>
  <Text style={styles.meta} numberOfLines={1}>{order.id} • {order.amount}</Text>
</View>

// StatusBadge.js
badge: { flexShrink: 0, flexDirection: 'row', alignItems: 'center', gap: 6 },
```

**File:** `src/navigation/MainTabs.js`. Tinggi tab bar menyesuaikan area aman perangkat.

```js
const insets = useSafeAreaInsets();
tabBarStyle: {
  height: 64 + insets.bottom,
  paddingBottom: insets.bottom + 6,
}
```

**File:** `src/screens/OrderFormScreen.js`. Form yang tidak tertutup keyboard, dengan tombol aksi tetap di bawah.

```js
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : undefined}
>
  <ScrollView
    contentContainerStyle={styles.content}
    keyboardShouldPersistTaps="handled"
  >
    {/* isi form */}
  </ScrollView>
  <View style={styles.bottomBar}>
    <Button title="Pesan sekarang" onPress={submit} />
  </View>
</KeyboardAvoidingView>
```

**File:** `src/screens/OnboardingScreen.js`. Lebar slide mengikuti lebar layar.

```js
const { width } = useWindowDimensions();
// ...
<View style={[styles.slide, { width }]}>
```

---

### 4.3 Komponen Reusable

**Ketentuan:** minimal 3 komponen buatan sendiri yang dipakai ulang; menerima props agar dapat dikonfigurasi.

**Implementasi:** terdapat **6 komponen** di `src/components/`, semuanya menerima props.

| Komponen       | Props                                                                                   | Dipakai di                                                          |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `Button`       | `title`, `onPress`, `icon`, `variant` (`primary` / `outline` / `hero`), `style`         | Login, Register, Pesanan (kondisi kosong), Form Pesanan, Onboarding |
| `Input`        | `label`, `icon`, `secure`, `multiline`, `error`, `style`, serta semua props `TextInput` | Login, Register, Form Pesanan                                       |
| `Chip`         | `label`, `active`, `onPress`                                                            | Form Pesanan (pilihan tanggal dan jam)                              |
| `ScreenHeader` | `title`, `onBack`                                                                       | Pesanan, Riwayat, Profil, Register, Form Pesanan, Detail Pesanan    |
| `OrderCard`    | `order`, `onPress`                                                                      | Beranda, Pesanan, Riwayat                                           |
| `StatusBadge`  | `step`                                                                                  | OrderCard, Detail Pesanan                                           |

#### Dokumentasi Kode

**File:** `src/components/Button.js`. Satu komponen, tiga tampilan lewat prop `variant`.

```js
export default function Button({
  title,
  onPress,
  icon,
  variant = "primary",
  style,
}) {
  // variant: 'primary' (gradient), 'outline' (garis), 'hero' (pil solid untuk latar berwarna)
}
```

Contoh pemakaian:

```js
<Button title="Masuk" onPress={submit} />
<Button title="Buat pesanan" variant="outline" />
<Button variant="hero" title="Lanjut" icon="arrow-forward" onPress={next} />
```

**File:** `src/components/Input.js`. Menerima semua props `TextInput` lewat `...props`.

```js
export default function Input({
  label,
  icon,
  secure,
  multiline,
  error,
  style,
  onFocus,
  onBlur,
  ...props
}) {
  // ...
}
```

**File:** `src/components/Chip.js`.

```js
export default function Chip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.chipOn]}
    >
      <Text style={[styles.text, active && styles.textOn]}>{label}</Text>
    </TouchableOpacity>
  );
}
```

**File:** `src/components/OrderCard.js`. Satu kartu dipakai ulang di tiga screen.

```js
export default function OrderCard({ order, onPress }) {
  const progress = ((order.step + 1) / STEPS.length) * 100;
  // ... menampilkan layanan, ID, StatusBadge, progress bar, total
}
```

---

### 4.4 Daftar / List

**Ketentuan:** menampilkan daftar dengan `FlatList` atau `SectionList` memakai data dummy; setiap item dapat ditekan menuju screen detail.

**Implementasi:** screen **Pesanan** dan **Riwayat** memakai `FlatList` dengan data dari `src/data/dummy.js`. Setiap item adalah `OrderCard` yang bisa ditekan, lalu membawa data pesanan ke screen **Detail Pesanan**. Layar Pesanan juga punya tampilan kosong (`ListEmptyComponent`).

#### Dokumentasi Kode

**File:** `src/data/dummy.js`. Data dummy pesanan.

```js
export const ACTIVE_ORDERS = [
  {
    id: "LSM-1018",
    service: "Cuci + Setrika",
    amount: "4 kg",
    total: 41000,
    step: 2,
    date: "18 Okt 2026",
    method: "Jemput & antar",
  },
  {
    id: "LSM-1017",
    service: "Satuan",
    amount: "2 pcs",
    total: 35000,
    step: 1,
    date: "18 Okt 2026",
    method: "Jemput & antar",
  },
];

export const HISTORY_ORDERS = [
  /* 3 pesanan berstatus selesai */
];
```

**File:** `src/screens/OrdersScreen.js`. FlatList dengan item yang menuju Detail.

```js
<FlatList
  data={ACTIVE_ORDERS}
  keyExtractor={(i) => i.id}
  renderItem={({ item }) => (
    <OrderCard
      order={item}
      onPress={() => navigation.navigate('DetailPesanan', { order: item })}
    />
  )}
  ListEmptyComponent={/* tampilan saat belum ada pesanan */}
/>
```

**File:** `src/screens/HistoryScreen.js`. Pola yang sama dengan `HISTORY_ORDERS`.

**File:** `src/screens/OrderDetailScreen.js`. Menerima data lewat `route.params`.

```js
const order = route.params?.order || ACTIVE_ORDERS[0];
```

---

### 4.5 Form UI

**Ketentuan:** minimal 1 screen berisi form lengkap (label, placeholder, state visual seperti focus/error). Logika penyimpanan belum diwajibkan.

**Implementasi:** terdapat **3 screen berisi form**: Login, Register, dan Form Pesanan. Komponen `Input` memiliki tiga state visual:

| State  | Tampilan                                                                  |
| ------ | ------------------------------------------------------------------------- |
| Normal | Border abu-abu, latar `surface`                                           |
| Focus  | Border dan ikon biru, latar biru muda                                     |
| Error  | Border merah, latar merah muda, ikon peringatan, dan pesan di bawah field |

Validasi dijalankan saat tombol ditekan (tanpa penyimpanan data). Pesan error hilang otomatis saat pengguna mulai mengetik.

#### Dokumentasi Kode

**File:** `src/components/Input.js`. Penentuan state visual.

```js
const hasError = !!error;
const iconColor = hasError
  ? COLORS.danger
  : focused
    ? COLORS.primary
    : COLORS.muted;

<View
  style={[
    styles.box,
    multiline && styles.boxMulti,
    focused && styles.boxFocused,
    hasError && styles.boxError,
  ]}
>
  {/* ikon + TextInput */}
</View>;
{
  hasError ? (
    <View style={styles.errorRow}>
      <Ionicons name="alert-circle" size={14} color={COLORS.danger} />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  ) : null;
}
```

**File:** `src/screens/LoginScreen.js`. Validasi form.

```js
const submit = () => {
  const e = {};
  if (!email.trim()) e.email = "Email wajib diisi";
  else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Format email tidak valid";
  if (!password) e.password = "Kata sandi wajib diisi";
  else if (password.length < 8) e.password = "Minimal 8 karakter";
  setErrors(e);
  if (Object.keys(e).length === 0) navigation.replace("MainTabs");
};

<Input
  label="Email"
  icon="mail-outline"
  placeholder="nama@email.com"
  value={email}
  onChangeText={(t) => {
    setEmail(t);
    setErrors((x) => ({ ...x, email: undefined }));
  }}
  error={errors.email}
/>;
```

**File:** `src/screens/RegisterScreen.js`. Lima field, yaitu nama, nomor HP (format `08xxxxxxxxxx`), email, kata sandi, konfirmasi kata sandi, ditambah checkbox persetujuan yang juga divalidasi.

**File:** `src/screens/OrderFormScreen.js`. Validasi alamat saat memilih "Jemput & antar".

```js
if (methodId === "jemput" && address.trim().length < 10) {
  setAddressError("Alamat wajib diisi lengkap (minimal 10 karakter)");
  return;
}
```

---

### 4.6 Konsistensi Desain

**Ketentuan:** satu palet warna, tipografi, dan spacing yang konsisten; penggunaan aset gambar dan ikon (`@expo/vector-icons`) yang relevan.

**Implementasi:**

- **Palet warna:** biru sebagai warna utama (`#2563EB`), dengan turunan biru tua, biru muda, aqua, serta warna status (hijau, kuning, merah). Semua tersimpan di satu tempat (`src/theme/theme.js`), tidak ada warna yang ditulis langsung di screen.
- **Tipografi:** satu keluarga font, **Plus Jakarta Sans**, dengan 5 bobot (`regular`, `medium`, `semi`, `bold`, `extra`).
- **Spacing dan radius:** token `SPACING` dan `RADIUS` disediakan di `theme.js`. Padding halaman konsisten 24 px, dan sudut kartu memakai radius 16 sampai 22.
- **Ikon:** seluruh ikon memakai Ionicons dari `@expo/vector-icons` (tab bar, layanan, input, tombol, status).
- **Aset gambar:** logo, 3 ilustrasi onboarding, dan banner promo di folder `assets/`.

#### Dokumentasi Kode

**File:** `src/theme/theme.js`.

```js
export const LIGHT = {
  primary: "#2563EB",
  primaryDark: "#1E3A8A",
  primarySoft: "#EAF1FF",
  aqua: "#22D3EE",
  background: "#F5F8FD",
  surface: "#FFFFFF",
  white: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
  // ...
};

export const FONTS = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semi: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extra: "PlusJakartaSans_800ExtraBold",
};

export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const RADIUS = { sm: 12, md: 16, lg: 20, xl: 28 };
```

**File:** `App.js`. Memuat font sebelum aplikasi tampil.

```js
const [fontsLoaded] = useFonts({
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
});
```

**Contoh pemakaian ikon** (`HomeScreen.js`):

```js
import { Ionicons } from "@expo/vector-icons";
<Ionicons name={s.icon} size={22} color={COLORS.primary} />;
```

**Contoh pemakaian aset gambar** (`HomeScreen.js`):

```js
<Image
  source={require("../../assets/promo.png")}
  style={styles.promoImg}
  resizeMode="contain"
/>
```

---

## 5. Nilai Tambah

### 5.1 Animasi Dasar

**Implementasi:** Splash Screen memakai **`Animated` API**. Logo membesar dengan efek pegas (`spring`), sementara logo dan teks muncul perlahan (`fade`) sambil bergeser naik. Setelah 2 detik, aplikasi berpindah ke Onboarding. Transisi antar screen juga memakai animasi `slide_from_right`.

#### Dokumentasi Kode

**File:** `src/screens/SplashScreen.js`.

```js
const scale = useRef(new Animated.Value(0.6)).current;
const fade = useRef(new Animated.Value(0)).current;
const slide = useRef(new Animated.Value(16)).current;

useEffect(() => {
  Animated.parallel([
    Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
    Animated.timing(fade, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }),
    Animated.timing(slide, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }),
  ]).start();
  const t = setTimeout(() => navigation.replace("Onboarding"), 2000);
  return () => clearTimeout(t);
}, []);

<Animated.Image
  source={require("../../assets/logo.png")}
  style={[styles.logo, { opacity: fade, transform: [{ scale }] }]}
/>;
```

---

### 5.2 Mode Gelap (Dark Mode)

**Implementasi:** aplikasi mendukung tema terang dan gelap.

- Dua palet (`LIGHT` dan `DARK`) di `theme.js`.
- `ThemeProvider` (`ThemeContext.js`) memilih palet. Defaultnya **mengikuti pengaturan sistem HP**, dan bisa diubah manual lewat tombol di tab **Profil**.
- Semua komponen dan screen membaca warna lewat hook `useTheme()`, sehingga seluruh tampilan berganti serentak.
- Tema navigasi (`NavigationContainer`) dan `StatusBar` ikut berganti.

**Aturan warna:**

| Token                                          | Fungsi                            | Saat dark mode          |
| ---------------------------------------------- | --------------------------------- | ----------------------- |
| `COLORS.surface`                               | Latar kartu, input, chip, tab bar | Berubah gelap           |
| `COLORS.white`                                 | Teks atau ikon di atas warna biru | Tetap putih             |
| `COLORS.background`, `text`, `muted`, `border` | Latar halaman, teks, garis        | Berubah mengikuti palet |

#### Dokumentasi Kode

**File:** `src/theme/theme.js`. Palet gelap diturunkan dari palet terang.

```js
export const DARK = {
  ...LIGHT,
  primary: "#3B82F6",
  background: "#0B1220",
  surface: "#162032",
  text: "#F1F5F9",
  muted: "#94A3B8",
  border: "#2A3650",
  // ...
};
```

**File:** `src/theme/ThemeContext.js`.

```js
export function ThemeProvider({ children }) {
  const system = useColorScheme(); // ikut pengaturan HP
  const [override, setOverride] = useState(null); // null = ikut sistem
  const isDark = (override ?? system) === "dark";

  const value = useMemo(
    () => ({
      isDark,
      colors: isDark ? DARK : LIGHT,
      toggle: () => setOverride(isDark ? "light" : "dark"),
    }),
    [isDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

**Pola pemakaian di setiap screen/komponen** (contoh `OrderCard.js`):

```js
const { colors: COLORS } = useTheme();
const styles = useMemo(() => makeStyles(COLORS), [COLORS]);

const makeStyles = (COLORS) =>
  StyleSheet.create({
    card: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 16 },
  });
```

**File:** `src/screens/ProfileScreen.js`. Tombol ganti tema.

```js
const { colors: COLORS, isDark, toggle } = useTheme();

<Switch
  value={isDark}
  onValueChange={toggle}
  trackColor={{ false: COLORS.disabled, true: COLORS.primary }}
  thumbColor={COLORS.white}
/>;
```

**File:** `App.js`. Tema navigasi ikut berganti.

```js
const base = isDark ? DarkTheme : DefaultTheme;
const navTheme = {
  ...base,
  colors: {
    ...base.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};
```

---

## 6. Kesimpulan dan Keterbatasan

### Kesimpulan

Aplikasi **Laundry Si Mbok** memenuhi seluruh fitur wajib: navigasi 10 screen (stack dan tab), layout berbasis Flexbox yang responsif, 6 komponen reusable berprops, daftar `FlatList` yang menuju halaman detail, form dengan state focus dan error, serta desain konsisten (satu palet, satu keluarga font, ikon Ionicons, dan aset gambar). Dua nilai tambah, yaitu animasi `Animated` dan mode gelap, juga diterapkan.

### Keterbatasan

- Seluruh data bersifat dummy (`src/data/dummy.js`). Login, registrasi, dan pemesanan hanya berpindah layar, belum menyimpan data.
- Menu di Profil (Ubah profil, Alamat tersimpan, dan lainnya) belum memiliki layar tujuan.
- Token `SPACING` dan `RADIUS` baru dipakai langsung di komponen `Input` dan `Chip`. Screen lain memakai angka yang sama secara konsisten (misalnya padding halaman 24 px), tetapi belum merujuk ke token.
- Ilustrasi onboarding memakai `resizeMode="cover"`, sehingga tepi gambar dapat terpotong pada rasio layar tertentu. Aset sebaiknya memiliki jarak aman di sekeliling objek utama.
- Aplikasi diuji pada tampilan browser dan perangkat yang tersedia. Hasil pada perangkat lain dapat sedikit berbeda.

### Pengembangan Lanjutan

- Menambah backend dan penyimpanan data (autentikasi, pesanan).
- Menambah layar untuk menu Profil yang belum ada tujuannya.
- Menyimpan pilihan tema pengguna secara permanen.
