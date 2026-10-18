import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { FONTS, SHADOW } from "../theme/theme";
import { useTheme } from "../theme/ThemeContext";
import ScreenHeader from "../components/ScreenHeader";

const MENUS = [
  { icon: "person-outline", label: "Ubah profil" },
  { icon: "location-outline", label: "Alamat tersimpan" },
  { icon: "card-outline", label: "Metode pembayaran" },
  { icon: "notifications-outline", label: "Notifikasi" },
  { icon: "help-circle-outline", label: "Bantuan" },
];

export default function ProfileScreen({ navigation }) {
  const { colors: COLORS, isDark, toggle } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScreenHeader title="Profil" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.userCard, SHADOW.card]}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.aqua]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>B</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Budi Santoso</Text>
            <Text style={styles.email}>budi@email.com</Text>
          </View>
        </View>

        <View style={[styles.menuCard, SHADOW.card]}>
          {MENUS.map((m, i) => (
            <TouchableOpacity
              key={m.label}
              style={[styles.menuRow, styles.menuBorder]}
              activeOpacity={0.7}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={m.icon} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.menuLabel}>{m.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.placeholder}
              />
            </TouchableOpacity>
          ))}

          <View style={styles.menuRow}>
            <View style={styles.menuIcon}>
              <Ionicons
                name={isDark ? "sunny-outline" : "moon-outline"}
                size={20}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.menuLabel}>Mode gelap</Text>
            <Switch
              value={isDark}
              onValueChange={toggle}
              trackColor={{ false: COLORS.disabled, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.8}
          onPress={() =>
            navigation
              .getParent()
              ?.reset({ index: 0, routes: [{ name: "Login" }] })
          }
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { padding: 24, paddingTop: 8 },
    userCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      padding: 18,
      borderRadius: 22,
      backgroundColor: COLORS.surface,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: { fontFamily: FONTS.extra, fontSize: 24, color: COLORS.white },
    name: { fontFamily: FONTS.bold, fontSize: 17, color: COLORS.text },
    email: {
      fontFamily: FONTS.regular,
      fontSize: 13,
      color: COLORS.muted,
      marginTop: 3,
    },
    menuCard: {
      marginTop: 20,
      borderRadius: 22,
      backgroundColor: COLORS.surface,
      paddingHorizontal: 16,
    },
    menuRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingVertical: 16,
    },
    menuBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
    menuIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: COLORS.primarySoft,
      alignItems: "center",
      justifyContent: "center",
    },
    menuLabel: {
      flex: 1,
      fontFamily: FONTS.semi,
      fontSize: 14,
      color: COLORS.text,
    },
    logout: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 24,
      paddingVertical: 16,
      borderRadius: 16,
      backgroundColor: COLORS.dangerSoft,
    },
    logoutText: { fontFamily: FONTS.bold, fontSize: 15, color: COLORS.danger },
  });
