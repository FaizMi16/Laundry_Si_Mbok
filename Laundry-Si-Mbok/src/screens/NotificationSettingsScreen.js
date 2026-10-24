import React from 'react';
import { NOTIFICATION_SETTINGS } from '../data/dummy';
import { useUser } from '../store/UserContext';
import { Toggle } from '../components/atoms';
import { MenuGroup } from '../components/organisms';
import { ScreenTemplate } from '../components/templates';

export default function NotificationSettingsScreen({ navigation }) {
  const { notifications, setNotification } = useUser();

  const items = NOTIFICATION_SETTINGS.map((n) => ({
    icon: n.icon,
    label: n.label,
    subtitle: n.desc,
    right: <Toggle value={!!notifications[n.id]} onValueChange={(v) => setNotification(n.id, v)} />,
  }));

  return (
    <ScreenTemplate title="Notifikasi" onBack={() => navigation.goBack()}>
      <MenuGroup items={items} style={{ marginTop: 0 }} />
    </ScreenTemplate>
  );
}
