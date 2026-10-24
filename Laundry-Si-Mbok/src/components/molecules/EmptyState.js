import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { AppText, Button } from '../atoms';

/** Props: icon, title, description, actionLabel, onActionPress, style */
export default function EmptyState({ icon = 'receipt-outline', title, description, actionLabel, onActionPress, style }) {
  const { colors } = useTheme();
  return (
    <View style={[{ alignItems: 'center', paddingTop: 48, paddingHorizontal: 12 }, style]}>
      <Ionicons name={icon} size={48} color={colors.muted} />
      <AppText variant="bodyBold" style={{ fontSize: 17, marginTop: 16 }}>{title}</AppText>
      {description ? (
        <AppText variant="body" color="muted" align="center" style={{ marginTop: 6 }}>{description}</AppText>
      ) : null}
      {actionLabel ? (
        <Button title={actionLabel} onPress={onActionPress} style={{ marginTop: 20, alignSelf: 'stretch' }} />
      ) : null}
    </View>
  );
}
