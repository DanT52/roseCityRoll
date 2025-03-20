const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const getLatestAnnouncements = async () => {
  const res = await fetch(BACKEND_URL + "/announcements/latest");
  if (!res.ok) {
    throw new Error('Failed to fetch announcements');
  }
  return await res.json();
};

export interface AnnouncementCreateUpdate {
  title: string;
  subtext: string;
  published_at: string;
  link?: string;
  linktext?: string;
}

export const createAnnouncement = async (announcement: AnnouncementCreateUpdate) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(BACKEND_URL + "/announcements/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(announcement)
  });
  if (!res.ok) {
    throw new Error('Failed to create announcement');
  }
  return await res.json();
};

export const updateAnnouncement = async (id: number, announcement: AnnouncementCreateUpdate) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(BACKEND_URL + `/announcements/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(announcement)
  });
  if (!res.ok) {
    throw new Error('Failed to update announcement');
  }
  return await res.json();
};

export const deleteAnnouncement = async (id: number) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(BACKEND_URL + `/announcements/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) {
    throw new Error('Failed to delete announcement');
  }
  return await res.json();
};
