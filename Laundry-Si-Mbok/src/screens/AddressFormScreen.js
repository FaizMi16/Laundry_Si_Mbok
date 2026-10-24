import React from 'react';
import { useUser } from '../store/UserContext';
import { AddressForm } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function AddressFormScreen({ navigation, route }) {
  const { addresses, user, saveAddress } = useUser();
  const addressId = route.params?.addressId;
  const existing = addressId ? addresses.find((a) => a.id === addressId) : undefined;

  // Alamat baru: nama & HP penerima diisi dari profil sebagai nilai awal
  const initial = existing || { recipient: user.name, phone: user.phone };

  // TODO(backend): POST/PUT alamat ke API
  const handleSubmit = (values) => {
    saveAddress({ ...values, id: existing?.id });
    navigation.goBack();
  };

  return (
    <ScreenTemplate title={existing ? 'Ubah alamat' : 'Tambah alamat'} onBack={() => navigation.goBack()} keyboard>
      <AddressForm
        initial={initial}
        submitLabel={existing ? 'Simpan perubahan' : 'Simpan alamat'}
        onSubmit={handleSubmit}
      />
    </ScreenTemplate>
  );
}
