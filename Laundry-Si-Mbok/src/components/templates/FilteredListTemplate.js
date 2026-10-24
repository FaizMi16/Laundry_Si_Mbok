import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ScreenTemplate from './ScreenTemplate';

/**
 * Halaman daftar dengan area filter/pencarian tetap di atas (admin).
 * Props: title, onBack, headerRight, filters (node), data, renderItem, keyExtractor, empty, footer
 */
export default function FilteredListTemplate({ title, onBack, headerRight, filters, data, renderItem, keyExtractor, empty, footer }) {
  return (
    <ScreenTemplate title={title} onBack={onBack} headerRight={headerRight} scroll={false} padded={false} footer={footer}>
      <View>{filters}</View>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={empty}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  list: { padding: 24, paddingTop: 8, flexGrow: 1 },
});
