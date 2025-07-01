import React from 'react';
import Countdown from 'react-countdown';

interface BasicCountdownProps {
  targetDate: Date;
}

const BasicCountdown: React.FC<BasicCountdownProps> = ({ targetDate }) => {
  return (
    <div className="mb-8 text-center">
      <Countdown 
        date={targetDate} 
        renderer={({ days, hours, minutes, completed }) => {
          if (completed) {
            return <span className="text-primary-500 text-xl">The event has started!</span>;
          }
          return (
            <div className="flex justify-center gap-8 mt-8 text-text-100">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-heading">{days}</div>
                <div className="text-base uppercase tracking-wide">Days</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-heading">{hours}</div>
                <div className="text-base uppercase tracking-wide">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-heading">{minutes}</div>
                <div className="text-base uppercase tracking-wide">Minutes</div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default BasicCountdown;
