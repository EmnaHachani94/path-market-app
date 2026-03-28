import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { theme } from "../theme";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>Path Market</Text>

        {/* Placeholder illustration: tu pourras remplacer par une vraie image */}
        <View style={styles.illustrationPlaceholder}>
          <Text style={{ color: "rgba(0,0,0,0.45)" }}>Illustration</Text>
        </View>

        <Text style={styles.quote}>
          “Faites vos courses plus vite, sans stress{`\n`}
          Votre liste s’organise{`\n`}
          Votre parcours s’optimise”
        </Text>

        <PrimaryButton
          title="Crée un compte"
          onPress={() => navigation.navigate("Register")}
        />

        <Text style={styles.linkRow}>
          Déjà inscrit ?{" "}
          <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
            Se connecter
          </Text>
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerItem}>A propos</Text>
        <Text style={styles.footerItem}>Fonctionnement</Text>
        <Text style={styles.footerItem}>Contact</Text>
        <Text style={styles.footerItem}>FAQ</Text>
        <Text style={styles.footerItem}>Confidentialité</Text>
      </View>
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
  hero: { flex: 1, alignItems: "center" },
  logo: {
    alignSelf: "flex-start",
    color: "#E85B4F",
    fontWeight: "700",
    fontSize: 22,
    marginBottom: 18,
  },
  illustrationPlaceholder: {
    width: "100%",
    height: 220,
    borderRadius: theme.radius.xl,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  quote: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 18,
  },
  linkRow: { marginTop: 14, color: theme.colors.text },
  link: { textDecorationLine: "underline", fontWeight: "700" },
  footer: {
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.08)",
    gap: 6,
  },
  footerItem: { color: "rgba(0,0,0,0.55)", fontSize: 13 },
});