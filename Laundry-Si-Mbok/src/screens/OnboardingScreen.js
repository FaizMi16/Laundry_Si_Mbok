import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { Button } from '../components/atoms';
import { PaginationDots } from '../components/molecules';
import { OnboardingSlide } from '../components/organisms';
import { GradientTemplate } from '../components/templates';

const SLIDES = [
  { id: '1', image: require('../../assets/onboarding-1.png'), title: 'Urusan laundry,\njadi lebih mudah', desc: 'Cuci pakaian tanpa ribet. Pilih layanan, serahkan ke kami, dan terima hasilnya bersih dan wangi.' },
  { id: '2', image: require('../../assets/onboarding-2.png'), title: 'Dijemput dan\ndiantar ke rumah', desc: 'Tidak sempat ke gerai? Kurir kami datang ke alamatmu sesuai jam yang kamu pilih.' },
  { id: '3', image: require('../../assets/onboarding-3.png'), title: 'Pantau pesanan\nkapan saja', desc: 'Lihat status cucianmu dari dijemput, dicuci, sampai diantar kembali.' },
];

export default function OnboardingScreen({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const isLast = index === SLIDES.length - 1;

  const next = () => {
    if (isLast) return navigation.replace('Login');
    listRef.current?.scrollToIndex({ index: index + 1, animated: true });
  };

  return (
    <GradientTemplate
      colors={[colors.heroFrom, colors.heroTo]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ paddingTop: insets.top }}
    >
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(i) => i.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
        extraData={listHeight}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => <OnboardingSlide slide={item} width={width} height={listHeight} />}
      />

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
        <PaginationDots count={SLIDES.length} index={index} />
        <Button
          variant="hero"
          title={isLast ? 'Mulai sekarang' : 'Lanjut'}
          icon="arrow-forward"
          onPress={next}
          style={{ alignSelf: 'stretch' }}
        />
      </View>
    </GradientTemplate>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  footer: { paddingHorizontal: 24, paddingTop: 8, gap: 22 },
});
