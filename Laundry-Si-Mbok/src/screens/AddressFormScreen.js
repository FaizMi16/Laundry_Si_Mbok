import React, { useRef } from 'react';
import { useUser } from '../store/UserContext';
import { AddressForm } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function AddressFormScreen({ navigation, route }) {
  const { addresses, user, saveAddress } = useUser();
  const sibuk = useRef(false);
  const addressId = route.params?.addressId;
  const existing = addressId ? addresses.find((a) => a.id === addressId) : undefined;

  // Alamat baru: nama & HP penerima diisi dari profil sebagai nilai awal
  const initial = existing || { recipient: user.name, phone: user.phone };

  // Disimpan ke Supabase; kembali ke daftar hanya bila berhasil (gagal -> Alert dari store)
  const handleSubmit = async (values) => {
    if (sibuk.current) return;
    sibuk.current = true;
    const ok = await saveAddress({ ...values, id: existing?.id });
    sibuk.current = false;
    if (ok) navigation.goBack();
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
