import React from 'react';
import { View } from 'react-native';
import { IconButton, Input } from '../atoms';

/** Kotak pencarian dengan tombol hapus. Props: value, onChangeText, placeholder, style */
export default function SearchBar({ value, onChangeText, placeholder = 'Cari…', style }) {
  return (
    <View style={style}>
      <Input
        icon="search-outline"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        style={{ paddingRight: value ? 44 : 14 }}
      />
      {value ? (
        <IconButton
          name="close"
          variant="soft"
          size={30}
          iconSize={16}
          radius={10}
          onPress={() => onChangeText('')}
          style={{ position: 'absolute', right: 12, top: 12 }}
        />
      ) : null}
    </View>
  );
}
