import React from 'react';
import { useCatalog } from '../../store/CatalogContext';
import { IconButton } from '../../components/atoms';
import { EmptyState } from '../../components/molecules';
import { ServiceAdminList } from '../../components/organisms';
import { ScreenTemplate } from '../../components/templates';

export default function AdminServicesScreen({ navigation }) {
  const { services, toggleService } = useCatalog();

  return (
    <ScreenTemplate
      title="Kelola layanan"
      headerRight={<IconButton name="add" variant="solid" onPress={() => navigation.navigate('AdminFormLayanan')} />}
    >
      {services.length === 0 ? (
        <EmptyState icon="pricetags-outline" title="Belum ada layanan" description="Tambahkan layanan agar pelanggan bisa memesan." actionLabel="Tambah layanan" onActionPress={() => navigation.navigate('AdminFormLayanan')} />
      ) : (
        <ServiceAdminList
          services={services}
          onEdit={(s) => navigation.navigate('AdminFormLayanan', { serviceId: s.id })}
          onToggle={(s) => toggleService(s.id)}
        />
      )}
    </ScreenTemplate>
  );
}
