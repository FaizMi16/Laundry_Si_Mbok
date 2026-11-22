export function getRecommendedServices({
  services = [],
  orders = [],
  userId = null,
  limit = 4,
}) {
  const activeServices = (services || []).filter((s) => s && s.aktif !== false);
  if (activeServices.length === 0) return [];

  const orderList = Array.isArray(orders) ? orders : [];
  const globalCounts = new Map();
  const userCounts = new Map();

  for (const order of orderList) {
    const serviceId =
      order?.serviceId ?? order?.layananId ?? order?.layanan_id ?? null;
    const serviceName = (
      order?.serviceName ??
      order?.layananNama ??
      order?.namaLayanan ??
      order?.service?.nama ??
      ''
    )
      .toString()
      .trim()
      .toLowerCase();

    const matched = activeServices.find(
      (srv) =>
        (serviceId && String(srv.id) === String(serviceId)) ||
        (serviceName &&
          String(srv.nama || '')
            .trim()
            .toLowerCase() === serviceName)
    );
    if (!matched) continue;

    globalCounts.set(matched.id, (globalCounts.get(matched.id) || 0) + 1);

    const orderUserId =
      order?.userId ?? order?.pelangganId ?? order?.pelanggan_id ?? null;
    if (userId && orderUserId && String(orderUserId) === String(userId)) {
      userCounts.set(matched.id, (userCounts.get(matched.id) || 0) + 1);
    }
  }

  const hasUserHistory = userCounts.size > 0;

  return [...activeServices]
    .map((srv) => {
      const uCount = userCounts.get(srv.id) || 0;
      const gCount = globalCounts.get(srv.id) || 0;
      const score = hasUserHistory ? uCount * 10 + gCount : gCount;
      return { ...srv, _score: score };
    })
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
}