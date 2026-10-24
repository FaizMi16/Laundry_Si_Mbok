import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../atoms';

/** Banner promo. Props: title, description */
export default function PromoBanner({ title, description }) {
  const { colors } = useTheme();
  return (
    <LinearGradient colors={[colors.aqua, colors.primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.promo}>
      <View style={{ flex: 1 }}>
        <AppText variant="subheading" color="white" style={{ fontSize: 15 }}>{title}</AppText>
        <AppText variant="caption" color="rgba(255,255,255,0.9)" style={{ marginTop: 4 }}>{description}</AppText>
      </View>
      <Image source={require('../../../assets/promo.png')} style={styles.img} resizeMode="contain" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  promo: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 24, marginTop: 24, paddingLeft: 18, paddingRight: 8, paddingVertical: 8, borderRadius: 20, overflow: 'hidden' },
  img: { width: 110, height: 70 },
});
