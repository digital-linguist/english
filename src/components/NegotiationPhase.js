import React, { useState, useEffect } from 'react';
import './NegotiationPhase.css';

const NegotiationPhase = ({ onChoice, onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [negotiationPoints, setNegotiationPoints] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [stageCompleted, setStageCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ text: '', isPositive: true });

  const negotiationStages = [
    {
      title: "Opening Phase",
      scenario: "You are starting a negotiation with a German tech company about a joint AI research project. How do you open the conversation?",
      options: [
        { 
          text: "I propose we begin by aligning our core objectives for this collaboration.", 
          strategy: "Collaborative opening",
          points: 30,
          feedback: "Excellent collaborative approach. This sets a cooperative tone and invites shared goal-setting."
        },
        { 
          text: "Our data shows a 40% efficiency increase with our proposed framework.", 
          strategy: "Data-driven opening",
          points: 25,
          feedback: "Strong factual opening. However, it might come across as slightly assertive for an opening."
        },
        { 
          text: "Let's get straight to business – what are your requirements?", 
          strategy: "Direct opening",
          points: 20,
          feedback: "Too direct for German business culture. They prefer relationship-building before diving into details."
        }
      ],
      culturalTip: "In German business culture, it's important to start with formal greetings and establish clear agenda before diving into details."
    },
    {
      title: "Stating Positions",
      scenario: "The German counterpart states their position: 'We require full access to all research data and a 60% share of intellectual property.' How do you respond?",
      options: [
        { 
          text: "I understand your position. From our perspective, we see value in a more balanced data-sharing model.", 
          strategy: "Acknowledging then reframing",
          points: 35,
          feedback: "Perfect! You acknowledged their position while introducing your perspective without confrontation."
        },
        { 
          text: "That's completely unacceptable. We can't agree to those terms.", 
          strategy: "Direct rejection",
          points: 10,
          feedback: "Too confrontational. This will likely create resistance and damage the negotiation atmosphere."
        },
        { 
          text: "What if we explore a phased approach to data sharing based on project milestones?", 
          strategy: "Creative alternative",
          points: 40,
          feedback: "Excellent problem-solving approach! This shows flexibility while protecting your interests."
        }
      ],
      culturalTip: "German negotiators appreciate logical, structured counter-proposals with clear reasoning."
    },
    {
      title: "Bargaining Phase",
      scenario: "You're discussing financial terms. They say: 'Our maximum budget is €200,000 for the first phase.' Your target is €250,000. How do you proceed?",
      options: [
        { 
          text: "I understand your budget constraints. Could we discuss additional value-added services to bridge the gap?", 
          strategy: "Value-expansion bargaining",
          points: 45,
          feedback: "Brilliant strategy! Instead of direct price confrontation, you're expanding the value discussion."
        },
        { 
          text: "Our standard rate is €250,000. We can't go lower.", 
          strategy: "Fixed position",
          points: 15,
          feedback: "Too rigid. This leaves no room for creative solutions and may end the negotiation prematurely."
        },
        { 
          text: "What would it take for us to meet at €225,000 with extended payment terms?", 
          strategy: "Package deal proposal",
          points: 50,
          feedback: "Perfect use of negotiation language! You're creating a package deal that addresses multiple interests."
        }
      ],
      culturalTip: "In monochronic cultures like Germany, bargaining should be efficient but thorough. Package deals are often more successful than single-issue bargaining."
    },
    {
      title: "Handling Objections",
      scenario: "They object: 'Your timeline seems too aggressive given our compliance requirements.' How do you address this concern?",
      options: [
        { 
          text: "You raise a valid point. Let's analyze which compliance steps could be streamlined.", 
          strategy: "Validating then problem-solving",
          points: 40,
          feedback: "Excellent approach! You validated their concern while directing toward solutions."
        },
        { 
          text: "Our previous projects show we can meet this timeline.", 
          strategy: "Authority-based response",
          points: 25,
          feedback: "Good use of authority, but it doesn't directly address their specific compliance concerns."
        },
        { 
          text: "That seems reasonable, however, we have deadlines from our funding body. Can we prioritize critical compliance steps?", 
          strategy: "Balanced compromise",
          points: 55,
          feedback: "Perfect negotiation language! You acknowledged their point while stating your constraints and proposing prioritization."
        }
      ],
      culturalTip: "When handling objections, German negotiators expect logical, systematic responses with clear next steps."
    },
    {
      title: "Closing Phase",
      scenario: "You've reached agreement on main points. How do you move toward formal closure?",
      options: [
        { 
          text: "Can we agree on the following points and schedule a follow-up to finalize details?", 
          strategy: "Stepwise closure",
          points: 60,
          feedback: "Perfect closing approach! This creates momentum while allowing for final adjustments."
        },
        { 
          text: "Great! Let's sign the agreement now.", 
          strategy: "Immediate closure",
          points: 20,
          feedback: "Too abrupt for German business culture. They prefer systematic documentation before signing."
        },
        { 
          text: "Let's find a middle ground on the remaining minor points to conclude today.", 
          strategy: "Compromise closure",
          points: 50,
          feedback: "Good compromise language, but ensure all details are documented before concluding."
        }
      ],
      culturalTip: "German business culture requires thorough documentation. Closure is a process, not a single event."
    }
  ];

  const handleOptionSelect = (option, index) => {
    if (stageCompleted) return;
    
    setSelectedOption(index);
    setFeedback({
      text: option.feedback,
      isPositive: option.points >= 30
    });
    
    // Add points
    const newPoints = negotiationPoints + option.points;
    setNegotiationPoints(newPoints);
    
    // Record choice
    onChoice(`${negotiationStages[currentStage].title}: ${option.strategy}`, option.points);
    
    // Show feedback
    setShowFeedback(true);
    setStageCompleted(true);
    
    // Move to next stage after delay
    setTimeout(() => {
      if (currentStage < negotiationStages.length - 1) {
        setCurrentStage(prev => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
        setStageCompleted(false);
      } else {
        onComplete();
      }
    }, 3000);
  };

  const currentStageData = negotiationStages[currentStage];

  return (
    <div className="negotiation-phase">
      <div className="negotiation-header">
        <h2>🌐 Live Negotiation Simulation</h2>
        <div className="simulation-stats">
          <div className="stat-card">
            <span className="stat-label">Stage</span>
            <span className="stat-value">{currentStage + 1}/{negotiationStages.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Progress</span>
            <span className="stat-value">
              {stageCompleted ? 'Completed' : 'In Progress'}
            </span>
          </div>
        </div>
      </div>

      <div className="negotiation-content">
        <div className="stage-progress">
          {negotiationStages.map((stage, index) => (
            <div 
              key={index} 
              className={`progress-step ${index === currentStage ? 'active' : ''} ${index < currentStage ? 'completed' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{stage.title}</div>
            </div>
          ))}
        </div>

        <div className="stage-container">
          <div className="scenario-card">
            <h3 className="scenario-title">{currentStageData.title}</h3>
            <div className="scenario-description">
              <p className="scenario-text">{currentStageData.scenario}</p>
              <div className="cultural-tip">
                <strong>📚 Cultural Insight:</strong> {currentStageData.culturalTip}
              </div>
            </div>
          </div>

          <div className="options-section">
            <h4 className="options-title">Select Your Response Strategy:</h4>
            <div className="options-grid">
              {currentStageData.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-card ${selectedOption === index ? 'selected' : ''} ${stageCompleted ? 'disabled' : ''}`}
                  onClick={() => handleOptionSelect(option, index)}
                  disabled={stageCompleted}
                >
                  <div className="option-content">
                    <div className="option-text">{option.text}</div>
                    <div className="option-strategy">
                      <span className="strategy-label">Strategy:</span> {option.strategy}
                    </div>
                    {/* Убрано отображение баллов: <div className="option-points">+{option.points} points</div> */}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {showFeedback && (
            <div className={`feedback-card ${feedback.isPositive ? 'positive' : 'constructive'}`}>
              <div className="feedback-header">
                <h4>🎯 Expert Feedback</h4>
                <span className="points-earned">
                  {/* Убрано отображение набранных баллов в фидбеке */}
                  {feedback.isPositive ? '✓ Effective Choice' : '⚠️ Could Be Improved'}
                </span>
              </div>
              <p className="feedback-text">{feedback.text}</p>
              <div className="strategy-evaluation">
                <p><strong>Strategy Used:</strong> {currentStageData.options[selectedOption]?.strategy}</p>
              </div>
              {currentStage < negotiationStages.length - 1 ? (
                <div className="next-stage-notice">
                  <p>Proceeding to next stage...</p>
                </div>
              ) : (
                <div className="completion-notice">
                  <p>🎉 Negotiation simulation completed! Preparing your performance analysis...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="negotiation-guide">
          <h4>💡 Negotiation Language Guide</h4>
          <div className="guide-content">
            <p><strong>Remember:</strong> Choose responses based on cultural appropriateness, strategic thinking, and language effectiveness, not just intuition.</p>
            <ul className="guide-list">
              <li><strong>Collaborative Language:</strong> Builds rapport and shared ownership</li>
              <li><strong>Problem-Solving Approach:</strong> Focuses on mutual gains and creative solutions</li>
              <li><strong>Cultural Adaptation:</strong> Considers your counterpart's cultural background</li>
              <li><strong>Strategic Flexibility:</strong> Balances firmness with willingness to adapt</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiationPhase;