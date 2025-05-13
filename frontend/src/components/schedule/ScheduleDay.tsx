import React from 'react';
import { DaySchedule } from '../../types';
import ScheduleCard from './ScheduleCard';

interface ScheduleDayProps {
  date: string;
  events: DaySchedule[];
  expandedDay: string | null;
  activeTab: Record<string, string>;
  isLoggedIn: boolean;
  toggleDay: (id: string) => void;
  handleTabChange: (dayId: string, tab: string) => void;
  onEdit: (route: DaySchedule) => void;
  onDelete: (id: string) => void;
}

const ScheduleDay: React.FC<ScheduleDayProps> = ({
  date,
  events,
  expandedDay,
  activeTab,
  isLoggedIn,
  toggleDay,
  handleTabChange,
  onEdit,
  onDelete
}) => {
  if (events.length === 0) return null;
  
  // Format date for display
  const formatDisplayDate = () => {
    const [year, month, day] = date.split('-').map(Number);
    if (year && month && day) {
      // Create a date and get a more readable format
      const dateObj = new Date(year, month - 1, day);
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return dateObj.toLocaleDateString(undefined, options);
    }
    return date;
  };

  return (
    <div className="mb-8">
      <div className="mb-4 border-b border-background-700 pb-2">
        <h2 className="font-heading text-2xl text-text-100">{formatDisplayDate()}</h2>
      </div>
      
      <div className="space-y-4">
        {events.map((day) => (
          <ScheduleCard
            key={day.id}
            day={day}
            isExpanded={expandedDay === day.id}
            activeTab={activeTab[day.id] || 'details'}
            isLoggedIn={isLoggedIn}
            onToggle={() => toggleDay(day.id)}
            onTabChange={(tab) => handleTabChange(day.id, tab)}
            onEdit={() => onEdit(day)}
            onDelete={() => onDelete(day.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleDay;
