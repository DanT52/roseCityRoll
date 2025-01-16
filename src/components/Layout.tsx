import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-background-950 font-body">
      <header className="bg-background-800 shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="font-heading text-2xl text-text-100">
              Big Rose City Roll
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-text-200 hover:text-primary-500">Home</Link>
              <Link to="/schedule" className="text-text-200 hover:text-primary-500">Schedule</Link>
              <Link to="/faq" className="text-text-200 hover:text-primary-500">FAQ</Link>
              <Link to="/thanks" className="text-text-200 hover:text-primary-500">Thanks</Link>
              <a 
                href="https://www.instagram.com/bigrosecityroll/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-200 hover:text-primary-500"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>

            <button 
              className="md:hidden text-text-200"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <Link to="/" className="block text-text-200 hover:text-primary-500">Home</Link>
              <Link to="/schedule" className="block text-text-200 hover:text-primary-500">Schedule</Link>
              <Link to="/faq" className="block text-text-200 hover:text-primary-500">FAQ</Link>
              <Link to="/thanks" className="block text-text-200 hover:text-primary-500">Thanks</Link>
              <a 
                href="https://www.instagram.com/bigrosecityroll/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-text-200 hover:text-primary-500"
              >
                <Instagram className="w-6 h-6 mr-2" /> Instagram
              </a>
            </div>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-background-800 text-text-200 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Big Rose City Roll. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;