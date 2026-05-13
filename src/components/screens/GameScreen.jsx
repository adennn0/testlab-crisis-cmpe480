// Main game screen — renders phase, decisions, feedback modal, and crisis popup

import { useEffect, useState } from 'react';
import { banking } from '../../data/scenarios/banking.js';
import { healthcare } from '../../data/scenarios/healthcare.js';
import { ecommerce } from '../../data/scenarios/ecommerce.js';
import { CRISIS_EVENTS } from '../../data/crisisEvents.js';
import { PHASES } from '../../data/phases.js';
import GameLayout from '../layout/GameLayout.jsx';
import Header from '../layout/Header.jsx';
import PhaseHeader from '../ui/PhaseHeader.jsx';
import DecisionCard from '../ui/DecisionCard.jsx';
import FeedbackModal from './FeedbackModal.jsx';
import CrisisPopup from './CrisisPopup.jsx';

const SCENARIO_MAP = { banking, healthcare, ecommerce };
const SCENARIO_META = {
  banking:    { name: 'Core Banking Meltdown', icon: '🏦' },
  healthcare: { name: 'EHR System Meltdown',   icon: '🏥' },
  ecommerce:  { name: 'Black Friday Collapse',  icon: '🛒' },
};

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

  // Reset crisis trigger flag on phase change
  useEffect(() => {
    setCrisisTriggered(false);
  }, [currentPhase]);

  const handleDecision = (decision) => {
    makeDecision(decision, currentPhase);
  };

  const handleFeedbackClose = () => {
    closeFeedback();
    // Advance phase after regular decision (not crisis)
    if (lastDecision && !lastDecision.isCrisis) {
      advancePhase();
    }
  };

  const handleCrisisResolve = (option) => {
    resolveCrisis(option);
  };

  const handleCrisisFeedbackClose = () => {
    closeFeedback();
    // Don't advance phase after crisis — player continues current phase
  };

  if (!scenario || !phaseData) return null;

  const phaseDecisions = phaseData.decisions || [];
  const phaseDecisionsMade = decisionsLog.filter(
    (d) => d.phaseId === currentPhase + 1 && !d.isCrisis
  );
  const phaseComplete = phaseDecisionsMade.length >= 1;
  const decidingDisabled = phaseComplete || feedbackVisible || crisisActive;

  return (
    <div data-scenario={scenarioId}>
      <Header
        scenarioId={scenarioId}
        scenarioName={meta.name}
        scenarioIcon={meta.icon}
        score={score}
        currentPhase={currentPhase}
        totalPhases={6}
      />

      <GameLayout metrics={metrics} prevMetrics={prevMetrics} decisionsLog={decisionsLog}>
        {/* Phase context */}
        <div className="gs-phase-section">
          <PhaseHeader currentPhase={currentPhase} totalPhases={6} />
        </div>

        {/* Situation briefing */}
        <div className="gs-context-card glass-card">
          <div className="gs-context-label font-mono">SITUATION BRIEFING</div>
          <p className="gs-context-text">{phaseData.context}</p>
        </div>

        {/* Decisions */}
        <div className="gs-decisions-section">
          <div className="gs-decisions-label font-mono">
            SELECT RESPONSE PROTOCOL
            {phaseComplete && (
              <span className="gs-done-badge">✓ DECISION LOGGED</span>
            )}
          </div>
          <div className="gs-decisions-grid">
            {phaseDecisions.map((d, i) => (
              <DecisionCard
                key={d.id}
                decision={d}
                onSelect={handleDecision}
                disabled={decidingDisabled}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Phase complete CTA */}
        {phaseComplete && !feedbackVisible && !crisisActive && (
          <div className="gs-advance-wrap anim-fade-in-up">
            <button id="btn-advance-phase" className="btn btn-primary gs-advance-btn" onClick={advancePhase}>
              {currentPhase >= 5 ? '🏁 Complete Simulation →' : `Proceed to Phase ${currentPhase + 2} →`}
            </button>
          </div>
        )}
      </GameLayout>

      {/* Feedback modal */}
      {feedbackVisible && lastDecision && !lastDecision.isCrisis && (
        <FeedbackModal
          decision={lastDecision}
          onClose={handleFeedbackClose}
          isCrisis={false}
        />
      )}

      {/* Crisis feedback modal */}
      {feedbackVisible && lastDecision?.isCrisis && (
        <FeedbackModal
          decision={lastDecision}
          onClose={handleCrisisFeedbackClose}
          isCrisis
        />
      )}

      {/* Crisis popup */}
      {crisisActive && crisisEvent && !feedbackVisible && (
        <CrisisPopup event={crisisEvent} onResolve={handleCrisisResolve} />
      )}

      <style>{`
        .gs-phase-section { }
        .gs-context-card { padding: 18px 20px; }
        .gs-context-label {
          font-size: 0.6rem; font-weight: 800; color: var(--text-muted);
          letter-spacing: 0.12em; margin-bottom: 10px;
        }
        .gs-context-text { font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.7; }
        .gs-decisions-section { display: flex; flex-direction: column; gap: 12px; }
        .gs-decisions-label {
          font-size: 0.6rem; font-weight: 800; color: var(--text-muted);
          letter-spacing: 0.12em; display: flex; align-items: center; gap: 10px;
        }
        .gs-done-badge {
          background: var(--zone-safe-bg); color: var(--zone-safe-text);
          font-size: 0.6rem; padding: 2px 8px; border-radius: var(--radius-full);
          border: 1px solid rgba(48,209,88,0.25);
        }
        .gs-decisions-grid { display: flex; flex-direction: column; gap: 10px; }
        .gs-advance-wrap { display: flex; justify-content: flex-end; }
        .gs-advance-btn { padding: 14px 28px; font-size: 0.9375rem; }
      `}</style>
    </div>
  );
}
