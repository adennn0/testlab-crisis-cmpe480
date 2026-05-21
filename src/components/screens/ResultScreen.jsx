// Result screen — ISO/IEC/IEEE 29119 run summary
import React, { useMemo } from 'react';
import BadgeDisplay, { computeEarnedBadges } from '../ui/BadgeSystem.jsx';

function formatTimeLabel(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function computeBadge(pct) {
  if (pct >= 90) return { grade: 'S', icon: '🏆', label: 'MASTER' };
  if (pct >= 80) return { grade: 'A', icon: '🥇', label: 'ADVANCED' };
  if (pct >= 70) return { grade: 'B', icon: '🥈', label: 'COMPETENT' };
  if (pct >= 60) return { grade: 'C', icon: '🥉', label: 'DEVELOPING' };
  return { grade: 'F', icon: '🧯', label: 'NEEDS PRACTICE' };
}

function getConceptKey(entry) {
  return entry.section || (entry.isoRef ? String(entry.isoRef).split(':')[0] : 'Unknown');
}

export default function ResultScreen({
  metrics,
  decisionsLog,
  startedAt,
  completedAt,
  answeredCount,
  correctCount,
  score,
  onReplay,
  onMenu,
}) {
  const totalTimeMs = startedAt && completedAt ? (completedAt - startedAt) : 0;
  const pct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const badge = computeBadge(pct);

  const earnedBadges = useMemo(() => {
    return computeEarnedBadges(decisionsLog || [], metrics || {}, { correctPct: pct });
  }, [decisionsLog, metrics, pct]);

  const conceptSummary = useMemo(() => {
    const rows = new Map();
    for (const entry of (decisionsLog || [])) {
      const key = getConceptKey(entry);
      const correct = entry.correct ?? entry.quality === 'best';
      const prev = rows.get(key) || { key, total: 0, correct: 0 };
      rows.set(key, { ...prev, total: prev.total + 1, correct: prev.correct + (correct ? 1 : 0) });
    }
    const list = Array.from(rows.values()).map(r => ({
      ...r,
      pct: r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0,
    }));
    list.sort((a, b) => b.pct - a.pct);
    return {
      strongest: list[0] || null,
      weakest: list[list.length - 1] || null,
    };
  }, [decisionsLog]);

  const metricEntries = Object.entries(metrics || {});

  return (
    <div className="result-screen">
      <div className="result-content anim-fade-in">
        <header className="result-header">
          <div className="simulation-badge">RUN COMPLETE</div>
          <h1 className="result-title">ISO/IEC/IEEE 29119 SUMMARY</h1>
        </header>

        <div className="result-card glass-panel">
          <div className="result-badge">
            <div className="result-badge-icon">{badge.icon}</div>
            <div className="result-badge-grade font-mono">{badge.grade}</div>
          </div>
          <div className="result-main">
            <div className="result-row">
              <div className="result-k">Correct</div>
              <div className="result-v font-mono">{correctCount}/{answeredCount} ({pct}%)</div>
            </div>
            <div className="result-row">
              <div className="result-k">Final Score</div>
              <div className="result-v font-mono">{score ?? 0}</div>
            </div>
            <div className="result-row">
              <div className="result-k">Total Time</div>
              <div className="result-v font-mono">{formatTimeLabel(totalTimeMs)}</div>
            </div>
            <div className="result-row">
              <div className="result-k">Badge</div>
              <div className="result-v font-mono">{badge.label}</div>
            </div>

            <div className="result-split">
              <div className="result-split-col">
                <div className="result-subtitle">STRONGEST CONCEPT</div>
                <div className="result-concept">
                  {conceptSummary.strongest ? (
                    <>
                      <div className="result-concept-name">{conceptSummary.strongest.key}</div>
                      <div className="result-concept-meta font-mono">{conceptSummary.strongest.pct}%</div>
                    </>
                  ) : (
                    <div className="result-concept-name">—</div>
                  )}
                </div>
              </div>
              <div className="result-split-col">
                <div className="result-subtitle">WEAKEST CONCEPT</div>
                <div className="result-concept">
                  {conceptSummary.weakest ? (
                    <>
                      <div className="result-concept-name">{conceptSummary.weakest.key}</div>
                      <div className="result-concept-meta font-mono">{conceptSummary.weakest.pct}%</div>
                    </>
                  ) : (
                    <div className="result-concept-name">—</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="result-card glass-panel" style={{ flexDirection: 'column' }}>
          <div className="result-subtitle">FINAL METRICS</div>
          <div className="metrics-grid">
            {metricEntries.map(([key, val]) => (
              <div key={key} className="metric-item">
                <div className="metric-name">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</div>
                <div className="metric-val font-mono">{Math.round(val)}</div>
              </div>
            ))}
          </div>
        </div>

        {earnedBadges.length > 0 && (
          <div className="result-card glass-panel" style={{ flexDirection: 'column' }}>
            <BadgeDisplay badges={earnedBadges} />
          </div>
        )}

        <div className="result-actions">
          <button id="btn-retry" className="btn btn-primary" onClick={onReplay}>Retry</button>
          <button id="btn-menu" className="btn" onClick={onMenu}>Main Menu</button>
        </div>
      </div>

      <style>{`
        .result-screen {
          min-height: 100vh;
          background: var(--bg-void);
          color: white;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 48px 24px;
        }
        .result-content {
          width: 100%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .simulation-badge {
          font-size: 0.7rem;
          font-weight: 900;
          color: var(--accent-primary);
          letter-spacing: 0.2em;
          margin-bottom: 8px;
        }
        .result-title {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .result-card {
          padding: 22px;
          display: flex;
          gap: 18px;
          align-items: flex-start;
        }
        .result-badge {
          width: 90px;
          height: 90px;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          flex-shrink: 0;
        }
        .result-badge-icon { font-size: 1.8rem; }
        .result-badge-grade { font-weight: 900; letter-spacing: 0.12em; }
        .result-main { flex: 1; display: flex; flex-direction: column; gap: 10px; }
        .result-row { display: flex; justify-content: space-between; gap: 10px; }
        .result-k { color: var(--text-muted); font-weight: 900; letter-spacing: 0.08em; font-size: 0.7rem; }
        .result-v { color: white; font-weight: 900; }
        .result-subtitle {
          font-size: 0.65rem;
          font-weight: 900;
          color: var(--text-muted);
          letter-spacing: 0.18em;
        }
        .result-split {
          margin-top: 6px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .result-concept {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-dim);
          background: rgba(255,255,255,0.02);
        }
        .result-concept-name { color: white; font-weight: 800; font-size: 0.85rem; }
        .result-concept-meta { color: var(--text-muted); font-weight: 900; }

        .metrics-grid {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          width: 100%;
        }
        .metric-item {
          border: 1px solid var(--border-dim);
          background: rgba(255,255,255,0.02);
          border-radius: var(--radius-md);
          padding: 12px;
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }
        .metric-name { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); letter-spacing: 0.12em; }
        .metric-val { font-weight: 900; }

        .result-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        @media (max-width: 720px) {
          .result-card { flex-direction: column; }
          .result-badge { width: 100%; height: auto; flex-direction: row; justify-content: flex-start; padding: 12px; }
          .result-split { grid-template-columns: 1fr; }
          .metrics-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
