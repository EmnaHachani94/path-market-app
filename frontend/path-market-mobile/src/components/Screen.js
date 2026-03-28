import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";

/**
 * @param {{
 *  children: import("react").ReactNode,
 *  style?: import("react-native").StyleProp<import("react-native").ViewStyle>,
 *  contentStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>,
 *  edges?: import("react-native-safe-area-context").Edge[],
 *  withPadding?: boolean,
 * }} props
 */
/**
 * Screen = wrapper réutilisable pour toutes les pages
 * - met le background en dégradé
 * - gère le SafeArea (top/bottom)
 *
 */
export default function Screen({
  children,
  edges = ["top", "bottom"],
  withPadding = false,
  style,
  contentStyle,
}) {
  return (
    <LinearGradient
      colors={theme.gradient.colors}
      start={theme.gradient.start}
      end={theme.gradient.end}
      style={[styles.gradient, style]}
    >
      <SafeAreaView style={styles.safe} edges={edges}>
        <View
          style={[styles.content, withPadding && styles.padding, contentStyle]}
        >
          {children}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  content: { flex: 1 },
  padding: {
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
});
