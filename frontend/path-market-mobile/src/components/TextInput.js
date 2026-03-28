import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function AppTextInput({
  style,
  focusedBorderColor = "#21413C",
  placeholderTextColor = "rgba(81, 85, 83, 0.45)", // ✅ couleur par défaut
  ...rest
}) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      {...rest}
      placeholderTextColor={placeholderTextColor} // ✅ appliquée ici
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[
        styles.input,
        style,
        focused
          ? {
              borderColor: focusedBorderColor,
              borderWidth: 1,
              outlineStyle: "solid",
              outlineWidth: 1,
              outlineColor: focusedBorderColor,
            }
          : null,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.12)",
    color: "#21413C",
  },
});
