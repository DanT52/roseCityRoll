import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getFeatures, toggleFeature as apiToggleFeature } from '../services/features';

interface FeatureContextData {
  features: Record<string, { enabled: boolean, adminOnly: boolean }>;
  toggleFeature: (feature: string) => void;
}

const FeatureContext = createContext<FeatureContextData | null>(null);

export const FeatureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [features, setFeatures] = useState<Record<string, { enabled: boolean, adminOnly: boolean }>>({});

  useEffect(() => {
    const fetchFeatures = async () => {
      const fetchedFeatures = await getFeatures();
      setFeatures(fetchedFeatures);
    };
    fetchFeatures();
  }, []);

  const toggleFeature = async (feature: string) => {
    const updatedFeature = await apiToggleFeature(feature, !features[feature].enabled);
    setFeatures(prev => ({
      ...prev,
      [feature]: { ...prev[feature], enabled: updatedFeature.enabled }
    }));
  };

  return (
    <FeatureContext.Provider value={{ features, toggleFeature }}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatures = (): FeatureContextData => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeatureProvider');
  }
  return context;
};
