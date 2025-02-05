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
  const [newTitle, setNewTitle] = useState('');
  const [newSubtext, setNewSubtext] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtext, setEditSubtext] = useState('');

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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle && newSubtext) {
      try {
        const published_at = dayjs().tz('America/Los_Angeles').format();
        await createAnnouncement({ title: newTitle, subtext: newSubtext, published_at });
        setNewTitle('');
        setNewSubtext('');
        setShowForm(false);
        loadAnnouncements();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const startEditing = (announcement: Announcement) => {
    setEditingId(Number(announcement.id));
    setEditTitle(announcement.title);
    setEditSubtext(announcement.subtext);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditSubtext('');
  };

  const handleEdit = async (e: React.FormEvent, announcement: Announcement) => {
    e.preventDefault();
    if (editTitle && editSubtext) {
      try {
        await updateAnnouncement(Number(announcement.id), { 
          title: editTitle, 
          subtext: editSubtext, 
          published_at: announcement.published_at // Keep original timestamp
        });
        setEditingId(null);
        setEditTitle('');
        setEditSubtext('');
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
        {isAdmin && !showForm && (
          <button 
            onClick={() => setShowForm(true)} 
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            New Announcement
          </button>
        )}
      </div>
      
      {isAdmin && showForm && (
        <form onSubmit={handleCreate} className="bg-accent-50 rounded p-4 mb-8">
          <h3 className="font-heading text-xl mb-4 text-white">New Announcement</h3>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Announcement Title"
                className="w-full p-2 rounded bg-accent-100 text-accent-900 placeholder-accent-600"
                required
              />
            </div>
            <div>
              <textarea
                value={newSubtext}
                onChange={(e) => setNewSubtext(e.target.value)}
                placeholder="Announcement Content"
                className="w-full p-2 rounded bg-accent-100 text-accent-900 placeholder-accent-600 h-24"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button 
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Post Announcement
              </button>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-accent-50 rounded p-4">
            {editingId === Number(announcement.id) ? (
              <form onSubmit={(e) => handleEdit(e, announcement)} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 rounded bg-accent-100 text-accent-900 placeholder-accent-600"
                    required
                  />
                </div>
                <div>
                  <textarea
                    value={editSubtext}
                    onChange={(e) => setEditSubtext(e.target.value)}
                    className="w-full p-2 rounded bg-accent-100 text-accent-900 placeholder-accent-600 h-24"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <button 
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                  >
                    Update
                  </button>
                  <button 
                    type="button"
                    onClick={cancelEditing}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="font-heading text-xl mb-2 text-white">{announcement.title}</h3>
                <p className="text-accent-800 mb-2">{announcement.subtext}</p>
                <p className="text-sm text-accent-600">{formatDate(announcement.published_at)}</p>
                {isAdmin && (
                  <div className="flex space-x-2 mt-2">
                    <button 
                      onClick={() => startEditing(announcement)} 
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
              </>
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
