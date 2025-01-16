import React from 'react';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  // Mock announcements - in production, these would come from an API
  const announcements = [
    {
      id: '1',
      title: 'Registration Now Open!',
      content: 'Sign up for Big Rose City Roll 2024 is now available.',
      date: '2024-03-15',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        
        <div className="relative z-10 text-center text-900">
          <h1 className="font-heading text-5xl mb-6">Big Rose City Roll</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Portland's premier rollerblading event for a week of urban skating adventures,
            community building, and unforgettable experiences.
          </p>
          <a
            href="#register"
            className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Register Now <ArrowRight className="ml-2" />
          </a>
        </div>
      </section>

      {/* Announcements Section */}
      {announcements.length > 0 && (
        <section className="bg-accent-100 rounded-lg p-6">
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
            Big Rose City Roll is Portland's answer to the famous Big Apple Roll, bringing together
            inline skaters of all skill levels for a week of urban adventures, social skating, and
            community building.
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
        </div>
      </section>
    </div>
  );
};

export default Home;