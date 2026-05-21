// Level Summary — shows ISO 29119 area breakdown after simulation
import React from 'react';

const ISO_PARTS = {
  1: { name: 'Concepts & Definitions',  icon: '📖', color: '#a78bfa', key: 'iso1' },
  2: { name: 'Test Processes',          icon: '⚙️', color: '#60a5fa', key: 'iso2' },
  3: { name: 'Test Documentation',      icon: '📋', color: '#34d399', key: 'iso3' },
  4: { name: 'Test Techniques',         icon: '🔬', color: '#fbbf24', key: 'iso4' },
  5: { name: 'Keyword-Driven Testing',  icon: '🤖', color: '#f87171', key: 'iso5' },
};

function getPartFromRef(isoRef) {
  if (!isoRef) return null;
  const m = isoRef.match(/29119-(\d)/);
  return m ? parseInt(m[1]) : null;
}

function analyzeISO(decisionsLog) {
  const stats = {};
  Object.keys(ISO_PARTS).forEach(part => {
    stats[part] = { total: 0, best: 0, good: 0, neutral: 0, bad: 0 };
  });

  decisionsLog.forEach(entry => {
    const part = getPartFromRef(entry.isoRef);
    if (!part || !stats[part]) return;
    stats[part].total++;
    stats[part][entry.quality] = (stats[part][entry.quality] || 0) + 1;
  });

  return stats;
}

function getAreaRating(s) {
  if (s.total === 0) return { label: 'NOT TESTED', color: '#5a7090', score: null };
  const score = s.total > 0 ? ((s.best * 100 + s.good * 70 + s.neutral * 40 + s.bad * 0) / (s.total * 100)) * 100 : 0;
  if (score >= 80) return { label: 'STRONG ✅',   color: '#30d158', score };
  if (score >= 55) return { label: 'DECENT 👍',   color: '#60a5fa', score };
  if (score >= 35) return { label: 'WEAK ⚠️',     color: '#ff9f0a', score };
  return            { label: 'CRITICAL ❌',        color: '#ff2d55', score };
}

export default function LevelSummary({ decisionsLog = [], scenarioId }) {
  const stats = analyzeISO(decisionsLog);
  const parts = Object.entries(ISO_PARTS);

  const testedParts = parts.filter(([p]) => stats[p]?.total > 0);
  const strongAreas = testedParts.filter(([p]) => getAreaRating(stats[p]).score >= 80);
  const weakAreas   = testedParts.filter(([p]) => getAreaRating(stats[p]).score < 55);

  return (
    <div className="ls-wrap">
      <div className="ls-header">
        <div className="ls-badge">📊 ISO 29119 PERFORMANCE ANALYSIS</div>
        <h3 className="ls-title">Standards Coverage Report</h3>
      </div>

      {/* Quick insight bar */}
      {(strongAreas.length > 0 || weakAreas.length > 0) && (
        <div className="ls-insights">
          {strongAreas.length > 0 && (
            <div className="ls-insight ls-insight-good">
              <span className="ls-insight-icon">💪</span>
              <div>
                <div className="ls-insight-label">STRONG AREAS</div>
                <div className="ls-insight-text">
                  {strongAreas.map(([p]) => `29119-${p} ${ISO_PARTS[p].name}`).join(', ')}
                </div>
              </div>
            </div>
          )}
          {weakAreas.length > 0 && (
            <div className="ls-insight ls-insight-bad">
              <span className="ls-insight-icon">📚</span>
              <div>
                <div className="ls-insight-label">NEEDS REVIEW</div>
                <div className="ls-insight-text">
                  {weakAreas.map(([p]) => `29119-${p} ${ISO_PARTS[p].name}`).join(', ')}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Per-part breakdown */}
      <div className="ls-parts">
        {parts.map(([partNum, info]) => {
          const s = stats[partNum];
          const rating = getAreaRating(s);
          const barWidth = rating.score !== null ? `${rating.score}%` : '0%';
          return (
            <div key={partNum} className="ls-part-row" style={{ '--part-color': info.color }}>
              <div className="ls-part-left">
                <span className="ls-part-icon">{info.icon}</span>
                <div className="ls-part-info">
                  <div className="ls-part-ref">ISO 29119-{partNum}</div>
                  <div className="ls-part-name">{info.name}</div>
                </div>
              </div>
              <div className="ls-part-mid">
                {s.total > 0 ? (
                  <div className="ls-decision-dots">
                    {Array.from({ length: s.best }).map((_, i) => (
                      <span key={`b${i}`} className="ls-dot ls-dot-best" title="Best choice" />
                    ))}
                    {Array.from({ length: s.good }).map((_, i) => (
                      <span key={`g${i}`} className="ls-dot ls-dot-good" title="Good choice" />
                    ))}
                    {Array.from({ length: s.neutral }).map((_, i) => (
                      <span key={`n${i}`} className="ls-dot ls-dot-neutral" title="Neutral" />
                    ))}
                    {Array.from({ length: s.bad }).map((_, i) => (
                      <span key={`bd${i}`} className="ls-dot ls-dot-bad" title="Poor choice" />
                    ))}
                  </div>
                ) : (
                  <span className="ls-not-tested">Not covered in this scenario</span>
                )}
                {rating.score !== null && (
                  <div className="ls-bar-track">
                    <div className="ls-bar-fill" style={{ width: barWidth, background: rating.color }} />
                  </div>
                )}
              </div>
              <div className="ls-part-right">
                <span className="ls-rating" style={{ color: rating.color }}>{rating.label}</span>
                {s.total > 0 && (
                  <span className="ls-count">{s.total} question{s.total !== 1 ? 's' : ''}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="ls-legend">
        <span className="ls-legend-dot ls-dot-best" /> Best
        <span className="ls-legend-dot ls-dot-good" /> Good
        <span className="ls-legend-dot ls-dot-neutral" /> Neutral
        <span className="ls-legend-dot ls-dot-bad" /> Poor
      </div>

      <style>{`
        .ls-wrap { display: flex; flex-direction: column; gap: 20px; }

        .ls-header { }
        .ls-badge { font-size: 0.6rem; font-weight: 900; color: var(--accent-primary); letter-spacing: 0.15em; margin-bottom: 6px; }
        .ls-title { font-size: 1.1rem; font-weight: 900; color: white; }

        .ls-insights { display: flex; flex-direction: column; gap: 10px; }
        .ls-insight {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 16px; border-radius: 10px;
        }
        .ls-insight-good { background: rgba(48,209,88,0.08); border: 1px solid rgba(48,209,88,0.2); }
        .ls-insight-bad  { background: rgba(255,159,10,0.08); border: 1px solid rgba(255,159,10,0.2); }
        .ls-insight-icon { font-size: 1.1rem; margin-top: 2px; }
        .ls-insight-label { font-size: 0.6rem; font-weight: 900; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 3px; }
        .ls-insight-text { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; }

        .ls-parts { display: flex; flex-direction: column; gap: 12px; }
        .ls-part-row {
          display: grid; grid-template-columns: 200px 1fr 140px;
          align-items: center; gap: 16px;
          padding: 12px 16px; border-radius: 10px;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          transition: border-color 0.2s;
        }
        .ls-part-row:hover { border-color: color-mix(in srgb, var(--part-color) 30%, transparent); }

        .ls-part-left { display: flex; align-items: center; gap: 12px; }
        .ls-part-icon { font-size: 1.1rem; }
        .ls-part-ref { font-size: 0.65rem; font-weight: 900; color: var(--part-color); font-family: var(--mono); }
        .ls-part-name { font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; }

        .ls-part-mid { display: flex; flex-direction: column; gap: 6px; }
        .ls-decision-dots { display: flex; flex-wrap: wrap; gap: 4px; }
        .ls-dot {
          width: 10px; height: 10px; border-radius: 50%; display: inline-block;
        }
        .ls-dot-best    { background: #30d158; }
        .ls-dot-good    { background: #60a5fa; }
        .ls-dot-neutral { background: #ff9f0a; }
        .ls-dot-bad     { background: #ff2d55; }
        .ls-not-tested  { font-size: 0.65rem; color: var(--text-muted); font-style: italic; }

        .ls-bar-track {
          height: 4px; background: rgba(255,255,255,0.06);
          border-radius: 99px; overflow: hidden;
        }
        .ls-bar-fill {
          height: 100%; border-radius: 99px;
          transition: width 1s ease;
          box-shadow: 0 0 8px currentColor;
        }

        .ls-part-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
        .ls-rating { font-size: 0.72rem; font-weight: 800; }
        .ls-count { font-size: 0.62rem; color: var(--text-muted); }

        .ls-legend {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
          font-size: 0.68rem; color: var(--text-muted); padding-top: 4px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .ls-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 4px; }

        @media (max-width: 700px) {
          .ls-part-row { grid-template-columns: 1fr; gap: 8px; }
        }
      `}</style>
    </div>
  );
}
