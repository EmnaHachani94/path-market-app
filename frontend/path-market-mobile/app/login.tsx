import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import FormCard from "../src/components/FormCard";

import AuthHeader from "@/src/components/AuthHeader";
import FormField from "../src/components/FormField";
import PrimaryButton from "../src/components/PrimaryButton";
import Screen from "../src/components/Screen";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const onSubmit = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) newErrors.email = "Email obligatoire";
    if (!password.trim()) newErrors.password = "Mot de passe obligatoire";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // TODO: login (API)
    // router.replace("/home");
  };

  return (
    <Screen contentStyle={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header (logo) */}
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

          <AuthHeader title="Se connecter" />

          <Image
            source={require("../assets/images/image-login.png")}
            style={styles.illustration}
            resizeMode="contain"
          />

          {/* Card formulaire */}
          <FormCard>
            <FormField
              label="Email"
              error={errors.email}
              inputProps={{
                placeholder: "nom@email.com",
                keyboardType: "email-address",
                autoCapitalize: "none",
                value: email,
                onChangeText: (t: string) => setEmail(t),
                returnKeyType: "next",
              }}
            />

            <FormField
              label="Mot de passe"
              error={errors.password}
              inputProps={{
                placeholder: "••••••••",
                secureTextEntry: true,
                value: password,
                onChangeText: (t: string) => setPassword(t),
                returnKeyType: "done",
              }}
            />

            <PrimaryButton
              title="Se connecter"
              onPress={onSubmit}
              style={{ width: "100%" }}
            />

            <Text style={styles.link} onPress={() => router.push("/register")}>
              Pas de compte ? Créer un compte
            </Text>
          </FormCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

  // équivalent du padding SafeAreaView dans index/register
  safe: { flex: 1, paddingHorizontal: 22 },

  container: {
    flexGrow: 1,
    paddingTop: 14,
    paddingBottom: 18,
    alignItems: "center",
    gap: 14,
  },

  header: {
    width: "100%",
    alignItems: "flex-start",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImg: { width: 60, height: 60 },
  brand: { color: "#E85B4F", fontSize: 18, fontWeight: "700" },

  illustration: {
    width: "100%",
    maxWidth: 560,
    height: 250, // fixe pour laisser de la place au formulaire
    marginLeft: "40%",
  },

  link: {
    textAlign: "center",
    color: "#21413C",
    fontWeight: "800",
    textDecorationLine: "underline",
    marginTop: 2,
  },
});
