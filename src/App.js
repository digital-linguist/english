import React, { useState, useEffect } from 'react';
import './App.css';
import BriefingPhase from './components/BriefingPhase';
import PreparationPhase from './components/PreparationPhase';
import NegotiationPhase from './components/NegotiationPhase';
import DebriefPhase from './components/DebriefPhase';

function App() {
  const [gamePhase, setGamePhase] = useState('briefing');
  const [teamName, setTeamName] = useState('Synapse Team Alpha');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [negotiationHistory, setNegotiationHistory] = useState([]);
  const [playerChoices, setPlayerChoices] = useState([]);

  const gamePhases = [
    { id: 'briefing', title: 'Mission Briefing', number: 1 },
    { id: 'preparation', title: 'SMART Objectives', number: 2 },
    { id: 'negotiation', title: 'Live Negotiation', number: 3 },
    { id: 'debrief', title: 'Strategic Analysis', number: 4 }
  ];

  useEffect(() => {
    if (gamePhase === 'negotiation' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gamePhase, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const addToHistory = (action, points = 0) => {
    setNegotiationHistory(prev => [...prev, {
      action,
      points,
      timestamp: new Date().toLocaleTimeString(),
      phase: gamePhase
    }]);
    if (points > 0) {
      setScore(prev => prev + points);
    }
  };

  // Автоматический переход к debrief после завершения переговоров
  useEffect(() => {
    if (gamePhase === 'negotiation') {
      const lastHistory = negotiationHistory[negotiationHistory.length - 1];
      if (lastHistory && lastHistory.action === 'Completed all negotiation stages') {
        const timer = setTimeout(() => {
          setGamePhase('debrief');
          setScore(prev => prev + 200);
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [negotiationHistory, gamePhase]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="game-title">
            <h1>🌐 Global Negotiator's Quest</h1>
            <p className="subtitle">Strategies for Professional Foreign Language Discourse</p>
            <p className="team-name">Team: {teamName}</p>
          </div>
          
          <div className="game-stats">
            <div className="stat-box">
              <span className="stat-label">Score</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Time</span>
              <span className="stat-value timer">{formatTime(timeLeft)}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Phase</span>
              <span className="stat-value">
                {gamePhases.find(p => p.id === gamePhase)?.number}/4
              </span>
            </div>
          </div>
        </div>

        <div className="phase-progress">
          {gamePhases.map(phase => (
            <div key={phase.id} className="phase-step">
              <div className={`phase-circle ${gamePhase === phase.id ? 'active' : ''}`}>
                {phase.number}
              </div>
              <span className="phase-label">{phase.title}</span>
              <div className={`phase-line ${gamePhase === phase.id ? 'active' : ''}`} />
            </div>
          ))}
        </div>
      </header>

      <main className="main-content">
        {gamePhase === 'briefing' && (
          <BriefingPhase
            teamName={teamName}
            onTeamNameChange={setTeamName}
            onNext={() => setGamePhase('preparation')}
          />
        )}
        
        {gamePhase === 'preparation' && (
          <PreparationPhase
            onNext={() => setGamePhase('negotiation')}
            onChoice={(choice) => {
              setPlayerChoices(prev => [...prev, choice]);
              addToHistory(`Set SMART goal: ${choice}`, 50);
            }}
          />
        )}
        
        {gamePhase === 'negotiation' && (
          <NegotiationPhase
            onChoice={(choice, points) => {
              setPlayerChoices(prev => [...prev, choice]);
              addToHistory(choice, points);
            }}
            onComplete={() => {
              addToHistory('Completed all negotiation stages', 100);
            }}
          />
        )}
        
        {gamePhase === 'debrief' && (
          <DebriefPhase
            score={score}
            history={negotiationHistory}
            choices={playerChoices}
            teamName={teamName}
            onRestart={() => {
              setGamePhase('briefing');
              setScore(0);
              setTimeLeft(5400);
              setNegotiationHistory([]);
              setPlayerChoices([]);
            }}
          />
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="university-info">
            <p>📚 <strong>Course:</strong> Strategies for Professional Foreign Language Discourse</p>
          </div>
          <div className="technical-info">
            <p>🚀 Deployed on Netlify • 📅 {new Date().toLocaleDateString()}</p>
            <p className="educational-purpose">For Educational Purposes Only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;