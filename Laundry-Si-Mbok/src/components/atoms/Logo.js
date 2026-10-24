import React from 'react';
import { Image } from 'react-native';

/** Logo aplikasi. Props: size, radius */
export default function Logo({ size = 72, radius = 24, style }) {
  return (
    <Image
      source={require('../../../assets/logo.png')}
      style={[{ width: size, height: size, borderRadius: radius }, style]}
    />
  );
}
