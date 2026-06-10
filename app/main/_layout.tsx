import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, StatusBar } from "react-native";
import { ThemeProvider, useTheme } from "../themeContext";

function InnerLayout() {
  const { darkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#121212" : "#FFFFFF" }]}>
      <StatusBar backgroundColor={darkMode ? "#121212" : "#FFFFFF"} barStyle={darkMode ? "light-content" : "dark-content"} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: darkMode ? "#121212" : "#FFFFFF",
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarActiveTintColor: "#E91E63",
          tabBarInactiveTintColor: darkMode ? "#FFFFFF" : "#000000",
        }}
      >
        <Tabs.Screen name="sensores" options={{ title: "Sensores", tabBarIcon: ({ color }) => <Ionicons name="speedometer-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="energia" options={{ title: "Energia", tabBarIcon: ({ color }) => <Ionicons name="battery-half-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="comunicacao" options={{ title: "Comunicação", tabBarIcon: ({ color }) => <Ionicons name="wifi-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="alertas" options={{ title: "Alertas", tabBarIcon: ({ color }) => <Ionicons name="alert-outline" size={24} color={color} /> }} />
        <Tabs.Screen name="configuracoes" options={{ title: "Configurações", tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={24} color={color} /> }} />
      </Tabs>
    </View>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
