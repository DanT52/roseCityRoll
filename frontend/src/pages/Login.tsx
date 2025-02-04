import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admindash');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await login(credentials.username, credentials.password);
      navigate('/admindash');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="font-heading text-3xl text-text-100 mb-8 text-center">Admin Login</h1>
      <div className="bg-background-800 p-8 rounded-lg shadow-lg">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center text-red-500">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-text-200 mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 rounded bg-background-900 text-text-100 border border-background-600 focus:border-primary-500 focus:outline-none"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-text-200 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded bg-background-900 text-text-100 border border-background-600 focus:border-primary-500 focus:outline-none"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
