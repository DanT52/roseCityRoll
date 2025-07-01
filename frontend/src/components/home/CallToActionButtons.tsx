import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToActionButtons: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-4">
      <div className="relative group">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfRImAGRhCiu-2dNP7SCB1dt8_x5-4zDMHYqWQMHYBwFkYzIg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-primary-500 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg w-fit"
        >
          Register Now <ArrowRight className="ml-2 w-6 h-6" />
        </a>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Fill out registration form
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
      <div className="relative group">
        <a
          href="https://hotels.cloudbeds.com/en/reservation/IyNleY/?currency=usd&checkin=2025-06-26&checkout=2025-06-29&promo=BigRoseCityRoll2025"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg w-fit"
        >
          Book a Room <ArrowRight className="ml-2 w-6 h-6" />
        </a>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Book a room at Northwest Portland Hostel
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionButtons;
