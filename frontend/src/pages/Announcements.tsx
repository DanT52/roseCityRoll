import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { Announcement } from '../types';
import { getLatestAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../services/announcements';

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check for token to determine admin status
    setIsAdmin(!!localStorage.getItem('token'));
    // Fetch latest announcements on mount
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const data = await getLatestAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    const title = prompt("Enter announcement title");
    const subtext = prompt("Enter announcement details");
    // Use dayjs to get current PST timestamp
    const published_at = dayjs().tz('America/Los_Angeles').format();
    if (title && subtext) {
      try {
        await createAnnouncement({ title, subtext, published_at });
        loadAnnouncements();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = async (id: number) => {
    const title = prompt("Enter updated title");
    const subtext = prompt("Enter updated details");
    // Use dayjs to get current PST timestamp
    const published_at = dayjs().tz('America/Los_Angeles').format();
    if (title && subtext) {
      try {
        await updateAnnouncement(id, { title, subtext, published_at });
        loadAnnouncements();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await deleteAnnouncement(id);
        loadAnnouncements();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    // Parse as UTC then convert to PST
    return dayjs.utc(dateString).tz('America/Los_Angeles').format('MM/DD/YYYY, h:mm A');
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-2xl text-white">Announcements</h2>
        {isAdmin && (
          <button onClick={handleCreate} className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg">
            New Announcement
          </button>
        )}
      </div>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-accent-50 rounded p-4">
            <h3 className="font-heading text-xl mb-2 text-white">{announcement.title}</h3>
            <p className="text-accent-800 mb-2">{announcement.subtext}</p>
            <p className="text-sm text-accent-600">{formatDate(announcement.published_at)}</p>
            {isAdmin && (
              <div className="flex space-x-2 mt-2">
                <button 
                  onClick={() => handleEdit(Number(announcement.id))} 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(Number(announcement.id))} 
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {announcements.length === 0 && (
          <p className="text-white">No announcements yet.</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
