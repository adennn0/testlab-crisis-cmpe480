// FR-10: Result screen — 4 different endings

import { useEffect, useRef } from 'react';
import { METRICS_CONFIG, METRIC_KEYS } from '../../state/initialState.js';
import { getMetricColor, getMetricZone } from '../../utils/metricHelpers.js';
import { useCountAnimation } from '../../hooks/useMetricAnimation.js';

function AnimatedScore({ score }) {
  const animated = useCountAnimation(score, 1200);
  return <span>{animated.toLocaleString()}</span>;
}

export default function ResultScreen({ outcome, metrics, decisionsLog, onReplay, onMenu }) {
  if (!outcome) return null;

  const { title, subtitle, emoji, description, achievements, grade, score } = outcome;

  const totalDecisions = decisionsLog?.length || 0;
  const bestChoices = decisionsLog?.filter((d) => d.quality === 'best').length || 0;
  const crisisCount = decisionsLog?.filter((d) => d.isCrisis).length || 0;

  return (
    <div className="result-screen" data-outcome={outcome.id}>
      {/* Background glow */}
      <div className="result-bg-glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${outcome.color}22, transparent 60%)` }} />

      <div className="result-content">
        {/* Main outcome card */}
        <div className="result-card anim-fade-in">
          <div className="result-emoji">{emoji}</div>
          <div className="result-grade-wrap">
            <div
              className="result-grade font-display"
              style={{ color: outcome.color, borderColor: outcome.color, boxShadow: `0 0 40px ${outcome.color}` }}
            >
              {grade}
            </div>
          </div>
          <h1 className="result-title">{title}</h1>
          <p className="result-subtitle">{subtitle}</p>

          <div className="result-score-row">
            <span className="result-score-label font-mono">FINAL SCORE</span>
            <span className="result-score font-mono" style={{ color: outcome.color }}>
              <AnimatedScore score={score} />
            </span>
          </div>

          <p className="result-description">{description}</p>
        </div>

        {/* Stats row */}
        <div className="result-stats anim-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {[
            { label: 'Decisions Made', value: totalDecisions, icon: '🎯' },
            { label: 'Optimal Choices', value: bestChoices, icon: '✅' },
            { label: 'Crisis Events', value: crisisCount, icon: '⚡' },
          ].map((s) => (
            <div key={s.label} className="result-stat-card">
              <span className="result-stat-icon">{s.icon}</span>
              <span className="result-stat-value font-mono">{s.value}</span>
              <span className="result-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Achievements */}
        {achievements?.length > 0 && (
          <div className="result-achievements anim-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="result-section-label font-mono">ACHIEVEMENTS UNLOCKED</div>
            {achievements.map((a, i) => (
              <div key={i} className="result-achievement">
                <span>🏅</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        )}

        {/* Final metric summary */}
        <div className="result-metrics anim-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="result-section-label font-mono">FINAL METRIC STATUS</div>
          <div className="result-metrics-grid">
            {METRIC_KEYS.map((key) => {
              const cfg = METRICS_CONFIG[key];
              const val = metrics?.[key] ?? 0;
              const zone = getMetricZone(val, cfg?.inverted);
              const color = getMetricColor(val, cfg?.inverted);
              return (
                <div key={key} className="result-metric-item" data-zone={zone}>
                  <span>{cfg?.icon}</span>
                  <span className="result-metric-name">{cfg?.label}</span>
                  <div className="result-metric-bar-wrap">
                    <div className="result-metric-bar" style={{ width: `${val}%`, background: color }} />
                  </div>
                  <span className="result-metric-val font-mono">{val}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="result-actions anim-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <button id="btn-play-again" className="btn btn-primary result-btn" onClick={onReplay}>
            🔄 Play Again
          </button>
          <button id="btn-main-menu" className="btn btn-secondary result-btn" onClick={onMenu}>
            🏠 Main Menu
          </button>
        </div>
      </div>

      <style>{`
        .result-screen {
          min-height: 100vh; display: flex; align-items: flex-start;
          justify-content: center; padding: 40px 24px; position: relative; overflow: hidden;
        }
        .result-bg-glow { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
        .result-content {
          max-width: 680px; width: 100%; display: flex; flex-direction: column;
          gap: 20px; position: relative; z-index: 1;
        }
        .result-card {
          background: var(--bg-card); border: 1px solid var(--border-dim);
          border-radius: var(--radius-xl); padding: 36px 32px;
          text-align: center; display: flex; flex-direction: column;
          align-items: center; gap: 14px;
          box-shadow: var(--shadow-card);
          animation: resultReveal 0.6s both;
        }
        .result-emoji { font-size: 3.5rem; animation: gradeStamp 0.6s 0.2s both; }
        .result-grade-wrap { margin: 4px 0; }
        .result-grade {
          width: 72px; height: 72px; border-radius: 16px; border: 3px solid;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; font-weight: 900;
          animation: gradeStamp 0.7s 0.3s both;
        }
        .result-title { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); }
        .result-subtitle { font-size: 0.875rem; color: var(--text-secondary); }
        .result-score-row { display: flex; align-items: center; gap: 12px; }
        .result-score-label { font-size: 0.6rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.12em; }
        .result-score { font-size: 2rem; font-weight: 700; }
        .result-description {
          font-size: 0.875rem; color: var(--text-secondary); line-height: 1.7;
          max-width: 480px; text-align: center;
        }
        .result-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .result-stat-card {
          background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); padding: 16px 12px; text-align: center;
          display: flex; flex-direction: column; gap: 5px; align-items: center;
        }
        .result-stat-icon { font-size: 1.25rem; }
        .result-stat-value { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); }
        .result-stat-label { font-size: 0.6875rem; color: var(--text-muted); font-weight: 600; }
        .result-section-label {
          font-size: 0.6rem; font-weight: 800; color: var(--text-muted);
          letter-spacing: 0.12em; margin-bottom: 10px;
        }
        .result-achievements {
          background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 18px 20px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .result-achievement {
          display: flex; gap: 10px; align-items: center;
          font-size: 0.875rem; color: var(--text-secondary); padding: 6px 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .result-achievement:last-child { border-bottom: none; }
        .result-metrics {
          background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 18px 20px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .result-metrics-grid { display: flex; flex-direction: column; gap: 8px; }
        .result-metric-item {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 0; border-bottom: 1px solid var(--border-subtle);
        }
        .result-metric-item:last-child { border-bottom: none; }
        .result-metric-name { flex: 1; font-size: 0.8125rem; color: var(--text-secondary); }
        .result-metric-bar-wrap {
          width: 120px; height: 4px; background: var(--border-subtle);
          border-radius: var(--radius-full); overflow: hidden; flex-shrink: 0;
        }
        .result-metric-bar { height: 100%; border-radius: var(--radius-full); transition: width 1s ease; }
        .result-metric-val { font-size: 0.8125rem; font-weight: 700; color: var(--text-primary); min-width: 28px; text-align: right; }
        .result-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .result-btn { flex: 1; padding: 16px; font-size: 0.9375rem; min-width: 160px; }
        @media (max-width: 480px) {
          .result-stats { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
