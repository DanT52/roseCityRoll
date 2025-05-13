import React from 'react';
import { X } from 'lucide-react';
import { DaySchedule } from '../../types';

interface ScheduleFormProps {
  isEditing: boolean;
  editingRoute: Partial<DaySchedule> | null;
  onCancel: () => void;
  onSubmit: () => void;
  onRouteChange: (route: Partial<DaySchedule>) => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  isEditing,
  editingRoute,
  onCancel,
  onSubmit,
  onRouteChange
}) => {
  if (!editingRoute) return null;

  return (
    <div className="bg-background-900 border border-background-700 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-2xl text-text-100">
          {isEditing ? 'Edit Route' : 'Add New Route'}
        </h2>
        <button onClick={onCancel} className="text-text-400 hover:text-text-100">
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
              onChange={(e) => onRouteChange({...editingRoute, day: e.target.value})}
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
              onChange={(e) => onRouteChange({...editingRoute, date: e.target.value})}
              className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-300 mb-1">Meeting Point</label>
            <input
              type="text"
              value={editingRoute?.meetingPoint || ''}
              onChange={(e) => onRouteChange({...editingRoute, meetingPoint: e.target.value})}
              className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-300 mb-1">End Point (Optional)</label>
            <input
              type="text"
              value={editingRoute?.endPoint || ''}
              onChange={(e) => onRouteChange({...editingRoute, endPoint: e.target.value})}
              className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-text-300 mb-1">Start Time</label>
              <input
                type="text"
                value={editingRoute?.startTime || ''}
                onChange={(e) => onRouteChange({...editingRoute, startTime: e.target.value})}
                placeholder="e.g. 6:00 PM"
                className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-300 mb-1">End Time</label>
              <input
                type="text"
                value={editingRoute?.endTime || ''}
                onChange={(e) => onRouteChange({...editingRoute, endTime: e.target.value})}
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
              onChange={(e) => onRouteChange({...editingRoute, routeDescription: e.target.value})}
              rows={3}
              className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-text-300 mb-1">Difficulty</label>
              <select
                value={editingRoute?.difficulty || '🐰 Bunny'}
                onChange={(e) => onRouteChange({
                  ...editingRoute,
                  difficulty: e.target.value as DaySchedule['difficulty']
                })}
                className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
              >
                <option value="🐰 Bunny">🐰 Bunny</option>
                <option value="🟢 Green">🟢 Green</option>
                <option value="🔵 Blue">🔵 Blue</option>
                <option value="⚫ Black">⚫ Black</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-300 mb-1">Distance</label>
              <input
                type="text"
                value={editingRoute?.distance || ''}
                onChange={(e) => onRouteChange({...editingRoute, distance: e.target.value})}
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
              onChange={(e) => onRouteChange({...editingRoute, leader: e.target.value})}
              className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-300 mb-1">Full Strava Embed (Optional)</label>
            <input
              type="text"
              value={editingRoute?.routeMapEmbed || ''}
              onChange={(e) => onRouteChange({...editingRoute, routeMapEmbed: e.target.value})}
              className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-300 mb-1">Start Point Map Embed URL (Optional)</label>
            <input
              type="text"
              value={editingRoute?.startPointEmbed || ''}
              onChange={(e) => onRouteChange({...editingRoute, startPointEmbed: e.target.value})}
              className="w-full bg-background-800 border border-background-600 rounded-md px-3 py-2 text-text-100"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mt-4">
        <button 
          onClick={onCancel}
          className="px-4 py-2 border border-background-600 rounded-md text-text-300 hover:bg-background-800"
        >
          Cancel
        </button>
        <button 
          onClick={onSubmit}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md"
          disabled={!editingRoute?.day || !editingRoute?.date}
        >
          {isEditing ? 'Save Changes' : 'Add Route'}
        </button>
      </div>
    </div>
  );
};

export default ScheduleForm;
