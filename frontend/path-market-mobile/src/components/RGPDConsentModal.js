import { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const RGPDConsentModal = ({ visible, onAccept, onReject }) => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const handleAccept = () => {
    onAccept(analyticsEnabled, marketingEnabled);
  };

  const handlePolicyPress = () => {
    Alert.alert(
      "Politique de Confidentialité",
      "PathMarket respecte votre vie privée et s'engage à protéger vos données personnelles conformément au RGPD.\n\nVous pouvez consulter la politique complète dans les paramètres de l'app après l'installation.",
      [{ text: "Fermer", onPress: () => {} }],
    );
  };

  const handleConditionsPress = () => {
    Alert.alert(
      "Conditions d'utilisation",
      "En utilisant PathMarket, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.\n\nVous devez respecter toutes les lois applicables.",
      [{ text: "Fermer", onPress: () => {} }],
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Votre confidentialité</Text>
          <Text style={styles.subtitle}>
            nous avons besoin de votre consentement
          </Text>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
        >
          {/* Données essentielles */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Données essentielles</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Obligatoire</Text>
              </View>
            </View>
            <Text style={styles.sectionDescription}>
              Ces données sont nécessaires au fonctionnement de l'application
              (authentification, sécurité, sauvegarde de vos listes de courses).
            </Text>
          </View>

          {/* Analytique */}
          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <View style={styles.sectionTextWrapper}>
                <Text style={styles.sectionTitle}>Analyse et statistiques</Text>
                <Text style={styles.sectionDescription}>
                  Nous permet de comprendre comment vous utilisez l'application
                  pour l'améliorer.
                </Text>
              </View>
              <Switch
                value={analyticsEnabled}
                onValueChange={setAnalyticsEnabled}
                trackColor={{ false: "#ccc", true: "#E85B4F" }}
                thumbColor={analyticsEnabled ? "#E85B4F" : "#f4f3f4"}
              />
            </View>
          </View>

          {/* Marketing */}
          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <View style={styles.sectionTextWrapper}>
                <Text style={styles.sectionTitle}>Marketing</Text>
                <Text style={styles.sectionDescription}>
                  Recevoir des offres personnalisées et des actualités sur nos
                  nouveautés.
                </Text>
              </View>
              <Switch
                value={marketingEnabled}
                onValueChange={setMarketingEnabled}
                trackColor={{ false: "#ccc", true: "#E85B4F" }}
                thumbColor={marketingEnabled ? "#E85B4F" : "#f4f3f4"}
              />
            </View>
          </View>

          {/* Policy Link */}
          <View style={styles.policySection}>
            <Text style={styles.policyText}>
              En cliquant sur "Accepter", vous acceptez notre{" "}
              <Text style={styles.link} onPress={handlePolicyPress}>
                politique de confidentialité
              </Text>{" "}
              et nos{" "}
              <Text style={styles.link} onPress={handleConditionsPress}>
                conditions d'utilisation
              </Text>
              .
            </Text>
          </View>
        </ScrollView>

        {/* Footer with buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={onReject}
          >
            <Text style={styles.rejectButtonText}>Refuser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={handleAccept}
          >
            <Text style={styles.acceptButtonText}>Accepter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 20,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#21413C",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(33, 65, 60, 0.7)",
  },

  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#21413C",
    flex: 1,
  },
  badge: {
    backgroundColor: "#E85B4F",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },

  sectionDescription: {
    fontSize: 14,
    color: "rgba(33, 65, 60, 0.65)",
    lineHeight: 20,
  },

  toggleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  sectionTextWrapper: {
    flex: 1,
    marginRight: 12,
  },

  policySection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  policyText: {
    fontSize: 13,
    color: "rgba(33, 65, 60, 0.7)",
    lineHeight: 20,
  },
  link: {
    color: "#E85B4F",
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  rejectButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#21413C",
  },
  acceptButton: {
    backgroundColor: "#E85B4F",
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});

export default RGPDConsentModal;
