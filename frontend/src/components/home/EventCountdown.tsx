import React, { useState, useEffect } from 'react';
import { getAllRoutes } from '../../services/routes';
import { DaySchedule } from '../../types';
import NextEventCard from './NextEventCard';
import BasicCountdown from './BasicCountdown';
import ThankYouMessage from './ThankYouMessage';

interface EventCountdownProps {
  eventStartTime: Date;
}

const EventCountdown: React.FC<EventCountdownProps> = ({ eventStartTime }) => {
  const [nextRide, setNextRide] = useState<DaySchedule | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch the next upcoming ride
  useEffect(() => {
    const fetchNextRide = async () => {
      try {
        const routes = await getAllRoutes();
        const now = new Date();
        
        console.log('Fetched routes:', routes); // Debug log
        console.log('Current time:', now); // Debug log
        
        // Helper function to safely parse date and time
        const parseDateTime = (dateStr: string, timeStr: string) => {
          try {
            // Try different date formats that work better with Safari
            let date;
            
            // If date is in YYYY-MM-DD format, use it directly
            if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
              date = new Date(`${dateStr}T${convertTo24Hour(timeStr)}`);
            } else {
              // Fallback to original method
              date = new Date(`${dateStr} ${timeStr}`);
            }
            
            // Check if date is valid
            if (isNaN(date.getTime())) {
              console.warn('Invalid date parsed:', dateStr, timeStr);
              return null;
            }
            
            return date;
          } catch (error) {
            console.error('Error parsing date:', error, dateStr, timeStr);
            return null;
          }
        };
        
        // Helper function to convert 12-hour time to 24-hour format
        const convertTo24Hour = (timeStr: string) => {
          try {
            const time = timeStr.trim();
            const [timePart, period] = time.split(/\s+(AM|PM|am|pm)/i);
            
            if (!period) {
              // Already in 24-hour format or no AM/PM
              return time.includes(':') ? `${time}:00` : time;
            }
            
            let [hoursStr, minutes] = timePart.split(':');
            let hours = parseInt(hoursStr, 10);
            minutes = minutes || '00';
            
            if (period.toUpperCase() === 'PM' && hours !== 12) {
              hours += 12;
            } else if (period.toUpperCase() === 'AM' && hours === 12) {
              hours = 0;
            }
            
            return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
          } catch (error) {
            console.error('Error converting time:', error, timeStr);
            return timeStr;
          }
        };
        
        // First check if there's a currently happening event
        const currentEvent = routes.find(route => {
          try {
            const startDateTime = parseDateTime(route.date, route.startTime);
            const endDateTime = parseDateTime(route.date, route.endTime);
            
            if (!startDateTime || !endDateTime) return false;
            
            const isCurrentEvent = now >= startDateTime && now <= endDateTime;
            console.log('Checking current event:', route.day, {
              start: startDateTime,
              end: endDateTime,
              now,
              isCurrent: isCurrentEvent
            });
            
            return isCurrentEvent;
          } catch (error) {
            console.error('Error checking current event:', error, route);
            return false;
          }
        });
        
        if (currentEvent) {
          console.log('Found current event:', currentEvent);
          setNextRide(currentEvent);
          return;
        }
        
        // Find the next upcoming ride
        const upcomingRides = routes.filter(route => {
          const rideDateTime = parseDateTime(route.date, route.startTime);
          if (!rideDateTime) return false;
          
          const isUpcoming = rideDateTime > now;
          console.log('Checking upcoming event:', route.day, {
            dateTime: rideDateTime,
            now,
            isUpcoming
          });
          
          return isUpcoming;
        }).sort((a, b) => {
          const dateTimeA = parseDateTime(a.date, a.startTime);
          const dateTimeB = parseDateTime(b.date, b.startTime);
          
          if (!dateTimeA || !dateTimeB) return 0;
          
          return dateTimeA.getTime() - dateTimeB.getTime();
        });
        
        console.log('Upcoming rides found:', upcomingRides);
        
        if (upcomingRides.length > 0) {
          const nextRideDateTime = parseDateTime(upcomingRides[0].date, upcomingRides[0].startTime);
          const hoursUntilNextRide = nextRideDateTime ? (nextRideDateTime.getTime() - now.getTime()) / (1000 * 60 * 60) : 0;
          
          // If next ride is more than 24 hours away, don't show it yet
          if (hoursUntilNextRide > 24) {
            console.log('Next ride is more than 24 hours away, not showing specific ride yet');
            setNextRide(null);
          } else {
            setNextRide(upcomingRides[0]);
          }
        } else {
          console.log('No upcoming rides found');
        }
      } catch (error) {
        console.error('Failed to fetch next ride:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNextRide();
  }, []);

  if (loading) {
    return (
      <div className="mb-8 text-center">
        <div className="text-lg text-text-200">Loading next event...</div>
      </div>
    );
  }

  if (nextRide) {
    return <NextEventCard nextRide={nextRide} />;
  }

  if (eventStartTime > new Date()) {
    return <BasicCountdown targetDate={eventStartTime} />;
  }

  return <ThankYouMessage />;
};

export default EventCountdown;
