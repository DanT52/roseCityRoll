import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  // Mock FAQ data - in production, this would come from an API
  const faqData = [
    {
      id: '1',
      question: 'What skill level is required to participate?',
      answer: 'We welcome skaters of all skill levels! Each day\'s route is marked with a difficulty rating, allowing you to choose routes that match your comfort level.',
      category: 'General',
    },
    {
      id: '2',
      question: 'What safety gear is required?',
      answer: 'All participants must wear a helmet. We strongly recommend wrist guards, knee pads, and elbow pads, especially for longer routes and less experienced skaters.',
      category: 'Safety',
    },
    {
      id: '3',
      question: 'What happens if it rains?',
      answer: 'Routes may be modified or cancelled in case of rain for safety reasons. Follow our Instagram for real-time updates.',
      category: 'Weather',
    },
  ];

  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-4xl mb-8 text-text-100">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqData.map((faq) => (
          <div 
            key={faq.id}
            className="border border-background-300 rounded-lg overflow-hidden"
          >
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
                <p className="text-text-300">{faq.answer}</p>
                <span className="mt-4 inline-block px-3 py-1 bg-background-800 text-text-400 rounded-full text-sm">
                  {faq.category}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;