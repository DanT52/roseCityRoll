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
      answer: "Big Rose City Roll was Portland's first multi-day skating event that brought together inline and quad skaters for group rides, community building, and unforgettable experiences. The inaugural event took place in June 2025."
    },
    {
      id: '2',
      question: "When is the next event?",
      answer: "The first Big Rose City Roll took place June 26th-29th, 2025. We're planning to make this an annual event and will be back in June 2026! Follow us on Instagram for updates about dates and registration."
    },
    {
      id: '3',
      question: "What are the difficulty ratings?",
      answer: "We use a difficulty system:\n\n" +
        "🟢 Green: 6-7 mph, rougher surfaces, some hills\n" +
        "🔵 Blue: 8-10 mph, moderate terrain, hills up to 25 mph\n" +
        "⚫ Black: 10-12+ mph, challenging terrain, steep hills"
    },
    {
      id: '4',
      question: "How experienced of a skater do I need to be?",
      answer: "Each day's routes will be marked with difficulty ratings so you can choose what's best for you based on your personal fitness and skill level. Portland is geographically a hilly city so speed control and stopping techniques are needed to be safe. We will occasionally be skating amongst traffic so urban awareness is essential. We'll try to maintain an average pace of 7-8 mph. There will be regroup points and longer breaks every hour or so. Each ride usually follows the following pattern: A mellow uphill for 3-5 miles inland from sea level. Flatter streets for most of the skate, and a descent back to sea level.\n\nYou can also checkout the exact routes we will be skating by checking out the \"Route Map\" tab within each event on the Schedule page. This will give you a better idea of the elevation profiles, terrain, and hazards."
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
