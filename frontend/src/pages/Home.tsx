import React, { useState, useEffect } from 'react';
import { ArrowRight, Instagram, Calendar, MapPin, Clock } from 'lucide-react';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import RoseCityRollBanner from '../assets/images/roseCityRoll.png';
import { useFeatures } from '../contexts/FeatureContext';
import { getAllRoutes } from '../services/routes';
import { DaySchedule } from '../types';
import Announcements from './Announcements';

const Home: React.FC = () => {
  const { features } = useFeatures();
  const [nextRide, setNextRide] = useState<DaySchedule | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch the next upcoming ride
  useEffect(() => {
    const fetchNextRide = async () => {
      try {
        const routes = await getAllRoutes();
        const now = new Date();
        
        // First check if there's a currently happening event
        const currentEvent = routes.find(route => {
          try {
            const startDateTime = new Date(`${route.date} ${route.startTime}`);
            const endDateTime = new Date(`${route.date} ${route.endTime}`);
            return now >= startDateTime && now <= endDateTime;
          } catch {
            return false;
          }
        });
        
        if (currentEvent) {
          setNextRide(currentEvent);
          return;
        }
        
        // Find the next upcoming ride
        const upcomingRides = routes.filter(route => {
          const rideDateTime = new Date(`${route.date} ${route.startTime}`);
          return rideDateTime > now;
        }).sort((a, b) => {
          const dateTimeA = new Date(`${a.date} ${a.startTime}`);
          const dateTimeB = new Date(`${b.date} ${b.startTime}`);
          return dateTimeA.getTime() - dateTimeB.getTime();
        });
        
        if (upcomingRides.length > 0) {
          setNextRide(upcomingRides[0]);
        }
      } catch (error) {
        console.error('Failed to fetch next ride:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNextRide();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center">
        <div className="relative z-10 text-center text-900">
          <img src={RoseCityRollBanner} alt="Big Rose City Roll Banner" className="w-full max-w-xl mx-auto mb-0" />
          
          {/* Next Event Countdown */}
          {loading ? (
            <div className="mb-8 text-center">
              <div className="text-lg text-text-200">Loading next event...</div>
            </div>
          ) : nextRide ? (
            <div className="mb-8 max-w-xl mx-auto">
              <h3 className="text-xl font-heading text-text-100 mb-2 mt-2">
                {(() => {
                  const now = new Date();
                  const startDateTime = new Date(`${nextRide.date} ${nextRide.startTime}`);
                  let endDateTime;
                  
                  try {
                    endDateTime = new Date(`${nextRide.date} ${nextRide.endTime}`);
                    if (now >= startDateTime && now <= endDateTime) {
                      return "Current Event";
                    }
                  } catch {
                    // If end time can't be parsed, fall through to "Next Event"
                  }
                  
                  return "Next Event";
                })()}
              </h3>
              <div className="bg-background-800 rounded-lg p-4 mb-4">
                {/* Header with day, date, and distance */}
                <div className="flex items-start justify-between mb-3 md:flex-col md:items-center md:text-center md:gap-3">
                  <div className="flex items-center gap-2 md:flex-col md:items-center md:text-center">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary-500 mt-0.5 md:mt-0" />
                    <div className="md:text-center">
                      <div className="text-lg md:text-xl font-semibold text-text-100">{nextRide.day}</div>
                      <div className="text-sm md:text-base text-text-200">{nextRide.date}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 md:items-center md:flex-row md:gap-3">
                    {nextRide.difficulty && nextRide.difficulty !== 'N/A' && (
                      <span className="text-text-100 text-xs md:text-sm font-medium">
                        {nextRide.difficulty}
                      </span>
                    )}
                    {nextRide.distance && (
                      <span className="text-text-200 text-sm md:text-base">{nextRide.distance}</span>
                    )}
                  </div>
                </div>

                {/* Time and location in a compact row */}
                <div className="space-y-2 mb-3 md:text-center">
                  <div className="flex items-center gap-2 md:justify-center">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary-500" />
                    <span className="text-text-100 text-sm md:text-base">{nextRide.startTime} - {nextRide.endTime}</span>
                  </div>
                  <div className="flex items-start gap-2 md:justify-center md:items-center">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary-500 mt-0.5 md:mt-0 flex-shrink-0" />
                    <span className="text-text-100 text-sm md:text-base leading-tight">{nextRide.meetingPoint}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-100 text-sm md:text-base mb-3 leading-relaxed md:text-center">
                    {nextRide.routeDescription.split(/(?<=[.!?])\s/)[0]}
                </p>
                
                {/* Countdown Timer within the card */}
                <div className="bg-background-700/50 rounded-lg p-3 border border-background-600/30">
                  <div className="text-center">
                    {(() => {
                      const now = new Date();
                      const startDateTime = new Date(`${nextRide.date} ${nextRide.startTime}`);
                      let endDateTime;
                      
                      try {
                        endDateTime = new Date(`${nextRide.date} ${nextRide.endTime}`);
                        // Check if current time is between start and end
                        if (now >= startDateTime && now <= endDateTime) {
                          return (
                            <div>
                              <div className="text-xs md:text-sm text-text-200 mb-1">Status</div>
                              <span className="text-primary-500 text-sm md:text-base font-semibold">Currently Happening!</span>
                            </div>
                          );
                        }
                      } catch {
                        // If end time can't be parsed, fall through to normal countdown
                      }
                      
                      // Show countdown for future events
                      return (
                        <>
                          <div className="text-xs md:text-sm text-text-200 mb-2">Starts in</div>
                          <Countdown 
                            date={startDateTime} 
                            renderer={({ hours, minutes, completed }) => {
                              if (completed) {
                                return <span className="text-primary-500 text-sm md:text-base">The event has started!</span>;
                              }
                              return (
                                <div className="flex justify-center gap-4 md:gap-6 text-text-100">
                                  <div className="text-center">
                                    <div className="text-lg md:text-2xl font-heading">{hours}</div>
                                    <div className="text-xs md:text-sm uppercase tracking-wide text-text-300">Hours</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-lg md:text-2xl font-heading">{minutes}</div>
                                    <div className="text-xs md:text-sm uppercase tracking-wide text-text-300">Minutes</div>
                                  </div>
                                </div>
                              );
                            }}
                          />
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Link
                  to="/schedule"
                  className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  View Full Schedule <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mb-8 text-center max-w-xl mx-auto">
              <div className="bg-background-800 rounded-lg p-8 mb-4">
                <h3 className="text-xl font-heading text-text-100 mb-4">Thanks for Coming!</h3>
                <p className="text-lg text-text-200 mb-4">
                  Hope to see you again next time!
                </p>
              </div>
              <Link
                to="/schedule"
                className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                View Schedule <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          )}
          
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Join Portland&apos;s first Big Rose City Roll from June 26th to June 29th 2025 for a week of skating,
            community building, and unforgettable experiences.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mb-10">
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
      {features.announcements?.enabled && (
        <section className="bg-accent-100 rounded-lg p-8 mt-4">
          <Announcements />
        </section>
      )}

      {/* Event Overview Section */}
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
    </div>
  );
};

export default Home;