import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { USER, ADDRESSES, DEFAULT_NOTIFICATIONS } from '../data/dummy';

/**
 * Store ringan pengganti backend (data dummy, disimpan di memori).
 * Saat API siap, ganti isi setiap action dengan request ke server
 * — komponen UI tidak perlu diubah karena hanya memakai useUser().
 */
const UserContext = createContext(null);

// Pastikan selalu tepat satu alamat utama selama daftar tidak kosong.
const normalizeAddresses = (list) => {
  if (list.length === 0) return list;
  const firstPrimary = list.findIndex((a) => a.isPrimary);
  const idx = firstPrimary === -1 ? 0 : firstPrimary;
  return list.map((a, i) => ({ ...a, isPrimary: i === idx }));
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(USER);
  const [addresses, setAddresses] = useState(ADDRESSES);
  const [paymentId, setPaymentId] = useState('cash');
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);

  const updateUser = useCallback((patch) => setUser((u) => ({ ...u, ...patch })), []);

  const saveAddress = useCallback((addr) => {
    setAddresses((list) => {
      const exists = addr.id && list.some((a) => a.id === addr.id);
      let next;
      if (exists) {
        next = list.map((a) => (a.id === addr.id ? { ...a, ...addr } : a));
      } else {
        next = [...list, { ...addr, id: `addr-${Date.now()}` }];
      }
      // Bila alamat ini dijadikan utama, yang lain otomatis dilepas.
      if (addr.isPrimary) {
        const targetId = exists ? addr.id : next[next.length - 1].id;
        next = next.map((a) => ({ ...a, isPrimary: a.id === targetId }));
      }
      return normalizeAddresses(next);
    });
  }, []);

  const removeAddress = useCallback(
    (id) => setAddresses((list) => normalizeAddresses(list.filter((a) => a.id !== id))),
    []
  );

  const setPrimaryAddress = useCallback(
    (id) => setAddresses((list) => list.map((a) => ({ ...a, isPrimary: a.id === id }))),
    []
  );

  const setNotification = useCallback(
    (key, value) => setNotifications((n) => ({ ...n, [key]: value })),
    []
  );

  const value = useMemo(
    () => ({
      user,
      addresses,
      primaryAddress: addresses.find((a) => a.isPrimary) || null,
      paymentId,
      notifications,
      updateUser,
      saveAddress,
      removeAddress,
      setPrimaryAddress,
      setPaymentId,
      setNotification,
    }),
    [user, addresses, paymentId, notifications, updateUser, saveAddress, removeAddress, setPrimaryAddress, setNotification]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser harus dipakai di dalam <UserProvider>');
  return ctx;
}
