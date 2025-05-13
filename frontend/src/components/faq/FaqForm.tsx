import React from 'react';
import { FAQ } from '../../types';

interface FaqFormProps {
  isEditing: boolean;
  question: string;
  setQuestion: (value: string) => void;
  answer: string;
  setAnswer: (value: string) => void;
  link: string;
  setLink: (value: string) => void;
  linkText: string;
  setLinkText: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const FaqForm: React.FC<FaqFormProps> = ({
  isEditing,
  question,
  setQuestion,
  answer,
  setAnswer,
  link,
  setLink,
  linkText,
  setLinkText,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-background-800 space-y-4 rounded-lg border border-background-300">
      <h3 className="font-heading text-xl mb-4 text-text-100">
        {isEditing ? 'Edit FAQ' : 'New FAQ'}
      </h3>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="FAQ Question"
        className="w-full p-2 rounded bg-background-950 text-text-100 placeholder-text-300 border border-background-300"
        required
      />
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="FAQ Answer"
        className="w-full p-2 rounded bg-background-950 text-text-100 placeholder-text-300 border border-background-300 h-24"
        required
      />
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link URL (optional)"
        className="w-full p-2 rounded bg-background-950 text-text-100 placeholder-text-300 border border-background-300"
      />
      <input
        type="text"
        value={linkText}
        onChange={(e) => setLinkText(e.target.value)}
        placeholder="Link Text (optional)"
        className="w-full p-2 rounded bg-background-950 text-text-100 placeholder-text-300 border border-background-300"
      />
      <div className="flex space-x-2">
        <button 
          type="submit"
          className="bg-background-700 hover:bg-background-600 text-text-100 font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Update FAQ' : 'Create FAQ'}
        </button>
        <button 
          type="button"
          onClick={onCancel}
          className="bg-background-700 hover:bg-background-600 text-text-100 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FaqForm;
