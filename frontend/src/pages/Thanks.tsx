import React from 'react';
import { ExternalLink } from 'lucide-react';

const Thanks: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-4xl mb-6 text-text-100">Thanks</h1>
      <p className="text-xl mb-6 text-text-100">
        We're so grateful for the community that made the <strong>Big Rose City Roll 2025</strong> possible.
      </p>

      {/* Website Section */}
      <section className="mb-8">
        <h2 className="font-heading text-3xl mb-4 text-text-100">Website</h2>
        <div className="space-y-2">
          <p className="text-text-200">
            <em>Website by </em>
            <a 
              href="https://danielbasarab.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
              Daniel Basarab <ExternalLink className="inline w-4 h-4" />
            </a>
            <span> (</span>
            <a 
              href="https://www.instagram.com/daniel.basarab/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 transition-colors"
            >
              @daniel.basarab <ExternalLink className="inline w-4 h-4" />
            </a>
            <span>)</span>
          </p>
          <p className="text-text-200">
            <em>Logo design by </em>
            <a 
              href="https://www.instagram.com/gage_lieble/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
              Gage Lieble (@gage_lieble) <ExternalLink className="inline w-4 h-4" />
            </a>
          </p>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="mb-8">
        <h2 className="font-heading text-3xl mb-4 text-text-100">Sponsors</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-xl mb-1 text-text-100">NW Portland Hostel</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <a 
                href="https://www.nwportlandhostel.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors"
              >
                🌐 nwportlandhostel.com <ExternalLink className="ml-1 w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/nwportlandhostel/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
              >
                📸 @nwportlandhostel <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-1 text-text-100">Tu Tia Food Truck – Mexican Food</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <a 
                href="https://tutiataqueria.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors"
              >
                🌐 tutiataqueria.com <ExternalLink className="ml-1 w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/tutiataqueria/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
              >
                📸 @tutiataqueria <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Planning Section */}
      <section className="mb-8">
        <h2 className="font-heading text-3xl mb-4 text-text-100">Event Planning</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-heading text-xl mb-1 text-text-100">Alejandro Anderson-Perez – Lead Planner</h3>
            <a 
              href="https://www.instagram.com/aperezand/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
            >
              📸 @aperezand <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-1 text-text-100">Kensey Anderson-Perez – Saturday Market</h3>
            <a 
              href="https://www.instagram.com/brimstoneceramics/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
            >
              📸 @brimstoneceramics <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Route Leaders Section */}
      <section className="mb-8">
        <h2 className="font-heading text-3xl mb-4 text-text-100">Route Leaders</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-heading text-xl mb-1 text-text-100">Tyler Hotan</h3>
            <a 
              href="https://www.instagram.com/tylerhotan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
            >
              📸 @tylerhotan <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-1 text-text-100">Vin Thompson</h3>
            <a 
              href="https://www.instagram.com/skatequad/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
            >
              📸 @skatequad <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
          <div>
            <h3 className="font-heading text-xl mb-1 text-text-100">Dakota Miller</h3>
            <a 
              href="https://www.instagram.com/d27man/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
            >
              📸 @d27man <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Thanks;
