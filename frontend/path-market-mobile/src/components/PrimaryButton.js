import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { theme } from "../theme";

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  style = undefined,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        style,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  pressed: { opacity: 0.92 },
  disabled: { opacity: 0.6 },
  text: { color: "white", fontWeight: "800", fontSize: 18 },
});
