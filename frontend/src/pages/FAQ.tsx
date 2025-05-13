import React, { useEffect, useState } from 'react';
import { FAQ } from '../types';
import { getFaqs, createFaq, updateFaq, deleteFaq } from '../services/faqs';
import { useAuth } from '../contexts/AuthContext';
import FaqForm from '../components/faq/FaqForm';
import FaqList from '../components/faq/FaqList';

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newLinkText, setNewLinkText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [editLink, setEditLink] = useState('');
  const [editLinkText, setEditLinkText] = useState('');

  useEffect(() => {
    loadFaqs();
  }, []);

  const loadFaqs = async () => {
    try {
      const data = await getFaqs();
      // Sort FAQs by id (assuming numeric string IDs)
      const sorted = data.sort((a: FAQ, b: FAQ) => Number(a.id) - Number(b.id));
      setFaqs(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion && newAnswer) {
      try {
        await createFaq({ 
          question: newQuestion, 
          answer: newAnswer,
          link: newLink || undefined,
          linktext: newLinkText || undefined
        });
        setNewQuestion('');
        setNewAnswer('');
        setNewLink('');
        setNewLinkText('');
        setShowCreateForm(false);
        loadFaqs();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const startEditing = (faq: FAQ) => {
    setEditingId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
    setEditLink(faq.link || '');
    setEditLinkText(faq.linktext || '');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditQuestion('');
    setEditAnswer('');
    setEditLink('');
    setEditLinkText('');
  };

  const handleEdit = async (e: React.FormEvent, faq: FAQ) => {
    e.preventDefault();
    if (editQuestion && editAnswer && editingId) {
      try {
        await updateFaq(editingId, { 
          question: editQuestion, 
          answer: editAnswer,
          link: editLink || undefined,
          linktext: editLinkText || undefined
        });
        cancelEditing();
        loadFaqs();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await deleteFaq(id);
        loadFaqs();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-4xl mb-8 text-text-100">Frequently Asked Questions</h1>
      
      {isLoggedIn && !showCreateForm && (
        <button 
          onClick={() => setShowCreateForm(true)}
          className="mb-4 bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          New FAQ
        </button>
      )}
      
      {isLoggedIn && showCreateForm && (
        <div className="mb-8">
          <FaqForm
            isEditing={false}
            question={newQuestion}
            setQuestion={setNewQuestion}
            answer={newAnswer}
            setAnswer={setNewAnswer}
            link={newLink}
            setLink={setNewLink}
            linkText={newLinkText}
            setLinkText={setNewLinkText}
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      <FaqList
        faqs={faqs}
        expandedQuestion={expandedQuestion}
        setExpandedQuestion={setExpandedQuestion}
        editingId={editingId}
        editQuestion={editQuestion}
        setEditQuestion={setEditQuestion}
        editAnswer={editAnswer}
        setEditAnswer={setEditAnswer}
        editLink={editLink}
        setEditLink={setEditLink}
        editLinkText={editLinkText}
        setEditLinkText={setEditLinkText}
        isLoggedIn={isLoggedIn}
        startEditing={startEditing}
        cancelEditing={cancelEditing}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default FAQPage;