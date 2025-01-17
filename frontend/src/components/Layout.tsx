import React from 'react';
import { Instagram } from 'lucide-react';
import { useState } from 'react';
import roseCityIcon from '../assets/images/roseCityIcon.png';

const Layout: React.FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-background-950 font-body flex flex-col">
      <header className="bg-background-800 shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="font-heading text-2xl text-text-100 flex items-center">
              Big Rose City Roll 2025
              <img src={roseCityIcon} alt="Rose City Icon" className="ml-2 w-12 h-12" />
            </a>
            
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="https://www.instagram.com/bigrosecityroll/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-200 hover:text-primary-500"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>

            <a 
              href="https://www.instagram.com/bigrosecityroll/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="md:hidden text-text-200"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
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