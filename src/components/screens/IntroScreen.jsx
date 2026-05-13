// FR-16: Intro / Tutorial screen

export default function IntroScreen({ onNewGame, onResume, hasSave }) {
  const steps = [
    { icon: '🎯', title: 'Choose Your Scenario', desc: 'Pick from Banking, Healthcare, or E-Commerce — each with unique crises and stakes.' },
    { icon: '📊', title: 'Monitor 7 Live Metrics', desc: 'Every decision shifts your Test Coverage, Stakeholder Trust, Team Morale, and 4 more in real time.' },
    { icon: '⚡', title: 'Survive Crisis Events', desc: 'At phases 3 & 5, a surprise crisis hits. Your response under pressure defines your score.' },
    { icon: '🏆', title: 'Earn Your Grade', desc: 'Complete all 6 phases and discover one of 4 outcomes — from Crisis Mastery to Catastrophic Failure.' },
  ];

  return (
    <div className="intro-screen">
      {/* Animated background particles */}
      <div className="intro-particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }} />
        ))}
      </div>

      <div className="intro-content">
        {/* Logo */}
        <div className="intro-logo anim-fade-in">
          <div className="intro-logo-icon">⚗️</div>
          <div className="intro-logo-text">
            <h1 className="intro-title font-display">
              TESTLAB<span className="intro-title-crisis"> CRISIS</span>
            </h1>
            <p className="intro-tagline">ISO 29119 — Software Testing Crisis Simulation</p>
          </div>
        </div>

        {/* Description */}
        <p className="intro-description anim-fade-in-up" style={{ animationDelay: '0.1s' }}>
          You are a <strong>Lead Test Manager</strong>. A critical software failure has just hit production.
          Six phases stand between you and resolution — or catastrophe.
          Every decision is measured against <strong>ISO/IEC/IEEE 29119</strong> standards.
        </p>

        {/* Tutorial steps */}
        <div className="intro-steps">
          {steps.map((step, i) => (
            <div
              key={i}
              className="intro-step anim-slide-in-card"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <div className="intro-step-icon">{step.icon}</div>
              <div>
                <div className="intro-step-title">{step.title}</div>
                <div className="intro-step-desc">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="intro-actions anim-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <button id="btn-new-game" className="btn btn-primary intro-btn-primary" onClick={onNewGame}>
            🚀 Start New Game
          </button>
          {hasSave && (
            <button id="btn-resume" className="btn btn-secondary intro-btn-secondary" onClick={onResume}>
              ↩ Resume Saved Game
            </button>
          )}
        </div>

        {/* ISO badge */}
        <div className="intro-iso-badge anim-fade-in" style={{ animationDelay: '0.6s' }}>
          <span>📋</span>
          <span>All feedback references <strong>ISO/IEC/IEEE 29119</strong> Software Testing Standards</span>
        </div>
      </div>

      <style>{`
        .intro-screen {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 32px 24px; position: relative; overflow: hidden;
        }
        .intro-particles { position: absolute; inset: 0; pointer-events: none; }
        .particle {
          position: absolute; width: 4px; height: 4px; border-radius: 50%;
          background: var(--accent-primary); opacity: 0.4;
          animation: floatParticle linear infinite;
        }
        .intro-content {
          max-width: 640px; width: 100%; display: flex; flex-direction: column;
          gap: 28px; position: relative; z-index: 1;
        }
        .intro-logo { display: flex; align-items: center; gap: 16px; }
        .intro-logo-icon { font-size: 3rem; }
        .intro-title {
          font-size: 2.5rem; font-weight: 900; color: var(--text-primary);
          letter-spacing: 0.08em; line-height: 1; margin: 0;
          animation: glitchText 8s ease-in-out infinite;
        }
        .intro-title-crisis { color: var(--accent-primary); }
        .intro-tagline {
          font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.06em;
          font-weight: 600; margin-top: 4px;
        }
        .intro-description {
          font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.7;
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); padding: 16px 20px;
          border-left: 3px solid var(--accent-primary);
        }
        .intro-description strong { color: var(--text-primary); }
        .intro-steps { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .intro-step {
          display: flex; gap: 12px; align-items: flex-start;
          background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); padding: 14px 16px;
          transition: border-color var(--transition-fast);
        }
        .intro-step:hover { border-color: var(--border-glow); }
        .intro-step-icon { font-size: 1.25rem; margin-top: 1px; }
        .intro-step-title { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
        .intro-step-desc { font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5; }
        .intro-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .intro-btn-primary  { flex: 1; min-width: 200px; padding: 16px 32px; font-size: 1rem; }
        .intro-btn-secondary { padding: 16px 24px; font-size: 0.9375rem; }
        .intro-iso-badge {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.75rem; color: var(--text-muted); line-height: 1.5;
          padding: 10px 14px; background: var(--bg-surface);
          border-radius: var(--radius-md); border: 1px solid var(--border-subtle);
        }
        .intro-iso-badge strong { color: var(--accent-primary); }
        @media (max-width: 600px) {
          .intro-steps { grid-template-columns: 1fr; }
          .intro-title { font-size: 1.75rem; }
        }
      `}</style>
    </div>
  );
}
