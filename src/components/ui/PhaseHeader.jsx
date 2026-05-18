// FR-10: Redesigned Phase Header component
import React from 'react';

export default function PhaseHeader({ currentPhase, totalPhases, scenarioName }) {
  const progress = ((currentPhase + 1) / totalPhases) * 100;

  return (
    <div className="phase-header glass-panel anim-fade-in">
      <div className="header-main">
        <div className="scenario-info">
          <div className="level-badge">LVL {currentPhase + 1}</div>
          <div className="mission-title-wrap">
            <h2 className="scenario-name">{scenarioName}</h2>
            <div className="phase-label">PHASE {currentPhase + 1} OF {totalPhases} — IN PROGRESS</div>
          </div>
        </div>

        <div className="status-meta">
          <div className="meta-card">
            <span className="meta-icon">🛡️</span>
            <div className="meta-text">
              <span className="meta-label">SECURITY</span>
              <span className="meta-value status-online">ACTIVE</span>
            </div>
          </div>
          <div className="meta-card">
            <span className="meta-icon">⏱️</span>
            <div className="meta-text">
              <span className="meta-label">UPTIME</span>
              <span className="meta-value">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          {Array.from({ length: totalPhases }).map((_, i) => (
            <div 
              key={i} 
              className={`phase-node ${i <= currentPhase ? 'active' : ''}`}
              style={{ left: `${(i / (totalPhases - 1)) * 100}%` }}
            >
              <div className="node-dot" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .phase-header {
          display: flex; flex-direction: column; gap: 24px;
          padding: 24px 32px; border: 1px solid var(--glass-border);
        }
        .header-main { display: flex; justify-content: space-between; align-items: center; }

        .scenario-info { display: flex; align-items: center; gap: 24px; }
        .level-badge {
          background: var(--accent-primary); color: white;
          font-weight: 900; font-size: 0.9rem; padding: 12px 16px;
          border-radius: 12px; box-shadow: var(--shadow-neon);
        }

        .mission-title-wrap { display: flex; flex-direction: column; gap: 4px; }
        .scenario-name { font-size: 1.5rem; font-weight: 900; color: white; margin: 0; letter-spacing: -0.01em; }
        .phase-label { font-size: 0.7rem; font-weight: 800; color: var(--accent-primary); letter-spacing: 0.15em; }

        .status-meta { display: flex; gap: 16px; }
        .meta-card {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.03); padding: 10px 16px;
          border-radius: var(--radius-md); border: 1px solid var(--glass-border);
        }
        .meta-icon { font-size: 1.1rem; }
        .meta-text { display: flex; flex-direction: column; }
        .meta-label { font-size: 0.6rem; font-weight: 800; color: var(--text-muted); }
        .meta-value { font-size: 0.7rem; font-weight: 800; color: white; }
        .status-online { color: var(--zone-safe-text); }

        .progress-container { padding: 0 10px; }
        .progress-track {
          height: 4px; background: rgba(255,255,255,0.05);
          border-radius: var(--radius-full); position: relative;
        }
        .progress-fill {
          height: 100%; background: var(--accent-primary);
          box-shadow: 0 0 15px var(--accent-glow);
          border-radius: var(--radius-full); transition: width 0.5s ease;
        }
        .phase-node {
          position: absolute; top: 50%; transform: translate(-50%, -50%);
          display: flex; flex-direction: column; align-items: center;
        }
        .node-dot {
          width: 10px; height: 10px; background: var(--bg-surface);
          border: 2px solid var(--glass-border); border-radius: 50%;
          transition: all 0.3s;
        }
        .phase-node.active .node-dot {
          background: var(--accent-primary); border-color: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-glow); transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}
