import AsyncStorage from "@react-native-async-storage/async-storage";

const CONSENT_KEY = "@pathmarket_rgpd_consent";
const CONSENT_VERSION = "1.0";

class RGPDService {
  /**
   * Check if user has already given consent
   */
  static async hasGivenConsent() {
    try {
      const consent = await AsyncStorage.getItem(CONSENT_KEY);
      return consent !== null;
    } catch (error) {
      console.error("Error checking consent:", error);
      return false;
    }
  }

  /**
   * Get current consent status
   */
  static async getConsent() {
    try {
      const consent = await AsyncStorage.getItem(CONSENT_KEY);
      if (consent) {
        return JSON.parse(consent);
      }
      return null;
    } catch (error) {
      console.error("Error getting consent:", error);
      return null;
    }
  }

  /**
   * Save user consent
   */
  static async saveConsent(accepted, analytics = false, marketing = false) {
    try {
      const consentData = {
        accepted,
        version: CONSENT_VERSION,
        timestamp: Date.now(),
        analytics: accepted ? analytics : false,
        marketing: accepted ? marketing : false,
        essential: accepted, // Essential data is always collected if user accepts
      };

      await AsyncStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
    } catch (error) {
      console.error("Error saving consent:", error);
      throw error;
    }
  }

  /**
   * Revoke consent
   */
  static async revokeConsent() {
    try {
      await AsyncStorage.removeItem(CONSENT_KEY);
    } catch (error) {
      console.error("Error revoking consent:", error);
      throw error;
    }
  }

  /**
   * Check if a specific type of consent is given
   */
  static async isConsentGivenFor(type) {
    try {
      const consent = await this.getConsent();
      if (!consent || !consent.accepted) {
        return false;
      }
      return consent[type] ?? false;
    } catch (error) {
      console.error(`Error checking ${type} consent:`, error);
      return false;
    }
  }

  /**
   * Update specific consent preferences
   */
  static async updateConsentPreferences(analytics, marketing) {
    try {
      const currentConsent = await this.getConsent();
      if (!currentConsent) {
        throw new Error("No consent found");
      }

      const updatedConsent = {
        ...currentConsent,
        analytics:
          analytics !== undefined ? analytics : currentConsent.analytics,
        marketing:
          marketing !== undefined ? marketing : currentConsent.marketing,
        timestamp: Date.now(),
      };

      await AsyncStorage.setItem(CONSENT_KEY, JSON.stringify(updatedConsent));
    } catch (error) {
      console.error("Error updating consent preferences:", error);
      throw error;
    }
  }
}

export default RGPDService;
