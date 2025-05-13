import React, { useRef } from 'react';
import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { FAQ } from '../../types';
import FaqForm from './FaqForm';
import { useDrag, useDrop } from 'react-dnd';

interface FaqCardProps {
  faq: FAQ;
  index: number; // Add index for drag and drop ordering
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
  moveFaq: (dragIndex: number, hoverIndex: number) => void;
}

type DragItem = {
  index: number;
  id: string;
  type: string;
};

const ItemType = 'faq';

const FaqCard: React.FC<FaqCardProps> = ({
  faq,
  index,
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
  onDelete,
  moveFaq
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ handlerId }, drop] = useDrop({
    accept: ItemType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as { y: number }).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveFaq(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: () => {
      return { id: faq.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isLoggedIn, // Only allow dragging if logged in
  });

  const opacity = isDragging ? 0.4 : 1;
  
  drag(drop(ref));

  return (
    <div ref={ref} className="border border-background-300 rounded-lg overflow-hidden" style={{ opacity }} data-handler-id={handlerId}>
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
          <div className="flex w-full bg-background-800 text-text-100">
            {isLoggedIn && (
              <div className="p-4 cursor-move flex items-center text-gray-400 hover:text-gray-200">
                <GripVertical className="w-5 h-5" />
              </div>
            )}
            <button
              className="flex-1 flex justify-between items-center p-4 hover:bg-background-700"
              onClick={toggleExpand}
            >
              <span className="font-heading text-xl">{faq.question}</span>
              {isExpanded ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>
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
