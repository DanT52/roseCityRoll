import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ThankYouMessage: React.FC = () => {
  return (
    <div className="mb-8 text-center max-w-xl mx-auto">
      <div className="bg-background-800 rounded-lg p-8 mb-4">
        <h3 className="text-xl font-heading text-text-100 mb-4">Thanks for Coming!</h3>
        <p className="text-primary-400 text-sm md:text-base">We hope to see you next time!</p>
      </div>
      <Link
        to="/schedule"
        className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        View Schedule <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  );
};

export default ThankYouMessage;
