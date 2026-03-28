// src/components/AuthHeader.js

import { StyleSheet, Text, View } from "react-native";

/**
 * @param {{
 *  title: string,
 *  subtitle?: string,
 *  style?: import("react-native").StyleProp<import("react-native").ViewStyle>,
 * }} props
 */
export default function AuthHeader({ title, subtitle, style }) {
  return (
    <View style={[styles.textBlock, style]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  textBlock: {
    width: "100%",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#21413C",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    marginTop: 2,
    color: "rgba(33,65,60,0.75)",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
});
