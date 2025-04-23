import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getThanks, updateThanks } from '../services/thanks';

const Thanks: React.FC = () => {
  const [thanksContent, setThanksContent] = useState<string>('# Loading...');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('token'));
    loadThanksContent();
  }, []);

  const loadThanksContent = async () => {
    try {
      setIsLoading(true);
      const data = await getThanks();
      setThanksContent(data.content);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading thanks content:', error);
      setThanksContent('# Error\nUnable to load content. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setEditContent(thanksContent);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent('');
  };

  const handleSave = async () => {
    try {
      await updateThanks(editContent);
      setThanksContent(editContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating thanks content:', error);
      alert('Failed to update content. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {isAdmin && !isEditing && (
        <div className="mb-4">
          <button 
            onClick={handleEdit}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Edit Content
          </button>
        </div>
      )}

      {isEditing ? (
        <div className="mb-4 p-4 bg-background-800 rounded-lg border border-background-300">
          <h2 className="font-heading text-2xl mb-4 text-text-100">Edit Thanks Content</h2>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 rounded bg-background-950 text-text-100 placeholder-text-300 border border-background-300 min-h-[400px] font-mono"
          />
          <div className="flex space-x-2 mt-4">
            <button 
              onClick={handleSave}
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Save Changes
            </button>
            <button 
              onClick={handleCancel}
              className="bg-background-700 hover:bg-background-600 text-text-100 font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <ReactMarkdown
            components={{
              h1: ({children}) => (
                <h1 className="font-heading text-4xl mb-8 text-text-100">{children}</h1>
              ),
              h2: ({children}) => (
                <h2 className="font-heading text-2xl mb-4 text-text-100">{children}</h2>
              ),
              p: ({children}) => (
                <p className="mb-6 text-text-200">{children}</p>
              ),
              ul: ({children}) => (
                <ul className="list-disc list-inside space-y-2 text-text-300 mb-8">{children}</ul>
              ),
              a: ({children, href}) => (
                <a 
                  href={href} 
                  className="text-primary-500 hover:text-primary-600 underline transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {thanksContent}
          </ReactMarkdown>
        )
      )}
      
      {/* Hosted by section - moved to bottom */}
      <div className="mt-16 text-center">
        <p className="text-text-200 text-lg mb-4">Hosted by</p>
        <div className="flex justify-center gap-6">
          <a href="https://www.instagram.com/lallaveallen_/" target="_blank" rel="noopener noreferrer">
            <img src="https://i.imgur.com/JOvfQIj.png" alt="La Llave Allen" className="h-16" />
          </a>
          <a href="https://www.instagram.com/bridge.city.skate/" target="_blank" rel="noopener noreferrer">
            <img src="https://i.imgur.com/Fa2qHe3.png" alt="Bridge City Skate" className="h-16" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Thanks;