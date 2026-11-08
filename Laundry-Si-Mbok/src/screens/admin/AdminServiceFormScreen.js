import React from 'react';
import { Alert } from 'react-native';
import { useCatalog } from '../../store/CatalogContext';
import { ServiceForm } from '../../components/organisms';
import { ScreenTemplate } from '../../components/templates';

export default function AdminServiceFormScreen({ navigation, route }) {
  const { services, saveService } = useCatalog();
  const serviceId = route.params?.serviceId;
  const initial = serviceId ? services.find((s) => s.id === serviceId) : undefined;

  // Async: tunggu Supabase selesai. Ikon & foto_url lama dibawa agar tidak kembali ke default.
  const handleSubmit = async (values) => {
    try {
      await saveService({
        ...(initial ? { id: initial.id, foto_url: initial.foto_url, icon: initial.icon } : {}),
        ...values,
      });
      Alert.alert('Berhasil', initial ? 'Layanan sudah diperbarui.' : 'Layanan baru sudah ditambahkan.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert('Gagal menyimpan', e.message);
    }
  };

  return (
    <ScreenTemplate title={initial ? 'Ubah layanan' : 'Tambah layanan'} onBack={() => navigation.goBack()} keyboard>
      <ServiceForm initial={initial} onSubmit={handleSubmit} />
    </ScreenTemplate>
  );
}
