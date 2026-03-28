import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppTextInput from "./TextInput";

export default function FormField({ label, error, inputProps }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <AppTextInput {...inputProps} style={error ? styles.inputError : null} />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  label: { color: "rgba(33,65,60,0.85)", fontWeight: "700", fontSize: 14 },
  error: { color: "#ff4d4f", fontWeight: "600", fontSize: 12 },
  inputError: { borderColor: "#ff4d4f", borderWidth: 1 },
});
