import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { DaySchedule } from '../types';
import { getAllRoutes, createRoute, updateRoute, deleteRoute } from '../services/routes';
import { useAuth } from '../contexts/AuthContext';
import ScheduleForm from '../components/schedule/ScheduleForm';
import ScheduleList from '../components/schedule/ScheduleList';

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

  const handleRouteChange = (route: Partial<DaySchedule>) => {
    setEditingRoute(route);
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      handleUpdateRoute();
    } else {
      handleAddRoute();
    }
  };

  if (loading) return <div className="text-center py-8">Loading schedule...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl text-text-100">Event Schedule</h1>
        
        {isLoggedIn && (
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
          Routes are subject to change. Please check back regularly for updates.
        </p>
      </div>
      
      {/* Route Edit/Create Form */}
      {showForm && (
        <ScheduleForm
          isEditing={isEditing}
          editingRoute={editingRoute}
          onCancel={cancelEdit}
          onSubmit={handleFormSubmit}
          onRouteChange={handleRouteChange}
        />
      )}
      
      {/* Schedule List */}
      <ScheduleList
        scheduleData={scheduleData}
        expandedDay={expandedDay}
        activeTab={activeTab}
        isLoggedIn={isLoggedIn}
        toggleDay={toggleDay}
        handleTabChange={handleTabChange}
        onEdit={startEdit}
        onDelete={handleDeleteRoute}
      />
    </div>
  );
};

export default Schedule;