import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Switch, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../themeContext";

export default function Configuracoes() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { darkMode, alertaEnergia, toggleDarkMode, toggleAlertaEnergia } = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
    }, [])
  );

  const backgroundColor = darkMode ? "#121212" : "#FFFFFF";
  const textColor = darkMode ? "#FFFFFF" : "#000000";
  const boxColor = darkMode ? "#1E1E1E" : "#F5F5F5";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar backgroundColor={backgroundColor} barStyle={darkMode ? "light-content" : "dark-content"} />
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
        <Text style={[styles.backText, { color: "#E91E63" }]}>← Voltar</Text>
      </TouchableOpacity>

      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Text style={[styles.title, { color: textColor }]}>⚙️ Configurações</Text>

        <View style={[styles.option, { backgroundColor: boxColor }]}>
          <Text style={[styles.optionText, { color: textColor }]}>Tema Dark</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        <View style={[styles.option, { backgroundColor: boxColor }]}>
          <Text style={[styles.optionText, { color: textColor }]}>Alertas de Energia</Text>
          <Switch value={alertaEnergia} onValueChange={toggleAlertaEnergia} />
        </View>

        <Text style={{ color: "#E91E63", marginTop: 20, fontWeight: "500" }}>
          Tema {darkMode ? "Escuro" : "Claro"} ativado
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" },
  backButton: { position: "absolute", top: 50, left: 20 },
  backText: { fontWeight: "bold", fontSize: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: { fontSize: 16, fontWeight: "500" },
});
