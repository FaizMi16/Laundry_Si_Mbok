import React from 'react';
import { Text } from 'react-native';
import { FONTS } from '../../theme/theme';
import { useTheme } from '../../theme/ThemeContext';

/** Skala tipografi tunggal. Semua teks di app lewat atom ini. */
const VARIANTS = {
  display: { fontFamily: FONTS.extra, fontSize: 26, lineHeight: 34 },
  title: { fontFamily: FONTS.extra, fontSize: 22, lineHeight: 30 },
  heading: { fontFamily: FONTS.extra, fontSize: 18 },
  subheading: { fontFamily: FONTS.extra, fontSize: 16 },
  bodyBold: { fontFamily: FONTS.bold, fontSize: 15 },
  item: { fontFamily: FONTS.semi, fontSize: 14 },
  body: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21 },
  label: { fontFamily: FONTS.semi, fontSize: 13 },
  caption: { fontFamily: FONTS.medium, fontSize: 12 },
  small: { fontFamily: FONTS.bold, fontSize: 11 },
};

/**
 * Props: variant, color (kunci tema mis. 'muted' atau warna mentah), align, style
 */
export default function AppText({ variant = 'body', color = 'text', align, style, children, ...props }) {
  const { colors } = useTheme();
  return (
    <Text
      {...props}
      style={[VARIANTS[variant], { color: colors[color] || color }, align && { textAlign: align }, style]}
    >
      {children}
    </Text>
  );
}
