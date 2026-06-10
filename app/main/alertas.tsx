import { View, Text, StyleSheet, StatusBar, Animated, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../themeContext";

export default function Alertas() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { darkMode } = useTheme();
  const [missao, setMissao] = useState<string | null>(null);
  const [limiteTemp, setLimiteTemp] = useState<number | null>(null);

  // Dados simulados
  const energiaAtual = 18;
  const temperaturaAtual = 95;
  const comunicacao = false;

  useFocusEffect(
    React.useCallback(() => {
      const carregarMissao = async () => {
        const missaoSelecionada = await AsyncStorage.getItem("missaoSelecionada");
        if (missaoSelecionada) {
          const { nome, limiteTemp } = JSON.parse(missaoSelecionada);
          setMissao(nome);
          setLimiteTemp(limiteTemp);
        } else {
          setMissao(null);
          setLimiteTemp(null);
        }
      };
      carregarMissao();

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
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Text style={[styles.title, { color: textColor }]}>🚨 Alertas da Missão</Text>
        {missao ? (
          <Text style={styles.missao}>Missão ativa: {missao}</Text>
        ) : (
          <Text style={styles.missao}>Nenhuma missão ativa</Text>
        )}

        {energiaAtual < 20 && (
          <View style={[styles.alertBox, { backgroundColor: boxColor }]}>
            <MaterialCommunityIcons name="battery-alert" size={28} color="#FF1744" />
            <Text style={[styles.alertText, { color: textColor }]}>Energia crítica abaixo de 20%</Text>
          </View>
        )}

        {limiteTemp && temperaturaAtual > limiteTemp && (
          <View style={[styles.alertBox, { backgroundColor: boxColor }]}>
            <MaterialCommunityIcons name="thermometer-alert" size={28} color="#FFA000" />
            <Text style={[styles.alertText, { color: textColor }]}>
              Temperatura acima do limite ({limiteTemp}°C)
            </Text>
          </View>
        )}

        {!comunicacao && (
          <View style={[styles.alertBox, { backgroundColor: boxColor }]}>
            <MaterialCommunityIcons name="wifi-off" size={28} color="#E91E63" />
            <Text style={[styles.alertText, { color: textColor }]}>Falha na comunicação detectada</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" },
  backButton: { position: "absolute", top: 50, left: 20 },
  backText: { fontWeight: "bold", fontSize: 16, color: "#E91E63" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  missao: { color: "#E91E63", fontWeight: "bold", marginBottom: 20 },
  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 8,
    width: 300,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  alertText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
    flexWrap: "wrap",
  },
});
