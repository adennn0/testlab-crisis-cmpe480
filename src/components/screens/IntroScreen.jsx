import { useState, useEffect } from 'react';
import Yebuer from '../ui/Yebuer.jsx';

const INTRO_STEPS = [
  { mood: 'excited', message: "Hey there! 👋 I'm YEBUER, your crisis companion! Welcome to TestLab Crisis!" },
  { mood: 'wink', message: "I'll be with you every step of the way. Think of me as your cute, slightly anxious advisor 😅" },
  { mood: 'thinking', message: "Here's the deal: you're a Lead Test Manager. A system just crashed. Your decisions matter!" },
  { mood: 'happy', message: "You'll face 12 tough questions per mission. Each one changes your metrics in real-time! 📊" },
  { mood: 'excited', message: "Pick wisely and I'll cheer for you! Pick badly and... well... I might cry a little 😢" },
  { mood: 'wink', message: "Ready to save the world? (Or at least save a banking system?) Let's GO! 🚀" },
];

export default function IntroScreen({ onNewGame, onResume, hasSave }) {
  const [introStep, setIntroStep] = useState(0);
  const [showYebuer, setShowYebuer] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

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
    { icon: '🎯', title: 'MISSION SELECT', desc: 'Choose between Banking, Healthcare, or E-Commerce sectors.' },
    { icon: '📊', title: 'SYSTEM METRICS', desc: 'Monitor 7 live KPIs. Every decision shifts the balance.' },
    { icon: '⚡', title: 'CRISIS EVENTS', desc: 'Survive random system failures at Critical Phases.' },
    { icon: '🏆', title: 'FINAL GRADE', desc: 'Complete all 12 questions to earn your certification.' },
  ];

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
            <div className="action-buttons">
              <button id="btn-new-game" className="btn-game-primary" onClick={onNewGame}>
                <span className="btn-icon">🚀</span>
                <span className="btn-text">INITIALIZE NEW SIMULATION</span>
              </button>
              
              {hasSave && (
                <button id="btn-resume" className="btn-game-secondary" onClick={onResume}>
                  <span className="btn-icon">↩</span>
                  <span className="btn-text">RESUME SAVED SESSION</span>
                </button>
              )}
            </div>

            <div className="intro-stats">
              <div className="stat-item"><span className="stat-num">12</span><span className="stat-label">QUESTIONS</span></div>
              <div className="stat-item"><span className="stat-num">3</span><span className="stat-label">SECTORS</span></div>
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
