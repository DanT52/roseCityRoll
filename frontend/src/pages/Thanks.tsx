import React from 'react';
import ReactMarkdown from 'react-markdown';

const thanksContent = `# Thank You

Big Rose City Roll wouldn't be possible without the dedication and support of our amazing community. We'd like to extend our heartfelt thanks to:

## Event Organizers
* Sarah Johnson - Event Director
* Mike Wilson - Route Planning Lead
* Emily Chen - Community Outreach

## Local Partners
* Portland Inline Skating Group
* Rose City Rollers
* PDX Skate Scene

## Volunteers
Special thanks to our dedicated team of volunteer route leaders, safety marshals, and support crew who make each skating session safe and enjoyable.

## Website Credits
* Website Design & Development - StackBlitz Team
* Logo Design - Creative Portland
* Photography - Local Skating Community

## Additional Resources
For more information, visit [our website](https://www.example.com).
`;

const Thanks: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <ReactMarkdown
        components={{
          h1: ({children}) => (
            <h1 className="font-heading text-4xl mb-8 text-text-100">{children}</h1>
          ),
          h2: ({children}) => (
            <h2 className="font-heading text-2xl mb-4 text-text-100">{children}</h2>
          ),
          p: ({children}) => (
            <p className="mb-6 text-text-200">{children}</p>
          ),
          ul: ({children}) => (
            <ul className="list-disc list-inside space-y-2 text-text-300 mb-8">{children}</ul>
          ),
          a: ({children, href}) => (
            <a 
              href={href} 
              className="text-primary-500 hover:text-primary-600 underline transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {thanksContent}
      </ReactMarkdown>
    </div>
  );
};

export default Thanks;