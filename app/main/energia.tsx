import { View, Text, StyleSheet, StatusBar, Animated, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../themeContext";

export default function Energia() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { darkMode } = useTheme();
  const [missao, setMissao] = useState<string | null>(null);
  const [limiteTemp, setLimiteTemp] = useState<number | null>(null);
  const [energia, setEnergia] = useState<number>(0);
  const [consumo, setConsumo] = useState<string>("");
  const [tempoRestante, setTempoRestante] = useState<string>("");

  // Dados específicos de cada missão
  const missoesDados: Record<string, { energia: number; consumo: string; tempo: string }> = {
    "Missão 001": { energia: 18, consumo: "120W", tempo: "2h" },
    "Missão 002": { energia: 80, consumo: "90W", tempo: "6h" },
    "Missão 003": { energia: 15, consumo: "150W", tempo: "1h" },
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
            setEnergia(dados.energia);
            setConsumo(dados.consumo);
            setTempoRestante(dados.tempo);
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
        <Text style={[styles.title, { color: textColor }]}>🔋 Energia</Text>
        {missao ? (
          <Text style={styles.missao}>Missão ativa: {missao}</Text>
        ) : (
          <Text style={styles.missao}>Nenhuma missão ativa</Text>
        )}

        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.metricLabel, { color: textColor }]}>Nível da bateria</Text>
          <Text style={[styles.metricValue, { color: energia < 20 ? "#FF1744" : textColor }]}>
            {energia}%
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.metricLabel, { color: textColor }]}>Consumo atual</Text>
          <Text style={[styles.metricValue, { color: textColor }]}>{consumo}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: cardColor }]}>
          <Text style={[styles.metricLabel, { color: textColor }]}>Tempo restante</Text>
          <Text style={[styles.metricValue, { color: textColor }]}>{tempoRestante}</Text>
        </View>

        {energia < 20 && (
          <Text style={{ color: "#FF1744", fontWeight: "bold", marginTop: 20 }}>
            ⚠️ Alerta: Energia crítica abaixo de 20%
          </Text>
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
