import React from 'react';
import { DaySchedule } from '../../types';
import useStravaEmbed from '../../hooks/useStravaEmbed';
import ScheduleDay from './ScheduleDay';

interface ScheduleListProps {
  scheduleData: DaySchedule[];
  expandedDay: string | null;
  activeTab: Record<string, string>;
  isLoggedIn: boolean;
  toggleDay: (id: string) => void;
  handleTabChange: (dayId: string, tab: string) => void;
  onEdit: (route: DaySchedule) => void;
  onDelete: (id: string) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  scheduleData,
  expandedDay,
  activeTab,
  isLoggedIn,
  toggleDay,
  handleTabChange,
  onEdit,
  onDelete
}) => {
  // Use our custom hook to handle Strava embed functionality
  useStravaEmbed({ expandedDay, activeTab, scheduleData });

  if (scheduleData.length === 0) {
    return <p className="text-center text-text-300 py-8">No scheduled routes available.</p>;
  }

  // Group scheduleData by date
  const groupedByDate = scheduleData.reduce<Record<string, DaySchedule[]>>((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {});

  // Sort dates chronologically
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <div>
      {sortedDates.map((date) => (
        <ScheduleDay
          key={date}
          date={date}
          events={groupedByDate[date]}
          expandedDay={expandedDay}
          activeTab={activeTab}
          isLoggedIn={isLoggedIn}
          toggleDay={toggleDay}
          handleTabChange={handleTabChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
