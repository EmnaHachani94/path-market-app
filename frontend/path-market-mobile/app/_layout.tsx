import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Welcome screen => app/index.tsx */}
        <Stack.Screen name="index" />

        {/* Auth screens (si tu as login/register) */}
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />

        {/* Tabs (après connexion) */}
        <Stack.Screen name="(tabs)" />

        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal", headerShown: true }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
