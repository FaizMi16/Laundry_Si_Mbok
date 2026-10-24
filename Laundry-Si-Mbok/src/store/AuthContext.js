import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ADMIN_ACCOUNT } from '../data/dummy';

/**
 * Sesi login satu pintu untuk user & admin (halaman Login yang sama).
 * Dummy: email admin → admin; email lain → user biasa (perilaku lama tidak berubah).
 * TODO(backend): ganti isi login() dengan request API; role datang dari respons server.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null); // null | 'user' | 'admin'
  const admin = useMemo(() => {
    const { password, ...safe } = ADMIN_ACCOUNT; // jangan bocorkan kata sandi ke UI
    return safe;
  }, []);

  /** Mengembalikan { ok, role } atau { ok: false, error }. */
  const login = useCallback(({ email, password }) => {
    if (email.trim().toLowerCase() === ADMIN_ACCOUNT.email) {
      if (password !== ADMIN_ACCOUNT.password) {
        return { ok: false, error: 'Email atau kata sandi admin salah.' };
      }
      setRole('admin');
      return { ok: true, role: 'admin' };
    }
    setRole('user');
    return { ok: true, role: 'user' };
  }, []);

  const logout = useCallback(() => setRole(null), []);

  const value = useMemo(() => ({ role, admin, login, logout }), [role, admin, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>');
  return ctx;
}
