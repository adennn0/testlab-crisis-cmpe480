// Main game screen — 2x2 decision grid, Yebuer mascot, metrics on top
import { useEffect, useState, useCallback } from 'react';
import { banking } from '../../data/scenarios/banking.js';
import { healthcare } from '../../data/scenarios/healthcare.js';
import { ecommerce } from '../../data/scenarios/ecommerce.js';
import { CRISIS_EVENTS } from '../../data/crisisEvents.js';
import { PHASES } from '../../data/phases.js';
import GameLayout from '../layout/GameLayout.jsx';
import Header from '../layout/Header.jsx';
import PhaseHeader from '../ui/PhaseHeader.jsx';
import FeedbackModal from './FeedbackModal.jsx';
import CrisisPopup from './CrisisPopup.jsx';
import Yebuer, { GOOD_REACTIONS, BAD_REACTIONS, NEUTRAL_REACTIONS, IDLE_QUOTES } from '../ui/Yebuer.jsx';

const SCENARIO_MAP = { banking, healthcare, ecommerce };
const SCENARIO_META = {
  banking:    { name: 'Core Banking Meltdown', icon: '🏦' },
  healthcare: { name: 'EHR System Meltdown',   icon: '🏥' },
  ecommerce:  { name: 'Black Friday Collapse',  icon: '🛒' },
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function GameScreen({ state, actions }) {
  const {
    scenarioId, currentPhase, metrics, prevMetrics,
    decisionsLog, score, feedbackVisible, lastDecision,
    crisisActive, crisisEventId, crisisResolved,
  } = state;

  const {
    makeDecision, closeFeedback, triggerCrisis,
    resolveCrisis, advancePhase,
  } = actions;

  const scenario = SCENARIO_MAP[scenarioId];
  const meta = SCENARIO_META[scenarioId] || {};
  const phaseData = scenario?.phases[currentPhase];
  const phaseInfo = PHASES[currentPhase];

  // Yebuer state
  const [yebuerMood, setYebuerMood] = useState('wink');
  const [yebuerMessage, setYebuerMessage] = useState("Hi there! I'm Yebuer! 🎉 Let's tackle this crisis together. Pick your best response!");
  const [yebuerKey, setYebuerKey] = useState(0);

  // Crisis event lookup
  const crisisEvent = crisisActive && crisisEventId
    ? (CRISIS_EVENTS[scenarioId] || []).find((e) => e.id === crisisEventId)
    : null;

  // Auto-trigger crisis events
  const [crisisTriggered, setCrisisTriggered] = useState(false);
  useEffect(() => {
    if (!phaseInfo?.hasCrisisEvent || crisisActive || crisisTriggered || !scenarioId) return;
    const events = CRISIS_EVENTS[scenarioId] || [];
    const event = events.find(
      (e) => e.triggerPhase === currentPhase + 1 && !crisisResolved.includes(e.id)
    );
    if (event && decisionsLog.filter((d) => d.phaseId === currentPhase + 1 && !d.isCrisis).length >= 1) {
      setCrisisTriggered(true);
      triggerCrisis(event.id);
    }
  }, [decisionsLog, phaseInfo, crisisActive, crisisTriggered, scenarioId, currentPhase, crisisResolved, triggerCrisis]);

  useEffect(() => {
    setCrisisTriggered(false);
  }, [currentPhase]);

  // Update Yebuer on phase change
  useEffect(() => {
    if (currentPhase === 0) {
      setYebuerMood('wink');
      setYebuerMessage("Hi! I'm Yebuer! 🎉 Let's tackle this crisis together!");
    } else {
      setYebuerMood('thinking');
      setYebuerMessage(pickRandom(IDLE_QUOTES));
    }
    setYebuerKey(prev => prev + 1);
  }, [currentPhase]);

  const handleDecision = useCallback((decision) => {
    makeDecision(decision, currentPhase);
    
    // Yebuer reacts based on decision quality
    const quality = decision.quality;
    if (quality === 'best' || quality === 'good') {
      setYebuerMood('excited');
      setYebuerMessage(pickRandom(GOOD_REACTIONS));
    } else if (quality === 'bad') {
      setYebuerMood('sad');
      setYebuerMessage(pickRandom(BAD_REACTIONS));
    } else {
      setYebuerMood('thinking');
      setYebuerMessage(pickRandom(NEUTRAL_REACTIONS));
    }
    setYebuerKey(prev => prev + 1);
  }, [makeDecision, currentPhase]);

  const handleFeedbackClose = () => {
    closeFeedback();
    if (lastDecision && !lastDecision.isCrisis) {
      advancePhase();
    }
  };

  const handleCrisisResolve = (option) => {
    resolveCrisis(option);
  };

  const handleCrisisFeedbackClose = () => {
    closeFeedback();
  };

  if (!scenario || !phaseData) return null;

  const phaseDecisions = phaseData.decisions || [];
  // Ensure we always have exactly 4 decisions for a 2x2 grid
  const gridDecisions = phaseDecisions.slice(0, 4);
  
  const phaseDecisionsMade = decisionsLog.filter(
    (d) => d.phaseId === currentPhase + 1 && !d.isCrisis
  );
  const phaseComplete = phaseDecisionsMade.length >= 1;
  const decidingDisabled = phaseComplete || feedbackVisible || crisisActive;

  return (
    <div className="game-screen-wrap" data-scenario={scenarioId}>
      <Header
        scenarioId={scenarioId}
        scenarioName={meta.name}
        scenarioIcon={meta.icon}
        score={score}
        currentPhase={currentPhase}
        totalPhases={scenario.phases.length}
      />
      <GameLayout metrics={metrics} prevMetrics={prevMetrics}>
        {/* Phase context */}
        <PhaseHeader 
          currentPhase={currentPhase} 
          totalPhases={scenario.phases.length} 
          scenarioName={meta.name}
        />

        {/* Situation briefing */}
        <div className="gs-context glass-panel">
          <div className="gs-context-badge">📡 SITUATION BRIEFING — QUESTION {currentPhase + 1}/{scenario.phases.length}</div>
          <p className="gs-context-text">{phaseData.context}</p>
        </div>

        {/* 2x2 Decision Grid */}
        <div className="gs-decisions-section">
          <div className="gs-decisions-label">
            SELECT RESPONSE PROTOCOL
            {phaseComplete && (
              <span className="gs-done-badge">✓ LOGGED</span>
            )}
          </div>
          <div className="gs-decisions-grid-2x2">
            {gridDecisions.map((d, i) => (
              <button 
                key={d.id}
                className={`gs-decision-tile glass-card ${decidingDisabled ? 'disabled' : ''}`}
                onClick={() => !decidingDisabled && handleDecision(d)}
                disabled={decidingDisabled}
              >
                <div className="tile-letter">{String.fromCharCode(65 + i)}</div>
                <div className="tile-content">
                  <h4 className="tile-label">{d.label}</h4>
                  <p className="tile-desc">{d.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Advance Button */}
        {phaseComplete && !feedbackVisible && !crisisActive && (
          <div className="gs-advance-wrap anim-fade-in">
            <button className="gs-advance-btn" onClick={advancePhase}>
              {currentPhase >= scenario.phases.length - 1 ? '🏁 COMPLETE SIMULATION' : `PROCEED TO QUESTION ${currentPhase + 2} →`}
            </button>
          </div>
        )}
      </GameLayout>

      {/* Yebuer Mascot */}
      <Yebuer
        key={yebuerKey}
        mood={yebuerMood}
        message={yebuerMessage}
        visible={!feedbackVisible}
        questionIndex={currentPhase}
      />

      {/* Feedback modal */}
      {feedbackVisible && lastDecision && !lastDecision.isCrisis && (
        <FeedbackModal decision={lastDecision} onClose={handleFeedbackClose} isCrisis={false} />
      )}
      {feedbackVisible && lastDecision?.isCrisis && (
        <FeedbackModal decision={lastDecision} onClose={handleCrisisFeedbackClose} isCrisis />
      )}

      {/* Crisis popup */}
      {crisisActive && crisisEvent && !feedbackVisible && (
        <CrisisPopup event={crisisEvent} onResolve={handleCrisisResolve} />
      )}

      <style>{`
        .game-screen-wrap { position: relative; min-height: 100vh; background: var(--bg-void); }

        .gs-context {
          padding: 20px 24px; display: flex; flex-direction: column; gap: 10px;
        }
        .gs-context-badge {
          font-size: 0.6rem; font-weight: 900; color: var(--accent-primary);
          letter-spacing: 0.15em;
        }
        .gs-context-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; }

        .gs-decisions-section { display: flex; flex-direction: column; gap: 14px; }
        .gs-decisions-label {
          font-size: 0.6rem; font-weight: 900; color: var(--text-muted);
          letter-spacing: 0.15em; display: flex; align-items: center; gap: 10px;
        }
        .gs-done-badge {
          background: var(--zone-safe-bg); color: var(--zone-safe-text);
          font-size: 0.55rem; padding: 2px 8px; border-radius: 99px;
          border: 1px solid rgba(48,209,88,0.25);
        }

        /* 2x2 Grid */
        .gs-decisions-grid-2x2 {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .gs-decision-tile {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 20px; cursor: pointer; transition: all 0.25s;
          border: 1px solid var(--glass-border); text-align: left;
          background: rgba(255,255,255,0.02);
        }
        .gs-decision-tile:hover:not(.disabled) {
          border-color: var(--accent-primary);
          background: rgba(61, 127, 255, 0.06);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .gs-decision-tile.disabled { opacity: 0.4; cursor: not-allowed; }

        .tile-letter {
          width: 36px; height: 36px; min-width: 36px;
          background: var(--bg-surface); border: 1px solid var(--glass-border);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; font-weight: 900; color: var(--accent-primary);
        }
        .gs-decision-tile:hover:not(.disabled) .tile-letter {
          background: var(--accent-primary); color: white;
        }

        .tile-content { flex: 1; }
        .tile-label { font-size: 0.85rem; font-weight: 800; color: white; margin-bottom: 6px; }
        .tile-desc { font-size: 0.72rem; color: var(--text-muted); line-height: 1.5; }

        .gs-advance-wrap { display: flex; justify-content: center; }
        .gs-advance-btn {
          padding: 16px 40px; background: var(--accent-primary);
          border: none; border-radius: var(--radius-md);
          color: white; font-size: 0.9rem; font-weight: 900; letter-spacing: 0.08em;
          cursor: pointer; transition: all 0.2s;
          box-shadow: var(--shadow-neon);
        }
        .gs-advance-btn:hover { transform: translateY(-3px); box-shadow: var(--shadow-glow); }

        @media (max-width: 700px) {
          .gs-decisions-grid-2x2 { grid-template-columns: 1fr; }
        }

        .anim-fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
