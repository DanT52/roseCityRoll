import { useEffect } from 'react';
import { DaySchedule } from '../types';

interface UseStravaEmbedProps {
  expandedDay: string | null;
  activeTab: Record<string, string>;
  scheduleData: DaySchedule[];
}

/**
 * Custom hook to handle loading of Strava embed scripts
 */
const useStravaEmbed = ({ expandedDay, activeTab, scheduleData }: UseStravaEmbedProps) => {
  // Effect to load Strava embed script when needed
  useEffect(() => {
    // Check if we have any expanded days with route maps and the script isn't already loaded
    if (expandedDay && 
        scheduleData.some(day => day.id === expandedDay && day.routeMapEmbed && day.routeMapEmbed.includes('strava-embed')) &&
        activeTab[expandedDay] === 'route' &&
        !document.querySelector('script[src="https://strava-embeds.com/embed.js"]')) {
      
      const script = document.createElement('script');
      script.src = 'https://strava-embeds.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        // Optional cleanup if needed
      };
    }
  }, [expandedDay, activeTab, scheduleData]);

  // Effect to handle the script loading more robustly for strava-embed-placeholder
  useEffect(() => {
    // Only run if we have expanded days with Strava embeds that are visible
    if (expandedDay && 
        scheduleData.some(day => day.id === expandedDay && 
        day.routeMapEmbed && 
        day.routeMapEmbed.includes('strava-embed-placeholder')) &&
        activeTab[expandedDay] === 'route') {
      
      // Remove any existing script to avoid duplicates
      const existingScript = document.querySelector('script[src="https://strava-embeds.com/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Create and append a new script
      const script = document.createElement('script');
      script.src = 'https://strava-embeds.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        // Optional cleanup if needed
      };
    }
  }, [expandedDay, activeTab, scheduleData]);
};

export default useStravaEmbed;
