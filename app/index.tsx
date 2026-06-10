import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Ionicons name="rocket-outline" size={64} color="#E91E63" />
        <Text style={styles.title}>Space Predictive Analytics</Text>
        <Text style={styles.subtitle}>FIAP Global Solution 2026.1</Text>
        <Text style={styles.text}>
          Monitore energia, sensores e comunicação de missões espaciais simuladas.
        </Text>

        {/* Botão original de login */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => router.push("/main/sensores")}
        >
          <Text style={styles.buttonText}>Entrar na Missão</Text>
        </TouchableOpacity>

        {/* Novo botão de cadastro de missão */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonSecondary}
          onPress={() => router.push("/main/cadastroMissao")}
        >
          <Text style={styles.buttonText}>Cadastrar Missão</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#E91E63",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 20,
  },
  text: {
    color: "#B0B0B0",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#E91E63",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
