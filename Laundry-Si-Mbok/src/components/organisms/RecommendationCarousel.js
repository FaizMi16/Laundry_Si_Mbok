import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { AppText } from '../atoms';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 64;
const CARD_GAP = 12;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

export default function RecommendationCarousel({ services = [], onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!services || services.length === 0) return null;

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);
    if (index >= 0 && index < services.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.carouselWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        contentContainerStyle={styles.carouselScroll}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {services.map((srv, idx) => {
          const isTop = idx === 0;
          return (
            <TouchableOpacity
              key={srv.id}
              activeOpacity={0.88}
              onPress={() => onSelect && onSelect(srv)}
              style={[
                styles.carouselCard,
                isTop ? styles.carouselCardTop : styles.carouselCardAlt,
              ]}
            >
              <View style={styles.carouselTopRow}>
                <View
                  style={[
                    styles.carouselRank,
                    isTop ? styles.carouselRankTop : styles.carouselRankAlt,
                  ]}
                >
                  <AppText
                    variant="caption"
                    style={[
                      styles.carouselRankText,
                      isTop && styles.carouselRankTextTop,
                    ]}
                  >
                    #{idx + 1} {isTop ? 'Paling Pas' : 'Rekomendasi'}
                  </AppText>
                </View>

                <View style={styles.carouselTag}>
                  <AppText variant="caption" style={styles.carouselTagText}>
                    ✦ Smart Pick
                  </AppText>
                </View>
              </View>

              <AppText variant="title" style={styles.carouselTitle} numberOfLines={1}>
                {srv.nama || srv.name || 'Layanan'}
              </AppText>

              {!!srv.deskripsi && (
                <AppText variant="caption" style={styles.carouselDesc} numberOfLines={2}>
                  {srv.deskripsi}
                </AppText>
              )}

              <View style={styles.carouselBottomRow}>
                <View>
                  <AppText variant="caption" style={styles.carouselPriceHint}>
                    Tarif layanan
                  </AppText>
                  <AppText variant="subtitle" style={styles.carouselPrice}>
                    Rp {Number(srv.harga || 0).toLocaleString('id-ID')}
                    {srv.satuan ? `/${srv.satuan}` : ''}
                  </AppText>
                </View>

                <View
                  style={[
                    styles.carouselActionBtn,
                    isTop && styles.carouselActionBtnTop,
                  ]}
                >
                  <AppText
                    variant="caption"
                    style={[
                      styles.carouselActionText,
                      isTop && styles.carouselActionTextTop,
                    ]}
                  >
                    Pesan →
                  </AppText>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {services.length > 1 && (
        <View style={styles.dotsContainer}>
          {services.map((srv, idx) => (
            <View
              key={srv.id}
              style={[styles.dotItem, idx === activeIndex && styles.dotItemActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  carouselWrapper: {
    marginTop: 4,
  },
  carouselScroll: {
    paddingHorizontal: 24,
    gap: CARD_GAP,
  },
  carouselCard: {
    width: CARD_WIDTH,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
  },
  carouselCardTop: {
    backgroundColor: '#e0eafc',
    borderColor: '#bfdbfe',
  },
  carouselCardAlt: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
  },
  carouselTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  carouselRank: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  carouselRankTop: {
    backgroundColor: '#2563eb',
  },
  carouselRankAlt: {
    backgroundColor: '#e2e8f0',
  },
  carouselRankText: {
    fontWeight: '700',
    color: '#334155',
  },
  carouselRankTextTop: {
    color: '#ffffff',
  },
  carouselTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  carouselTagText: {
    color: '#1d4ed8',
    fontWeight: '700',
  },
  carouselTitle: {
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  carouselDesc: {
    color: '#475569',
    marginBottom: 12,
  },
  carouselBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  carouselPriceHint: {
    color: '#64748b',
  },
  carouselPrice: {
    fontWeight: '700',
    color: '#0f172a',
  },
  carouselActionBtn: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  carouselActionBtnTop: {
    backgroundColor: '#1d4ed8',
  },
  carouselActionText: {
    fontWeight: '700',
    color: '#1e293b',
  },
  carouselActionTextTop: {
    color: '#ffffff',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  dotItem: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#cbd5e1',
  },
  dotItemActive: {
    width: 18,
    backgroundColor: '#2563eb',
  },
});