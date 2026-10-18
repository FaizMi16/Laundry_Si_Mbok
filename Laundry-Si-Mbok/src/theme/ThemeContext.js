import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { LIGHT, DARK } from './theme';

const ThemeContext = createContext({ colors: LIGHT, isDark: false, toggle: () => {} });

export function ThemeProvider({ children }) {
  const system = useColorScheme();                // ikut pengaturan HP
  const [override, setOverride] = useState(null); // null = ikut sistem
  const isDark = (override ?? system) === 'dark';

  const value = useMemo(
    () => ({
      isDark,
      colors: isDark ? DARK : LIGHT,
      toggle: () => setOverride(isDark ? 'light' : 'dark'),
    }),
    [isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
