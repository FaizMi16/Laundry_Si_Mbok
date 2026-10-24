import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOW } from '../../theme/theme';
import { useThemedStyles } from '../../theme/ThemeContext';
import { Divider } from '../atoms';
import { FaqItem } from '../molecules';

/** Akordeon FAQ (satu terbuka sekali waktu). Props: faqs [{ id, q, a }] */
export default function FaqList({ faqs }) {
  const { styles } = useThemedStyles(makeStyles);
  const [openId, setOpenId] = useState(null);
  return (
    <View style={[styles.card, SHADOW.card]}>
      {faqs.map((f, i) => (
        <React.Fragment key={f.id}>
          {i > 0 ? <Divider /> : null}
          <FaqItem
            question={f.q}
            answer={f.a}
            expanded={openId === f.id}
            onPress={() => setOpenId(openId === f.id ? null : f.id)}
          />
        </React.Fragment>
      ))}
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 22, paddingHorizontal: 16 },
});
