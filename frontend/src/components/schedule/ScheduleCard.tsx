import React from 'react';
import { ChevronDown, ChevronUp, Edit, Trash } from 'lucide-react';
import { DaySchedule } from '../../types';

interface ScheduleCardProps {
  day: DaySchedule;
  isExpanded: boolean;
  activeTab: string;
  isLoggedIn: boolean;
  onToggle: () => void;
  onTabChange: (tab: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  day,
  isExpanded,
  activeTab,
  isLoggedIn,
  onToggle,
  onTabChange,
  onEdit,
  onDelete
}) => {
  // Helper function to format distance (e.g. "23 miles" -> "23mi")
  const formatDistance = (distance: string | undefined): string => {
    if (!distance) return '';
    
    // Extract numbers and convert "miles" to "mi"
    const match = distance.match(/(\d+(\.\d+)?)\s*(mile|miles|mi)/i);
    if (match) {
      return `${match[1]}mi`;
    }
    return distance;
  };

  return (
    <div className="border border-background-300 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between">
        <button
          className="flex-grow flex justify-between items-center p-4 bg-background-800 text-text-100 hover:bg-background-700"
          onClick={onToggle}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between min-w-0 w-full pr-2 text-left">
              <div className="flex justify-between items-end md:w-1/2">
                <span className="font-heading text-xl md:text-2xl break-words">
                  {day.day}
                </span>
                {/* Distance indicator for mobile only */}
                {day.distance && (
                  <span className="md:hidden text-base font-medium text-text-300 ml-2 mr-5">
                    {formatDistance(day.distance)}
                  </span>
                )}
              </div>
              <div className="mt-1 md:mt-0 flex flex-col md:flex-row md:items-center md:justify-end text-base md:text-xl text-text-200">
                <span>{day.startTime}</span>
                <span className="hidden md:inline mx-1">@</span>
                <span>{day.meetingPoint}</span>
              </div>
            </div>
            
          <div className="flex items-center space-x-3 ml-2">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-6 h-6 flex-shrink-0" />
            )}
          </div>
        </button>
        
        {isLoggedIn && (
          <div className="flex p-2 bg-background-800">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 text-text-300 hover:text-primary-400"
              title="Edit Route"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                onDelete();
              }}
              className="p-2 text-text-300 hover:text-red-500"
              title="Delete Route"
            >
              <Trash size={18} />
            </button>
          </div>
        )}
      </div>
      
      {isExpanded && (
        <div className="bg-background-950">
        
          
          {/* Tabs for navigation */}
          <div className="flex border-b border-background-700 px-2 pt-2 gap-2">
            <button 
              className={`px-4 py-2 rounded-t-lg transition-all duration-200 font-medium
                ${activeTab === 'details' 
                  ? 'bg-background-800 text-primary-400 border-2 border-b-0 border-primary-400 shadow-md' 
                  : 'text-text-300 hover:bg-background-900 hover:text-primary-300'}`}
              onClick={() => onTabChange('details')}
            >
              Details
            </button>
            
            {day.routeMapEmbed && (
              <button 
                className={`px-4 py-2 rounded-t-lg transition-all duration-200 font-medium
                  ${activeTab === 'route' 
                    ? 'bg-background-800 text-primary-400 border-2 border-b-0 border-primary-400 shadow-md' 
                    : 'text-text-300 hover:bg-background-900 hover:text-primary-300'}`}
                onClick={() => onTabChange('route')}
              >
                Route Map
              </button>
            )}
            
            {day.startPointEmbed && (
              <button 
                className={`px-4 py-2 rounded-t-lg transition-all duration-200 font-medium
                  ${activeTab === 'start' 
                    ? 'bg-background-800 text-primary-400 border-2 border-b-0 border-primary-400 shadow-md' 
                    : 'text-text-300 hover:bg-background-900 hover:text-primary-300'}`}
                onClick={() => onTabChange('start')}
              >
                Meeting Point
              </button>
            )}
          </div>
          
          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading text-lg mb-2 text-text-200">Meeting Point</h3>
                  <p className="text-text-300">
                    {day.meetingPoint}
                    {day.startTime ? ` @ ${day.startTime}` : ''}
                  </p>

                  {/* End Point: default to meetingPoint if not provided */}
                  <h3 className="font-heading text-lg mt-4 mb-2 text-text-200">End Point</h3>
                  <p className="text-text-300">
                    {(day.endPoint || day.meetingPoint) /* default to meetingPoint */}
                    {day.endTime ? ` @ ${day.endTime}` : ''}
                  </p>

                  {/* Only show Route Leader if present */}
                  {day.leader && (
                    <>
                      <h3 className="font-heading text-lg mt-4 mb-2 text-text-200">Route Leader</h3>
                      <p className="text-text-300">{day.leader}</p>
                    </>
                  )}
                </div>
                
                <div>
                  <h3 className="font-heading text-lg mb-2 text-text-200">Details</h3>
                  <p className="text-text-300 mb-4">{day.routeDescription}</p>
                  
                  <div className="flex items-center space-x-6 mt-4">
                    {day.difficulty !== 'N/A' && (
                      <div className="bg-background-900 p-3 rounded-md flex-grow">
                        <span className="text-sm font-medium text-text-400 block mb-1">Difficulty</span>
                        <p className="text-text-200 text-lg font-medium">{day.difficulty}</p>
                      </div>
                    )}
                    {/* Only show Distance if present */}
                    {day.distance && (
                      <div className="bg-background-900 p-3 rounded-md flex-grow">
                        <span className="text-sm font-medium text-text-400 block mb-1">Distance</span>
                        <p className="text-text-200 text-lg font-medium">{day.distance}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'route' && day.routeMapEmbed && (
              <div className="flex justify-center">
                <div className="w-full max-w-3xl">
                  {day.routeMapEmbed.includes('strava-embed-placeholder') ? (
                    <>
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: day.routeMapEmbed.split('<script')[0] // Get just the div part
                        }}
                        className="flex items-center justify-center"
                      />
                      <p className="text-center text-sm text-text-400 mt-2">
                        If the map doesn't appear, please give it a moment to load.
                      </p>
                    </>
                  ) : (
                    // Fallback for other embed types (like direct iframes)
                    <iframe 
                      src={day.routeMapEmbed} 
                      width="100%" 
                      height="400" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy"
                      title={`Route map for ${day.day}'s ride`}
                      className="rounded shadow-lg"
                    ></iframe>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'start' && day.startPointEmbed && (
              <div className="flex justify-center">
                <div className="w-full max-w-3xl aspect-video">
                  <iframe 
                    src={day.startPointEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Meeting point for ${day.day}'s ride`}
                    className="rounded shadow-lg"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;
