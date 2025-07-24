import React from "react";
import './BubbleBackground.css';

const BubbleBackground = () => {
  return (
    <div className="bubble-wrapper">
      {[...Array(60)].map((_, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 6}s`,
            width: `${12 + Math.random() * 24}px`,
            height: `${12 + Math.random() * 24}px`,
            backgroundColor: `rgba(255, 255, 255, 0.08)`,
            boxShadow: `0 0 12px rgba(255, 255, 255, 0.15)`,
          }}
        />
      ))}
    </div>
  );
};

export default BubbleBackground;
