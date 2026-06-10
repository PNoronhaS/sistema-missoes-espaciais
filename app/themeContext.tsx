import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  darkMode: boolean;
  alertaEnergia: boolean;
  toggleDarkMode: () => void;
  toggleAlertaEnergia: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  alertaEnergia: true,
  toggleDarkMode: () => {},
  toggleAlertaEnergia: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [alertaEnergia, setAlertaEnergia] = useState(true);

  useEffect(() => {
    const loadPrefs = async () => {
      const dm = await AsyncStorage.getItem("darkMode");
      const ae = await AsyncStorage.getItem("alertaEnergia");
      if (dm !== null) setDarkMode(dm === "true");
      if (ae !== null) setAlertaEnergia(ae === "true");
    };
    loadPrefs();
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", newMode.toString());
  };

  const toggleAlertaEnergia = async () => {
    const newVal = !alertaEnergia;
    setAlertaEnergia(newVal);
    await AsyncStorage.setItem("alertaEnergia", newVal.toString());
  };

  return (
    <ThemeContext.Provider value={{ darkMode, alertaEnergia, toggleDarkMode, toggleAlertaEnergia }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
