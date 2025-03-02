import React from 'react';
import { ArrowRight } from 'lucide-react';
import RoseCityRollBanner from '../assets/images/roseCityRoll.png';
import { useFeatures } from '../contexts/FeatureContext';
import Announcements from './Announcements';

const Home: React.FC = () => {
  const { features } = useFeatures();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center">
        <div className="relative z-10 text-center text-900">
          <img src={RoseCityRollBanner} alt="Big Rose City Roll Banner" className="w-full max-w-xl mx-auto  mb-4" />
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Join Portland&apos;s premier rollerblading event for a week of urban skating adventures,
            community building, and unforgettable experiences.
          </p>
          <a
            href="#register"
            className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white font-bold mb-10 py-3 px-6 rounded-lg transition-colors"
          >
            Register Now <ArrowRight className="ml-2" />
          </a>
        </div>
      </section>

      {/* Announcements Section */}
      {features.announcements?.enabled && (
        <section className="bg-accent-100 rounded-lg p-8 mt-4">
          <Announcements />
        </section>
      )}

      {/* Event Overview Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl mb-6 text-text-100">About the Event</h2>
        <div className="prose text-text-200">
          <p className="mb-4">
            Big Rose City Roll is Portland&apos;s answer to the famous Big Apple Roll, bringing together
            inline skaters of all skill levels for a week of urban adventures, social skating, and
            community building.
          </p>
          <p className="mb-4">
            Each day features carefully planned routes that showcase the best of Portland&apos;s
            skateable terrain, from smooth waterfront paths to urban adventures through the city&apos;s
            most iconic neighborhoods.
          </p>
          <p>
            Whether you&apos;re a seasoned skater or just getting started, our inclusive community
            welcomes you to join us for this unforgettable skating experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;