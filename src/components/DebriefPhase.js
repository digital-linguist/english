import React, { useEffect, useState } from 'react';
import './DebriefPhase.css';

const DebriefPhase = ({ score, history, choices, teamName, onRestart }) => {
  const [strategyAnalysis, setStrategyAnalysis] = useState(null);
  const [culturalScore, setCulturalScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    analyzePerformance();
    calculateCulturalScore();
  }, [history, choices]);

  const analyzePerformance = () => {
    const strategies = {
      collaborative: 0,
      logical: 0,
      authoritative: 0,
      adaptive: 0
    };

    history.forEach(item => {
      const action = item.action.toLowerCase();
      if (action.includes('collaborat') || action.includes('we') || action.includes('together')) {
        strategies.collaborative++;
      }
      if (action.includes('logic') || action.includes('data') || action.includes('analysis')) {
        strategies.logical++;
      }
      if (action.includes('authority') || action.includes('policy') || action.includes('standard')) {
        strategies.authoritative++;
      }
      if (action.includes('adapt') || action.includes('flexible') || action.includes('adjust')) {
        strategies.adaptive++;
      }
    });

    setStrategyAnalysis(strategies);
  };

  const calculateCulturalScore = () => {
    let culturalPoints = 0;
    choices.forEach(choice => {
      if (choice.includes('Cultural') || choice.includes('flexible') || choice.includes('relationship')) {
        culturalPoints += 20;
      }
    });
    setCulturalScore(Math.min(culturalPoints, 100));
  };

  const getGrade = () => {
    if (score >= 450) return { grade: 'A+', comment: 'Exceptional cultural intelligence' };
    if (score >= 400) return { grade: 'A', comment: 'Excellent negotiation skills' };
    if (score >= 350) return { grade: 'B+', comment: 'Very good performance' };
    if (score >= 300) return { grade: 'B', comment: 'Good strategic approach' };
    if (score >= 250) return { grade: 'C+', comment: 'Adequate with room for growth' };
    if (score >= 200) return { grade: 'C', comment: 'Basic understanding demonstrated' };
    return { grade: 'D', comment: 'Needs more cultural awareness' };
  };

  const getFeedback = () => {
    const grade = getGrade();
    let feedback = '';
    
    if (strategyAnalysis) {
      const maxStrategy = Object.entries(strategyAnalysis).reduce((max, [key, value]) => 
        value > max.value ? { key, value } : max, { key: '', value: 0 });
      
      switch(maxStrategy.key) {
        case 'collaborative':
          feedback = 'Your collaborative approach was excellent for building rapport with polychronic culture.';
          break;
        case 'logical':
          feedback = 'Logical reasoning is strong, but remember to balance with relationship-building.';
          break;
        case 'authoritative':
          feedback = 'Authority references establish credibility, but use sparingly with relationship-focused cultures.';
          break;
        case 'adaptive':
          feedback = 'Adaptability is key in cross-cultural negotiations - well done!';
          break;
        default:
          feedback = 'A balanced approach shows strong negotiation potential.';
      }
    }
    
    return `${grade.comment}. ${feedback}`;
  };

  const exportResults = () => {
    const data = {
      teamName,
      score,
      grade: getGrade().grade,
      culturalScore,
      timestamp: new Date().toISOString(),
      strategies: strategyAnalysis,
      feedback: getFeedback()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `negotiation-results-${teamName.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareResults = () => {
    const text = `🎮 Negotiation Game Results\nTeam: ${teamName}\nScore: ${score}\nGrade: ${getGrade().grade}\nCultural Awareness: ${culturalScore}/100`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Negotiation Game Results',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="debrief-phase">
      <div className="debrief-header">
        <h2>📊 Mission Debrief & Strategic Analysis</h2>
        <p className="debrief-subtitle">
          Comprehensive review of your negotiation performance and cultural intelligence
        </p>
      </div>

      <div className="results-overview">
        <div className="overview-card primary">
          <div className="overview-content">
            <div className="overview-icon">🏆</div>
            <div className="overview-text">
              <h3>Final Score</h3>
              <div className="overview-value">{score}</div>
              <div className="overview-label">Total Points</div>
            </div>
          </div>
          <div className="overview-grade">
            <span className="grade-letter">{getGrade().grade}</span>
            <span className="grade-text">Overall Grade</span>
          </div>
        </div>

        <div className="overview-grid">
          <div className="overview-card">
            <div className="overview-icon">🌍</div>
            <div className="overview-text">
              <h4>Cultural Intelligence</h4>
              <div className="overview-value">{culturalScore}/100</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${culturalScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">💬</div>
            <div className="overview-text">
              <h4>Decisions Made</h4>
              <div className="overview-value">{choices.length}</div>
              <div className="overview-label">Strategic Choices</div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">⚡</div>
            <div className="overview-text">
              <h4>Actions Taken</h4>
              <div className="overview-value">{history.length}</div>
              <div className="overview-label">Negotiation Moves</div>
            </div>
          </div>
        </div>
      </div>

      <div className="strategy-analysis">
        <h3>🎯 Strategy Breakdown</h3>
        {strategyAnalysis && (
          <div className="strategy-grid">
            {Object.entries(strategyAnalysis).map(([strategy, count]) => (
              <div key={strategy} className="strategy-card">
                <div className="strategy-name">
                  {strategy.charAt(0).toUpperCase() + strategy.slice(1)} Approach
                </div>
                <div className="strategy-bar-container">
                  <div 
                    className="strategy-bar" 
                    style={{ 
                      width: `${(count / Math.max(...Object.values(strategyAnalysis))) * 100}%`,
                      backgroundColor: getStrategyColor(strategy)
                    }}
                  />
                </div>
                <div className="strategy-count">{count} instances</div>
                <div className="strategy-tip">
                  {getStrategyTip(strategy)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="key-insights">
        <h3>🎓 Key Learning Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">🤝</div>
            <h4>Relationship Building</h4>
            <p>With polychronic cultures, invest time in personal connections before business.</p>
            <div className="insight-tip">
              <strong>Tip:</strong> Schedule extra time for informal discussions.
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">⏰</div>
            <h4>Time Perception</h4>
            <p>Flexible timelines show respect for relationship-focused negotiation styles.</p>
            <div className="insight-tip">
              <strong>Tip:</strong> Add 30% buffer to all deadlines.
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">💬</div>
            <h4>Communication Style</h4>
            <p>Indirect communication is often preferred. Listen for context and subtext.</p>
            <div className="insight-tip">
              <strong>Tip:</strong> Practice active listening and ask clarifying questions.
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <h4>Goal Alignment</h4>
            <p>Find win-win solutions that honor both technical and cultural objectives.</p>
            <div className="insight-tip">
              <strong>Tip:</strong> Frame concessions as relationship investments.
            </div>
          </div>
        </div>
      </div>

      <div className="detailed-feedback">
        <button 
          className="btn btn-secondary" 
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '▲' : '▼'} View Detailed Feedback
        </button>

        {showDetails && (
          <div className="feedback-details">
            <h4>Performance Analysis</h4>
            <p className="feedback-text">{getFeedback()}</p>
            
            <div className="history-review">
              <h5>Decision History:</h5>
              <div className="history-list">
                {history.slice(-10).map((item, index) => (
                  <div key={index} className="history-item">
                    <span className="history-time">{item.timestamp}</span>
                    <span className="history-action">{item.action.substring(0, 80)}...</span>
                    <span className="history-points">+{item.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="action-buttons">
        <button className="btn btn-success" onClick={onRestart}>
          🔁 Play Simulation Again
        </button>
        
        <button className="btn btn-secondary" onClick={exportResults}>
          📥 Export Results (JSON)
        </button>
        
        <button className="btn" onClick={shareResults}>
          📤 Share Results
        </button>
      </div>

      <div className="course-connections">
        <h3>📚 Connections to Course Topics</h3>
        <div className="connections-grid">
          <div className="connection">
            <h4>Topic 2: Persuader's Toolkit</h4>
            <p>Your use of linguistic strategies demonstrates understanding of soft vs. hard influence.</p>
          </div>
          <div className="connection">
            <h4>Topic 5: SMART Objectives</h4>
            <p>Goal-setting in cross-cultural contexts requires cultural adaptation of metrics.</p>
          </div>
          <div className="connection">
            <h4>Topic 9: Time Perception</h4>
            <p>Managing monochronic expectations with polychronic reality is key to success.</p>
          </div>
          <div className="connection">
            <h4>Topic 7: Virtual Negotiation</h4>
            <p>Technical adaptation while maintaining rapport is essential in digital contexts.</p>
          </div>
        </div>
      </div>

      <div className="final-thought">
        <div className="thought-content">
          <div className="thought-icon">💡</div>
          <div className="thought-text">
            <h4>Key Takeaway for Future Negotiations</h4>
            <p>
              Successful international negotiation is not about changing others' cultural frameworks, 
              but about understanding them and adapting your approach. The most effective negotiators 
              are cultural chameleons who maintain their core objectives while flexibly navigating 
              different communication styles, time perceptions, and relationship expectations.
            </p>
            <p className="thought-quote">
              "In the global arena, cultural intelligence is not just an asset—it's the currency of trust."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getStrategyColor = (strategy) => {
  const colors = {
    collaborative: '#00c6ff',
    logical: '#26d0ce',
    authoritative: '#ff416c',
    adaptive: '#ffb347'
  };
  return colors[strategy] || '#7a7aff';
};

const getStrategyTip = (strategy) => {
  const tips = {
    collaborative: 'Excellent for relationship-building cultures',
    logical: 'Effective when supported by data and examples',
    authoritative: 'Use cautiously with hierarchical cultures',
    adaptive: 'Shows cultural awareness and flexibility'
  };
  return tips[strategy] || 'Balanced approach recommended';
};

export default DebriefPhase;