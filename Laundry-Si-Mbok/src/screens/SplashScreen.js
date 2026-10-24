import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { AppText, Bubble, Logo } from '../components/atoms';
import { GradientTemplate } from '../components/templates';

export default function SplashScreen({ navigation }) {
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
    <GradientTemplate style={styles.container}>
      <Bubble size={220} opacity={0.12} style={{ top: -60, right: -60 }} />
      <Bubble size={120} opacity={0.12} style={{ bottom: 80, left: -30 }} />
      <Animated.View style={{ opacity: fade, transform: [{ scale }], marginBottom: 20 }}>
        <Logo size={110} radius={30} />
      </Animated.View>
      <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }], alignItems: 'center' }}>
        <AppText variant="display" color="white" align="center" style={{ fontSize: 28 }}>Laundry Si Mbok</AppText>
        <AppText variant="caption" color="rgba(255,255,255,0.8)" align="center" style={{ fontSize: 14, marginTop: 6 }}>
          Bersih, wangi, tanpa ribet.
        </AppText>
      </Animated.View>
    </GradientTemplate>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 24 },
});
