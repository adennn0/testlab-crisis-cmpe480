import { useState, useEffect } from 'react';
import Yebuer from '../ui/Yebuer.jsx';
import { storageService } from '../../state/storageService.js';
import HowToPlayScreen from './HowToPlayScreen.jsx';

const INTRO_STEPS = [
  { mood: 'excited', message: "Hey there! 👋 I'm YEBUER, your crisis companion! Welcome to TestLab Crisis!" },
  { mood: 'wink', message: "I'll be with you every step of the way. Think of me as your cute, slightly anxious advisor 😅" },
  { mood: 'thinking', message: "Here's the deal: you're a Lead Test Manager. A system just crashed. Your decisions matter!" },
  { mood: 'happy', message: "Pick a scenario and face 30 ISO questions. Every decision changes your metrics in real-time! 📊" },
  { mood: 'excited', message: "Pick wisely and I'll cheer for you! Pick badly and... well... I might cry a little 😢" },
  { mood: 'wink', message: "Ready to learn ISO/IEC/IEEE 29119 under pressure? Let's GO! 🚀" },
];

function formatTime(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function IntroScreen({ onSelectScenario, onResume, hasSave }) {
  const [introStep, setIntroStep] = useState(0);
  const [showYebuer, setShowYebuer] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [scenarioResults, setScenarioResults] = useState({});
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  useEffect(() => {
    setScenarioResults(storageService.loadScenarioResults());
  }, []);

  useEffect(() => {
    if (introStep < INTRO_STEPS.length - 1) {
      const timer = setTimeout(() => setIntroStep(prev => prev + 1), 4000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIntroComplete(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [introStep]);

  const currentStep = INTRO_STEPS[introStep];

  const steps = [
    { icon: '🎯', title: 'SCENARIOS', desc: 'Choose 1 scenario: Banking, E-Commerce, or Healthcare.' },
    { icon: '📊', title: 'SYSTEM METRICS', desc: 'Monitor 7 live KPIs. Every decision shifts the balance.' },
    { icon: '⏱️', title: 'COUNTDOWN', desc: 'You have 60 seconds per question — choose a response protocol.' },
    { icon: '🏆', title: 'FINAL SCORE', desc: 'Score is cumulative and can go negative — finish strong.' },
  ];

  const scenarios = [
    {
      id: 'incident-1',
      title: 'Core Banking Meltdown',
      subtitle: 'ISO/IEC/IEEE 29119-1 — General Concepts',
      icon: '🏦',
      difficulty: 'EASY',
      accentClass: 'scenario-banking',
      desc: '30 questions focused on foundational testing concepts and definitions.',
    },
    {
      id: 'incident-2',
      title: 'E-Commerce Black Friday Crash',
      subtitle: 'ISO/IEC/IEEE 29119 — Process & Documentation',
      icon: '🛒',
      difficulty: 'MEDIUM',
      accentClass: 'scenario-ecommerce',
      desc: '30 questions on planning, strategy, processes, documentation, and metrics.',
    },
    {
      id: 'incident-3',
      title: 'Healthcare System Security Breach',
      subtitle: 'ISO/IEC/IEEE 29119-4 — Techniques & Execution',
      icon: '🏥',
      difficulty: 'HARD',
      accentClass: 'scenario-healthcare',
      desc: '30 questions on test techniques, security, and execution under pressure.',
    },
  ];

  const formatScenarioLast = (r) => {
    if (!r) return null;
    return {
      score: r.score ?? 0,
      correct: r.correctCount ?? 0,
      total: r.answeredCount ?? 0,
      time: formatTime(r.totalTimeMs || 0),
    };
  };

  return (
    <div className="intro-screen">
      <div className="intro-bg-overlay" />
      <div className="intro-vignette" />

      <div className="intro-content anim-fade-in">
        <header className="intro-header">
          <div className="intro-badge">VERSION 2.0 — SIMULATION ACTIVE</div>
          <h1 className="intro-logo font-display">
            TESTLAB<span className="text-glow"> CRISIS</span>
          </h1>
          <p className="intro-subtext">ISO/IEC/IEEE 29119 COMPLIANT SIMULATOR</p>
        </header>

        <div className="intro-main-grid">
          <div className="intro-actions-panel glass-panel">
            <h2 className="panel-title"><span className="title-icon">▶</span> OPERATION CENTER</h2>

            <div className="intro-menu-buttons">
              <button className="btn-game-secondary" onClick={() => setShowHowToPlay(true)}>
                <span className="btn-icon">📖</span>
                <span className="btn-text">HOW TO PLAY</span>
              </button>
              {hasSave && (
                <button id="btn-resume" className="btn-game-secondary" onClick={onResume}>
                  <span className="btn-icon">↩</span>
                  <span className="btn-text">RESUME SAVED SESSION</span>
                </button>
              )}
            </div>

            <div className="scenario-grid">
              {scenarios.map((s, i) => {
                const last = formatScenarioLast(scenarioResults?.[s.id]);
                return (
                  <div
                    key={s.id}
                    className={`scenario-card glass-card anim-slide-in ${s.accentClass}`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                    onClick={() => onSelectScenario?.(s.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="scenario-top">
                      <div className="scenario-icon-wrap"><span className="scenario-icon">{s.icon}</span></div>
                      {last ? (
                        <div className="scenario-last">
                          <div className="scenario-last-title last-session-label">LAST RUN</div>
                          <div className="scenario-last-row font-mono">Score: {last.score}</div>
                          <div className="scenario-last-row font-mono">Correct: {last.correct}/{last.total}</div>
                          <div className="scenario-last-row font-mono">Time: {last.time}</div>
                        </div>
                      ) : (
                        <div className="scenario-last scenario-last-empty">
                          <div className="scenario-last-title last-session-label">LAST RUN</div>
                          <div className="scenario-last-row">—</div>
                        </div>
                      )}
                    </div>

                    <div className="scenario-body">
                      <div className="scenario-title-row">
                        <h2 className="scenario-title">{s.title}</h2>
                        <span className={`difficulty-badge difficulty-${s.difficulty.toLowerCase()}`}>{s.difficulty}</span>
                      </div>
                      <div className="scenario-subtitle">{s.subtitle}</div>
                      <p className="scenario-desc">{s.desc}</p>
                    </div>
                    <div className="scenario-footer">
                      <button className="btn-scenario">START SCENARIO</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="intro-stats">
              <div className="stat-item"><span className="stat-num">30</span><span className="stat-label">QUESTIONS</span></div>
              <div className="stat-item"><span className="stat-num">3</span><span className="stat-label">SCENARIOS</span></div>
              <div className="stat-item"><span className="stat-num">7</span><span className="stat-label">METRICS</span></div>
            </div>
          </div>

          <div className="intro-tutorial-panel">
            <h2 className="panel-title"><span className="title-icon">📋</span> SIMULATION GUIDELINES</h2>
            <div className="tutorial-steps">
              {steps.map((step, i) => (
                <div key={i} className="tutorial-card glass-card anim-slide-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="card-icon-wrap">
                    <span className="card-icon">{step.icon}</span>
                  </div>
                  <div className="card-info">
                    <h3 className="card-title">{step.title}</h3>
                    <p className="card-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="intro-footer glass-panel">
          <div className="footer-item">
            <span className="footer-label">ENGINE:</span>
            <span className="footer-value">REACT_VITE_V6</span>
          </div>
          <div className="footer-item">
            <span className="footer-label">COMPANION:</span>
            <span className="footer-value yebuer-label">YEBUER_ACTIVE</span>
          </div>
          <div className="footer-item">
            <span className="footer-label">STATUS:</span>
            <span className="footer-value status-online">SYSTEM_ONLINE</span>
          </div>
        </footer>
      </div>

      {/* Yebuer Onboarding */}
      <Yebuer
        key={introStep}
        mood={currentStep.mood}
        message={currentStep.message}
        visible={showYebuer}
        questionIndex={introStep}
      />

      {showHowToPlay && (
        <HowToPlayScreen onClose={() => setShowHowToPlay(false)} />
      )}

      <style>{`
        .intro-screen {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background-color: var(--bg-void); color: var(--text-primary);
          padding: 40px; position: relative; overflow: hidden;
        }
        .intro-bg-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(61, 127, 255, 0.05) 0%, transparent 70%);
        }
        .intro-vignette {
          position: absolute; inset: 0;
          box-shadow: inset 0 0 150px rgba(0,0,0,0.9); pointer-events: none;
        }

        .intro-content {
          max-width: 1200px; width: 100%; z-index: 10;
          display: flex; flex-direction: column; gap: 48px;
        }

        .intro-header { text-align: left; }
        .intro-badge {
          font-size: 0.7rem; font-weight: 800; color: var(--accent-primary);
          letter-spacing: 0.2em; margin-bottom: 8px; opacity: 0.8;
        }
        .intro-logo {
          font-size: 4rem; font-weight: 900; letter-spacing: -0.02em; line-height: 1;
          margin-bottom: 12px;
        }
        .text-glow { color: var(--accent-primary); text-shadow: 0 0 20px var(--accent-glow); }
        .intro-subtext {
          font-size: 0.85rem; color: var(--text-muted); font-weight: 600; letter-spacing: 0.3em;
        }

        .intro-main-grid { display: grid; grid-template-columns: 450px 1fr; gap: 32px; }

        .glass-panel {
          background: var(--bg-glass); backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border); border-radius: var(--radius-lg);
          padding: 32px; box-shadow: var(--glass-shadow);
        }
        .panel-title {
          font-size: 0.85rem; font-weight: 800; color: var(--text-secondary);
          letter-spacing: 0.1em; margin-bottom: 24px; display: flex; align-items: center; gap: 10px;
        }
        .title-icon { color: var(--accent-primary); }

        .intro-menu-buttons { display: flex; gap: 12px; margin-bottom: 14px; }
        .intro-menu-buttons > button { flex: 1; }

        .action-buttons { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
        .btn-game-primary, .btn-game-secondary {
          display: flex; align-items: center; gap: 16px; padding: 24px;
          border-radius: var(--radius-md); border: 1px solid var(--glass-border);
          transition: all var(--transition-normal); cursor: pointer; text-align: left;
        }
        .btn-game-primary { background: var(--accent-soft); border-color: rgba(61,127,255,0.3); }
        .btn-game-primary:hover { 
          background: var(--accent-primary); border-color: var(--accent-primary);
          transform: translateX(10px); box-shadow: var(--shadow-glow);
        }
        .btn-game-secondary { background: rgba(255,255,255,0.03); }
        .btn-game-secondary:hover { background: rgba(255,255,255,0.08); transform: translateX(10px); }

        .btn-icon { font-size: 1.5rem; }
        .btn-text { font-size: 1rem; font-weight: 800; letter-spacing: 0.05em; color: white; }

        .intro-stats {
          display: flex; gap: 16px; padding-top: 16px; border-top: 1px solid var(--glass-border);
        }

        .scenario-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
          padding: 8px 4px;
          margin-bottom: 18px;
        }
        .scenario-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          padding-top: 20px;
          border-radius: 12px;
          background: var(--bg-glass);
          border: 1px solid var(--glass-border);
          width: 100%;
          box-sizing: border-box;
          position: relative;
          cursor: pointer;
          transition: all var(--transition-normal);
        }
        .scenario-card:hover {
          transform: translateY(-6px);
          border-color: var(--accent-primary);
          box-shadow: var(--glass-shadow);
        }
        .scenario-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .difficulty-badge {
          flex-shrink: 0;
          z-index: 2;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .last-session-label {
          display: none;
        }
        .difficulty-easy {
          background: color-mix(in srgb, var(--zone-safe-bg) 70%, transparent);
          color: var(--zone-safe-text);
          border: 1px solid color-mix(in srgb, var(--zone-safe-bar) 65%, transparent);
        }
        .difficulty-medium {
          background: color-mix(in srgb, var(--zone-warning-bg) 70%, transparent);
          color: var(--zone-warning-text);
          border: 1px solid color-mix(in srgb, var(--zone-warning-bar) 65%, transparent);
        }
        .difficulty-hard {
          background: color-mix(in srgb, var(--zone-critical-bg) 70%, transparent);
          color: var(--zone-critical-text);
          border: 1px solid color-mix(in srgb, var(--zone-critical-bar) 65%, transparent);
        }
        .scenario-top { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .scenario-icon-wrap {
          width: 54px; height: 54px;
          background: var(--bg-surface);
          border: 1px solid var(--glass-border);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .scenario-icon { font-size: 1.7rem; }

        .scenario-last {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: right;
        }
        .scenario-last-empty { color: var(--text-muted); }
        .scenario-last-title {
          font-size: 0.6rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          color: var(--text-muted);
          margin-bottom: 2px;
        }
        .scenario-last-row { font-size: 0.68rem; font-weight: 900; color: var(--text-secondary); }

        .scenario-title {
          margin: 0;
          margin-top: 0;
          flex: 1;
          min-width: 0;
          padding-right: 0;
          font-size: 20px;
          font-weight: 900;
          color: white;
        }
        .scenario-subtitle { font-size: 0.7rem; font-weight: 800; color: var(--accent-primary); letter-spacing: 0.04em; margin-top: 4px; }
        .scenario-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.55; margin: 10px 0 0; }

        .scenario-footer { margin-top: 6px; }
        .btn-scenario {
          width: 100%;
          padding: 12px;
          background: var(--bg-surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: white;
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          transition: all 0.2s;
        }
        .scenario-card:hover .btn-scenario {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-glow);
        }
        .stat-item { flex: 1; text-align: center; }
        .stat-num { display: block; font-size: 1.5rem; font-weight: 900; color: var(--accent-primary); font-family: var(--mono); }
        .stat-label { font-size: 0.55rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; }

        .tutorial-steps { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .tutorial-card {
          display: flex; gap: 16px; align-items: flex-start; padding: 20px;
          background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border);
          border-radius: var(--radius-md); transition: all var(--transition-normal);
        }
        .tutorial-card:hover { background: rgba(255,255,255,0.05); transform: translateY(-5px); border-color: var(--border-glow); }
        .card-icon-wrap {
          width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
          background: var(--bg-surface); border-radius: 12px; border: 1px solid var(--glass-border);
        }
        .card-icon { font-size: 1.25rem; }
        .card-title { font-size: 0.85rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
        .card-desc { font-size: 0.75rem; color: var(--text-muted); line-height: 1.5; }

        .intro-footer {
          display: flex; justify-content: space-between; padding: 16px 32px; border-radius: var(--radius-full);
        }
        .footer-item { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; font-weight: 700; }
        .footer-label { color: var(--text-muted); }
        .footer-value { color: var(--text-secondary); font-family: var(--mono); }
        .yebuer-label { color: #4FC3F7; text-shadow: 0 0 10px rgba(79,195,247,0.5); }
        .status-online { color: var(--zone-safe-text); text-shadow: 0 0 10px var(--zone-safe-glow); }

        @media (max-width: 1000px) {
          .intro-main-grid { grid-template-columns: 1fr; }
          .tutorial-steps { grid-template-columns: 1fr; }
          .intro-logo { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
}
