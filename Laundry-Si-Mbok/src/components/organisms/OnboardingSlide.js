import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AppText } from '../atoms';

/** Satu slide onboarding. Props: slide {image, title, desc}, width, height */
export default function OnboardingSlide({ slide, width, height }) {
  return (
    <View style={{ width, height }}>
      <View style={styles.imageWrap}>
        <Image source={slide.image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textWrap}>
        <AppText variant="display" color="white" align="center" style={{ fontSize: 30, lineHeight: 38 }}>{slide.title}</AppText>
        <AppText variant="body" color="rgba(255,255,255,0.85)" align="center" style={{ fontSize: 15, lineHeight: 23, marginTop: 12 }}>
          {slide.desc}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrap: { flex: 1, minHeight: 160, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  textWrap: { paddingHorizontal: 32, paddingTop: 8, paddingBottom: 12 },
});
