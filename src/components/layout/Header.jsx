// Header — logo + scenario name + score + phase progress bar

import ScoreDisplay from '../ui/ScoreDisplay.jsx';

export default function Header({ scenarioId, scenarioName, scenarioIcon, score, currentPhase, totalPhases }) {
  const progress = totalPhases > 0 ? ((currentPhase) / totalPhases) * 100 : 0;

  return (
    <header className="game-header" data-scenario={scenarioId}>
      <div className="game-header-left">
        <div className="game-logo">
          <span className="game-logo-icon">⚗️</span>
          <div>
            <span className="game-logo-name font-display">TestLab</span>
            <span className="game-logo-sub"> CRISIS</span>
          </div>
        </div>
        {scenarioId && (
          <div className="game-scenario-chip">
            <span>{scenarioIcon}</span>
            <span>{scenarioName}</span>
          </div>
        )}
      </div>

      <div className="game-header-center">
        <div className="header-progress-wrap">
          <div className="header-progress-track">
            <div className="header-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="header-progress-label font-mono">
            {currentPhase}/{totalPhases} PHASES
          </span>
        </div>
      </div>

      <div className="game-header-right">
        <ScoreDisplay score={score} compact />
      </div>

      <style>{`
        .game-header {
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 12px 20px;
          background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle);
          position: sticky; top: 0; z-index: 50; backdrop-filter: blur(16px);
        }
        .game-header-left  { display: flex; align-items: center; gap: 12px; flex: 1; }
        .game-header-center { flex: 1; max-width: 280px; }
        .game-header-right { display: flex; align-items: center; justify-content: flex-end; flex: 1; }
        .game-logo { display: flex; align-items: center; gap: 8px; }
        .game-logo-icon { font-size: 1.25rem; }
        .game-logo-name {
          font-size: 1rem; font-weight: 900; color: var(--text-primary);
          letter-spacing: 0.06em;
        }
        .game-logo-sub {
          font-size: 0.7rem; font-weight: 800; color: var(--accent-primary);
          letter-spacing: 0.14em;
        }
        .game-scenario-chip {
          display: flex; align-items: center; gap: 5px;
          background: var(--accent-soft); border: 1px solid var(--border-dim);
          border-radius: var(--radius-full); padding: 3px 10px;
          font-size: 0.75rem; font-weight: 600; color: var(--text-secondary);
        }
        .header-progress-wrap { display: flex; flex-direction: column; gap: 4px; align-items: center; }
        .header-progress-track {
          width: 100%; height: 4px; background: var(--border-subtle);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .header-progress-fill {
          height: 100%; background: var(--accent-primary);
          border-radius: var(--radius-full); transition: width 0.6s ease;
          box-shadow: 0 0 8px var(--accent-glow);
        }
        .header-progress-label {
          font-size: 0.6rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.1em;
        }
      `}</style>
    </header>
  );
}
