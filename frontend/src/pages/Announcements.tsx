import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { Announcement } from '../types';
import { getLatestAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../services/announcements';
import { useAuth } from '../contexts/AuthContext';
import { ExternalLink } from 'lucide-react';

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const { isLoggedIn } = useAuth();
  const [newTitle, setNewTitle] = useState('');
  const [newSubtext, setNewSubtext] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newLinkText, setNewLinkText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtext, setEditSubtext] = useState('');
  const [editLink, setEditLink] = useState('');
  const [editLinkText, setEditLinkText] = useState('');
  const [editDateTime, setEditDateTime] = useState('');

  useEffect(() => {
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
        await createAnnouncement({ 
          title: newTitle, 
          subtext: newSubtext, 
          published_at,
          link: newLink || undefined,
          linktext: newLinkText || undefined
        });
        setNewTitle('');
        setNewSubtext('');
        setNewLink('');
        setNewLinkText('');
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
    setEditLink(announcement.link || '');
    setEditLinkText(announcement.linktext || '');
    // Convert to local datetime format for input element
    setEditDateTime(dayjs.utc(announcement.published_at).tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm'));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditSubtext('');
    setEditLink('');
    setEditLinkText('');
    setEditDateTime('');
  };

  const handleEdit = async (e: React.FormEvent, announcement: Announcement) => {
    e.preventDefault();
    if (editTitle && editSubtext) {
      try {
        // Convert local datetime back to UTC for storage
        const published_at = editDateTime 
          ? dayjs.tz(editDateTime, 'America/Los_Angeles').utc().format()
          : announcement.published_at;
        
        await updateAnnouncement(Number(announcement.id), { 
          title: editTitle, 
          subtext: editSubtext,
          published_at,
          link: editLink || undefined,
          linktext: editLinkText || undefined
        });
        cancelEditing();
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
    <div className="space-y-6 md:space-y-8 p-2 md:p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="font-heading text-2xl text-white">Announcements</h2>
        {isLoggedIn && !showForm && (
          <button 
            onClick={() => setShowForm(true)} 
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto"
          >
            New Announcement
          </button>
        )}
      </div>
      
      {isLoggedIn && showForm && (
        <form onSubmit={handleCreate} className="bg-accent-50 rounded p-3 md:p-4 mb-6 md:mb-8">
          <h3 className="font-heading text-xl mb-3 md:mb-4 text-white">New Announcement</h3>
          <div className="space-y-3 md:space-y-4">
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
            <div>
              <input
                type="text"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Link URL (optional)"
                className="w-full p-2 rounded bg-accent-100 text-accent-900 placeholder-accent-600"
              />
            </div>
            <div>
              <input
                type="text"
                value={newLinkText}
                onChange={(e) => setNewLinkText(e.target.value)}
                placeholder="Link Text (optional)"
                className="w-full p-2 rounded bg-accent-100 text-accent-900 placeholder-accent-600"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
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

      <div className="space-y-3 md:space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-accent-50 rounded p-3 md:p-4">
            {editingId === Number(announcement.id) ? (
              <form onSubmit={(e) => handleEdit(e, announcement)} className="space-y-3 md:space-y-4">
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
                <div>
                  <input
                    type="text"
                    value={editLink}
                    onChange={(e) => setEditLink(e.target.value)}
                    placeholder="Link URL (optional)"
                    className="w-full p-2 rounded bg-accent-100 text-accent-900 placeholder-accent-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={editLinkText}
                    onChange={(e) => setEditLinkText(e.target.value)}
                    placeholder="Link Text (optional)"
                    className="w-full p-2 rounded bg-accent-100 text-accent-900 placeholder-accent-600"
                  />
                </div>
                <div>
                  <label className="block text-accent-800 mb-1">Publication Date/Time</label>
                  <input
                    type="datetime-local"
                    value={editDateTime}
                    onChange={(e) => setEditDateTime(e.target.value)}
                    className="w-full p-2 rounded bg-accent-100 text-accent-900"
                  />
                </div>
                <div className="flex flex-col xs:flex-row gap-2">
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
                <p className="text-accent-800 mb-2 whitespace-pre-wrap">{announcement.subtext}</p>
                {announcement.link && announcement.linktext && (
                  <div className="mb-2">
                    <a 
                      href={announcement.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium break-words"
                    >
                      {announcement.linktext} <ExternalLink className="ml-1 min-w-4 h-4 flex-shrink-0" />
                    </a>
                  </div>
                )}
                <p className="text-sm text-accent-600">{formatDate(announcement.published_at)}</p>
                {isLoggedIn && (
                  <div className="flex flex-wrap gap-2 mt-2">
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
