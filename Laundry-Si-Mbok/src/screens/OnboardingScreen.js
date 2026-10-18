import React, { useMemo, useRef, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS } from '../theme/theme';
import { useTheme } from '../theme/ThemeContext';
import Button from '../components/Button';

const SLIDES = [
  { id: '1', image: require('../../assets/onboarding-1.png'), title: 'Urusan laundry,\njadi lebih mudah', desc: 'Cuci pakaian tanpa ribet. Pilih layanan, serahkan ke kami, dan terima hasilnya bersih dan wangi.' },
  { id: '2', image: require('../../assets/onboarding-2.png'), title: 'Dijemput dan\ndiantar ke rumah', desc: 'Tidak sempat ke gerai? Kurir kami datang ke alamatmu sesuai jam yang kamu pilih.' },
  { id: '3', image: require('../../assets/onboarding-3.png'), title: 'Pantau pesanan\nkapan saja', desc: 'Lihat status cucianmu dari dijemput, dicuci, sampai diantar kembali.' },
];

export default function OnboardingScreen({ navigation }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
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
    <LinearGradient
      colors={[COLORS.heroFrom, COLORS.heroTo]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      {/* Latar gradient gelap/biru di kedua tema, jadi ikon status bar selalu terang */}
      <StatusBar style="light" />

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
        renderItem={({ item }) => (
          <View style={[styles.slide, { width, height: listHeight }]}>
            <View style={styles.imageWrap}>
              <Image source={item.image} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          </View>
        )}
      />

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
        <View style={styles.dots}>
          {SLIDES.map((s, i) => (
            <View key={s.id} style={i === index ? styles.dotActive : styles.dot} />
          ))}
        </View>
        <Button
          variant="hero"
          title={isLast ? 'Mulai sekarang' : 'Lanjut'}
          icon="arrow-forward"
          onPress={next}
          style={styles.button}
        />
      </View>
    </LinearGradient>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { flex: 1 },
  list: { flex: 1 },
  slide: { },
  // Gambar memenuhi lebar layar, tinggi menyesuaikan sisa ruang
  imageWrap: { flex: 1, minHeight: 160 , overflow: 'hidden'},
  image: { width: '100%', height: '100%' },
  textWrap: { paddingHorizontal: 32, paddingTop: 8, paddingBottom: 12 },
  title: { fontFamily: FONTS.extra, fontSize: 30, lineHeight: 38, color: COLORS.white, textAlign: 'center' },
  desc: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 23, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 12 },
  footer: { paddingHorizontal: 24, paddingTop: 8, gap: 22 },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.white },
  button: { alignSelf: 'stretch' },
});
