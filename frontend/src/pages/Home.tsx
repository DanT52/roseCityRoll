import React from 'react';
import RoseCityRollBanner from '../assets/images/roseCityRoll.png';
import { useFeatures } from '../contexts/FeatureContext';
import { EventCountdown, CallToActionButtons, EventOverview } from '../components/home';
import Announcements from './Announcements';

const Home: React.FC = () => {
  const { features } = useFeatures();
  
  // Event start time configuration
  const EVENT_START_TIME = new Date('2025-06-26T18:00:00-07:00'); // 6 PM PDT on June 26th, 2025

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center">
        <div className="relative z-10 text-center text-900">
          <img src={RoseCityRollBanner} alt="Big Rose City Roll Banner" className="w-full max-w-xl mx-auto mb-0" />
          
          {/* Event Countdown Section */}
          <EventCountdown eventStartTime={EVENT_START_TIME} />
          
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Join Portland&apos;s first Big Rose City Roll from June 26th to June 29th 2025 for a week of skating,
            community building, and unforgettable experiences.
          </p>
          
          {/* Call to Action Buttons */}
          <CallToActionButtons />
        </div>
      </section>

      {/* Announcements Section */}
      {features.announcements?.enabled && (
        <section className="bg-accent-100 rounded-lg p-8 mt-4">
          <Announcements />
        </section>
      )}

      {/* Event Overview Section */}
      <EventOverview />
    </div>
  );
};

export default Home;
