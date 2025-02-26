import React from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import roseCityIcon from '../assets/images/roseCityIcon.png';
import Background from './Background';

const Layout: React.FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Background opacity={0.5}>
      <div className="min-h-screen font-body flex flex-col">
        <header className="bg-background-800/90 shadow-md backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="font-heading text-2xl text-text-100 flex items-center">
                Big Rose City Roll 2025
                <img src={roseCityIcon} alt="Rose City Icon" className="ml-2 w-12 h-12" />
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-text-200 hover:text-primary-500">Home</Link>
                <Link to="/faq" className="text-text-200 hover:text-primary-500">FAQ</Link>
                <Link to="/schedule" className="text-text-200 hover:text-primary-500">Schedule</Link>
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
                <Link to="/faq" className="block text-text-200 hover:text-primary-500">FAQ</Link>
                <Link to="/schedule" className="block text-text-200 hover:text-primary-500">Schedule</Link>
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

        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>

        <footer className="bg-background-800/90 text-text-200 py-8 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p>&copy; {new Date().getFullYear()} Big Rose City Roll. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Background>
  );
};

export default Layout;