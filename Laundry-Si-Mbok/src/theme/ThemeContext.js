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

/**
 * Hook kecil untuk membuat StyleSheet yang ikut tema.
 * `makeStyles` harus fungsi level-modul: (colors) => StyleSheet.create({...})
 * Mengembalikan { styles, colors, isDark } sekaligus.
 */
export function useThemedStyles(makeStyles) {
  const { colors, isDark } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [makeStyles, colors]);
  return { styles, colors, isDark };
}
