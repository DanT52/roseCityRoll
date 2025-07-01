import React from 'react';
import { Instagram } from 'lucide-react';

const FollowButton: React.FC = () => {
  return (
    <div className="flex justify-center">
      <a
        href="https://www.instagram.com/bigrosecityroll/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-base"
      >
        <Instagram className="w-5 h-6 mr-2 my-2" /> Follow for Updates
      </a>
    </div>
  );
};

export default FollowButton;
