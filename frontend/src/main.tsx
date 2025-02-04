import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import '@fontsource/oswald';
import '@fontsource/nunito';
import { FeatureProvider } from './contexts/FeatureContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <FeatureProvider>
      <App />
    </FeatureProvider>
  </StrictMode>
);