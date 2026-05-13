// PhaseHeader — "Phase 3 of 6" with progress dots

import { PHASES } from '../../data/phases.js';

export default function PhaseHeader({ currentPhase, totalPhases }) {
  const phase = PHASES[currentPhase];
  if (!phase) return null;

  return (
    <div className="phase-header">
      <div className="phase-top">
        <div className="phase-badge">
          <span className="phase-icon">{phase.icon}</span>
          <span className="phase-num font-mono">
            PHASE {currentPhase + 1} / {totalPhases}
          </span>
        </div>
        <div className="phase-pressure" data-pressure={phase.timePressure}>
          {phase.timePressure === 'high' && '🔴'}
          {phase.timePressure === 'medium' && '🟡'}
          {phase.timePressure === 'low' && '🟢'}
          &nbsp;{phase.timePressure.toUpperCase()} PRESSURE
        </div>
      </div>

      <h2 className="phase-name">{phase.name}</h2>
      <p className="phase-objective">
        <strong>Objective:</strong> {phase.objective}
      </p>

      {/* Progress dots */}
      <div className="phase-dots" role="progressbar" aria-valuenow={currentPhase + 1} aria-valuemax={totalPhases}>
        {Array.from({ length: totalPhases }).map((_, i) => (
          <div
            key={i}
            className={`phase-dot ${i < currentPhase ? 'done' : i === currentPhase ? 'active' : 'future'}`}
            title={PHASES[i]?.name}
          />
        ))}
      </div>

      {phase.hasCrisisEvent && (
        <div className="phase-crisis-warning">
          ⚡ Crisis event possible this phase
        </div>
      )}

      <style>{`
        .phase-header { display: flex; flex-direction: column; gap: 10px; }
        .phase-top { display: flex; justify-content: space-between; align-items: center; }
        .phase-badge {
          display: flex; align-items: center; gap: 8px;
          background: var(--accent-soft); border: 1px solid var(--border-dim);
          border-radius: var(--radius-full); padding: 4px 12px;
        }
        .phase-icon { font-size: 1rem; }
        .phase-num {
          font-size: 0.6875rem; font-weight: 700; color: var(--accent-primary);
          letter-spacing: 0.08em;
        }
        .phase-pressure {
          font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em;
          padding: 3px 8px; border-radius: var(--radius-full);
        }
        [data-pressure="high"]   { color: var(--zone-critical-text); background: var(--zone-critical-bg); }
        [data-pressure="medium"] { color: var(--zone-warning-text);  background: var(--zone-warning-bg);  }
        [data-pressure="low"]    { color: var(--zone-safe-text);    background: var(--zone-safe-bg);    }
        .phase-name {
          font-size: 1.5rem; font-weight: 800; color: var(--text-primary);
          letter-spacing: -0.02em; animation: fadeInUp 0.3s both;
        }
        .phase-objective {
          font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;
          animation: fadeInUp 0.3s 0.05s both;
        }
        .phase-objective strong { color: var(--text-primary); }
        .phase-dots { display: flex; gap: 6px; padding-top: 4px; }
        .phase-dot {
          height: 4px; flex: 1; border-radius: var(--radius-full);
          transition: all var(--transition-normal);
        }
        .phase-dot.done   { background: var(--accent-primary); opacity: 0.5; }
        .phase-dot.active {
          background: var(--accent-primary);
          box-shadow: 0 0 8px var(--accent-glow);
        }
        .phase-dot.future { background: var(--border-subtle); }
        .phase-crisis-warning {
          font-size: 0.6875rem; font-weight: 700; color: var(--zone-warning-text);
          background: var(--zone-warning-bg); border: 1px solid rgba(255,159,10,0.2);
          border-radius: var(--radius-full); padding: 3px 10px; width: fit-content;
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
