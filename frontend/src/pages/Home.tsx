import React from 'react';
import { ArrowRight, Instagram, Link as LinkIcon } from 'lucide-react';
import RoseCityRollBanner from '../assets/images/RoseCityRoll.png';

const Home: React.FC = () => {
  // Mock announcements - in production, these would come from an API
  const announcements = [
    
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center">
        
        <div className="relative z-10 text-center text-900">
          <img src={RoseCityRollBanner} alt="Big Rose City Roll Banner" className="w-full max-w-xl mx-auto  mb-4" />
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Join Portland's first Big Rose City Roll from June 26th to June 29th 2025 for a week of skating,
            community building, and unforgettable experiences.
          </p>
          <a
            href="https://www.instagram.com/bigrosecityroll/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white font-bold mb-10 py-3 px-6 rounded-lg transition-colors"
          >
            <Instagram className="w-6 h-6 mr-2" /> Follow for Updates <ArrowRight className="ml-2" />
          </a>
          <p className="text-xl text-text-200">Registration will be open soon!</p>
        </div>
      </section>

      {/* Announcements Section */}
      {announcements.length > 0 && (
        <section className="bg-accent-100 rounded-lg p-8 mt-4">
          <h2 className="font-heading text-2xl mb-4 text-white">Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-accent-50 rounded p-4">
                <h3 className="font-heading text-xl mb-2 text-white">{announcement.title}</h3>
                <p className="text-accent-800 mb-2">{announcement.content}</p>
                <p className="text-sm text-accent-600">{new Date(announcement.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Event Overview Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl mb-6 text-text-100">About the Event</h2>
        <div className="prose text-text-200">
            <p className="mb-4">
            Big Rose City Roll is an exciting event that brings together inline and quad skaters!
            </p>
          <p className="mb-4">
            Each day features carefully planned routes that showcase the best of Portland's
            skateable terrain, from smooth waterfront paths to urban adventures through the city's
            most iconic neighborhoods.
          </p>
          <p>
            Whether you're a seasoned skater or just getting started, our inclusive community
            welcomes you to join us for this unforgettable skating experience.
          </p>
          <p className="mt-4">
            More info is coming soon!
          </p>
          <p className="mt-4">
            This event is hosted by <a href="https://www.instagram.com/bridge.city.skate/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline inline-flex items-center"><Instagram className="w-4 h-4 mr-1" /> Bridge City Skate</a>. 
            Follow them on Instagram and check out their <a href="https://linktr.ee/bridgecityskate" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline inline-flex items-center"><LinkIcon className="w-4 h-4 mr-1" /> Linktree</a> for more information.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;