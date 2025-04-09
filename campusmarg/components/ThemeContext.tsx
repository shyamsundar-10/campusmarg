import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark";
type ThemePreference = ThemeType | "device";

interface ThemeContextProps {
  theme: ThemeType;
  themePreference: ThemePreference;
  setThemePreference: (pref: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme() as ThemeType;
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("device");
  const [theme, setTheme] = useState<ThemeType>(systemTheme || "light");

  useEffect(() => {
    if (themePreference === "device") {
      setTheme(systemTheme || "light");
    } else {
      setTheme(themePreference);
    }
  }, [themePreference, systemTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, themePreference, setThemePreference }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeProvider");
  }
  return context;
};
