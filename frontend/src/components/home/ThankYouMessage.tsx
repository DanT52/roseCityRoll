import React from 'react';

const ThankYouMessage: React.FC = () => {
  return (
    <div className="mb-8 text-center max-w-xl mx-auto">
      <div className="bg-background-800 rounded-lg p-8">
        <h3 className="text-xl font-heading text-text-100 mb-4">Thanks for Coming!</h3>
        <p className="text-primary-400 text-sm md:text-base">We hope to see you next time!</p>
      </div>
    </div>
  );
};

export default ThankYouMessage;
