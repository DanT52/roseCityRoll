import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import RoseCityRollBanner from '../assets/images/RoseCityRoll.png';
import { Announcement } from '../types';

const Home: React.FC = () => {
  
  // Static announcement data
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Group photos are available',
      content: 'Download them at the link below!',
      date: '06/30/2025, 8:40 PM',
      link: {
        text: 'Big Rose City Roll 2025 Group Photos',
        url: 'https://photos.app.goo.gl/cmvUS97ARRk1BHYJ8'
      }
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center">
        
        <div className="relative z-10 text-center text-900">
          <img src={RoseCityRollBanner} alt="Big Rose City Roll Banner" className="w-full max-w-xl mx-auto  mb-8" />
          
          <p className="text-xl mb-6 max-w-2xl mx-auto text-text-100">
            Thank you to everyone who joined us for Portland's first Big Rose City Roll! 
            This amazing skating event brought together our community for an unforgettable experience.
          </p>
          
          <p className="text-lg mb-8 max-w-xl mx-auto text-text-200">
            Stay connected for updates!
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 mb-10">
            <a
              href="https://www.instagram.com/bigrosecityroll/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg shadow-lg transform hover:scale-105"
            >
              <Instagram className="w-6 h-6 mr-3" /> Follow for Updates
            </a>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="bg-accent-100 rounded-lg p-8 mt-4">
        <h2 className="font-heading text-2xl mb-4 text-white">Announcements</h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-accent-50 rounded p-4">
              <h3 className="font-heading text-xl mb-2 text-white">{announcement.title}</h3>
              <p className="text-accent-800 mb-2">{announcement.content}</p>
              {announcement.link && (
                <a 
                  href={announcement.link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium mb-2"
                >
                  {announcement.link.text} <ExternalLink className="ml-1 w-4 h-4" />
                </a>
              )}
              <p className="text-sm text-accent-600">{announcement.date}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Event Overview Section */}
      <section className="max-w-4xl mx-auto">
        <h2 
          className="font-heading text-3xl mb-6 text-text-100">About the Event</h2>
        <div
        style={{ textShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)' }}
         className="prose text-text-100">
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