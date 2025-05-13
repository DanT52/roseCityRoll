import React, { useCallback } from 'react';
import { FAQ } from '../../types';
import FaqCard from './FaqCard';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { reorderFaqs } from '../../services/faqs';

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
  setFaqs?: (faqs: FAQ[]) => void; // Add this prop
}

type DragItem = {
  index: number;
  id: string;
  type: string;
};

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
  handleDelete,
  setFaqs
}) => {
  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const moveFaq = useCallback(
    async (dragIndex: number, hoverIndex: number) => {
      if (!isLoggedIn || !setFaqs) return;
      const draggedFaq = faqs[dragIndex];
      
      // Create a new array with the reordered FAQs
      const updatedFaqs = [...faqs];
      updatedFaqs.splice(dragIndex, 1);
      updatedFaqs.splice(hoverIndex, 0, draggedFaq);
      
      // Update the local state first
      setFaqs(updatedFaqs);
      
      // Send the reordering to the backend
      try {
        const faqIds = updatedFaqs.map(faq => faq.id);
        await reorderFaqs(faqIds);
      } catch (error) {
        console.error('Error reordering FAQs:', error);
        // Revert to original order on error
        setFaqs(faqs);
      }
    },
    [faqs, isLoggedIn, setFaqs]
  );

  const renderFaq = (faq: FAQ, index: number) => {
    return (
      <FaqCard
        key={faq.id}
        faq={faq}
        index={index}
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
        moveFaq={moveFaq}
      />
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {faqs.map((faq, index) => renderFaq(faq, index))}
        {faqs.length === 0 && (
          <p className="text-black">FAQ's Loading...</p>
        )}
      </div>
    </DndProvider>
  );
};

export default FaqList;
