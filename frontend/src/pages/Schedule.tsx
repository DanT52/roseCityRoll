import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus, Edit, Trash, X } from 'lucide-react';
import { DaySchedule } from '../types';
import { getAllRoutes, createRoute, updateRoute, deleteRoute } from '../services/routes';
import { useAuth } from '../contexts/AuthContext'; // Fixed import path

const Schedule: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, string>>({});
  
  // Admin state
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Partial<DaySchedule> | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Use the existing AuthContext or check for token directly
  const { isLoggedIn } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check if user is authorized on component mount
  useEffect(() => {
    // Use the context's isLoggedIn property
    setIsAdmin(isLoggedIn);
    
    // Alternative: Check for token directly if you prefer not to use context
    // const token = localStorage.getItem('token');
    // setIsAdmin(!!token);
  }, [isLoggedIn]);

  // Fetch schedule data
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const routes = await getAllRoutes();
        
        // Sort routes by date and then by start time
        const sortedRoutes = [...routes].sort((a, b) => {
          // First compare by date
          const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          if (dateComparison !== 0) return dateComparison;
          
          // If same date, compare by start time
          // Convert time strings to comparable format (assuming format like "6:00 PM")
          const timeA = new Date(`01/01/2000 ${a.startTime}`).getTime();
          const timeB = new Date(`01/01/2000 ${b.startTime}`).getTime();
          return timeA - timeB;
        });
        
        setScheduleData(sortedRoutes);
      } catch (err) {
        setError('Failed to load schedule data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoutes();
  }, []);

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
  
  const handleAddRoute = async () => {
    if (!editingRoute) return;
    
    try {
      const newRoute = await createRoute(editingRoute as Omit<DaySchedule, 'id'>);
      setScheduleData([...scheduleData, newRoute]);
      setShowForm(false);
      setEditingRoute(null);
    } catch (err) {
      setError('Failed to create route');
      console.error(err);
    }
  };
  
  const handleUpdateRoute = async () => {
    if (!editingRoute || !editingRoute.id) return;
    
    try {
      const updatedRoute = await updateRoute(
        editingRoute.id, 
        editingRoute as Omit<DaySchedule, 'id'>
      );
      
      setScheduleData(scheduleData.map(route => 
        route.id === updatedRoute.id ? updatedRoute : route
      ));
      
      setIsEditing(false);
      setEditingRoute(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update route');
      console.error(err);
    }
  };
  
  const handleDeleteRoute = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this route?')) return;
    
    try {
      await deleteRoute(id);
      setScheduleData(scheduleData.filter(route => route.id !== id));
    } catch (err) {
      setError('Failed to delete route');
      console.error(err);
    }
  };
  
  const startEdit = (route: DaySchedule) => {
    setIsEditing(true);
    setEditingRoute({...route});
    setShowForm(true);
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingRoute(null);
    setShowForm(false);
  };
  
  const handleNewRoute = () => {
    setIsEditing(false);
    setEditingRoute({
      day: '',
      date: '',
      meetingPoint: '',
      startTime: '',
      endTime: '',
      routeDescription: '',
      difficulty: '🐰 Bunny',
      distance: '',
      leader: '',
    });
    setShowForm(true);
  };

  // Add effect to load Strava embed script when needed
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
        // Optional: Clean up script when component unmounts if desired
        // document.body.removeChild(script);
      };
    }
  }, [expandedDay, activeTab, scheduleData]);

  // Modify the Strava embed effect to handle the script loading more robustly
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

  if (loading) return <div className="text-center py-8">Loading schedule...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl text-text-100">Event Schedule</h1>
        
        {isAdmin && (
          <button
            onClick={handleNewRoute}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Route
          </button>
        )}
      </div>
      <div className="bg-background-800 p-6 rounded-lg mb-8">
        <p className="text-text-200">
          Routes for each skate are still being worked on. Please check back later for more complete information.
        </p>
      </div>
      
      {/* Route Edit/Create Form */}
      {showForm && (
        <div className="bg-background-900 border border-background-700 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-2xl text-text-100">
              {isEditing ? 'Edit Route' : 'Add New Route'}
            </h2>
            <button onClick={cancelEdit} className="text-text-400 hover:text-text-100">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-300 mb-1">Day Label</label>
                <input
                  type="text"
                  value={editingRoute?.day || ''}
                  onChange={(e) => setEditingRoute({...editingRoute, day: e.target.value})}
                  placeholder="e.g. Monday, Sunday Morning, etc."
                  className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                />
                <p className="text-xs text-text-400 mt-1">Custom label like "Sunday Morning" or "Monday Evening"</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-300 mb-1">Date</label>
                <input
                  type="date"
                  value={editingRoute?.date || ''}
                  onChange={(e) => setEditingRoute({...editingRoute, date: e.target.value})}
                  className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-300 mb-1">Meeting Point</label>
                <input
                  type="text"
                  value={editingRoute?.meetingPoint || ''}
                  onChange={(e) => setEditingRoute({...editingRoute, meetingPoint: e.target.value})}
                  className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-300 mb-1">End Point (Optional)</label>
                <input
                  type="text"
                  value={editingRoute?.endPoint || ''}
                  onChange={(e) => setEditingRoute({...editingRoute, endPoint: e.target.value})}
                  className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-300 mb-1">Start Time</label>
                  <input
                    type="text"
                    value={editingRoute?.startTime || ''}
                    onChange={(e) => setEditingRoute({...editingRoute, startTime: e.target.value})}
                    placeholder="e.g. 6:00 PM"
                    className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-300 mb-1">End Time</label>
                  <input
                    type="text"
                    value={editingRoute?.endTime || ''}
                    onChange={(e) => setEditingRoute({...editingRoute, endTime: e.target.value})}
                    placeholder="e.g. 8:30 PM"
                    className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-300 mb-1">Route Description</label>
                <textarea
                  value={editingRoute?.routeDescription || ''}
                  onChange={(e) => setEditingRoute({...editingRoute, routeDescription: e.target.value})}
                  rows={3}
                  className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-300 mb-1">Difficulty</label>
                  <select
                    value={editingRoute?.difficulty || '🐰 Bunny'}
                    onChange={(e) => setEditingRoute({
                      ...editingRoute,
                      difficulty: e.target.value as DaySchedule['difficulty']
                    })}
                    className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                  >
                    <option value="🐰 Bunny">🐰 Bunny</option>
                    <option value="🟢 Green">🟢 Green</option>
                    <option value="🔵 Blue">🔵 Blue</option>
                    <option value="⚫ Black">⚫ Black</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-300 mb-1">Distance</label>
                  <input
                    type="text"
                    value={editingRoute?.distance || ''}
                    onChange={(e) => setEditingRoute({...editingRoute, distance: e.target.value})}
                    placeholder="e.g. 8 miles"
                    className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-300 mb-1">Route Leader</label>
                <input
                  type="text"
                  value={editingRoute?.leader || ''}
                  onChange={(e) => setEditingRoute({...editingRoute, leader: e.target.value})}
                  className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-300 mb-1">Full Strava Embed (Optional)</label>
                <input
                  type="text"
                  value={editingRoute?.routeMapEmbed || ''}
                  onChange={(e) => setEditingRoute({...editingRoute, routeMapEmbed: e.target.value})}
                  className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-300 mb-1">Start Point Map Embed URL (Optional)</label>
                <input
                  type="text"
                  value={editingRoute?.startPointEmbed || ''}
                  onChange={(e) => setEditingRoute({...editingRoute, startPointEmbed: e.target.value})}
                  className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-4">
            <button 
              onClick={cancelEdit}
              className="px-4 py-2 border border-background-600 rounded-md text-text-300 hover:bg-background-800"
            >
              Cancel
            </button>
            <button 
              onClick={isEditing ? handleUpdateRoute : handleAddRoute}
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md"
              disabled={!editingRoute?.day || !editingRoute?.date}
            >
              {isEditing ? 'Save Changes' : 'Add Route'}
            </button>
          </div>
        </div>
      )}
      
      {/* Schedule List */}
      <div className="space-y-4">
        {scheduleData.length === 0 ? (
          <p className="text-center text-text-300 py-8">No scheduled routes available.</p>
        ) : (
          scheduleData.map((day) => (
            <div 
              key={day.id}
              className="border border-background-300 rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <button
                  className="flex-grow flex justify-between items-center p-4 bg-background-800 text-text-100 hover:bg-background-700"
                  onClick={() => toggleDay(day.id)}
                >
                  <div className="flex items-center">
                    <span className="font-heading text-xl">{day.day}</span>
                    <span className="ml-4 text-text-400">
                    {
                      (() => {
                        // Parse as local date to avoid timezone issues
                        const [year, month, dayNum] = day.date.split('-').map(Number);
                        if (year && month && dayNum) {
                          return new Date(year, month - 1, dayNum).toLocaleDateString();
                        }
                        return day.date;
                      })()
                    }
                  </span>
                  </div>
                  {expandedDay === day.id ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
                
                {isAdmin && (
                  <div className="flex p-2 bg-background-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(day);
                      }}
                      className="p-2 text-text-300 hover:text-primary-400"
                      title="Edit Route"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleDeleteRoute(day.id);
                      }}
                      className="p-2 text-text-300 hover:text-red-500"
                      title="Delete Route"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                )}
              </div>
              
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
                  </div>
                  
                  {/* Tab content */}
                  <div className="p-6">
                    {activeTab[day.id] === 'details' && (
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
                            <div className="bg-background-900 p-3 rounded-md flex-grow">
                              <span className="text-sm font-medium text-text-400 block mb-1">Difficulty</span>
                              <p className="text-text-200 text-lg font-medium">{day.difficulty}</p>
                            </div>
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
                    
                    {activeTab[day.id] === 'route' && day.routeMapEmbed && (
                      <div className="flex justify-center">
                        <div className="w-full max-w-3xl">
                          {/* 
                            For Strava embeds, we need to:
                            1. Extract just the div part from the full embed code
                            2. Inject it without the script tag (which we load separately)
                          */}
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
          ))
        )}
      </div>
    </div>
  );
};

export default Schedule;