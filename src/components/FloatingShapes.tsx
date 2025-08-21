import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl animate-float" 
           style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-secondary/15 to-primary/15 blur-3xl animate-float" 
           style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-accent/25 to-secondary/25 blur-3xl animate-float" 
           style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-1/3 w-56 h-56 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl animate-float" 
           style={{ animationDelay: '1s' }} />

      {/* Medium Geometric Shapes */}
      <div className="absolute top-1/3 left-1/5 w-32 h-32 rotate-45 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 blur-sm animate-float" 
           style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-1/4 right-1/5 w-24 h-24 rotate-12 bg-gradient-to-br from-secondary/15 to-transparent border border-secondary/25 blur-sm animate-float" 
           style={{ animationDelay: '5s' }} />

      {/* Small Pulsing Dots */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-primary animate-pulse-glow" 
           style={{ animationDelay: '1s' }} />
      <div className="absolute top-3/4 left-1/3 w-3 h-3 rounded-full bg-secondary animate-pulse-glow" 
           style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 right-1/6 w-2 h-2 rounded-full bg-accent animate-pulse-glow" 
           style={{ animationDelay: '2s' }} />
      
      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-primary/20" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingShapes;