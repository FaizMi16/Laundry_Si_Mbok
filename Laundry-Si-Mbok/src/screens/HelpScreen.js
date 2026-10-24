import React from 'react';
import { Alert, Linking } from 'react-native';
import { FAQS, CONTACT, APP_INFO } from '../data/dummy';
import { AppText } from '../components/atoms';
import { SectionHeader } from '../components/molecules';
import { FaqList, MenuGroup } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

const open = async (url, failMessage) => {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('Tidak dapat membuka', failMessage);
  }
};

export default function HelpScreen({ navigation }) {
  return (
    <ScreenTemplate title="Bantuan" onBack={() => navigation.goBack()}>
      <MenuGroup
        title="Hubungi kami"
        style={{ marginTop: 0 }}
        items={[
          {
            icon: 'logo-whatsapp', label: 'WhatsApp', subtitle: 'Balasan tercepat', tone: 'success',
            onPress: () => open(`https://wa.me/${CONTACT.whatsapp}`, 'WhatsApp tidak tersedia di perangkat ini.'),
          },
          {
            icon: 'mail-outline', label: 'Email', subtitle: CONTACT.email,
            onPress: () => open(`mailto:${CONTACT.email}`, `Kirim email ke ${CONTACT.email}.`),
          },
          { icon: 'time-outline', label: 'Jam layanan', value: CONTACT.hours },
        ]}
      />

      <SectionHeader title="Pertanyaan umum" size="md" style={{ marginTop: 28 }} />
      <FaqList faqs={FAQS} />

      <AppText variant="caption" color="placeholder" align="center" style={{ marginTop: 28 }}>
        {APP_INFO.name} • v{APP_INFO.version}
      </AppText>
    </ScreenTemplate>
  );
}
