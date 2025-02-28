import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DaySchedule } from '../types';

const Schedule: React.FC = () => {
  // Mock schedule data - in production, this would come from an API
  const scheduleData: DaySchedule[] = [
    {
      id: '1',
      day: 'Monday',
      date: '2024-07-15',
      meetingPoint: 'Waterfront Park',
      endPoint: 'Caruthers St',
      startTime: '6:00 PM',
      endTime: '8:30 PM',
      routeDescription: 'Scenic waterfront route with stunning views of the Willamette River',
      difficulty: '🐰 Bunny',
      distance: '8 miles',
      leader: 'Sarah Johnson',
      routeMapEmbed: 'https://www.google.com/maps/d/u/0/embed?mid=1E24IbewILQTX3EN860FOaXS6FneXjO0&ehbc=2E312F&noprof=1',
      startPointEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6983.25940266418!2d-122.66319639999999!3d45.5057205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a7220d0431b%3A0xaf79100c3112b87d!2s324%20SE%20Caruthers%20St%2C%20Portland%2C%20OR%2097214!5e1!3m2!1sen!2sus!4v1740707631412!5m2!1sen!2sus',
    },
    {
      id: '2',
      day: 'Tuesday',
      date: '2024-07-16',
      meetingPoint: 'Laurelhurst Park',
      startTime: '6:00 PM',
      endTime: '9:00 PM',
      routeDescription: 'East side exploration through quiet neighborhoods',
      difficulty: '🔵 Blue',
      distance: '12 miles',
      leader: 'Mike Wilson',
    },
  ];

  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, string>>({});

  const toggleDay = (id: string) => {
    setExpandedDay(expandedDay === id ? null : id);
    // Set default tab when expanding
    if (expandedDay !== id) {
      setActiveTab(prev => ({...prev, [id]: 'details'}));
    }
  };

  const handleTabChange = (dayId: string, tab: string) => {
    setActiveTab(prev => ({...prev, [dayId]: tab}));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-4xl mb-8 text-text-100">Event Schedule</h1>
      
      <div className="space-y-4">
        {scheduleData.map((day) => (
          <div 
            key={day.id}
            className="border border-background-300 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-4 bg-background-800 text-text-100 hover:bg-background-700"
              onClick={() => toggleDay(day.id)}
            >
              <div className="flex items-center">
                <span className="font-heading text-xl">{day.day}</span>
                <span className="ml-4 text-text-400">{new Date(day.date).toLocaleDateString()}</span>
              </div>
              {expandedDay === day.id ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
            
            {expandedDay === day.id && (
              <div className="bg-background-950">
                {/* Tabs for navigation - Redesigned to look more clickable */}
                <div className="flex border-b border-background-700 px-2 pt-2 gap-2">
                  <button 
                    className={`px-4 py-2 rounded-t-lg transition-all duration-200 font-medium
                      ${activeTab[day.id] === 'details' 
                        ? 'bg-background-800 text-primary-400 border-2 border-b-0 border-primary-400 shadow-md' 
                        : 'text-text-300 hover:bg-background-900 hover:text-primary-300'}`}
                    onClick={() => handleTabChange(day.id, 'details')}
                  >
                    Details
                  </button>
                  
                  {day.startPointEmbed && (
                    <button 
                      className={`px-4 py-2 rounded-t-lg transition-all duration-200 font-medium
                        ${activeTab[day.id] === 'start' 
                          ? 'bg-background-800 text-primary-400 border-2 border-b-0 border-primary-400 shadow-md' 
                          : 'text-text-300 hover:bg-background-900 hover:text-primary-300'}`}
                      onClick={() => handleTabChange(day.id, 'start')}
                    >
                      Meeting Point
                    </button>
                  )}
                  
                  {day.routeMapEmbed && (
                    <button 
                      className={`px-4 py-2 rounded-t-lg transition-all duration-200 font-medium
                        ${activeTab[day.id] === 'route' 
                          ? 'bg-background-800 text-primary-400 border-2 border-b-0 border-primary-400 shadow-md' 
                          : 'text-text-300 hover:bg-background-900 hover:text-primary-300'}`}
                      onClick={() => handleTabChange(day.id, 'route')}
                    >
                      Route Map
                    </button>
                  )}
                </div>
                
                {/* Tab content */}
                <div className="p-6">
                  {activeTab[day.id] === 'details' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-heading text-lg mb-2 text-text-200">Meeting Point</h3>
                        <p className="text-text-300">{day.meetingPoint} @ {day.startTime}</p>
                        
                        {day.endPoint && (
                          <>
                            <h3 className="font-heading text-lg mt-4 mb-2 text-text-200">End Point</h3>
                            <p className="text-text-300">{day.endPoint} @ {day.endTime}</p>
                          </>
                        )}
                        
                        <h3 className="font-heading text-lg mt-4 mb-2 text-text-200">Route Leader</h3>
                        <p className="text-text-300">{day.leader}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-heading text-lg mb-2 text-text-200">Route Details</h3>
                        <p className="text-text-300 mb-4">{day.routeDescription}</p>
                        
                        <div className="flex items-center space-x-6 mt-4">
                          <div className="bg-background-900 p-3 rounded-md flex-grow">
                            <span className="text-sm font-medium text-text-400 block mb-1">Difficulty</span>
                            <p className="text-text-200 text-lg font-medium">{day.difficulty}</p>
                          </div>
                          <div className="bg-background-900 p-3 rounded-md flex-grow">
                            <span className="text-sm font-medium text-text-400 block mb-1">Distance</span>
                            <p className="text-text-200 text-lg font-medium">{day.distance}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab[day.id] === 'route' && day.routeMapEmbed && (
                    <div className="flex justify-center">
                      <div className="w-full max-w-3xl aspect-video">
                        <iframe 
                          src={day.routeMapEmbed} 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy"
                          title={`Route map for ${day.day}'s ride`}
                          className="rounded shadow-lg"
                        ></iframe>
                      </div>
                    </div>
                  )}
                  
                  {activeTab[day.id] === 'start' && day.startPointEmbed && (
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
        ))}
      </div>
    </div>
  );
};

export default Schedule;