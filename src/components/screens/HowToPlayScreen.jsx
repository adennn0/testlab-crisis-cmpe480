import React from 'react';

export default function HowToPlayScreen({ onClose }) {
  return (
    <div className="howto-overlay" role="dialog" aria-modal="true" aria-label="How to Play">
      <div className="howto-backdrop" onClick={onClose} />
      <div className="howto-card glass-panel">
        <div className="howto-header">
          <div className="howto-title">HOW TO PLAY — TESTLAB CRISIS</div>
          <button className="howto-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="howto-body">
          <Section icon="🎯" title="OBJECTIVE">
            You are a QA lead managing a software crisis. Make the right decisions based on ISO/IEC/IEEE 29119 testing standards.
          </Section>

          <Section icon="📋" title="SCENARIOS">
            <div className="howto-list">
              <div className="howto-li">
                <span className="tag tag-safe">🟢 EASY</span>
                <span className="howto-li-text">🏦 Core Banking Meltdown — Tests: General Concepts (29119-1)</span>
              </div>
              <div className="howto-li">
                <span className="tag tag-warn">🟡 MEDIUM</span>
                <span className="howto-li-text">🛒 E-Commerce Black Friday — Tests: Test Processes & Documentation</span>
              </div>
              <div className="howto-li">
                <span className="tag tag-crit">🔴 HARD</span>
                <span className="howto-li-text">🏥 Healthcare Security Breach — Tests: Test Techniques & Execution</span>
              </div>
            </div>
          </Section>

          <Section icon="❓" title="QUESTIONS">
            <div className="howto-list">
              <div className="howto-li">• 30 questions per scenario</div>
              <div className="howto-li">• 4 answer options per question (A/B/C/D)</div>
              <div className="howto-li">• Questions are randomized every playthrough</div>
              <div className="howto-li">• Each question shows its ISO/IEC/IEEE 29119 standard reference</div>
            </div>
          </Section>

          <Section icon="⏱️" title="TIMER">
            <div className="howto-list">
              <div className="howto-li">• 60 seconds per question</div>
              <div className="howto-li">• Run out of time = worst answer selected</div>
              <div className="howto-li">• Answer faster for bonus points</div>
            </div>
          </Section>

          <Section icon="📊" title="METRICS">
            <div className="howto-list">
              <div className="howto-li">• 7 live KPIs track your performance</div>
              <div className="howto-li">• Correct answers increase metrics</div>
              <div className="howto-li">• Wrong answers decrease metrics</div>
              <div className="howto-li">• Metrics can go negative</div>
            </div>
          </Section>

          <Section icon="🏆" title="SCORING">
            <div className="howto-list">
              <div className="howto-li">• Best answer (A): +10 pts</div>
              <div className="howto-li">• Good answer (B): +5 pts</div>
              <div className="howto-li">• Poor answer (C): -5 pts</div>
              <div className="howto-li">• Wrong answer (D): -10 pts</div>
              <div className="howto-li">• Fast answer bonus (&lt;15s): +3 pts</div>
            </div>
          </Section>

          <Section icon="🚪" title="EXIT">
            You can exit at any time using the Exit Game button. Progress is not saved.
          </Section>
        </div>

        <div className="howto-footer">
          <button className="btn-howto" onClick={onClose}>BACK TO MAIN MENU</button>
        </div>
      </div>

      <style>{`
        .howto-overlay { position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; padding: 24px; }
        .howto-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.85); }
        .howto-card { position: relative; width: min(600px, 100%); max-height: min(86vh, 760px); display: flex; flex-direction: column; gap: 14px; }
        .howto-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .howto-title { font-size: 0.85rem; font-weight: 900; letter-spacing: 0.12em; color: white; }
        .howto-close { background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); color: white; border-radius: 10px; width: 36px; height: 36px; cursor: pointer; }
        .howto-close:hover { background: rgba(255,255,255,0.08); border-color: var(--accent-primary); }

        .howto-body { overflow: auto; padding-right: 6px; display: flex; flex-direction: column; gap: 14px; }

        .howto-section { background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 14px 14px; }
        .howto-section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .howto-icon { font-size: 1rem; }
        .howto-head { font-size: 0.7rem; font-weight: 900; letter-spacing: 0.14em; color: var(--text-secondary); }
        .howto-text { font-size: 0.86rem; color: var(--text-muted); line-height: 1.55; }

        .howto-list { display: flex; flex-direction: column; gap: 8px; }
        .howto-li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.86rem; color: var(--text-muted); line-height: 1.5; }
        .howto-li-text { flex: 1; }

        .tag { font-size: 0.65rem; font-weight: 900; letter-spacing: 0.08em; padding: 2px 8px; border-radius: 6px; border: 1px solid transparent; white-space: nowrap; }
        .tag-safe { background: color-mix(in srgb, var(--zone-safe-bg) 70%, transparent); color: var(--zone-safe-text); border-color: color-mix(in srgb, var(--zone-safe-bar) 65%, transparent); }
        .tag-warn { background: color-mix(in srgb, var(--zone-warning-bg) 70%, transparent); color: var(--zone-warning-text); border-color: color-mix(in srgb, var(--zone-warning-bar) 65%, transparent); }
        .tag-crit { background: color-mix(in srgb, var(--zone-critical-bg) 70%, transparent); color: var(--zone-critical-text); border-color: color-mix(in srgb, var(--zone-critical-bar) 65%, transparent); }

        .howto-footer { display: flex; justify-content: flex-end; padding-top: 4px; }
        .btn-howto { padding: 12px 14px; border-radius: var(--radius-md); background: var(--accent-primary); color: white; font-weight: 900; letter-spacing: 0.12em; border: 1px solid var(--accent-primary); cursor: pointer; }
        .btn-howto:hover { box-shadow: var(--shadow-glow); }
      `}</style>
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <div className="howto-section">
      <div className="howto-section-head">
        <div className="howto-icon">{icon}</div>
        <div className="howto-head">{title}</div>
      </div>
      <div className="howto-text">{children}</div>
    </div>
  );
}
