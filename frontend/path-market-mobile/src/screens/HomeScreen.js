import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { theme } from "../theme";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Bienvenue sur Path Market.</Text>

      <View style={{ marginTop: 18 }}>
        <PrimaryButton
          title="Se déconnecter"
          onPress={() => navigation.replace("Welcome")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingHorizontal: 22,
    paddingTop: 56,
  },
  title: { fontSize: 26, fontWeight: "900", color: theme.colors.text },
  subtitle: { marginTop: 8, fontSize: 16, color: theme.colors.muted },
});
