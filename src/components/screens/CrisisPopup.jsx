// FR-06: Crisis event popup overlay

import { useState } from 'react';

export default function CrisisPopup({ event, onResolve }) {
  const [selected, setSelected] = useState(null);
  const [confirming, setConfirming] = useState(false);

  if (!event) return null;

  const handleSelect = (opt) => { setSelected(opt); setConfirming(false); };
  const handleConfirm = () => {
    if (!selected) return;
    setConfirming(true);
    setTimeout(() => onResolve(selected), 300);
  };

  return (
    <div className="crisis-overlay">
      <div className="crisis-card anim-crisis-shake">
        {/* Alert strip */}
        <div className="crisis-alert-strip">
          <span className="crisis-alert-dot" />
          <span className="font-mono">CRITICAL INCIDENT DETECTED</span>
          <span className="crisis-alert-dot" />
        </div>

        <div className="crisis-body">
          <div className="crisis-title-row">
            <h2 className="crisis-title">{event.title}</h2>
            <span className="crisis-subtitle font-mono">{event.subtitle}</span>
          </div>

          <div className="crisis-description">
            <p>{event.description}</p>
          </div>

          <div className="crisis-impact">
            <span className="crisis-impact-icon">💥</span>
            <p>{event.impact}</p>
          </div>

          <div className="crisis-options-label font-mono">SELECT RESPONSE PROTOCOL:</div>

          <div className="crisis-options">
            {event.options.map((opt, i) => (
              <button
                key={opt.id}
                id={`crisis-opt-${opt.id}`}
                className={`crisis-option ${selected?.id === opt.id ? 'crisis-option--selected' : ''}`}
                onClick={() => handleSelect(opt)}
              >
                <div className="crisis-option-index font-mono">{i + 1}</div>
                <div className="crisis-option-content">
                  <div className="crisis-option-label">{opt.label}</div>
                  <div className="crisis-option-desc">{opt.description}</div>
                </div>
                {selected?.id === opt.id && (
                  <div className="crisis-option-check">✓</div>
                )}
              </button>
            ))}
          </div>

          <button
            id="crisis-confirm-btn"
            className={`btn btn-danger crisis-confirm ${!selected ? 'btn-disabled' : ''}`}
            onClick={handleConfirm}
            disabled={!selected || confirming}
          >
            {confirming ? 'Executing Response...' : '⚡ Execute Response Protocol'}
          </button>
        </div>
      </div>

      <style>{`
        .crisis-overlay {
          position: fixed; inset: 0; z-index: 300;
          display: flex; align-items: center; justify-content: center;
          padding: 24px; animation: crisisOverlayIn 0.3s both;
          background: rgba(5,8,17,0.88); backdrop-filter: blur(8px);
        }
        .crisis-card {
          background: var(--bg-card); border: 1px solid var(--zone-critical-bar);
          border-radius: var(--radius-xl); width: 100%; max-width: 580px; max-height: 90vh;
          overflow-y: auto; animation: crisisCardIn 0.35s both;
          box-shadow: var(--shadow-crisis), inset 0 0 60px rgba(255,45,85,0.04);
        }
        .crisis-alert-strip {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          background: var(--zone-critical-bar); color: white; padding: 10px 20px;
          font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.12em;
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          animation: pulseGlowCrisis 1s ease-in-out infinite;
        }
        .crisis-alert-dot {
          width: 6px; height: 6px; border-radius: 50%; background: white; opacity: 0.7;
        }
        .crisis-body { padding: 24px; display: flex; flex-direction: column; gap: 18px; }
        .crisis-title-row { display: flex; flex-direction: column; gap: 4px; }
        .crisis-title {
          font-size: 1.375rem; font-weight: 800; color: var(--text-primary); line-height: 1.2;
        }
        .crisis-subtitle {
          font-size: 0.6875rem; font-weight: 700; color: var(--zone-critical-text);
          letter-spacing: 0.1em;
        }
        .crisis-description {
          background: var(--bg-surface); border-radius: var(--radius-md); padding: 14px 16px;
          border-left: 3px solid var(--zone-critical-bar);
        }
        .crisis-description p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.65; }
        .crisis-impact {
          display: flex; gap: 10px; align-items: flex-start;
          background: var(--zone-critical-bg); border: 1px solid rgba(255,45,85,0.2);
          border-radius: var(--radius-md); padding: 12px 14px;
        }
        .crisis-impact-icon { font-size: 1rem; }
        .crisis-impact p { font-size: 0.8125rem; color: var(--zone-critical-text); line-height: 1.5; font-weight: 600; }
        .crisis-options-label {
          font-size: 0.6rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.12em;
        }
        .crisis-options { display: flex; flex-direction: column; gap: 8px; }
        .crisis-option {
          display: flex; align-items: flex-start; gap: 12px; width: 100%; text-align: left;
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); padding: 12px 14px; cursor: pointer;
          transition: all var(--transition-fast);
        }
        .crisis-option:hover {
          border-color: var(--zone-critical-bar);
          background: var(--zone-critical-bg);
        }
        .crisis-option--selected {
          border-color: var(--zone-critical-bar);
          background: var(--zone-critical-bg);
          box-shadow: 0 0 16px var(--zone-critical-glow);
        }
        .crisis-option-index {
          width: 24px; height: 24px; min-width: 24px; border-radius: 6px;
          background: var(--zone-critical-bg); color: var(--zone-critical-text);
          font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,45,85,0.3);
        }
        .crisis-option-content { flex: 1; }
        .crisis-option-label { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 3px; }
        .crisis-option-desc { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; }
        .crisis-option-check {
          width: 22px; height: 22px; border-radius: 50%; background: var(--zone-critical-bar);
          color: white; font-size: 0.75rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .crisis-confirm { width: 100%; padding: 14px; font-size: 0.9375rem; }
        .btn-disabled { opacity: 0.4; }
      `}</style>
    </div>
  );
}
