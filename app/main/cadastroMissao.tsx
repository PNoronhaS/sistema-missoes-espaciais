import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../themeContext";

export default function CadastroMissao() {
  const router = useRouter();
  const { darkMode } = useTheme();

  const [nomeMissao, setNomeMissao] = useState("");
  const [limiteTemp, setLimiteTemp] = useState("");
  const [erro, setErro] = useState("");

  const backgroundColor = darkMode ? "#121212" : "#FFFFFF";
  const textColor = darkMode ? "#FFFFFF" : "#000000";
  const cardColor = darkMode ? "#1E1E1E" : "#F5F5F5";

  const salvarMissao = async () => {
    if (!nomeMissao.trim() || !limiteTemp || isNaN(Number(limiteTemp))) {
      setErro("Preencha corretamente os campos.");
      return;
    }

    const novaMissao = { nome: nomeMissao, limiteTemp: Number(limiteTemp) };

    try {
      const missoesSalvas = await AsyncStorage.getItem("missoes");
      const lista = missoesSalvas ? JSON.parse(missoesSalvas) : [];
      lista.push(novaMissao);

      await AsyncStorage.setItem("missoes", JSON.stringify(lista));
      await AsyncStorage.setItem("missaoSelecionada", JSON.stringify(novaMissao));

      Alert.alert("Missão cadastrada!", `Missão: ${nomeMissao}`);
      router.push("/main/selecionarMissao");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar a missão.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar backgroundColor={backgroundColor} barStyle={darkMode ? "light-content" : "dark-content"} />
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: textColor }]}>🛰️ Cadastro de Missão</Text>

        <TextInput
          style={[styles.input, { color: textColor, borderColor: "#E91E63" }]}
          placeholder="Nome da missão"
          placeholderTextColor={darkMode ? "#888" : "#555"}
          value={nomeMissao}
          onChangeText={setNomeMissao}
        />

        <TextInput
          style={[styles.input, { color: textColor, borderColor: "#E91E63" }]}
          placeholder="Limite de temperatura (°C)"
          placeholderTextColor={darkMode ? "#888" : "#555"}
          keyboardType="numeric"
          value={limiteTemp}
          onChangeText={setLimiteTemp}
        />

        {erro ? <Text style={{ color: "#FF1744", marginBottom: 10 }}>{erro}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={salvarMissao}>
          <Text style={styles.buttonText}>Cadastrar Missão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" },
  backButton: { position: "absolute", top: 50, left: 20 },
  backText: { fontWeight: "bold", fontSize: 16, color: "#E91E63" },
  card: {
    width: "85%",
    maxWidth: 350,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#E91E63",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
