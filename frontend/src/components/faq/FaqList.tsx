import React from 'react';
import { FAQ } from '../../types';
import FaqCard from './FaqCard';

interface FaqListProps {
  faqs: FAQ[];
  expandedQuestion: string | null;
  setExpandedQuestion: (id: string | null) => void;
  editingId: string | null;
  editQuestion: string;
  setEditQuestion: (value: string) => void;
  editAnswer: string;
  setEditAnswer: (value: string) => void;
  editLink: string;
  setEditLink: (value: string) => void;
  editLinkText: string;
  setEditLinkText: (value: string) => void;
  isLoggedIn: boolean;
  startEditing: (faq: FAQ) => void;
  cancelEditing: () => void;
  handleEdit: (e: React.FormEvent, faq: FAQ) => void;
  handleDelete: (id: string) => void;
}

const FaqList: React.FC<FaqListProps> = ({
  faqs,
  expandedQuestion,
  setExpandedQuestion,
  editingId,
  editQuestion,
  setEditQuestion,
  editAnswer,
  setEditAnswer,
  editLink,
  setEditLink,
  editLinkText,
  setEditLinkText,
  isLoggedIn,
  startEditing,
  cancelEditing,
  handleEdit,
  handleDelete
}) => {
  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FaqCard
          key={faq.id}
          faq={faq}
          isExpanded={expandedQuestion === faq.id}
          isEditing={editingId === faq.id}
          isLoggedIn={isLoggedIn}
          editQuestion={editQuestion}
          setEditQuestion={setEditQuestion}
          editAnswer={editAnswer}
          setEditAnswer={setEditAnswer}
          editLink={editLink}
          setEditLink={setEditLink}
          editLinkText={editLinkText}
          setEditLinkText={setEditLinkText}
          toggleExpand={() => toggleQuestion(faq.id)}
          onStartEdit={() => startEditing(faq)}
          onCancelEdit={cancelEditing}
          onSubmitEdit={(e) => handleEdit(e, faq)}
          onDelete={() => handleDelete(faq.id)}
        />
      ))}
      {faqs.length === 0 && (
        <p className="text-black">FAQ's Loading...</p>
      )}
    </div>
  );
};

export default FaqList;
