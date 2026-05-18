// FR-13: Redesigned Decision Card component
import React from 'react';

export default function DecisionCard({ decision, onSelect, disabled }) {
  return (
    <div 
      className={`decision-card glass-panel anim-scale-in ${disabled ? 'disabled' : ''}`}
      onClick={() => !disabled && onSelect(decision)}
    >
      <div className="decision-header">
        <div className="decision-id">REF_{decision.id.substring(0, 5).toUpperCase()}</div>
        <div className="decision-icon">⚡</div>
      </div>

      <div className="decision-body">
        <h3 className="decision-label">{decision.label}</h3>
        <p className="decision-desc">{decision.description}</p>
      </div>

      <div className="decision-footer">
        <div className="decision-cost">
          <span className="cost-label">RESOURCE IMPACT:</span>
          <span className="cost-value">{decision.cost || 'STANDARD'}</span>
        </div>
        <div className="btn-execute">EXECUTE PROTOCOL</div>
      </div>

      <style>{`
        .decision-card {
          display: flex; flex-direction: column; gap: 20px;
          padding: 24px; cursor: pointer; transition: all var(--transition-normal);
          border: 1px solid var(--glass-border); position: relative;
        }
        .decision-card:hover:not(.disabled) {
          border-color: var(--accent-primary);
          background: rgba(61, 127, 255, 0.05);
          transform: scale(1.02);
          box-shadow: var(--shadow-glow);
        }
        .decision-card.disabled { opacity: 0.5; cursor: not-allowed; }

        .decision-header { display: flex; justify-content: space-between; align-items: center; }
        .decision-id { font-size: 0.6rem; font-weight: 800; color: var(--accent-primary); letter-spacing: 0.1em; }
        .decision-icon { font-size: 1rem; }

        .decision-label { font-size: 1.1rem; font-weight: 900; color: white; line-height: 1.2; }
        .decision-desc { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; }

        .decision-footer { 
          margin-top: auto; display: flex; flex-direction: column; gap: 16px;
          padding-top: 16px; border-top: 1px solid var(--glass-border);
        }
        .decision-cost { display: flex; justify-content: space-between; align-items: center; }
        .cost-label { font-size: 0.6rem; font-weight: 800; color: var(--text-muted); }
        .cost-value { font-size: 0.6rem; font-weight: 800; color: var(--accent-primary); }

        .btn-execute {
          padding: 12px; background: var(--bg-surface); border-radius: var(--radius-sm);
          text-align: center; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em;
          color: white; border: 1px solid var(--glass-border); transition: all 0.2s;
        }
        .decision-card:hover .btn-execute { background: var(--accent-primary); border-color: var(--accent-primary); }
      `}</style>
    </div>
  );
}
