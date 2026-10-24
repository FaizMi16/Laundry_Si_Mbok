import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SEED_ORDERS } from '../data/dummy';
import { formatDateID } from '../utils/format';
import { isFinished, nextStep, prevStep } from '../utils/orders';

/**
 * Store pesanan bersama user & admin (pengganti backend, di memori).
 * - User membuat pesanan lewat createOrder().
 * - Admin memajukan status / menandai lunas lewat advanceOrder(), revertOrder(), setPaid().
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
        qty,
        unit: service.unit,
        amount: `${qty} ${service.unit}`,
        fee: method.fee,
        total,
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

  const value = useMemo(
    () => ({ orders, createOrder, advanceOrder, revertOrder, setPaid }),
    [orders, createOrder, advanceOrder, revertOrder, setPaid]
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
