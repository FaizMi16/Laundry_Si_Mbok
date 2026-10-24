export const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

export const getFirstName = (name = '') => name.trim().split(/\s+/)[0] || '';

const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/** 24 Okt 2026 — format tanggal yang sama dengan data dummy. */
export const formatDateID = (d = new Date()) => `${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
