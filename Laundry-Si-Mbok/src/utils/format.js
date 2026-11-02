export const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

export const getFirstName = (name = '') => name.trim().split(/\s+/)[0] || '';

export const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/** 24 Okt 2026 — format tanggal yang sama dengan data dummy. */
export const formatDateID = (d = new Date()) => `${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;

export const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/** "24 Okt 2026" -> { day, month (0-11), year }. null bila formatnya tidak dikenali. */
export const parseDateID = (text = '') => {
  const m = /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/.exec(String(text).trim());
  if (!m) return null;
  const month = MONTHS_ID.indexOf(m[2]);
  if (month < 0) return null;
  return { day: Number(m[1]), month, year: Number(m[3]) };
};
