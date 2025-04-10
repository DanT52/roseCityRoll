const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const getFeatures = async () => {
  const res = await fetch(BACKEND_URL + "/features/", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch features');
  }

  const data = await res.json();
  return data.reduce((acc: Record<string, { enabled: boolean, adminOnly: boolean }>, feature: { name: string, enabled: boolean, adminOnly: boolean }) => {
    acc[feature.name] = { enabled: feature.enabled, adminOnly: feature.adminOnly };
    return acc;
  }, {});
};

export const toggleFeature = async (feature: string, enabled: boolean) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(BACKEND_URL + `/features/${feature}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name: feature, enabled })
  });

  if (!res.ok) {
    throw new Error('Failed to toggle feature');
  }

  return await res.json();
};
