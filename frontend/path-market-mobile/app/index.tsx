import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "../src/components/PrimaryButton";
import Screen from "../src/components/Screen";

export default function Welcome() {
  return (
    <Screen style={styles.screen} contentStyle={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <Text style={styles.brand}>PathMarket</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Vos courses{"\n"}intelligentes</Text>
          <Text style={styles.subtitle}>
            Créez votre liste et optimisez{"\n"}votre parcours en magasin.
          </Text>
        </View>

        <Image
          source={require("../assets/images/welcome.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <View style={styles.actions}>
          <PrimaryButton
            title="Créer un compte"
            onPress={() => router.push("/register")}
            style={styles.primaryBtn}
          />

          <Text style={styles.link} onPress={() => router.push("/login")}>
            Se connecter
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // Screen gère déjà le dégradé + SafeArea
  // Ici on garde uniquement les styles spécifiques à la page
  screen: { flex: 1 },

  safe: { flex: 1, paddingHorizontal: 22 },

  header: {
    paddingTop: 14,
    paddingBottom: 8,
    alignItems: "flex-start",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImg: { width: 60, height: 60 },
  brand: { color: "#E85B4F", fontSize: 16, fontWeight: "900" },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 22,
    paddingBottom: 18,
  },

  textBlock: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "#21413C",
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 44,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 12,
    color: "rgba(33,65,60,0.75)",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },

  illustration: {
    width: "100%",
    maxWidth: 560,
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
  },

  actions: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  primaryBtn: {
    width: "92%",
    maxWidth: 560,
  },

  link: {
    color: "#21413C",
    fontSize: 16,
    fontWeight: "800",
    textDecorationLine: "underline",
    marginBottom: 6,
  },
});
