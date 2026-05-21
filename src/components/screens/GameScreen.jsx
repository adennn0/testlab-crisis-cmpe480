// Main game screen — strict ISO/IEC/IEEE 29119 question engine
import { useEffect, useMemo, useState, useCallback } from 'react';
import GameLayout from '../layout/GameLayout.jsx';
import Header from '../layout/Header.jsx';
import FeedbackModal from './FeedbackModal.jsx';
import ISOBadge from '../ui/ISOBadge.jsx';
import CountdownTimer from '../ui/CountdownTimer.jsx';
import { GlossaryText } from '../ui/GlossaryTooltip.jsx';
import Yebuer, { GOOD_REACTIONS, BAD_REACTIONS, NEUTRAL_REACTIONS, IDLE_QUOTES } from '../ui/Yebuer.jsx';
import { useCountdownTimer } from '../../hooks/useCountdownTimer.js';
import { INCIDENTS, TOTAL_QUESTIONS, QUESTION_BY_ID } from '../../data/iso29119QuestionBank.js';
import { storageService } from '../../state/storageService.js';

const TIMER_45_MESSAGE = "You've got 45 seconds left — think fast!";
const TIMER_20_MESSAGE = 'Hurry! Only 20 seconds left! ⚡';
const TIMER_10_MESSAGE = '10 SECONDS! DECIDE NOW! 🚨';
const TIMER_TIMEOUT_MESSAGE = 'TIMEOUT! Auto-selecting protocol D.';

function formatTimeLabel(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function GameScreen({ state, actions }) {
  const {
    currentQuestion,
    totalQuestions,
    questionSequence,
    metrics,
    prevMetrics,
    feedbackVisible,
    lastDecision,
    startedAt,
    score,
  } = state;

  const {
    answerQuestion,
    closeFeedback,
    nextQuestion,
    exitGame,
  } = actions;

  const questionId = questionSequence?.[currentQuestion];
  const question = questionId ? QUESTION_BY_ID[questionId] : null;
  const incident = useMemo(() => {
    if (!question) return null;
    return INCIDENTS.find(i => i.id === question.incidentId) || null;
  }, [question]);

  const questionNumber = currentQuestion + 1;
  const total = totalQuestions || TOTAL_QUESTIONS;

  // ── Yebuer state ─────────────────────────────────────────────────────────
  const [yebuerMood,    setYebuerMood]    = useState('wink');
  const [yebuerMessage, setYebuerMessage] = useState("Hi! I'm Yebuer 🎉 Let's tackle this crisis together! Pick your response protocol!");
  const [yebuerKey,     setYebuerKey]     = useState(0);

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [nowMs, setNowMs] = useState(Date.now());

  const setYebuer = useCallback((mood, message) => {
    setYebuerMood(mood);
    setYebuerMessage(message);
    setYebuerKey(k => k + 1);
  }, []);

  const decidingDisabled = feedbackVisible || showExitConfirm;

  const optionD = useMemo(() => {
    if (!question) return null;
    return question.options.find(o => o.letter === 'D') || null;
  }, [question]);

  // ── Countdown timer callbacks ─────────────────────────────────────────────
  const handleTick45 = useCallback(() => {
    if (decidingDisabled) return;
    setYebuer('thinking', TIMER_45_MESSAGE);
  }, [decidingDisabled, setYebuer]);

  const handleTick20 = useCallback(() => {
    if (decidingDisabled) return;
    setYebuer('thinking', TIMER_20_MESSAGE);
  }, [decidingDisabled, setYebuer]);

  const handleTick10 = useCallback(() => {
    if (decidingDisabled) return;
    setYebuer('angry', TIMER_10_MESSAGE);
  }, [decidingDisabled, setYebuer]);

  const handleTimerExpire = useCallback(() => {
    if (decidingDisabled || !optionD || !question) return;
    setYebuer('sad', TIMER_TIMEOUT_MESSAGE);
    answerQuestion(question, { ...optionD, timedOut: true }, currentQuestion, 60);
  }, [decidingDisabled, optionD, question, answerQuestion, currentQuestion, setYebuer]);

  const { timeLeft, progress, urgency, isRunning, start, stop, reset } = useCountdownTimer({
    enabled:   !decidingDisabled,
    onTick45:  handleTick45,
    onTick20:  handleTick20,
    onTick10:  handleTick10,
    onExpire:  handleTimerExpire,
  });

  // Start timer when a new question loads
  useEffect(() => {
    if (!feedbackVisible && !showExitConfirm) {
      reset();
      start();
    } else {
      stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, feedbackVisible, showExitConfirm]);

  // ── Yebuer on incident/question change ─────────────────────────────────────
  useEffect(() => {
    if (!question) return;

    const isScenarioStart = currentQuestion === 0;
    if (isScenarioStart && incident?.intro) {
      setYebuer('excited', incident.intro);
      return;
    }

    if (currentQuestion === 0) {
      setYebuer('wink', "Hi! I'm Yebuer 🎉 Let's tackle this crisis together!");
      return;
    }

    setYebuer('thinking', IDLE_QUOTES[currentQuestion % IDLE_QUOTES.length]);
  }, [currentQuestion, question, incident, setYebuer]);

  // Total time ticker
  useEffect(() => {
    if (!startedAt) return;
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, [startedAt]);

  const totalTimeLabel = useMemo(() => {
    const elapsed = startedAt ? nowMs - startedAt : 0;
    return formatTimeLabel(elapsed);
  }, [startedAt, nowMs]);

  const handleDecision = useCallback((opt) => {
    if (!question) return;
    stop();
    const secondsUsed = 60 - (timeLeft ?? 60);
    answerQuestion(question, opt, currentQuestion, secondsUsed);

    const q = opt.quality;
    if (q === 'best' || q === 'good') {
      setYebuer('excited', GOOD_REACTIONS[currentQuestion % GOOD_REACTIONS.length]);
    } else if (q === 'worst') {
      setYebuer('sad', BAD_REACTIONS[currentQuestion % BAD_REACTIONS.length]);
    } else {
      setYebuer('thinking', NEUTRAL_REACTIONS[currentQuestion % NEUTRAL_REACTIONS.length]);
    }
  }, [answerQuestion, currentQuestion, question, stop, setYebuer, timeLeft]);

  const handleFeedbackClose = () => {
    closeFeedback();
    nextQuestion();
  };

  const handleExitConfirm = () => {
    storageService.clear();
    exitGame();
  };

  if (!question) return null;

  return (
    <div className="game-screen-wrap">
      <Header
        incidentName={incident?.name}
        questionNumber={questionNumber}
        totalQuestions={total}
        totalTimeLabel={totalTimeLabel}
        score={score}
        onExit={() => setShowExitConfirm(true)}
      />
      <GameLayout metrics={metrics} prevMetrics={prevMetrics}>

        {/* ISO reference */}
        <div className="gs-meta-row">
          <ISOBadge isoRef={question.isoRef} />
        </div>

        {/* ISO term definition */}
        <div className="gs-definition glass-panel">
          <div className="gs-definition-badge">ISO TERM DEFINITION</div>
          <p className="gs-definition-text">
            <GlossaryText text={question.definition} />
          </p>
        </div>

        {/* Situation briefing */}
        <div className="gs-context glass-panel">
          <div className="gs-context-top">
            <div className="gs-context-badge">
              📡 SITUATION BRIEFING — QUESTION {questionNumber}/{total}
            </div>
            {/* Countdown timer — only shown while decision is pending */}
            {!feedbackVisible && !showExitConfirm && (
              <div className="gs-timer-wrap">
                <CountdownTimer
                  timeLeft={timeLeft}
                  progress={progress}
                  urgency={urgency}
                  isRunning={isRunning}
                />
                <div className="gs-timer-label" style={{
                  color: urgency === 'critical' ? '#ff2d55' : urgency === 'warning' ? '#ff9f0a' : '#5a7090'
                }}>
                  {urgency === 'critical' ? 'HURRY!' : urgency === 'warning' ? 'TICK TOCK' : 'SEC LEFT'}
                </div>
              </div>
            )}
          </div>
          <p className="gs-context-text">
            <GlossaryText text={question.situation} />
          </p>
        </div>

        {/* 2×2 Decision Grid */}
        <div className="gs-decisions-section">
          <div className="gs-decisions-label">
            SELECT RESPONSE PROTOCOL
          </div>
          <div className="gs-decisions-grid-2x2">
            {question.options.map((opt, idx) => {
              return (
                <button
                  key={opt.letter}
                  id={`decision-${opt.letter}`}
                  className={`gs-decision-tile glass-card ${decidingDisabled ? 'disabled' : ''}`}
                  onClick={() => !decidingDisabled && handleDecision(opt)}
                  disabled={decidingDisabled}
                >
                  <div className="tile-letter">{opt.letter}</div>
                  <div className="tile-content">
                    <h4 className="tile-label">{opt.label}</h4>
                    <p className="tile-desc">{opt.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </GameLayout>

      {/* Yebuer Mascot */}
      <Yebuer
        key={yebuerKey}
        mood={yebuerMood}
        message={yebuerMessage}
        visible={!feedbackVisible}
        questionIndex={currentQuestion}
      />

      {/* Feedback modal */}
      {feedbackVisible && lastDecision && (
        <FeedbackModal decision={lastDecision} onClose={handleFeedbackClose} />
      )}

      {/* Exit confirmation */}
      {showExitConfirm && (
        <div className="exit-backdrop" role="dialog" aria-modal="true" onClick={() => setShowExitConfirm(false)}>
          <div className="exit-panel" onClick={(e) => e.stopPropagation()}>
            <div className="exit-title">🚪 Exit Game</div>
            <div className="exit-body">Are you sure? Your progress will be lost.</div>
            <div className="exit-actions">
              <button className="exit-btn exit-cancel" onClick={() => setShowExitConfirm(false)}>No</button>
              <button className="exit-btn exit-confirm" onClick={handleExitConfirm}>Yes</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .game-screen-wrap { position: relative; min-height: 100vh; background: var(--bg-void); }

        /* Meta row */
        .gs-meta-row {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
          flex-wrap: wrap;
        }
        .gs-meta-row > :first-child { flex: 1; min-width: 0; }

        .gs-definition {
          padding: 18px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .gs-definition-badge {
          font-size: 0.6rem;
          font-weight: 900;
          color: var(--text-muted);
          letter-spacing: 0.15em;
        }
        .gs-definition-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        /* Situation briefing */
        .gs-context {
          padding: 20px 24px; display: flex; flex-direction: column; gap: 14px;
        }
        .gs-context-top {
          display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
        }
        .gs-context-badge {
          font-size: 0.6rem; font-weight: 900; color: var(--accent-primary); letter-spacing: 0.15em;
        }
        .gs-timer-wrap {
          display: flex; flex-direction: column; align-items: center; gap: 2px; flex-shrink: 0;
        }
        .gs-timer-label {
          font-size: 0.5rem; font-weight: 900; letter-spacing: 0.1em; transition: color 0.3s;
        }
        .gs-context-text {
          font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7;
        }

        /* Decision grid */
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

        .gs-decisions-grid-2x2 {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
        }

        .gs-decision-tile {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 20px; cursor: pointer; transition: all 0.25s;
          border: 1px solid var(--glass-border); text-align: left;
          background: rgba(255,255,255,0.02); position: relative;
        }
        .gs-decision-tile:hover:not(.disabled) {
          border-color: var(--accent-primary);
          background: rgba(61,127,255,0.06);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .gs-decision-tile.disabled { opacity: 0.45; cursor: not-allowed; }

        .tile-letter {
          width: 36px; height: 36px; min-width: 36px;
          background: var(--bg-surface); border: 1px solid var(--glass-border);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; font-weight: 900; color: var(--accent-primary);
          flex-shrink: 0;
        }
        .gs-decision-tile:hover:not(.disabled) .tile-letter {
          background: var(--accent-primary); color: white;
        }
        .tile-content { flex: 1; min-width: 0; }
        .tile-label { font-size: 0.85rem; font-weight: 800; color: white; margin-bottom: 6px; }
        .tile-desc  { font-size: 0.72rem; color: var(--text-muted); line-height: 1.5; }


        /* Exit modal */
        .exit-backdrop {
          position: fixed;
          inset: 0;
          background: var(--bg-overlay);
          z-index: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          backdrop-filter: blur(6px);
        }
        .exit-panel {
          width: 100%;
          max-width: 420px;
          background: var(--bg-card);
          border: 1px solid var(--border-dim);
          border-radius: var(--radius-xl);
          padding: 22px;
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .exit-title {
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: 0.02em;
          font-size: 1.05rem;
        }
        .exit-body {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .exit-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .exit-btn {
          border-radius: 999px;
          padding: 10px 14px;
          font-weight: 900;
          font-size: 0.8rem;
          cursor: pointer;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.03);
          color: white;
        }
        .exit-btn:hover { background: rgba(255,255,255,0.08); }
        .exit-confirm {
          background: var(--accent-primary);
          border-color: rgba(61,127,255,0.45);
        }
        .exit-confirm:hover { filter: brightness(1.06); }

        /* Responsive */
        @media (max-width: 700px) {
          .gs-decisions-grid-2x2 { grid-template-columns: 1fr; }
          .gs-meta-row { flex-direction: column; }
        }

        .anim-fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
