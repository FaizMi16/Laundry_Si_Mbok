import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useCatalog } from '../../store/CatalogContext';
import { useTheme } from '../../theme/ThemeContext';
import { IconButton } from '../../components/atoms';
import { EmptyState } from '../../components/molecules';
import { ServiceAdminList } from '../../components/organisms';
import { ScreenTemplate } from '../../components/templates';

export default function AdminServicesScreen({ navigation }) {
  const { services, toggleService, deleteService, memuat } = useCatalog();
  const { colors } = useTheme();

  // Delete: selalu minta konfirmasi; gagal -> tampilkan pesan dari Supabase.
  const hapus = (s) => {
    Alert.alert('Hapus layanan?', `"${s.name}" akan dihapus dari katalog.`, [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus', style: 'destructive', onPress: async () => {
          try { await deleteService(s); }
          catch (e) { Alert.alert('Gagal menghapus', e.message); }
        },
      },
    ]);
  };

  return (
    <ScreenTemplate
      title="Kelola layanan"
      headerRight={<IconButton name="add" variant="solid" onPress={() => navigation.navigate('AdminFormLayanan')} />}
    >
      {memuat ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 32 }} />
      ) : services.length === 0 ? (
        <EmptyState icon="pricetags-outline" title="Belum ada layanan" description="Tambahkan layanan agar pelanggan bisa memesan." actionLabel="Tambah layanan" onActionPress={() => navigation.navigate('AdminFormLayanan')} />
      ) : (
        <ServiceAdminList
          services={services}
          onEdit={(s) => navigation.navigate('AdminFormLayanan', { serviceId: s.id })}
          onToggle={(s) => toggleService(s).catch((e) => Alert.alert('Gagal mengubah status', e.message))}
          onDelete={(s) => hapus(s)}
        />
      )}
    </ScreenTemplate>
  );
}
