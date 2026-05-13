// FR-02: Decision card component

export default function DecisionCard({ decision, onSelect, disabled, index }) {
  const qualityGlow = {
    best:    'rgba(48, 209, 88, 0.15)',
    good:    'rgba(100, 160, 255, 0.12)',
    neutral: 'rgba(255,255,255,0.04)',
    bad:     'rgba(255, 45, 85, 0.12)',
  };

  return (
    <button
      id={`decision-${decision.id}`}
      className="decision-card"
      onClick={() => onSelect(decision)}
      disabled={disabled}
      style={{ animationDelay: `${index * 80}ms` }}
      aria-label={decision.label}
    >
      <div className="decision-card-inner">
        <div className="decision-index">
          <span>{String.fromCharCode(65 + index)}</span>
        </div>
        <div className="decision-content">
          <h3 className="decision-label">{decision.label}</h3>
          <p className="decision-desc">{decision.description}</p>
        </div>
        <div className="decision-arrow">›</div>
      </div>

      <style>{`
        .decision-card {
          width: 100%; background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); padding: 0; cursor: pointer; text-align: left;
          transition: all var(--transition-normal); animation: slideInCard 0.35s both;
          position: relative; overflow: hidden;
        }
        .decision-card::before {
          content: ''; position: absolute; inset: 0;
          background: ${qualityGlow.neutral};
          opacity: 0; transition: opacity var(--transition-fast);
        }
        .decision-card:hover:not(:disabled) {
          border-color: var(--accent-primary);
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 8px 32px var(--accent-glow), 0 0 0 1px var(--accent-primary);
        }
        .decision-card:hover:not(:disabled)::before { opacity: 1; }
        .decision-card:active:not(:disabled) { transform: translateY(-1px) scale(0.99); }
        .decision-card:disabled { opacity: 0.4; cursor: not-allowed; }
        .decision-card-inner {
          display: flex; align-items: center; gap: 14px; padding: 16px 18px;
          position: relative; z-index: 1;
        }
        .decision-index {
          width: 32px; height: 32px; min-width: 32px; border-radius: 8px;
          background: var(--accent-soft); border: 1px solid var(--border-dim);
          display: flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace; font-size: 0.8125rem;
          font-weight: 700; color: var(--accent-primary);
          transition: all var(--transition-fast);
        }
        .decision-card:hover:not(:disabled) .decision-index {
          background: var(--accent-primary); color: white; border-color: var(--accent-primary);
        }
        .decision-content { flex: 1; }
        .decision-label {
          font-size: 0.9375rem; font-weight: 700; color: var(--text-primary);
          margin-bottom: 4px; line-height: 1.3;
        }
        .decision-desc {
          font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;
        }
        .decision-arrow {
          font-size: 1.25rem; color: var(--text-muted);
          transition: all var(--transition-fast); transform: translateX(0);
        }
        .decision-card:hover:not(:disabled) .decision-arrow {
          color: var(--accent-primary); transform: translateX(4px);
        }
      `}</style>
    </button>
  );
}
