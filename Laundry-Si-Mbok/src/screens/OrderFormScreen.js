import React, { useState } from 'react';
import { View } from 'react-native';
import { METHODS, DATES, TIMES } from '../data/dummy';
import { useCatalog } from '../store/CatalogContext';
import { useOrders } from '../store/OrderContext';
import { useUser } from '../store/UserContext';
import { Button, Chip } from '../components/atoms';
import { EmptyState, FormField, QuantityStepper, SectionHeader } from '../components/molecules';
import {
  MethodSelector, OrderSummaryCard, SchedulePicker, ServiceSelector,
} from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function OrderFormScreen({ navigation, route }) {
  const { user, addresses, primaryAddress, paymentId } = useUser();
  const { activeServices: services } = useCatalog();
  const { createOrder } = useOrders();
  const [serviceId, setServiceId] = useState(route.params?.serviceId || 'kiloan');
  const [methodId, setMethodId] = useState('jemput');
  const [qty, setQty] = useState(3);
  const [date, setDate] = useState(DATES[0]);
  const [time, setTime] = useState(TIMES[0]);
  // Alamat utama dari Profil terisi otomatis
  const [address, setAddress] = useState(primaryAddress?.detail || '');
  const [note, setNote] = useState('');
  const [addressError, setAddressError] = useState('');

  // Layanan yang dinonaktifkan admin tidak bisa dipesan
  const service = services.find((s) => s.id === serviceId) || services[0];
  const method = METHODS.find((m) => m.id === methodId);

  if (!service) {
    return (
      <ScreenTemplate title="Buat pesanan" onBack={() => navigation.goBack()}>
        <EmptyState icon="shirt-outline" title="Layanan belum tersedia" description="Saat ini belum ada layanan yang bisa dipesan. Coba lagi nanti." />
      </ScreenTemplate>
    );
  }

  const subtotal = service.price * qty;
  const total = subtotal + method.fee;

  const submit = () => {
    if (methodId === 'jemput' && address.trim().length < 10) {
      setAddressError('Alamat wajib diisi lengkap (minimal 10 karakter)');
      return;
    }
    // TODO(backend): kirim pesanan ke API; pesanan langsung tampil di admin
    createOrder({
      customer: { id: user.id, name: user.name, phone: user.phone },
      service,
      qty,
      method,
      address: methodId === 'jemput' ? address.trim() : '',
      pickup: methodId === 'jemput' ? { date, time } : null,
      note: note.trim(),
      paymentId,
      total,
    });
    navigation.navigate('MainTabs', { screen: 'Pesanan' });
  };

  return (
    <ScreenTemplate
      title="Buat pesanan"
      onBack={() => navigation.goBack()}
      keyboard
      footer={<Button title="Pesan sekarang" icon="checkmark-circle-outline" onPress={submit} />}
    >
      <SectionHeader title="Layanan" size="md" style={{ marginTop: 4 }} />
      <ServiceSelector
        services={services}
        selectedId={service.id}
        onSelect={(s) => { setServiceId(s.id); setQty(s.unit === 'kg' ? 3 : 1); }}
      />

      <SectionHeader title={`Jumlah (${service.unit})`} size="md" />
      <QuantityStepper value={qty} unit={service.unit} onChange={setQty} />

      <SectionHeader title="Cara penyerahan" size="md" />
      <MethodSelector methods={METHODS} selectedId={methodId} onSelect={(m) => setMethodId(m.id)} />

      {methodId === 'jemput' && (
        <>
          <SectionHeader title="Alamat penjemputan" size="md" />
          {addresses.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              {addresses.map((a) => (
                <Chip
                  key={a.id}
                  label={a.label}
                  active={address === a.detail}
                  onPress={() => { setAddress(a.detail); setAddressError(''); }}
                />
              ))}
            </View>
          )}
          <FormField
            icon="location-outline"
            placeholder="Tulis alamat lengkap"
            multiline
            value={address}
            onChangeText={(t) => { setAddress(t); setAddressError(''); }}
            error={addressError}
            style={{ marginBottom: 0 }}
          />

          <SectionHeader title="Jadwal jemput" size="md" />
          <SchedulePicker
            dates={DATES} times={TIMES} date={date} time={time}
            onDateChange={setDate} onTimeChange={setTime}
          />
        </>
      )}

      <SectionHeader title="Catatan" size="md" />
      <FormField
        icon="create-outline"
        placeholder="Contoh: pisahkan baju putih"
        multiline
        value={note}
        onChangeText={setNote}
        style={{ marginBottom: 0 }}
      />

      <OrderSummaryCard serviceName={service.name} qty={qty} subtotal={subtotal} fee={method.fee} total={total} />
    </ScreenTemplate>
  );
}
