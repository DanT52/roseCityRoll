const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const getThanks = async () => {
  const res = await fetch(BACKEND_URL + "/thanks/");
  if (!res.ok) {
    throw new Error('Failed to fetch Thanks content');
  }
  return await res.json();
};

export const updateThanks = async (content: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(BACKEND_URL + "/thanks/", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
  if (!res.ok) {
    throw new Error('Failed to update Thanks content');
  }
  return await res.json();
};
