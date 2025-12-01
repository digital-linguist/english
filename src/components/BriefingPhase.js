import React from 'react';
import './BriefingPhase.css';

const BriefingPhase = ({ teamName, onTeamNameChange, onNext }) => {
  return (
    <div className="briefing-phase">
      <div className="phase-header">
        <h2>🕵️‍♂️ Mission Briefing: The Synapse Accord</h2>
        <p className="phase-description">
          Welcome to Synapse Advisors. Your expertise in intelligent systems meets international negotiation.
        </p>
      </div>

      {/* ИНСТРУКЦИЯ ДЛЯ СТУДЕНТОВ */}
      <div className="student-instructions">
        <div className="instructions-card">
          <div className="instructions-header">
            <div className="instructions-icon">📋</div>
            <h3>Instructions</h3>
          </div>
          <div className="instructions-content">
            <div className="instruction-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Read the Mission Briefing</h4>
                <p>Carefully review the information about your client and the negotiation partner.</p>
              </div>
            </div>
            
            <div className="instruction-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Enter Your Team Name</h4>
                <p>Choose a creative name for your negotiation team. This will be displayed throughout the simulation.</p>
              </div>
            </div>
            
            <div className="instruction-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Click "Begin Mission Preparation"</h4>
                <p>After reviewing all information, proceed to the next phase to set your negotiation goals.</p>
              </div>
            </div>
            
            <div className="instruction-tip">
              <strong>💡 Tip:</strong> Pay special attention to cultural differences - they will affect your negotiation strategy!
            </div>
          </div>
        </div>
      </div>

      <div className="mission-grid">
        <div className="mission-card client">
          <div className="card-header">
            <div className="card-icon">📊</div>
            <h3>Your Client: Heritage Interactive</h3>
          </div>
          <div className="card-content">
            <ul>
              <li className="spaced-item"><strong>👥 Type:</strong> National museum consortium</li>
              <li className="spaced-item"><strong>🎯 Objective:</strong> AI virtual curator platform</li>
              <li className="spaced-item"><strong>💰 Budget:</strong> $2-3M, milestone-based</li>
              <li className="spaced-item"><strong>🏛️ Must:</strong> Own cultural narrative rights</li>
              <li className="spaced-item"><strong>📈 Goal:</strong> Digital transformation leader</li>
            </ul>
            <div className="priority">
              <span className="priority-label">Top Priority:</span>
              <span className="priority-value">Cultural Integrity & Data Sovereignty</span>
            </div>
          </div>
        </div>

        <div className="mission-card opponent">
          <div className="card-header">
            <div className="card-icon">🤝</div>
            <h3>Counterpart: NeuraLogic Inc.</h3>
          </div>
          <div className="card-content">
            <ul>
              <li className="spaced-item"><strong>🌍 Culture:</strong> Polychronic (fluid time perception)</li>
              <li className="spaced-item"><strong>💼 Values:</strong> Relationships over schedules</li>
              <li className="spaced-item"><strong>🤲 Decisions:</strong> Consensus-based, collective</li>
              <li className="spaced-item"><strong>💻 Tech:</strong> Cutting-edge AI/ML solutions</li>
              <li className="spaced-item"><strong>🎯 Goal:</strong> Expand into cultural sector</li>
            </ul>
            <div className="cultural-note">
              ⚠️ <strong>Important:</strong> Time is flexible for them. Efficiency ≠ speed. Build relationships first!
            </div>
          </div>
        </div>
      </div>

      <div className="scenario-details">
        <h3>📝 Negotiation Scenario</h3>
        <div className="scenario-content">
          <p className="scenario-text">
            Heritage Interactive needs an intelligent system to contextualize artifacts for global audiences. 
            NeuraLogic has the technology but lacks cultural domain expertise. You must broker a partnership 
            that respects HI's cultural mission while leveraging NeuraLogic's technical capabilities.
          </p>
          <div className="key-challenges">
            <h4>Key Challenges to Consider:</h4>
            <div className="challenges-grid">
              <div className="challenge">
                <div className="challenge-icon">🤝</div>
                <div className="challenge-text">Building trust across different cultural backgrounds</div>
              </div>
              <div className="challenge">
                <div className="challenge-icon">⏰</div>
                <div className="challenge-text">Managing different perceptions of time and deadlines</div>
              </div>
              <div className="challenge">
                <div className="challenge-icon">💬</div>
                <div className="challenge-text">Adapting communication styles for effective dialogue</div>
              </div>
              <div className="challenge">
                <div className="challenge-icon">📊</div>
                <div className="challenge-text">Aligning technical requirements with cultural goals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-setup">
        <div className="setup-instructions">
          <h3>👥 Team Setup</h3>
          <p>Enter your team name below. This will identify your team throughout the simulation and in the final results.</p>
        </div>
        
        <div className="team-input">
          <label htmlFor="teamName">
            <span className="input-icon">🏷️</span>
            Your Team Name:
          </label>
          <input
            id="teamName"
            type="text"
            value={teamName}
            onChange={(e) => onTeamNameChange(e.target.value)}
            placeholder="Enter your team name (e.g., 'Synapse Team Alpha')"
            maxLength={50}
          />
          <div className="input-hint">
            Choose a creative name! Examples: "Global Negotiators", "Cultural Bridge", "Synapse Masters"
          </div>
        </div>
        
        <div className="team-ready">
          <div className="ready-checklist">
            <h4>✅ Readiness Checklist:</h4>
            <div className="checklist-item">
              <span className="checkmark">✓</span>
              <span>Understood client objectives and constraints</span>
            </div>
            <div className="checklist-item">
              <span className="checkmark">✓</span>
              <span>Recognized cultural differences with NeuraLogic</span>
            </div>
            <div className="checklist-item">
              <span className="checkmark">✓</span>
              <span>Ready to adapt negotiation strategies</span>
            </div>
            <div className="checklist-item">
              <span className="checkmark">✓</span>
              <span>Prepared to make strategic decisions</span>
            </div>
          </div>
          
          <div className="start-section">
            <div className="next-phase-info">
              <h4>Next Phase: SMART Objectives</h4>
              <p>In the next phase, you will set specific, measurable goals for the negotiation, adapted to cultural context.</p>
            </div>
            
            <button className="btn btn-start" onClick={onNext}>
              🚀 Begin Mission Preparation
              <span className="btn-subtext">Proceed to Phase 1: Setting SMART Objectives</span>
            </button>
            
            <div className="time-estimate">
              ⏱️ Estimated time for this phase: 5-7 minutes
            </div>
          </div>
        </div>
      </div>

      <div className="quick-tips">
        <h3>💡 Quick Tips for Success</h3>
        <div className="tips-grid">
          <div className="tip">
            <div className="tip-icon">🎯</div>
            <div className="tip-content">
              <h4>Focus on Relationships</h4>
              <p>With polychronic cultures, building trust is more important than strict timelines.</p>
            </div>
          </div>
          <div className="tip">
            <div className="tip-icon">🗣️</div>
            <div className="tip-content">
              <h4>Listen Actively</h4>
              <p>Pay attention to indirect communication and read between the lines.</p>
            </div>
          </div>
          <div className="tip">
            <div className="tip-icon">🤔</div>
            <div className="tip-content">
              <h4>Be Flexible</h4>
              <p>Adapt your strategy based on cultural cues and negotiation dynamics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefingPhase;