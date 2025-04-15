import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/404-animated-web.webp'; // Adjust the path if needed

function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen ">
      <img 
        src={logo} 
        alt="404 Logo" 
        className="w-96 h-48 filter invert" // Makes the logo appear black
      />
      <h1 className="text-xl font-semibold mt-4">Page Not Found</h1>
      <p className="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="mt-4 text-blue-500 hover:underline"
      >
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
