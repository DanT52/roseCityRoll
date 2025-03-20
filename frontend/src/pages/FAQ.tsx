import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../types';

const FAQPage: React.FC = () => {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const faqs: FAQ[] = [
    {
      id: '1',
      question: "What is Big Rose City Roll?",
      answer: "Big Rose City Roll is Portland's first multi-day skating event bringing together inline and quad skaters for group rides, community building, and unforgettable experiences."
    },
    {
      id: '2',
      question: "When is the event?",
      answer: "The event takes place from June 26th to June 29th, 2025. Our first group ride will be Thursday evening, and the last ride will be Sunday morning."
    },
    {
      id: '3',
      question: "What lodging options are available?",
      answer: "North West Portland Hostel will be where this event is hosted. We're grateful to have the support of this beautiful place and its owners for our first Big Rose City Roll 🌹. You can already start reserving your rooms on their website with the promo code BigRoseCityRoll2025.",
      link: {
        text: "Book your room here",
        url: "https://hotels.cloudbeds.com/en/reservation/IyNleY/?currency=usd&checkin=2025-06-26&checkout=2025-06-29&promo=BigRoseCityRoll2025"
      }
    },
    {
      id: '4',
      question: "What are the difficulty ratings?",
      answer: "We use a difficulty system:\n\n" +
        "🟢 Green: 6-7 mph, rougher surfaces, some hills\n" +
        "🔵 Blue: 8-10 mph, moderate terrain, hills up to 25 mph\n" +
        "⚫ Black: 10-12+ mph, challenging terrain, steep hills"
    },
    {
      id: '5',
      question: "Do I need to be an experienced skater?",
      answer: "We welcome skaters of all skill levels! Each day's routes will be marked with difficulty levels so you can choose what's best for you. We recommend being comfortable with basic skating and stopping techniques."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-4xl mb-8 text-text-100">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq) => (
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
                <p className="text-text-300 whitespace-pre-line">{faq.answer}</p>
                {faq.link && (
                  <a 
                    href={faq.link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block mt-3 text-primary-500 hover:text-primary-400 font-medium underline transition duration-200"
                  >
                    {faq.link.text} →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
