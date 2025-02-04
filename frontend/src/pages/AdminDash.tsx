import React from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { useFeatures } from '../contexts/FeatureContext';

const AdminDash: React.FC = () => {
  const { features, toggleFeature } = useFeatures();

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Dashboard Header */}
      <section className="mb-8">
        <h1 className="font-heading text-3xl text-text-100 mb-2">Admin Dashboard</h1>
        <p className="text-text-400">Manage site features and content</p>
      </section>

      {/* Feature Toggles */}
      <section className="bg-background-800 rounded-lg p-6 shadow-lg">
        <h2 className="font-heading text-2xl text-text-100 mb-4">Feature Controls</h2>
        
        <div className="space-y-4">
          {Object.entries(features)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([feature, { enabled, adminOnly }]) => (
              <div 
                key={feature}
                className="flex items-center justify-between p-4 bg-background-900 rounded-md hover:bg-background-950 transition-colors"
              >
                <div>
                  <h3 className="font-heading text-lg text-text-200 capitalize">{feature}</h3>
                  <p className="text-sm text-text-400">
                    {enabled ? 'Enabled' : 'Disabled'} {adminOnly && '(Admin Only)'}
                  </p>
                </div>
                
                <button
                  onClick={() => toggleFeature(feature)}
                  className={`
                    p-2 rounded-full transition-all duration-200 ease-in-out
                    ${enabled ? 'bg-secondary-500 text-white' : 'bg-text-300 text-text-800'}
                  `}
                >
                  <div className="transition-transform duration-200 ease-in-out">
                    {enabled ? (
                      <ToggleRight className="w-6 h-6" />
                    ) : (
                      <ToggleLeft className="w-6 h-6" />
                    )}
                  </div>
                </button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDash;