import React from 'react';

const EventOverview: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="font-heading text-3xl mb-6 text-text-100">About the Event</h2>
      <div style={{ textShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)' }} className="prose text-text-100">
        <p className="mb-4">
          Big Rose City Roll is an exciting event that brings together inline and quad skaters!
        </p>
        <p className="mb-4">
          Each day features carefully planned routes that showcase the best of Portland&apos;s
          skateable terrain, from smooth waterfront paths to urban adventures through the city&apos;s
          most iconic neighborhoods.
        </p>
        <p>
          Our inclusive community
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
  );
};

export default EventOverview;
