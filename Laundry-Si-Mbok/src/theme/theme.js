// Palet terang & gelap. Semua warna dibaca lewat useTheme() (lihat ThemeContext.js)
export const LIGHT = {
  primary: '#2563EB',
  primaryDark: '#1E3A8A',
  primarySoft: '#EAF1FF',
  aqua: '#22D3EE',
  background: '#F5F8FD',
  surface: '#FFFFFF', // latar kartu, input, tab bar
  white: '#FFFFFF',   // teks/ikon di atas warna biru (tidak berubah di dark mode)
  text: '#0F172A',
  muted: '#64748B',
  border: '#E2E8F0',
  success: '#16A34A',
  successSoft: '#DCFCE7',
  warning: '#D97706',
  warningSoft: '#FEF3C7',
  dangerSoft: '#FEE2E2',
  danger: '#DC2626',
  placeholder: '#94A3B8',
  disabled: '#CBD5E1',
  amberDark: '#92400E',
  amberText: '#B45309',
  accent: '#FBBF24',
  // Layar onboarding (latar penuh)
  heroFrom: '#1E7BF2',
  heroTo: '#0A52CF',
  heroButton: '#0A3FA6',
};

export const DARK = {
  ...LIGHT,
  primary: '#3B82F6',
  primarySoft: '#1E2A4A',
  background: '#0B1220',
  surface: '#162032',
  text: '#F1F5F9',
  muted: '#94A3B8',
  border: '#2A3650',
  success: '#22C55E',
  successSoft: '#12351F',
  warning: '#F59E0B',
  warningSoft: '#3A2A0A',
  dangerSoft: '#3B1414',
  danger: '#F87171',
  placeholder: '#64748B',
  disabled: '#475569',
  heroFrom: '#1E3A8A',
  heroTo: '#0B1220',
  heroButton: '#3B82F6',
};

export const FONTS = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semi: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
};

// Skala spacing & radius agar konsisten di seluruh aplikasi
export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const RADIUS = { sm: 12, md: 16, lg: 20, xl: 28 };

export const SHADOW = {
  card: {
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  button: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
};
