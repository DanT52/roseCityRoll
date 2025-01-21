import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { DaySchedule } from '../types';

const SchedulePage: React.FC = () => {
  const [expandedSkate, setExpandedSkate] = useState<string | null>(null);

  const toggleSkate = (id: string) => {
    setExpandedSkate(expandedSkate === id ? null : id);
  };

  const schedules: DaySchedule[] = [
    {
      id: 'thu-night',
      name: 'Thursday Night Skate',
      date: 'June 26, 2025',
      description: 'To be decided'
    },
    {
      id: 'fri-morning',
      name: 'Friday Morning Skate',
      date: 'June 27, 2025',
      description: 'To be decided'
    },
    {
      id: 'fri-night',
      name: 'Friday Night Skate',
      date: 'June 27, 2025',
      description: 'To be decided'
    },
    {
      id: 'sat-morning',
      name: 'Saturday Morning Skate',
      date: 'June 28, 2025',
      description: 'To be decided'
    },
    {
      id: 'sat-night',
      name: 'Saturday Night Skate',
      date: 'June 28, 2025',
      description: 'To be decided'
    },
    {
      id: 'sun-morning',
      name: 'Sunday Morning Skate',
      date: 'June 29, 2025',
      description: 'To be decided'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-4xl mb-8 text-text-100">Schedule</h1>
      
      <div className="bg-background-800 p-6 rounded-lg mb-8">
        <p className="text-text-200">
          Routes and details for each skate are currently being decided. Please check back later for more information about meeting points, difficulty ratings, and route details.
        </p>
      </div>

      <div className="space-y-4">
        {schedules.map((skate) => (
          <div 
            key={skate.id}
            className="border border-background-300 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-4 bg-background-800 text-text-100 hover:bg-background-700"
              onClick={() => toggleSkate(skate.id)}
            >
              <span className="font-heading text-xl">{skate.name}</span>
              {expandedSkate === skate.id ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
            
            {expandedSkate === skate.id && (
              <div className="p-6 bg-background-950">
                <p className="text-text-300">{skate.date}</p>
                <p className="text-text-300 mt-4">{skate.description}</p>
                {skate.difficulty && (
                  <span className="mt-2 inline-block px-3 py-1 bg-background-800 text-text-400 rounded-full text-sm">
                    {skate.difficulty}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
