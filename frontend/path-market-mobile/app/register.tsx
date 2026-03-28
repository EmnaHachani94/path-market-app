import { router } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";

import FormCard from "@/src/components/FormCard";
import AuthHeader from "../src/components/AuthHeader";
import FormField from "../src/components/FormField";
import PrimaryButton from "../src/components/PrimaryButton";
import Screen from "../src/components/Screen";

export default function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // erreurs simples (optionnel)
  const [errors, setErrors] = useState<{
    nom?: string;
    email?: string;
    password?: string;
  }>({});

  const onSubmit = () => {
    const newErrors: { nom?: string; email?: string; password?: string } = {};

    if (!nom.trim()) newErrors.nom = "Nom obligatoire";
    if (!email.trim()) newErrors.email = "Email obligatoire";
    if (!password.trim()) newErrors.password = "Mot de passe obligatoire";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // TODO: Appel API / inscription
    // router.replace("/login");
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader title="Creer un compte" />
          <FormCard>
            <FormField
              label="Nom"
              error={errors.nom}
              inputProps={{
                placeholder: "Votre nom",
                value: nom,
                onChangeText: (t: string) => setNom(t),
                returnKeyType: "next",
              }}
            />

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
              title="S’inscrire"
              onPress={onSubmit}
              style={{ width: "100%" }}
            />

            <Text style={styles.link} onPress={() => router.push("/login")}>
              Déjà un compte ? Se connecter
            </Text>
          </FormCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingVertical: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  link: {
    textAlign: "center",
    color: "#21413C",
    fontWeight: "800",
    textDecorationLine: "underline",
    marginTop: 2,
  },
});
