import React, { useState } from 'react';
import { Keyboard, View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { formatRupiah } from '../../data/dummy';
import { computeTotal, formatQty, parseQty, unitPriceOf } from '../../utils/orders';
import { AppText, Button, Divider } from '../atoms';
import { FormField, InfoRow } from '../molecules';

/**
 * Admin mengisi berat/jumlah cucian setelah ditimbang; total dihitung otomatis.
 * Terkunci bila pesanan sudah lunas (batalkan status lunas dulu untuk mengubah).
 * Props: order, onSave(qty:number)
 */
export default function OrderWeightCard({ order, onSave }) {
  const { styles } = useThemedStyles(makeStyles);
  const price = unitPriceOf(order);
  const isKg = order.unit === 'kg';
  const saved = order.qty != null ? formatQty(order.qty) : '';
  const [text, setText] = useState(saved);
  const [error, setError] = useState('');

  const qty = parseQty(text, order.unit);
  const preview = qty != null && price != null ? computeTotal(price, qty, order.fee) : null;
  const locked = !!order.paid;
  const unchanged = text.trim().replace('.', ',') === saved;

  const submit = () => {
    if (qty == null) {
      setError(isKg ? 'Isi berat dengan angka, maksimal 1 angka di belakang koma (contoh 2,5)' : 'Isi jumlah dengan bilangan bulat (contoh 3)');
      return;
    }
    Keyboard.dismiss();
    setError('');
    onSave(qty);
  };

  return (
    <View style={[styles.card, SHADOW.card]}>
      <InfoRow label="Harga layanan" value={price != null ? `${formatRupiah(price)}/${order.unit}` : '-'} />
      <Divider style={{ marginVertical: 10 }} />

      <FormField
        label={isKg ? 'Berat cucian (kg)' : 'Jumlah (pcs)'}
        icon={isKg ? 'scale-outline' : 'shirt-outline'}
        placeholder={isKg ? 'Contoh: 2,5' : 'Contoh: 3'}
        keyboardType={isKg ? 'decimal-pad' : 'number-pad'}
        value={text}
        onChangeText={(t) => { setText(t); setError(''); }}
        editable={!locked}
        error={error}
        style={{ marginBottom: 12 }}
      />

      <InfoRow
        label="Total (termasuk ongkos jemput)"
        value={preview != null ? formatRupiah(preview) : order.total != null ? formatRupiah(order.total) : '-'}
        emphasis="bold"
      />

      <View style={{ marginTop: 16 }}>
        {locked ? (
          <AppText variant="caption" color="muted">
            Pesanan sudah lunas. Batalkan status lunas di bagian Pembayaran untuk mengubah berat.
          </AppText>
        ) : (
          <Button
            title={order.qty != null ? 'Perbarui berat' : 'Simpan berat & hitung total'}
            icon="checkmark-circle-outline"
            iconPosition="left"
            disabled={unchanged}
            onPress={submit}
          />
        )}
      </View>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 22, padding: 18 },
});
