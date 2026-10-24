import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ScreenTemplate from './ScreenTemplate';

/** Halaman berisi daftar (FlatList). Props: title, onBack, data, renderItem, keyExtractor, empty, footer */
export default function ListTemplate({ title, onBack, data, renderItem, keyExtractor, empty, footer }) {
  return (
    <ScreenTemplate title={title} onBack={onBack} scroll={false} padded={false} footer={footer}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={empty}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  list: { padding: 24, paddingTop: 8, flexGrow: 1 },
});
