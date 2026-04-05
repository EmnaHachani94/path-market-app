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

import FormCard from "@/src/components/FormCard";
import AppFooter from "../src/components/AppFooter";
import AuthHeader from "../src/components/AuthHeader";
import FormField from "../src/components/FormField";
import PrimaryButton from "../src/components/PrimaryButton";
import Screen from "../src/components/Screen";
import { registerUser } from "../src/services/authentificationApi";

export default function Register() {
  const [nom, setNom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    nom: "",
    dateNaissance: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const formatDOB = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 8);
    const dd = digits.slice(0, 2);
    const mm = digits.slice(2, 4);
    const yyyy = digits.slice(4, 8);

    if (digits.length <= 2) return dd;
    if (digits.length <= 4) return `${dd}/${mm}`;
    return `${dd}/${mm}/${yyyy}`;
  };

  const onSubmit = async () => {
    const newErrors = { nom: "", dateNaissance: "", email: "", password: "" };

    if (!nom.trim()) newErrors.nom = "Nom obligatoire";
    if (!dateNaissance.trim())
      newErrors.dateNaissance = "Date de naissance obligatoire";
    if (!email.trim()) newErrors.email = "Email obligatoire";
    if (!password.trim()) newErrors.password = "Mot de passe obligatoire";
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((v) => v);
    if (hasErrors) return;
    try {
      setLoading(true);
      const result = await registerUser({
        nom,
        email,
        password,
        dateNaissance,
      });

      console.log("Register OK:", result);

      router.replace("/home");
    } catch (e: any) {
      console.log("Register ERROR:", e?.message ?? e);
      setErrors((prev) => ({
        ...prev,
        email: e?.message ?? "Erreur inscription",
      }));
      console.log("Register ERROR:", e?.message ?? e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
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
              label="Date de naissance"
              error={errors.dateNaissance}
              inputProps={{
                placeholder: "JJ/MM/AAAA",
                value: dateNaissance,
                keyboardType: "number-pad",
                maxLength: 10,
                onChangeText: (t: string) => setDateNaissance(formatDOB(t)),
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
              title={loading ? "..." : "S’inscrire"}
              onPress={onSubmit}
              style={{ width: "100%" }}
            />

            <Text style={styles.link} onPress={() => router.push("/login")}>
              Déjà un compte ? Se connecter
            </Text>
          </FormCard>
        </ScrollView>

        <AppFooter />
      </KeyboardAvoidingView>
    </Screen>
  );
}

const FOOTER_HEIGHT = 64;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 18 + FOOTER_HEIGHT,
    alignItems: "center",
    gap: 14,
  },
  header: { width: "100%", alignItems: "flex-start" },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoImg: { width: 60, height: 60 },
  brand: { color: "#E85B4F", fontSize: 18, fontWeight: "700" },
  link: {
    textAlign: "center",
    color: "#21413C",
    fontWeight: "800",
    textDecorationLine: "underline",
    marginTop: 2,
  },
});
