import React from 'react';

const Thanks: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-heading text-4xl mb-8 text-text-100">Thank You</h1>
      
      <div className="prose text-text-200">
        <p className="mb-6">
          Big Rose City Roll wouldn't be possible without the dedication and support of our amazing
          community. We'd like to extend our heartfelt thanks to:
        </p>

        <section className="mb-8">
          <h2 className="font-heading text-2xl mb-4 text-text-100">Event Organizers</h2>
          <ul className="list-disc list-inside space-y-2 text-text-300">
            <li>Sarah Johnson - Event Director</li>
            <li>Mike Wilson - Route Planning Lead</li>
            <li>Emily Chen - Community Outreach</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl mb-4 text-text-100">Local Partners</h2>
          <ul className="list-disc list-inside space-y-2 text-text-300">
            <li>Portland Inline Skating Group</li>
            <li>Rose City Rollers</li>
            <li>PDX Skate Scene</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl mb-4 text-text-100">Volunteers</h2>
          <p className="text-text-300">
            Special thanks to our dedicated team of volunteer route leaders, safety marshals, and
            support crew who make each skating session safe and enjoyable.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl mb-4 text-text-100">Website Credits</h2>
          <ul className="list-disc list-inside space-y-2 text-text-300">
            <li>Website Design & Development - StackBlitz Team</li>
            <li>Logo Design - Creative Portland</li>
            <li>Photography - Local Skating Community</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Thanks;