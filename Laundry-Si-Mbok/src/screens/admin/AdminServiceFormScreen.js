import React from 'react';
import { Alert } from 'react-native';
import { useCatalog } from '../../store/CatalogContext';
import { ServiceForm } from '../../components/organisms';
import { ScreenTemplate } from '../../components/templates';

export default function AdminServiceFormScreen({ navigation, route }) {
  const { services, saveService } = useCatalog();
  const serviceId = route.params?.serviceId;
  const initial = serviceId ? services.find((s) => s.id === serviceId) : undefined;

  // TODO(backend): POST/PATCH /services, lalu perbarui katalog dari response
  const handleSubmit = (values) => {
    saveService({ ...(initial ? { id: initial.id } : {}), ...values });
    Alert.alert('Berhasil', initial ? 'Layanan sudah diperbarui.' : 'Layanan baru sudah ditambahkan.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScreenTemplate title={initial ? 'Ubah layanan' : 'Tambah layanan'} onBack={() => navigation.goBack()} keyboard>
      <ServiceForm initial={initial} onSubmit={handleSubmit} />
    </ScreenTemplate>
  );
}
