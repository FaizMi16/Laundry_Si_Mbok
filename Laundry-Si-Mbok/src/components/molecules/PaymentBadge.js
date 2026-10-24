import React from 'react';
import { Badge } from '../atoms';

/** Status pembayaran pesanan. Props: paid */
export default function PaymentBadge({ paid }) {
  return <Badge label={paid ? 'Lunas' : 'Belum bayar'} tone={paid ? 'success' : 'danger'} />;
}
