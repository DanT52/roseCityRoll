import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../../types';
import FaqForm from './FaqForm';

interface FaqCardProps {
  faq: FAQ;
  isExpanded: boolean;
  isEditing: boolean;
  isLoggedIn: boolean;
  editQuestion: string;
  setEditQuestion: (value: string) => void;
  editAnswer: string;
  setEditAnswer: (value: string) => void;
  editLink: string;
  setEditLink: (value: string) => void;
  editLinkText: string;
  setEditLinkText: (value: string) => void;
  toggleExpand: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSubmitEdit: (e: React.FormEvent) => void;
  onDelete: () => void;
}

const FaqCard: React.FC<FaqCardProps> = ({
  faq,
  isExpanded,
  isEditing,
  isLoggedIn,
  editQuestion,
  setEditQuestion,
  editAnswer,
  setEditAnswer,
  editLink,
  setEditLink,
  editLinkText,
  setEditLinkText,
  toggleExpand,
  onStartEdit,
  onCancelEdit,
  onSubmitEdit,
  onDelete
}) => {
  return (
    <div className="border border-background-300 rounded-lg overflow-hidden">
      {isEditing ? (
        <FaqForm
          isEditing={true}
          question={editQuestion}
          setQuestion={setEditQuestion}
          answer={editAnswer}
          setAnswer={setEditAnswer}
          link={editLink}
          setLink={setEditLink}
          linkText={editLinkText}
          setLinkText={setEditLinkText}
          onSubmit={onSubmitEdit}
          onCancel={onCancelEdit}
        />
      ) : (
        <>
          <button
            className="w-full flex justify-between items-center p-4 bg-background-800 text-text-100 hover:bg-background-700"
            onClick={toggleExpand}
          >
            <span className="font-heading text-xl ">{faq.question}</span>
            {isExpanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </button>
          {isExpanded && (
            <div className="p-6 bg-background-950">
              <p className="text-text-300 whitespace-pre-line">{faq.answer}</p>
              {faq.link && faq.linktext && (
                <a 
                  href={faq.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block mt-3 text-primary-500 hover:text-primary-400 font-medium underline transition duration-200"
                >
                  {faq.linktext} →
                </a>
              )}
              {isLoggedIn && (
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={onStartEdit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={onDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FaqCard;
