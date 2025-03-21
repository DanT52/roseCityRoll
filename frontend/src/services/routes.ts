import { DaySchedule } from '../types';

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Convert backend model to frontend model
const transformRouteData = (route: any): DaySchedule => ({
  id: route.id,
  day: route.day,
  date: route.date,
  meetingPoint: route.meeting_point,
  endPoint: route.end_point,
  startTime: route.start_time,
  endTime: route.end_time, 
  routeDescription: route.route_description,
  difficulty: route.difficulty as DaySchedule['difficulty'],
  distance: route.distance,
  leader: route.leader,
  routeMapEmbed: route.route_map_embed,
  startPointEmbed: route.start_point_embed
});

// Convert frontend model to backend model
const transformRouteForBackend = (route: Omit<DaySchedule, 'id'>) => ({
  day: route.day,
  date: route.date,
  meeting_point: route.meetingPoint,
  end_point: route.endPoint,
  start_time: route.startTime,
  end_time: route.endTime,
  route_description: route.routeDescription,
  difficulty: route.difficulty,
  distance: route.distance,
  leader: route.leader,
  route_map_embed: route.routeMapEmbed,
  start_point_embed: route.startPointEmbed
});

export const getAllRoutes = async (): Promise<DaySchedule[]> => {
  const res = await fetch(`${BACKEND_URL}/routes/`);
  if (!res.ok) {
    throw new Error('Failed to fetch routes');
  }
  const data = await res.json();
  return data.map(transformRouteData);
};

export const createRoute = async (route: Omit<DaySchedule, 'id'>) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${BACKEND_URL}/routes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(transformRouteForBackend(route))
  });
  
  if (!res.ok) {
    throw new Error('Failed to create route');
  }
  const data = await res.json();
  return transformRouteData(data);
};

export const updateRoute = async (id: string, route: Omit<DaySchedule, 'id'>) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${BACKEND_URL}/routes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(transformRouteForBackend(route))
  });
  
  if (!res.ok) {
    throw new Error('Failed to update route');
  }
  const data = await res.json();
  return transformRouteData(data);
};

export const deleteRoute = async (id: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  
  const res = await fetch(`${BACKEND_URL}/routes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to delete route');
  }
  
  return await res.json();
};
