import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../themeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

export default function SelecionarMissao() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const [missoes, setMissoes] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const carregarMissoes = async () => {
        const salvas = await AsyncStorage.getItem("missoes");
        if (salvas) setMissoes(JSON.parse(salvas));
      };
      carregarMissoes();
    }, [])
  );

  const selecionarMissao = async (missao: any) => {
    await AsyncStorage.setItem("missaoSelecionada", JSON.stringify(missao));
    Alert.alert("Missão selecionada", `Missão ativa: ${missao.nome}`);
    router.push("/main/sensores");
  };

  const excluirMissao = async (index: number) => {
    const novasMissoes = [...missoes];
    novasMissoes.splice(index, 1);
    setMissoes(novasMissoes);
    await AsyncStorage.setItem("missoes", JSON.stringify(novasMissoes));
    Alert.alert("Missão excluída");
  };

  const backgroundColor = darkMode ? "#121212" : "#FFFFFF";
  const textColor = darkMode ? "#FFFFFF" : "#000000";
  const cardColor = darkMode ? "#1E1E1E" : "#F5F5F5";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar backgroundColor={backgroundColor} barStyle={darkMode ? "light-content" : "dark-content"} />
      <Text style={[styles.title, { color: textColor }]}>🛰️ Selecionar Missão</Text>

      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        data={missoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.card, { backgroundColor: cardColor }]}>
            <Text style={[styles.cardText, { color: textColor }]}>Missão: {item.nome}</Text>
            <Text style={{ color: textColor }}>Limite Temp: {item.limiteTemp}°C</Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity style={styles.buttonSelect} onPress={() => selecionarMissao(item)}>
                <Text style={styles.buttonText}>Ativar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDelete} onPress={() => excluirMissao(index)}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, marginTop: 20 },
  card: {
    width: 300,
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  cardText: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  buttonSelect: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  buttonDelete: {
    backgroundColor: "#FF1744",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
});
