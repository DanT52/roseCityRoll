import React from 'react';

interface BackgroundProps {
  opacity?: number;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ opacity = 0.3, children }) => {
  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-[0.3]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1589211963780-1f74f3864f74?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      />
      <div 
        className="fixed inset-0 z-0 bg-background-950"
        style={{
          opacity: opacity
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background;
