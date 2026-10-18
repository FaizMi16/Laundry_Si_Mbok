import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { FONTS, SHADOW } from "../theme/theme";
import { useTheme } from "../theme/ThemeContext";
import { SERVICES, METHODS, DATES, TIMES, formatRupiah } from "../data/dummy";
import ScreenHeader from "../components/ScreenHeader";
import Input from "../components/Input";
import Button from "../components/Button";
import Chip from "../components/Chip";

export default function OrderFormScreen({ navigation, route }) {
  const { colors: COLORS, isDark } = useTheme();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const [serviceId, setServiceId] = useState(
    route.params?.serviceId || "kiloan",
  );
  const [methodId, setMethodId] = useState("jemput");
  const [qty, setQty] = useState(3);
  const [date, setDate] = useState(DATES[0]);
  const [time, setTime] = useState(TIMES[0]);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [addressError, setAddressError] = useState("");

  const submit = () => {
    if (methodId === "jemput" && address.trim().length < 10) {
      setAddressError("Alamat wajib diisi lengkap (minimal 10 karakter)");
      return;
    }
    navigation.navigate("MainTabs", { screen: "Pesanan" });
  };

  const service = SERVICES.find((s) => s.id === serviceId);
  const method = METHODS.find((m) => m.id === methodId);
  const subtotal = service.price * qty;
  const total = subtotal + method.fee;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScreenHeader title="Buat pesanan" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Layanan</Text>
          {SERVICES.map((s) => {
            const active = s.id === serviceId;
            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => {
                  setServiceId(s.id);
                  setQty(s.unit === "kg" ? 3 : 1);
                }}
                activeOpacity={0.85}
                style={[styles.option, active && styles.optionOn]}
              >
                <View
                  style={[
                    styles.optionIcon,
                    active && { backgroundColor: COLORS.primary },
                  ]}
                >
                  <Ionicons
                    name={s.icon}
                    size={20}
                    color={active ? COLORS.white : COLORS.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionTitle}>{s.name}</Text>
                  <Text style={styles.optionDesc}>{s.desc}</Text>
                </View>
                <Text style={styles.optionPrice}>
                  {formatRupiah(s.price)}/{s.unit}
                </Text>
              </TouchableOpacity>
            );
          })}

          <Text style={styles.sectionTitle}>Jumlah ({service.unit})</Text>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => setQty(Math.max(1, qty - 1))}
            >
              <Ionicons name="remove" size={22} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.qty}>
              {qty} {service.unit}
            </Text>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => setQty(qty + 1)}
            >
              <Ionicons name="add" size={22} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Cara penyerahan</Text>
          <View style={styles.methodRow}>
            {METHODS.map((m) => {
              const active = m.id === methodId;
              return (
                <TouchableOpacity
                  key={m.id}
                  onPress={() => setMethodId(m.id)}
                  activeOpacity={0.85}
                  style={[styles.method, active && styles.optionOn]}
                >
                  <Ionicons
                    name={m.icon}
                    size={26}
                    color={active ? COLORS.primary : COLORS.muted}
                  />
                  <Text style={styles.optionTitle}>{m.name}</Text>
                  <Text style={styles.optionDesc}>{m.desc}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {methodId === "jemput" && (
            <>
              <Text style={styles.sectionTitle}>Alamat penjemputan</Text>
              <Input
                icon="location-outline"
                placeholder="Tulis alamat lengkap"
                multiline
                value={address}
                onChangeText={(t) => {
                  setAddress(t);
                  setAddressError("");
                }}
                error={addressError}
              />

              <Text style={styles.sectionTitle}>Jadwal jemput</Text>
              <View style={styles.chips}>
                {DATES.map((d) => (
                  <Chip
                    key={d}
                    label={d}
                    active={d === date}
                    onPress={() => setDate(d)}
                  />
                ))}
              </View>
              <View style={[styles.chips, { marginTop: 10 }]}>
                {TIMES.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    active={t === time}
                    onPress={() => setTime(t)}
                  />
                ))}
              </View>
            </>
          )}

          <Text style={styles.sectionTitle}>Catatan</Text>
          <Input
            icon="create-outline"
            placeholder="Contoh: pisahkan baju putih"
            multiline
            value={note}
            onChangeText={setNote}
          />

          <View style={[styles.summary, SHADOW.card]}>
            <View style={styles.sumRow}>
              <Text style={styles.sumLabel}>
                {service.name} × {qty}
              </Text>
              <Text style={styles.sumValue}>{formatRupiah(subtotal)}</Text>
            </View>
            <View style={styles.sumRow}>
              <Text style={styles.sumLabel}>Ongkos jemput</Text>
              <Text style={styles.sumValue}>
                {method.fee ? formatRupiah(method.fee) : "Gratis"}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.sumRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatRupiah(total)}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <Button
            title="Pesan sekarang"
            icon="checkmark-circle-outline"
            onPress={submit}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { padding: 24, paddingTop: 4, paddingBottom: 24 },
    sectionTitle: {
      fontFamily: FONTS.extra,
      fontSize: 16,
      color: COLORS.text,
      marginTop: 20,
      marginBottom: 12,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
      borderRadius: 18,
      backgroundColor: COLORS.surface,
      borderWidth: 1.5,
      borderColor: COLORS.border,
      marginBottom: 10,
    },
    optionOn: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primarySoft,
    },
    optionIcon: {
      width: 40,
      height: 40,
      borderRadius: 13,
      backgroundColor: COLORS.primarySoft,
      alignItems: "center",
      justifyContent: "center",
    },
    optionTitle: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.text },
    optionDesc: {
      fontFamily: FONTS.regular,
      fontSize: 12,
      color: COLORS.muted,
      marginTop: 2,
    },
    optionPrice: {
      fontFamily: FONTS.bold,
      fontSize: 12,
      color: COLORS.primary,
    },
    stepper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      borderRadius: 18,
      backgroundColor: COLORS.surface,
      borderWidth: 1.5,
      borderColor: COLORS.border,
    },
    stepBtn: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: COLORS.primarySoft,
      alignItems: "center",
      justifyContent: "center",
    },
    qty: { fontFamily: FONTS.extra, fontSize: 18, color: COLORS.text },
    methodRow: { flexDirection: "row", gap: 12 },
    method: {
      flex: 1,
      gap: 4,
      padding: 14,
      borderRadius: 18,
      backgroundColor: COLORS.surface,
      borderWidth: 1.5,
      borderColor: COLORS.border,
    },
    chips: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    summary: {
      marginTop: 24,
      padding: 18,
      borderRadius: 20,
      backgroundColor: COLORS.surface,
    },
    sumRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 5,
    },
    sumLabel: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.muted },
    sumValue: { fontFamily: FONTS.semi, fontSize: 13, color: COLORS.text },
    divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
    totalLabel: { fontFamily: FONTS.bold, fontSize: 15, color: COLORS.text },
    totalValue: {
      fontFamily: FONTS.extra,
      fontSize: 18,
      color: COLORS.primary,
    },
    bottomBar: {
      padding: 20,
      paddingTop: 12,
      backgroundColor: COLORS.surface,
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
    },
  });
