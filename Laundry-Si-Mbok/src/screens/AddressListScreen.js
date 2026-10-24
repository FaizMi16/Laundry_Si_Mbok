import React from 'react';
import { Alert } from 'react-native';
import { useUser } from '../store/UserContext';
import { Button } from '../components/atoms';
import { EmptyState } from '../components/molecules';
import { AddressCard } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function AddressListScreen({ navigation }) {
  const { addresses, removeAddress, setPrimaryAddress } = useUser();

  const confirmDelete = (address) =>
    Alert.alert('Hapus alamat?', `Alamat "${address.label}" akan dihapus dari daftarmu.`, [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => removeAddress(address.id) },
    ]);

  return (
    <ScreenTemplate
      title="Alamat tersimpan"
      onBack={() => navigation.goBack()}
      footer={<Button title="Tambah alamat baru" icon="add-circle-outline" onPress={() => navigation.navigate('FormAlamat')} />}
    >
      {addresses.length === 0 ? (
        <EmptyState
          icon="location-outline"
          title="Belum ada alamat"
          description="Simpan alamat agar kurir bisa menjemput cucianmu lebih cepat."
        />
      ) : (
        addresses.map((a) => (
          <AddressCard
            key={a.id}
            address={a}
            onEdit={() => navigation.navigate('FormAlamat', { addressId: a.id })}
            onDelete={() => confirmDelete(a)}
            onSetPrimary={() => setPrimaryAddress(a.id)}
          />
        ))
      )}
    </ScreenTemplate>
  );
}
