import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Countdown from 'react-countdown';
import { DaySchedule } from '../../types';

interface NextEventCardProps {
  nextRide: DaySchedule;
}

const NextEventCard: React.FC<NextEventCardProps> = ({ nextRide }) => {
  // Helper function to safely parse date and time
  const parseDateTime = (dateStr: string, timeStr: string) => {
    try {
      const convertTo24Hour = (timeStr: string) => {
        try {
          const time = timeStr.trim();
          const [timePart, period] = time.split(/\s+(AM|PM|am|pm)/i);
          
          if (!period) {
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
        } catch {
          return timeStr;
        }
      };
      
      let date;
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        date = new Date(`${dateStr}T${convertTo24Hour(timeStr)}`);
      } else {
        date = new Date(`${dateStr} ${timeStr}`);
      }
      
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  };

  const now = new Date();
  const startDateTime = parseDateTime(nextRide.date, nextRide.startTime);
  let endDateTime = null;
  
  try {
    endDateTime = parseDateTime(nextRide.date, nextRide.endTime);
  } catch {
    // If end time can't be parsed, endDateTime remains null
  }

  const getEventStatus = () => {
    if (startDateTime && endDateTime && now >= startDateTime && now <= endDateTime) {
      return "Current Event";
    }
    return "Next Event";
  };

  return (
    <div className="mb-8 max-w-xl mx-auto">
      <h3 className="text-xl font-heading text-text-100 mb-2 mt-2">
        {getEventStatus()}
      </h3>
      <div className="bg-background-800 rounded-lg p-4 mb-4">
        {/* Header with day, date, and distance */}
        <div className="flex flex-col items-center text-center gap-3 mb-1 md:mb-3">
          <div className="flex items-center gap-3 text-center">
            <Calendar className="w-5 h-5 text-primary-500" />
            <div className="text-center">
              <div className="text-xl font-semibold text-text-100">{nextRide.day}</div>
              <div className="text-base text-text-200">{nextRide.date}</div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            {nextRide.difficulty && nextRide.difficulty !== 'N/A' && (
              <span className="text-text-200 text-sm md:text-base">
                {nextRide.difficulty}
              </span>
            )}
            {nextRide.distance && (
              <span className="text-text-200 text-sm md:text-base">{nextRide.distance}</span>
            )}
          </div>
        </div>

        {/* Time and location in a compact row */}
        <div className="space-y-2 mb-3 text-center">
          <div className="flex items-center gap-2 justify-center">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary-500" />
            <span className="text-text-100 text-sm md:text-base">{nextRide.startTime} - {nextRide.endTime}</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary-500 flex-shrink-0" />
            <span className="text-text-100 text-sm md:text-base leading-tight">{nextRide.meetingPoint}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-100 text-sm md:text-base mb-3 leading-relaxed text-center">
            {nextRide.routeDescription.split(/(?<=[.!?])\s/)[0]}
        </p>
        
        {/* Countdown Timer within the card */}
        <div className="bg-background-700/50 rounded-lg p-3 border border-background-600/30">
          <div className="text-center">
            {(() => {
              // Check if current time is between start and end
              if (startDateTime && endDateTime && now >= startDateTime && now <= endDateTime) {
                return (
                  <div>
                    <div className="text-xs md:text-sm text-text-200 mb-1">Status</div>
                    <span className="text-primary-500 text-sm md:text-base font-semibold">Currently Happening!</span>
                  </div>
                );
              }
              
              // Show countdown for future events
              return (
                <>
                  <div className="text-xs md:text-sm text-text-200 mb-2">Starts in</div>
                  <Countdown 
                    date={startDateTime || new Date()} 
                    renderer={({ hours, minutes, completed }) => {
                      if (completed || !startDateTime) {
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
  );
};

export default NextEventCard;
