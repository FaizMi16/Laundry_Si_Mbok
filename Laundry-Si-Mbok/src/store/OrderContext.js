import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SEED_ORDERS } from '../data/dummy';
import { formatDateID } from '../utils/format';
import { computeTotal, formatQty, isFinished, nextStep, prevStep, unitPriceOf } from '../utils/orders';

/**
 * Store pesanan bersama user & admin (pengganti backend, di memori).
 * - User membuat pesanan lewat createOrder().
 * - Admin memajukan status / menandai lunas lewat advanceOrder(), revertOrder(), setPaid().
 * - Admin mengisi berat cucian lewat setWeight(); total dihitung dari harga layanan saat dipesan.
 * TODO(backend): ganti isi tiap action dengan request API; UI tidak perlu diubah.
 */
const OrderContext = createContext(null);

const nextOrderId = (orders) => {
  const max = orders.reduce((m, o) => Math.max(m, parseInt(o.id.replace(/\D/g, ''), 10) || 0), 0);
  return `LSM-${String(max + 1).padStart(4, '0')}`;
};

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(SEED_ORDERS);

  const createOrder = useCallback(({ customer, service, qty, method, address, pickup, note, paymentId, total }) => {
    setOrders((list) => {
      const created = {
        id: nextOrderId(list),
        customer,
        serviceId: service.id,
        service: service.name,
        // Berat belum diketahui saat dipesan: qty/amount/total null sampai admin menimbang
        price: service.price,
        qty: qty ?? null,
        unit: service.unit,
        amount: qty != null ? `${formatQty(qty)} ${service.unit}` : null,
        fee: method.fee,
        total: total ?? null,
        step: 0,
        date: formatDateID(),
        methodId: method.id,
        method: method.name,
        address,
        pickup,
        note,
        paymentId,
        paid: false,
      };
      return [created, ...list];
    });
  }, []);

  const patch = useCallback(
    (id, fn) => setOrders((list) => list.map((o) => (o.id === id ? { ...o, ...fn(o) } : o))),
    []
  );

  const advanceOrder = useCallback((id) => patch(id, (o) => (isFinished(o) ? {} : { step: nextStep(o) })), [patch]);
  const revertOrder = useCallback((id) => patch(id, (o) => (o.step <= 0 ? {} : { step: prevStep(o) })), [patch]);
  const setPaid = useCallback((id, paid) => patch(id, () => ({ paid })), [patch]);

  /** Admin mengisi berat/jumlah; total dihitung ulang dari harga satuan + ongkos jemput. */
  const setWeight = useCallback((id, qty) => patch(id, (o) => {
    const price = unitPriceOf(o);
    if (price == null) return {};
    return { price, qty, amount: `${formatQty(qty)} ${o.unit}`, total: computeTotal(price, qty, o.fee) };
  }), [patch]);

  const value = useMemo(
    () => ({ orders, createOrder, advanceOrder, revertOrder, setPaid, setWeight }),
    [orders, createOrder, advanceOrder, revertOrder, setPaid, setWeight]
  );
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders harus dipakai di dalam <OrderProvider>');
  return ctx;
}

/** Pesanan milik satu pelanggan, dipisah aktif / riwayat. */
export function useMyOrders(customerId) {
  const { orders } = useOrders();
  return useMemo(() => {
    const mine = orders.filter((o) => o.customer.id === customerId);
    return {
      all: mine,
      active: mine.filter((o) => !isFinished(o)),
      history: mine.filter(isFinished),
    };
  }, [orders, customerId]);
}
