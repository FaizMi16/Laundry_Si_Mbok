import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { formatRupiah } from '../../data/dummy';
import { MONTHS_ID } from '../../utils/format';
import { availableYears, filterByPeriod, periodLabel, summarizeOrders } from '../../utils/orders';
import { AppText } from '../atoms';
import { ChipRow, SectionHeader } from '../molecules';
import MetricGrid from './MetricGrid';

/**
 * Report keuangan dengan filter Tahun & Bulan (periode = tanggal pesanan dibuat).
 * Bulan baru muncul setelah tahun dipilih. Props: orders, onUnpaidPress
 */
export default function FinanceReport({ orders, onUnpaidPress }) {
  const [year, setYear] = useState('all');
  const [month, setMonth] = useState('all');

  const yearOptions = useMemo(
    () => [
      { id: 'all', label: 'Semua' },
      ...availableYears(orders).map((y) => ({ id: y, label: String(y), count: filterByPeriod(orders, y).length })),
    ],
    [orders]
  );
  const monthOptions = useMemo(() => {
    if (year === 'all') return [];
    return [
      { id: 'all', label: 'Semua bulan' },
      ...MONTHS_ID.map((label, i) => {
        const n = filterByPeriod(orders, year, i).length;
        return { id: i, label, count: n || undefined };
      }),
    ];
  }, [orders, year]);

  const periodOrders = useMemo(() => filterByPeriod(orders, year, month), [orders, year, month]);
  const summary = useMemo(() => summarizeOrders(periodOrders), [periodOrders]);
  const notWeighed = periodOrders.filter((o) => o.total == null).length;

  const changeYear = (y) => { setYear(y); setMonth('all'); };

  const metrics = [
    { id: 'revenue', icon: 'cash-outline', tone: 'success', value: formatRupiah(summary.revenue), label: 'Pendapatan (lunas)' },
    { id: 'unpaid', icon: 'alert-circle-outline', tone: 'danger', value: formatRupiah(summary.outstanding), label: `Belum dibayar (${summary.unpaid})`, onPress: onUnpaidPress },
  ];

  return (
    <View>
      <SectionHeader title="Report keuangan" />
      <View style={{ gap: 10, marginBottom: 14 }}>
        <ChipRow options={yearOptions} value={year} onChange={changeYear} />
        {monthOptions.length > 0 ? <ChipRow options={monthOptions} value={month} onChange={setMonth} /> : null}
      </View>

      <AppText variant="caption" color="muted" style={{ marginBottom: 12 }}>
        {periodLabel(year, month)} • {periodOrders.length} pesanan
        {notWeighed > 0 ? ` • ${notWeighed} belum ditimbang (belum dihitung)` : ''}
      </AppText>

      <MetricGrid metrics={metrics} />
    </View>
  );
}
