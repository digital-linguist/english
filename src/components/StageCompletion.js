import React from 'react';
import './StageCompletion.css';

const StageCompletion = ({ stageName, score, onNext, onRestart }) => {
  return (
    <div className="stage-completion">
      <div className="completion-card">
        <div className="completion-icon">✅</div>
        <h2>{stageName} Stage Completed!</h2>
        
        <div className="completion-stats">
          <div className="stat">
            <span className="stat-label">Stage Score</span>
            <span className="stat-value">{score} points</span>
          </div>
          
          <div className="progress-circle">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle 
                cx="60" 
                cy="60" 
                r="54" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.1)" 
                strokeWidth="12"
              />
              <circle 
                cx="60" 
                cy="60" 
                r="54" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="339.292" 
                strokeDashoffset="0"
                transform="rotate(-90 60 60)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00c6ff" />
                  <stop offset="100%" stopColor="#0072ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-text">Ready!</div>
          </div>
        </div>
        
        <div className="completion-message">
          <p>You have successfully completed the {stageName.toLowerCase()} stage.</p>
          <p>Your cultural awareness and negotiation skills are being analyzed...</p>
        </div>
        
        <div className="completion-actions">
          <button className="btn btn-primary" onClick={onNext}>
            Continue to Next Stage →
          </button>
          <button className="btn btn-secondary" onClick={onRestart}>
            ↺ Retry This Stage
          </button>
        </div>
        
        <div className="completion-tip">
          <strong>Tip:</strong> In the next stage, focus on building consensus and summarizing agreements.
        </div>
      </div>
    </div>
  );
};

export default StageCompletion;