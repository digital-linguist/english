import React, { useState } from 'react';
import './PreparationPhase.css';

const PreparationPhase = ({ onNext, onChoice }) => {
  const [smartGoals, setSmartGoals] = useState({
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: ''
  });

  const smartCriteria = [
    {
      key: 'specific',
      letter: 'S',
      label: 'Specific',
      description: 'Clear, unambiguous goal',
      example: 'Secure partnership with 60/40 IP rights favoring Heritage Interactive',
      color: '#ff416c'
    },
    {
      key: 'measurable',
      letter: 'M',
      label: 'Measurable',
      description: 'Quantifiable success metrics',
      example: 'Achieve 3-year contract with minimum $2M budget allocation',
      color: '#00c6ff'
    },
    {
      key: 'achievable',
      letter: 'A',
      label: 'Achievable',
      description: 'Realistic and attainable',
      example: 'Obtain 4 out of 5 key technical requirements from NeuraLogic',
      color: '#26d0ce'
    },
    {
      key: 'relevant',
      letter: 'R',
      label: 'Relevant',
      description: 'Aligned with strategic objectives',
      example: 'Ensure solution aligns with HI\'s digital transformation roadmap',
      color: '#ffb347'
    },
    {
      key: 'timeBound',
      letter: 'T',
      label: 'Time-Bound',
      description: 'Clear timeframe with cultural adjustment',
      example: 'Sign MoU within 6 months (allowing for relationship-building time)',
      color: '#7a7aff'
    }
  ];

  const [culturalAdjustment, setCulturalAdjustment] = useState('flexible');

  const handleGoalChange = (key, value) => {
    setSmartGoals(prev => ({
      ...prev,
      [key]: value
    }));
    onChoice(`SMART: ${key} - ${value.substring(0, 50)}...`);
  };

  const handleCulturalChange = (value) => {
    setCulturalAdjustment(value);
    onChoice(`Cultural adjustment: ${value}`);
  };

  const allFilled = Object.values(smartGoals).every(v => v.trim().length > 20);

  const handleSubmit = () => {
    if (allFilled) {
      onNext();
    }
  };

  return (
    <div className="preparation-phase">
      <div className="phase-header">
        <h2>🎯 Phase 1: Define SMART Objectives</h2>
        <p className="phase-description">
          Set clear, culturally-aware goals for your negotiation strategy. 
          Remember: NeuraLogic operates on polychronic time.
        </p>
      </div>

      <div className="cultural-context">
        <div className="context-box">
          <h3>🌍 Cultural Context: Polychronic Time</h3>
          <p>
            In polychronic cultures, time is fluid. Multiple activities can occur simultaneously, 
            and relationships take precedence over strict schedules. Your timeline must accommodate:
          </p>
          <ul>
            <li>Relationship-building before business discussions</li>
            <li>Flexible meeting schedules and extended deadlines</li>
            <li>Consensus-based decision making (slower but more thorough)</li>
          </ul>
        </div>
      </div>

      <div className="smart-container">
        {smartCriteria.map((criteria) => (
          <div key={criteria.key} className="smart-card" style={{ borderTopColor: criteria.color }}>
            <div className="smart-header">
              <div className="smart-letter" style={{ backgroundColor: criteria.color }}>
                {criteria.letter}
              </div>
              <div className="smart-title">
                <h3>{criteria.label}</h3>
                <p className="smart-description">{criteria.description}</p>
              </div>
            </div>
            
            <div className="smart-example">
              <span className="example-label">Example:</span>
              <span className="example-text">{criteria.example}</span>
            </div>
            
            <div className="smart-input">
              <label htmlFor={criteria.key}>
                Your {criteria.label} goal:
              </label>
              <textarea
                id={criteria.key}
                value={smartGoals[criteria.key]}
                onChange={(e) => handleGoalChange(criteria.key, e.target.value)}
                placeholder={`Define your ${criteria.label.toLowerCase()} goal...`}
                rows="3"
                maxLength={300}
              />
              <div className="character-count">
                {smartGoals[criteria.key].length}/300 characters
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cultural-adjustment">
        <h3>⏰ Cultural Time Adjustment</h3>
        <p>How will you adjust your timeline for polychronic culture?</p>
        
        <div className="adjustment-options">
          {[
            { id: 'flexible', label: 'Flexible Timeline', desc: 'Add 30-50% buffer time for all milestones' },
            { id: 'phased', label: 'Phased Approach', desc: 'Relationship phase → Technical phase → Legal phase' },
            { id: 'milestone', label: 'Cultural Milestones', desc: 'Tie deadlines to relationship achievements' },
            { id: 'hybrid', label: 'Hybrid Model', desc: 'Fixed internal dates, flexible external communications' }
          ].map(option => (
            <div 
              key={option.id}
              className={`adjustment-option ${culturalAdjustment === option.id ? 'selected' : ''}`}
              onClick={() => handleCulturalChange(option.id)}
            >
              <div className="option-radio">
                <div className="radio-circle">
                  {culturalAdjustment === option.id && <div className="radio-dot" />}
                </div>
              </div>
              <div className="option-content">
                <h4>{option.label}</h4>
                <p>{option.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="goal-summary">
        <h3>📋 Your Negotiation Strategy Summary</h3>
        <div className="summary-content">
          {Object.entries(smartGoals).map(([key, value]) => (
            value && (
              <div key={key} className="summary-item">
                <span className="summary-key">
                  {smartCriteria.find(c => c.key === key)?.label}:
                </span>
                <span className="summary-value">{value}</span>
              </div>
            )
          ))}
          <div className="summary-item">
            <span className="summary-key">Cultural Adjustment:</span>
            <span className="summary-value">
              {culturalAdjustment === 'flexible' && 'Flexible Timeline with buffers'}
              {culturalAdjustment === 'phased' && 'Phased Relationship-First Approach'}
              {culturalAdjustment === 'milestone' && 'Cultural Milestone-Based Deadlines'}
              {culturalAdjustment === 'hybrid' && 'Hybrid Fixed/Flexible Model'}
            </span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className={`btn btn-success ${!allFilled ? 'btn-disabled' : ''}`}
          onClick={handleSubmit}
          disabled={!allFilled}
        >
          ✅ Complete Preparation & Begin Negotiation
          <span className="btn-subtext">
            {allFilled ? 'Ready to proceed!' : 'Complete all SMART goals to continue'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PreparationPhase;