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
          <div className="flex flex-col items-center justify-center gap-4 mb-10">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfRImAGRhCiu-2dNP7SCB1dt8_x5-4zDMHYqWQMHYBwFkYzIg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg w-fit"
            >
              Register Now <ArrowRight className="ml-2 w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/bigrosecityroll/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-base"
            >
              <Instagram className="w-5 h-5 mr-2" /> Follow for Updates
            </a>
          </div>
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
          <div className="mt-8 text-center">
            <p className="text-text-200 mb-4">Hosted by</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.instagram.com/lallaveallen_/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.imgur.com/JOvfQIj.png" alt="La Llave Allen" className="h-12" />
              </a>
              <a href="https://www.instagram.com/bridge.city.skate/" target="_blank" rel="noopener noreferrer">
                <img src="https://i.imgur.com/Fa2qHe3.png" alt="Bridge City Skate" className="h-12" />
              </a>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;