import React from 'react';
import { STEPS } from '../../data/dummy';
import { Badge } from '../atoms';

/** Badge status pesanan berdasarkan indeks langkah. */
export default function StatusBadge({ step }) {
  const done = step >= STEPS.length - 1;
  return <Badge label={STEPS[step].title} tone={done ? 'success' : 'warning'} dot />;
}
