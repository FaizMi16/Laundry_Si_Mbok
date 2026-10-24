import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SERVICES } from '../data/dummy';

/**
 * Katalog layanan bersama: admin mengubah harga / mengaktifkan layanan,
 * user melihat hasilnya di Beranda & form pesanan.
 * TODO(backend): ganti isi tiap action dengan request API.
 */
const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [services, setServices] = useState(SERVICES);

  const saveService = useCallback((svc) => {
    setServices((list) => {
      if (svc.id && list.some((s) => s.id === svc.id)) {
        return list.map((s) => (s.id === svc.id ? { ...s, ...svc } : s));
      }
      return [...list, { icon: 'pricetag-outline', active: true, ...svc, id: `svc-${Date.now()}` }];
    });
  }, []);

  const toggleService = useCallback(
    (id) => setServices((list) => list.map((s) => (s.id === id ? { ...s, active: !s.active } : s))),
    []
  );

  const value = useMemo(
    () => ({ services, activeServices: services.filter((s) => s.active), saveService, toggleService }),
    [services, saveService, toggleService]
  );
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog harus dipakai di dalam <CatalogProvider>');
  return ctx;
}
