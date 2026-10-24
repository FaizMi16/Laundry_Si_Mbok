import React from 'react';
import { View } from 'react-native';
import { STEPS } from '../../data/dummy';
import { nextActionLabel, prevStep } from '../../utils/orders';
import { AppText, Button, TextButton } from '../atoms';

/**
 * Footer aksi di detail pesanan: majukan status + kembalikan langkah.
 * Props: order, onAdvance, onRevert
 */
export default function OrderStatusActions({ order, onAdvance, onRevert }) {
  const action = nextActionLabel(order);
  const prev = prevStep(order);

  return (
    <View style={{ gap: 12, alignItems: 'center' }}>
      {action ? (
        <Button title={action} icon="arrow-forward" onPress={onAdvance} style={{ alignSelf: 'stretch' }} />
      ) : (
        <AppText variant="bodyBold" color="success">✓ Pesanan sudah selesai</AppText>
      )}
      {prev !== null ? (
        <TextButton label={`Kembalikan ke “${STEPS[prev].title}”`} icon="arrow-undo-outline" tone="muted" onPress={onRevert} />
      ) : null}
    </View>
  );
}
