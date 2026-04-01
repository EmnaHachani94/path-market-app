import { StyleSheet, View } from "react-native";
/**
 * @param {{
 *  children: import("react").ReactNode,
 *  style?: import("react-native").StyleProp<import("react-native").ViewStyle>
 * }} props
 */

export default function FormCard({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#ffffffa1",
    borderRadius: 22,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: "rgba(33,65,60,0.10)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
});
