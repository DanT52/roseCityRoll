import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Schedule: React.FC = () => {
  // Mock schedule data - in production, this would come from an API
  const scheduleData = [
    {
      id: '1',
      day: 'Monday',
      date: '2024-07-15',
      meetingPoint: 'Waterfront Park',
      startTime: '6:00 PM',
      endTime: '8:30 PM',
      routeDescription: 'Scenic waterfront route with stunning views of the Willamette River',
      difficulty: 'Beginner',
      distance: '8 miles',
      leader: 'Sarah Johnson',
    },
    {
      id: '2',
      day: 'Tuesday',
      date: '2024-07-16',
      meetingPoint: 'Laurelhurst Park',
      startTime: '6:00 PM',
      endTime: '9:00 PM',
      routeDescription: 'East side exploration through quiet neighborhoods',
      difficulty: 'Intermediate',
      distance: '12 miles',
      leader: 'Mike Wilson',
    },
  ];

  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const toggleDay = (id: string) => {
    setExpandedDay(expandedDay === id ? null : id);
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
              <div className="p-6 bg-background-950">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-heading text-lg mb-2 text-text-200">Meeting Point</h3>
                    <p className="text-text-300">{day.meetingPoint}</p>
                    
                    <h3 className="font-heading text-lg mt-4 mb-2 text-text-200">Time</h3>
                    <p className="text-text-300">{day.startTime} - {day.endTime}</p>
                    
                    <h3 className="font-heading text-lg mt-4 mb-2 text-text-200">Route Leader</h3>
                    <p className="text-text-300">{day.leader}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-lg mb-2 text-text-200">Route Details</h3>
                    <p className="text-text-300 mb-4">{day.routeDescription}</p>
                    
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-sm text-text-400">Difficulty</span>
                        <p className="text-text-200">{day.difficulty}</p>
                      </div>
                      <div>
                        <span className="text-sm text-text-400">Distance</span>
                        <p className="text-text-200">{day.distance}</p>
                      </div>
                    </div>
                  </div>
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