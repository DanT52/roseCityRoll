const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const login = async (username: string, password: string) => {
  const res = await fetch(BACKEND_URL + "/auth/jwt/login", {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password })
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  const data = await res.json();
  localStorage.setItem('token', data.access_token);
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isLoggedIn = () => !!localStorage.getItem('token');