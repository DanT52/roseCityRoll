import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../types';
import { getFaqs, createFaq, updateFaq, deleteFaq } from '../services/faqs';

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('token'));
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
        await createFaq({ question: newQuestion, answer: newAnswer });
        setNewQuestion('');
        setNewAnswer('');
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
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditQuestion('');
    setEditAnswer('');
  };

  const handleEdit = async (e: React.FormEvent, faq: FAQ) => {
    e.preventDefault();
    if (editQuestion && editAnswer && editingId) {
      try {
        await updateFaq(editingId, { question: editQuestion, answer: editAnswer });
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

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-4xl mb-8 text-text-100">Frequently Asked Questions</h1>
      
      {isAdmin && !showCreateForm && (
        <button 
          onClick={() => setShowCreateForm(true)}
          className="mb-4 bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          New FAQ
        </button>
      )}
      
      {isAdmin && showCreateForm && (
        <form onSubmit={handleCreate} className="mb-8 p-4 bg-background-800 rounded-lg border border-background-300">
          <h3 className="font-heading text-xl mb-4 text-text-100">New FAQ</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="FAQ Question"
              className="w-full p-2 rounded bg-background-950 text-text-100 placeholder-text-300 border border-background-300"
              required
            />
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="FAQ Answer"
              className="w-full p-2 rounded bg-background-950 text-text-100 placeholder-text-300 border border-background-300 h-24"
              required
            />
            <div className="flex space-x-2">
              <button 
                type="submit"
                className="bg-background-700 hover:bg-background-600 text-text-100 font-bold py-2 px-4 rounded"
              >
                Create FAQ
              </button>
              <button 
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-background-700 hover:bg-background-600 text-text-100 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-background-300 rounded-lg overflow-hidden">
            {editingId === faq.id ? (
              <form onSubmit={(e) => handleEdit(e, faq)} className="p-4 bg-background-800 space-y-4">
                <input
                  type="text"
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                  className="w-full p-2 rounded bg-background-950 text-text-100 placeholder-text-300 border border-background-300"
                  required
                />
                <textarea
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                  className="w-full p-2 rounded bg-background-950 text-text-100 placeholder-text-300 border border-background-300 h-24"
                  required
                />
                <div className="flex space-x-2">
                  <button 
                    type="submit"
                    className="bg-background-700 hover:bg-background-600 text-text-100 font-bold py-2 px-4 rounded"
                  >
                    Update FAQ
                  </button>
                  <button 
                    type="button"
                    onClick={cancelEditing}
                    className="bg-background-700 hover:bg-background-600 text-text-100 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <button
                  className="w-full flex justify-between items-center p-4 bg-background-800 text-text-100 hover:bg-background-700"
                  onClick={() => toggleQuestion(faq.id)}
                >
                  <span className="font-heading text-xl">{faq.question}</span>
                  {expandedQuestion === faq.id ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>
                {expandedQuestion === faq.id && (
                  <div className="p-6 bg-background-950">
                    <p className="text-text-300 whitespace-pre-line">{faq.answer}</p>
                    {isAdmin && (
                      <div className="flex space-x-2 mt-2">
                        <button 
                          onClick={() => startEditing(faq)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(faq.id)}
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
        ))}
        {faqs.length === 0 && (
          <p className="text-white">No FAQs found.</p>
        )}
      </div>
    </div>
  );
};

export default FAQPage;