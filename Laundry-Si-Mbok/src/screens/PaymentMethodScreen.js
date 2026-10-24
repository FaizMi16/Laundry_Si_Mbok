import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PAYMENT_METHODS } from '../data/dummy';
import { useTheme } from '../theme/ThemeContext';
import { useUser } from '../store/UserContext';
import { AppText } from '../components/atoms';
import { PaymentMethodList } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function PaymentMethodScreen({ navigation }) {
  const { colors } = useTheme();
  const { paymentId, setPaymentId } = useUser();

  return (
    <ScreenTemplate title="Metode pembayaran" onBack={() => navigation.goBack()}>
      <AppText variant="body" color="muted" style={{ marginBottom: 20 }}>
        Pilih metode utama. Kamu tetap bisa membayar dengan cara lain saat pesanan diantar.
      </AppText>

      <PaymentMethodList methods={PAYMENT_METHODS} selectedId={paymentId} onSelect={setPaymentId} />

      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginTop: 8, paddingHorizontal: 4 }}>
        <Ionicons name="shield-checkmark-outline" size={18} color={colors.success} style={{ marginTop: 1 }} />
        <AppText variant="caption" color="muted" style={{ flex: 1, lineHeight: 18 }}>
          Kami tidak menyimpan nomor kartu atau PIN. Pembayaran diproses langsung oleh penyedia layanan.
        </AppText>
      </View>
    </ScreenTemplate>
  );
}
