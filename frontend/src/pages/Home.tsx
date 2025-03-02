import React from 'react';
import { ArrowRight, Instagram, Link as LinkIcon, ExternalLink } from 'lucide-react';
import Countdown from 'react-countdown';
import RoseCityRollBanner from '../assets/images/RoseCityRoll.png';
import { Announcement } from '../types';

const Home: React.FC = () => {
  
  // Static announcement data
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Accommodations / Lodging',
      content: 'You can now start reserving your rooms at NW Portland Hostel if you are traveling for the event.',
      date: '02/20/2024, 12:00 PM',
      link: {
        text: 'Watch Announcement Video',
        url: 'https://www.instagram.com/p/DGTbpafyOtr/'
      }
    }
  ];

  const eventDate = new Date('2025-06-26T18:00:00-07:00'); // 6 PM PDT on June 26th, 2025

  const countdownRenderer = ({ days, hours, minutes, completed }: any) => {
    if (completed) {
      return <span className="text-primary-500">The event has started!</span>;
    }

    return (
      <div className="flex justify-center gap-6 text-text-100">
        <div className="text-center">
          <div className="text-4xl font-heading">{days}</div>
          <div className="text-sm uppercase tracking-wide">Days</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-heading">{hours}</div>
          <div className="text-sm uppercase tracking-wide">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-heading">{minutes}</div>
          <div className="text-sm uppercase tracking-wide">Minutes</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center">
        
        <div className="relative z-10 text-center text-900">
          <img src={RoseCityRollBanner} alt="Big Rose City Roll Banner" className="w-full max-w-xl mx-auto  mb-0" />
          
          {/* Countdown Timer */}
          <div className="mb-8">
            <Countdown date={eventDate} renderer={countdownRenderer} />
          </div>

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