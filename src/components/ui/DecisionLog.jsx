// FR-08: Decision history log

import { formatDelta } from '../../utils/metricHelpers.js';

const qualityColors = {
  best:    'var(--zone-safe-text)',
  good:    'var(--zone-optimal-text)',
  neutral: 'var(--text-muted)',
  bad:     'var(--zone-critical-text)',
};
const qualityLabels = { best: 'OPTIMAL', good: 'GOOD', neutral: 'OK', bad: 'POOR' };

export default function DecisionLog({ log }) {
  if (!log || log.length === 0) {
    return (
      <div className="dlog-empty">
        <span>No decisions yet</span>
      </div>
    );
  }

  return (
    <div className="dlog">
      <div className="dlog-header">
        <span className="dlog-title">DECISION LOG</span>
        <span className="dlog-count font-mono">{log.length}</span>
      </div>
      <div className="dlog-list">
        {[...log].reverse().map((entry, i) => (
          <div key={entry.decisionId + i} className={`dlog-item ${entry.isCrisis ? 'dlog-item--crisis' : ''}`}>
            <div className="dlog-item-top">
              <span className="dlog-phase-tag font-mono">P{entry.phaseId}</span>
              {entry.isCrisis && <span className="dlog-crisis-tag">⚡ CRISIS</span>}
              <span
                className="dlog-quality font-mono"
                style={{ color: qualityColors[entry.quality] }}
              >
                {qualityLabels[entry.quality]}
              </span>
              <span className="dlog-points font-mono">+{entry.points}</span>
            </div>
            <p className="dlog-label">{entry.label}</p>
          </div>
        ))}
      </div>

      <style>{`
        .dlog { display: flex; flex-direction: column; gap: 10px; }
        .dlog-empty {
          padding: 16px; text-align: center;
          color: var(--text-muted); font-size: 0.75rem;
          border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);
        }
        .dlog-header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .dlog-title {
          font-size: 0.6875rem; font-weight: 800; color: var(--text-muted);
          letter-spacing: 0.1em;
        }
        .dlog-count {
          background: var(--accent-soft); color: var(--accent-primary);
          font-size: 0.6875rem; font-weight: 700; padding: 1px 7px;
          border-radius: var(--radius-full);
        }
        .dlog-list { display: flex; flex-direction: column; gap: 6px; max-height: 280px; overflow-y: auto; }
        .dlog-item {
          background: var(--bg-deep); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm); padding: 8px 10px;
          animation: logItemIn 0.25s both;
        }
        .dlog-item--crisis { border-color: rgba(255,159,10,0.2); }
        .dlog-item-top {
          display: flex; align-items: center; gap: 6px; margin-bottom: 3px; flex-wrap: wrap;
        }
        .dlog-phase-tag {
          font-size: 0.5875rem; font-weight: 700; color: var(--text-muted);
          background: var(--border-subtle); padding: 1px 5px; border-radius: 4px;
        }
        .dlog-crisis-tag {
          font-size: 0.5875rem; font-weight: 700; color: var(--zone-warning-text);
          background: var(--zone-warning-bg); padding: 1px 5px; border-radius: 4px;
        }
        .dlog-quality { font-size: 0.5875rem; font-weight: 800; letter-spacing: 0.06em; flex: 1; }
        .dlog-points {
          font-size: 0.6875rem; font-weight: 700; color: var(--zone-safe-text);
        }
        .dlog-label {
          font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}
