import { useEffect } from 'react';
import { METRICS_CONFIG } from '../../state/initialState.js';
import { formatDelta } from '../../utils/metricHelpers.js';
import ISOBadge from '../ui/ISOBadge.jsx';

const qualityMeta = {
  best:    { label: 'OPTIMAL CHOICE',  color: 'var(--zone-safe-bar)',     icon: '✅' },
  good:    { label: 'GOOD CHOICE',     color: 'var(--zone-optimal-bar)',  icon: '👍' },
  poor:    { label: 'POOR CHOICE',     color: 'var(--zone-critical-bar)', icon: '⚠️' },
  worst:   { label: 'WORST CHOICE',    color: 'var(--zone-critical-bar)', icon: '⛔' },
};

export default function FeedbackModal({ decision, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!decision) return null;

  const qm = qualityMeta[decision.quality] || qualityMeta.poor;
  const deltas = decision.metricDeltas || {};
  const significantDeltas = Object.entries(deltas).filter(([, v]) => v !== 0);

  const resultIcon = decision.correct ? '✅' : '❌';
  const resultLabel = decision.correct ? 'CORRECT' : 'INCORRECT';
  const decisionTitle = decision.letter
    ? `Protocol ${decision.letter}: ${decision.label}`
    : decision.label;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ borderColor: qm.color }}>
          <div className="modal-quality" style={{ color: qm.color }}>
            <span>{qm.icon}</span>
            <span className="font-mono">{qm.label}</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close feedback">✕</button>
        </div>

        {/* Result */}
        <div className="modal-result">
          <span className="modal-result-icon">{resultIcon}</span>
          <span className="font-mono">RESULT: {resultLabel}</span>
          {decision.timedOut && <span className="modal-timeout-badge">TIMEOUT</span>}
        </div>

        {/* Decision title */}
        <h3 className="modal-decision-title">{decisionTitle}</h3>

        {/* Feedback text */}
        <div className="modal-feedback">
          <p>{decision.feedback}</p>
        </div>

        {/* ISO Reference — prominent badge */}
        {decision.isoRef && (
          <ISOBadge isoRef={decision.isoRef} />
        )}

        {/* Metric impacts */}
        {significantDeltas.length > 0 && (
          <div className="modal-impacts">
            <div className="modal-impacts-title">METRIC IMPACT</div>
            <div className="modal-impacts-grid">
              {significantDeltas.map(([key, delta]) => {
                const cfg = METRICS_CONFIG[key];
                if (!cfg) return null;
                const isPositive = cfg.inverted ? delta < 0 : delta > 0;
                return (
                  <div key={key} className="modal-impact-item">
                    <span>{cfg.icon}</span>
                    <span className="modal-impact-name">{cfg.label}</span>
                    <span
                      className="modal-impact-delta font-mono"
                      style={{ color: isPositive ? 'var(--zone-safe-text)' : 'var(--zone-critical-text)' }}
                    >
                      {formatDelta(delta)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button id="feedback-continue-btn" className="btn btn-primary modal-continue" onClick={onClose}>
          Continue →
        </button>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed; inset: 0; background: var(--bg-overlay);
          z-index: 200; display: flex; align-items: center; justify-content: center;
          padding: 24px; animation: modalBackdropIn 0.2s both;
          backdrop-filter: blur(6px);
        }
        .modal-panel {
          background: var(--bg-card); border: 1px solid var(--border-dim);
          border-radius: var(--radius-xl); padding: 28px; width: 100%; max-width: 540px;
          box-shadow: var(--shadow-card), 0 0 60px rgba(0,0,0,0.6);
          animation: modalPanelIn 0.3s both; display: flex; flex-direction: column; gap: 18px;
          max-height: 90vh; overflow-y: auto;
        }
        .modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 16px; border-bottom: 2px solid;
        }
        .modal-quality { display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; font-weight: 800; letter-spacing: 0.06em; }
        .modal-result {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-dim);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.08em;
        }
        .modal-result-icon { font-size: 1rem; }
        .modal-timeout-badge {
          font-size: 0.65rem;
          font-weight: 900;
          padding: 2px 8px;
          border-radius: 999px;
          background: var(--zone-warning-bg);
          color: var(--zone-warning-text);
          letter-spacing: 0.1em;
        }
        .modal-close {
          background: none; border: none; color: var(--text-muted); cursor: pointer;
          font-size: 1rem; padding: 4px 8px; border-radius: 6px; transition: all var(--transition-fast);
        }
        .modal-close:hover { color: var(--text-primary); background: var(--border-subtle); }
        .modal-decision-title { font-size: 1.125rem; font-weight: 700; color: var(--text-primary); line-height: 1.3; }
        .modal-feedback {
          background: var(--bg-surface); border-radius: var(--radius-md); padding: 14px 16px;
          border-left: 3px solid var(--accent-primary);
        }
        .modal-feedback p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.65; }
        .modal-iso {
          display: flex; gap: 10px; align-items: flex-start;
          background: var(--accent-soft); border: 1px solid var(--border-dim);
          border-radius: var(--radius-md); padding: 12px 14px;
        }
        .modal-iso-icon { font-size: 1rem; margin-top: 2px; }
        .modal-iso-label { font-size: 0.6rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 3px; }
        .modal-iso-ref { font-size: 0.75rem; color: var(--accent-primary); font-weight: 600; }
        .modal-impacts-title { font-size: 0.6rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 8px; }
        .modal-impacts-grid { display: flex; flex-direction: column; gap: 6px; }
        .modal-impact-item {
          display: flex; align-items: center; gap: 8px;
          background: var(--bg-surface); border-radius: var(--radius-sm); padding: 6px 10px;
        }
        .modal-impact-name { flex: 1; font-size: 0.8125rem; color: var(--text-secondary); }
        .modal-impact-delta { font-size: 0.8125rem; font-weight: 700; }
        .modal-continue { width: 100%; padding: 14px; font-size: 1rem; }
      `}</style>
    </div>
  );
}
