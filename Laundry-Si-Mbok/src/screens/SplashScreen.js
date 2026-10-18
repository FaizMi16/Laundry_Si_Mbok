import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FONTS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';

export default function SplashScreen({ navigation }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const scale = useRef(new Animated.Value(0.6)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 700, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
    const t = setTimeout(() => navigation.replace('Onboarding'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.bubble, { width: 220, height: 220, top: -60, right: -60 }]} />
      <View style={[styles.bubble, { width: 120, height: 120, bottom: 80, left: -30 }]} />
      <Animated.Image source={require('../../assets/logo.png')} style={[styles.logo, { opacity: fade, transform: [{ scale }] }]} />
      <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }], alignItems: 'center' }}>
        <Text style={styles.brand}>Laundry Si Mbok</Text>
        <Text style={styles.tag}>Bersih, wangi, tanpa ribet.</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 24 },
  bubble: { position: 'absolute', borderRadius: 200, backgroundColor: 'rgba(255,255,255,0.12)' },
  logo: { width: 110, height: 110, borderRadius: 30, marginBottom: 20 },
  brand: { fontFamily: FONTS.extra, fontSize: 28, color: COLORS.white, textAlign: 'center' },
  tag: { fontFamily: FONTS.medium, fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 6, textAlign: 'center' },
});
