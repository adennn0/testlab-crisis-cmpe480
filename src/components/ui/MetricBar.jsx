// FR-14: Metric card — supports full and compact modes
import { useEffect, useMemo, useState } from 'react';
import { useCountAnimation } from '../../hooks/useMetricAnimation.js';
import { formatDelta } from '../../utils/metricHelpers.js';
import { METRICS_CONFIG } from '../../state/initialState.js';

export default function MetricBar({ metricKey, value, prevValue, flash = null, compact = false }) {
  const config = METRICS_CONFIG[metricKey];
  const numericValue = value ?? 0;
  const animatedValue = useCountAnimation(numericValue, 400);
  const isPositive = animatedValue > 0;
  const barColor = isPositive ? 'var(--zone-safe-bar)' : 'var(--zone-critical-bar)';

  const [maxAbs, setMaxAbs] = useState(() => {
    const initial = Math.max(10, Math.abs(numericValue), Math.abs(prevValue ?? 0));
    return initial;
  });

  useEffect(() => {
    const next = Math.max(maxAbs, Math.abs(numericValue), Math.abs(prevValue ?? 0));
    if (next !== maxAbs) setMaxAbs(next);
  }, [numericValue, prevValue, maxAbs]);

  const computedDelta = useMemo(() => numericValue - (prevValue ?? numericValue), [numericValue, prevValue]);
  const [transientDelta, setTransientDelta] = useState(null);

  useEffect(() => {
    if (computedDelta === 0) return;

    setTransientDelta(computedDelta);
    const deltaTimer = setTimeout(() => setTransientDelta(null), 2000);
    return () => {
      clearTimeout(deltaTimer);
    };
  }, [computedDelta]);

  const showDelta = transientDelta !== null;
  const delta = transientDelta ?? 0;
  const deltaClass = delta > 0 ? 'delta-positive' : 'delta-negative';

  const flashClass = flash === 'increase' ? 'flash-up' : flash === 'decrease' ? 'flash-down' : '';

  const fillHalfWidthPct = useMemo(() => {
    const denom = maxAbs || 1;
    const magnitude = Math.min(1, Math.abs(animatedValue) / denom);
    return magnitude * 50;
  }, [animatedValue, maxAbs]);

  const fillStyle = useMemo(() => {
    if (animatedValue === 0) return { width: '0%', left: '50%' };

    if (animatedValue > 0) {
      return { width: `${fillHalfWidthPct}%`, left: '50%' };
    }

    return { width: `${fillHalfWidthPct}%`, left: `${50 - fillHalfWidthPct}%` };
  }, [animatedValue, fillHalfWidthPct]);

  if (compact) {
    return (
      <div className={`mc-compact ${flashClass}`}>
        <div className="mc-compact-top">
          <span className="mc-compact-icon">{config?.icon}</span>
          <span className="mc-compact-val">
            {Math.round(animatedValue)}
            {showDelta && (
              <span className={`mc-compact-val-delta ${deltaClass}`}> ({formatDelta(delta)})</span>
            )}
          </span>
        </div>
        <div className="mc-compact-label">{config?.label}</div>
        <div className="mc-compact-bar">
          <div className="mc-baseline" />
          <div className="mc-compact-fill" style={{ ...fillStyle, background: barColor }} />
        </div>
        <style>{`
          .mc-compact {
            padding: 10px 14px; border-radius: 12px;
            background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border);
            transition: all 0.2s; display: flex; flex-direction: column; gap: 6px;
          }
          .mc-compact.flash-up {
            box-shadow: 0 0 0 2px color-mix(in srgb, var(--zone-safe-bar) 55%, transparent);
            background: color-mix(in srgb, var(--zone-safe-bg) 35%, rgba(255,255,255,0.02));
          }
          .mc-compact.flash-down {
            box-shadow: 0 0 0 2px color-mix(in srgb, var(--zone-critical-bar) 55%, transparent);
            background: color-mix(in srgb, var(--zone-critical-bg) 35%, rgba(255,255,255,0.02));
          }
          .mc-compact:hover { background: rgba(255,255,255,0.05); border-color: var(--border-glow); }
          .mc-compact-top { display: flex; align-items: center; gap: 6px; }
          .mc-compact-icon { font-size: 0.85rem; }
          .mc-compact-val { font-family: var(--mono); font-size: 1.1rem; font-weight: 900; color: white; }
          .mc-compact-val-delta { font-size: 0.65rem; font-weight: 900; }
          .mc-compact-val-delta.delta-positive { color: var(--zone-safe-text); }
          .mc-compact-val-delta.delta-negative { color: var(--zone-critical-text); }
          .mc-compact-label { font-size: 0.55rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.08em; text-transform: uppercase; }
          .mc-compact-bar {
            position: relative;
            height: 4px;
            background: rgba(255,255,255,0.05);
            border-radius: 99px;
            overflow: hidden;
          }
          .mc-baseline {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 2px;
            transform: translateX(-1px);
            background: rgba(255,255,255,0.25);
          }
          .mc-compact-fill {
            position: absolute;
            top: 0;
            bottom: 0;
            border-radius: 99px;
            transition: left 0.4s ease, width 0.4s ease;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`metric-card glass-panel ${flashClass}`}>
      <div className="metric-card-top">
        <div className="metric-card-info">
          <div className="metric-icon-box"><span className="metric-card-icon">{config?.icon}</span></div>
          <span className="metric-card-title">{config?.label}</span>
        </div>
        {showDelta && (
          <span className={`metric-card-delta ${delta > 0 ? 'delta-up' : 'delta-down'}`}>
            {formatDelta(delta)}
          </span>
        )}
      </div>
      <div className="metric-card-body">
        <div className="value-wrap">
          <span className="metric-card-value">{Math.round(animatedValue)}</span>
          <span className="metric-unit">{config?.unit}</span>
        </div>
        <div className="metric-card-status"><span className="status-dot"></span>{animatedValue === 0 ? 'NEUTRAL' : (animatedValue > 0 ? 'POSITIVE' : 'NEGATIVE')}</div>
      </div>
      <div className="metric-mini-bar">
        <div className="metric-baseline" />
        <div className="metric-mini-fill" style={{ ...fillStyle, background: barColor, boxShadow: `0 0 10px ${barColor}` }} />
      </div>
      <style>{`
        .metric-card { display: flex; flex-direction: column; gap: 16px; padding: 20px; border: 1px solid var(--glass-border); transition: all var(--transition-normal); }
        .metric-card.flash-up {
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--zone-safe-bar) 55%, transparent);
          background: color-mix(in srgb, var(--zone-safe-bg) 35%, rgba(255,255,255,0.03));
        }
        .metric-card.flash-down {
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--zone-critical-bar) 55%, transparent);
          background: color-mix(in srgb, var(--zone-critical-bg) 35%, rgba(255,255,255,0.03));
        }
        .metric-card:hover { transform: translateY(-4px) scale(1.02); background: rgba(255,255,255,0.05); border-color: var(--accent-primary); box-shadow: var(--shadow-glow); }
        .metric-icon-box { width: 32px; height: 32px; background: var(--bg-surface); border-radius: 8px; border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; }
        .metric-card-top { display: flex; justify-content: space-between; align-items: center; }
        .metric-card-info { display: flex; align-items: center; gap: 12px; }
        .metric-card-icon { font-size: 1.1rem; }
        .metric-card-title { font-size: 0.65rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; }
        .metric-card-delta { font-family: var(--mono); font-size: 0.65rem; font-weight: 900; padding: 2px 8px; border-radius: 4px; }
        .delta-up { color: var(--zone-safe-text); background: var(--zone-safe-bg); }
        .delta-down { color: var(--zone-critical-text); background: var(--zone-critical-bg); }
        .metric-card-body { display: flex; align-items: center; justify-content: space-between; }
        .value-wrap { display: flex; align-items: baseline; gap: 4px; }
        .metric-card-value { font-family: var(--mono); font-size: 2rem; font-weight: 900; color: white; line-height: 1; }
        .metric-unit { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
        .metric-card-status { display: flex; align-items: center; gap: 8px; font-size: 0.65rem; font-weight: 900; letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; box-shadow: 0 0 10px currentColor; }
        .metric-mini-bar { position: relative; height: 6px; background: rgba(255,255,255,0.03); border-radius: 99px; overflow: hidden; }
        .metric-baseline {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-1px);
          background: rgba(255,255,255,0.25);
        }
        .metric-mini-fill { position: absolute; top: 0; bottom: 0; border-radius: 99px; transition: left 0.4s ease, width 0.4s ease; }
      `}</style>
    </div>
  );
}
