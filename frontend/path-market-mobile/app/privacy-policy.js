import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PRIVACY_POLICY_CONTENT = `# Politique de Confidentialité et RGPD - PathMarket

## 1. Introduction

PathMarket respecte votre vie privée et s'engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).

## 2. Données Collectées

### Données Essentielles
- **Identité** : Nom, email, numéro de téléphone
- **Compte utilisateur** : Identifiant unique, mot de passe chiffré
- **Listes de courses** : Les articles et listes que vous créez
- **Localisation approximative** : Pour adapter le service

### Données Analytiques (optionnel)
- **Utilisation de l'app** : Quels écrans vous visitez
- **Actions** : Création de listes, recherches, partages
- **Informations sur l'appareil** : Modèle, système d'exploitation

### Données Marketing (optionnel)
- **Préférences** : Articles et catégories qui vous intéressent
- **Email pour les offres** : Actualités et promotions

## 3. Vos Droits RGPD

Vous avez le droit de :

✓ **Droit d'accès** : Demander une copie de vos données
✓ **Droit de rectification** : Corriger vos informations
✓ **Droit à l'effacement** : Supprimer vos données
✓ **Droit à la portabilité** : Exporter vos données
✓ **Droit de retirer votre consentement** : À tout moment

## 4. Conservation des Données

- **Compte actif** : Pendant la durée de votre compte
- **Listes de courses** : Pendant la durée de votre compte
- **Logs de sécurité** : 90 jours
- **Données analytiques** : 12 mois

## 5. Sécurité des Données

Nous mettons en place :
- Chiffrement en transit (HTTPS/TLS)
- Chiffrement au repos
- Contrôle d'accès restreint
- Authentification sécurisée
- Audits de sécurité réguliers

## 6. Contact

**Email** : privacy@pathmarket.com

**Autorité de contrôle** : CNIL (Commission Nationale de l'Informatique et des Libertés)
www.cnil.fr

---

**Dernière mise à jour** : Juin 2026`;

const PrivacyPolicy = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Simple markdown to text converter (pas de librairie externe)
  const parseMarkdown = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <Text key={index} style={styles.h1}>
            {line.replace("# ", "")}
          </Text>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <Text key={index} style={styles.h2}>
            {line.replace("## ", "")}
          </Text>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <Text key={index} style={styles.h3}>
            {line.replace("### ", "")}
          </Text>
        );
      }
      // Bold text
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/);
        return (
          <Text key={index} style={styles.paragraph}>
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <Text key={i} style={styles.bold}>
                  {part}
                </Text>
              ) : (
                part
              ),
            )}
          </Text>
        );
      }
      // Checkmarks
      if (line.startsWith("✓")) {
        return (
          <Text key={index} style={styles.checkmark}>
            {line}
          </Text>
        );
      }
      // Links
      if (line.includes("www.")) {
        return (
          <Text key={index} style={styles.link}>
            {line}
          </Text>
        );
      }
      // Empty lines
      if (line.trim() === "") {
        return <View key={index} style={{ height: 8 }} />;
      }
      // Default paragraph
      if (line.trim()) {
        return (
          <Text key={index} style={styles.paragraph}>
            {line}
          </Text>
        );
      }
      return null;
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#21413C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Politique de Confidentialité</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E85B4F" />
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
        >
          {parseMarkdown(PRIVACY_POLICY_CONTENT)}
          <View style={{ height: 30 }} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#21413C",
    flex: 1,
    textAlign: "center",
  },

  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  h1: {
    fontSize: 28,
    fontWeight: "900",
    color: "#21413C",
    marginBottom: 16,
    marginTop: 12,
  },
  h2: {
    fontSize: 20,
    fontWeight: "800",
    color: "#21413C",
    marginBottom: 12,
    marginTop: 16,
  },
  h3: {
    fontSize: 16,
    fontWeight: "700",
    color: "#21413C",
    marginBottom: 8,
    marginTop: 12,
  },

  paragraph: {
    fontSize: 14,
    color: "rgba(33, 65, 60, 0.8)",
    lineHeight: 22,
    marginBottom: 8,
  },
  bold: {
    fontWeight: "700",
    color: "#21413C",
  },

  checkmark: {
    fontSize: 14,
    color: "rgba(33, 65, 60, 0.8)",
    lineHeight: 22,
    marginBottom: 8,
    marginLeft: 8,
  },

  link: {
    fontSize: 14,
    color: "#E85B4F",
    lineHeight: 22,
    marginBottom: 8,
  },
});

export default PrivacyPolicy;
