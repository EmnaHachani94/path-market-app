import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../src/theme";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Tu es connecté(e) ✅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingHorizontal: 22,
    paddingTop: 56,
  },
  title: { fontSize: 26, fontWeight: "900", color: theme.colors.text },
  subtitle: { marginTop: 8, fontSize: 16, color: theme.colors.muted },
});
