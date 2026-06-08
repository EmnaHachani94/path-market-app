import { useEffect, useState } from "react";
import RGPDConsentModal from "../components/RGPDConsentModal";
import RGPDService from "../services/rgpdServices";

/**
 * Hook to manage RGPD consent
 * Shows the consent modal on first launch
 */
export const useRGPDConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConsent();
  }, []);

  const checkConsent = async () => {
    try {
      const hasConsent = await RGPDService.hasGivenConsent();
      if (!hasConsent) {
        setShowConsent(true);
      }
    } catch (error) {
      console.error("Error checking consent:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptConsent = async (analytics, marketing) => {
    try {
      await RGPDService.saveConsent(true, analytics, marketing);
      setShowConsent(false);
    } catch (error) {
      console.error("Error accepting consent:", error);
    }
  };

  const handleRejectConsent = async () => {
    try {
      // Save minimal consent (only essential)
      await RGPDService.saveConsent(false, false, false);
      setShowConsent(false);
    } catch (error) {
      console.error("Error rejecting consent:", error);
    }
  };

  return {
    showConsent,
    loading,
    handleAcceptConsent,
    handleRejectConsent,
  };
};

/**
 * RGPDConsentWrapper - Wrap your app with this component
 * It handles showing the consent modal on first launch
 */
const RGPDConsentWrapper = ({ children }) => {
  const { showConsent, loading, handleAcceptConsent, handleRejectConsent } =
    useRGPDConsent();

  if (loading) {
    return children;
  }

  return (
    <>
      {children}
      <RGPDConsentModal
        visible={showConsent}
        onAccept={handleAcceptConsent}
        onReject={handleRejectConsent}
      />
    </>
  );
};

export default RGPDConsentWrapper;
