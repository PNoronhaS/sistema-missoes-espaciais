import { View, Text, StyleSheet, StatusBar, Animated, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../themeContext";

export default function Comunicacao() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { darkMode } = useTheme();
  const [missao, setMissao] = useState<string | null>(null);
  const [limiteTemp, setLimiteTemp] = useState<number | null>(null);
  const [statusRede, setStatusRede] = useState<string>("");
  const [sinal, setSinal] = useState<string>("");

  // Dados específicos de cada missão
  const missoesDados: Record<string, { status: string; sinal: string }> = {
    "Missão 001": { status: "Conectado", sinal: "Estável" },
    "Missão 002": { status: "Conectado", sinal: "Forte" },
    "Missão 003": { status: "Desconectado", sinal: "Fraco" },
  };

  useFocusEffect(
    React.useCallback(() => {
      const carregarMissao = async () => {
        const missaoSelecionada = await AsyncStorage.getItem("missaoSelecionada");
        if (missaoSelecionada) {
          const { nome, limiteTemp } = JSON.parse(missaoSelecionada);
          setMissao(nome);
          setLimiteTemp(limiteTemp);

          const dados = missoesDados[nome];
          if (dados) {
            setStatusRede(dados.status);
            setSinal(dados.sinal);
          }
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
  const cardColor = darkMode ? "#1E1E1E" : "#F5F5F5";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar backgroundColor={backgroundColor} barStyle={darkMode ? "light-content" : "dark-content"} />
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Text style={[styles.title, { color: textColor }]}>📡 Comunicação</Text>
        {missao ? (
          <Text style={styles.missao}>Missão ativa: {missao}</Text>
        ) : (
          <Text style={styles.missao}>Nenhuma missão ativa</Text>
        )}

        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.metricLabel, { color: textColor }]}>Status da rede</Text>
          <Text style={[styles.metricValue, { color: statusRede === "Desconectado" ? "#FF1744" : "#4CAF50" }]}>
            {statusRede}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.metricLabel, { color: textColor }]}>Sinal</Text>
          <Text style={[styles.metricValue, { color: textColor }]}>{sinal}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.metricLabel, { color: textColor }]}>Limite de temperatura</Text>
          <Text style={[styles.metricValue, { color: textColor }]}>
            {limiteTemp ? `${limiteTemp}°C` : "Não definido"}
          </Text>
        </View>
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
  card: {
    width: 300,
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  metricLabel: { fontSize: 16, fontWeight: "600" },
  metricValue: { fontSize: 14, marginTop: 4 },
});
