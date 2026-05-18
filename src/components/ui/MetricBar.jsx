// FR-14: Metric card — supports full and compact modes
import { useMetricAnimation } from '../../hooks/useMetricAnimation.js';
import { getMetricColor, getMetricZone, formatDelta, getZoneLabel } from '../../utils/metricHelpers.js';
import { METRICS_CONFIG } from '../../state/initialState.js';

export default function MetricBar({ metricKey, value, prevValue, compact = false }) {
  const config = METRICS_CONFIG[metricKey];
  const animatedValue = useMetricAnimation({ [metricKey]: value }, 700)[metricKey] ?? value;
  const zone = getMetricZone(value, config?.inverted);
  const barColor = getMetricColor(value, config?.inverted);
  const statusLabel = getZoneLabel(value, config?.inverted);
  const delta = value - (prevValue ?? value);
  const showDelta = delta !== 0;

  if (compact) {
    return (
      <div className="mc-compact" data-zone={zone}>
        <div className="mc-compact-top">
          <span className="mc-compact-icon">{config?.icon}</span>
          <span className="mc-compact-val">{Math.round(animatedValue)}</span>
          {showDelta && (
            <span className={`mc-compact-delta ${delta > 0 ? 'delta-up' : 'delta-down'}`}>
              {formatDelta(delta)}
            </span>
          )}
        </div>
        <div className="mc-compact-label">{config?.label}</div>
        <div className="mc-compact-bar">
          <div className="mc-compact-fill" style={{ width: `${animatedValue}%`, background: barColor }} />
        </div>
        <style>{`
          .mc-compact {
            padding: 10px 14px; border-radius: 12px;
            background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border);
            transition: all 0.2s; display: flex; flex-direction: column; gap: 6px;
          }
          .mc-compact:hover { background: rgba(255,255,255,0.05); border-color: var(--border-glow); }
          .mc-compact[data-zone="optimal"] { border-bottom: 2px solid var(--zone-optimal-bar); }
          .mc-compact[data-zone="safe"]    { border-bottom: 2px solid var(--zone-safe-bar); }
          .mc-compact[data-zone="warning"] { border-bottom: 2px solid var(--zone-warning-bar); }
          .mc-compact[data-zone="critical"]{ border-bottom: 2px solid var(--zone-critical-bar); }
          .mc-compact-top { display: flex; align-items: center; gap: 6px; }
          .mc-compact-icon { font-size: 0.85rem; }
          .mc-compact-val { font-family: var(--mono); font-size: 1.1rem; font-weight: 900; color: white; }
          .mc-compact-delta { font-family: var(--mono); font-size: 0.6rem; font-weight: 800; padding: 1px 4px; border-radius: 3px; }
          .mc-compact-label { font-size: 0.55rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.08em; text-transform: uppercase; }
          .mc-compact-bar { height: 2px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; }
          .mc-compact-fill { height: 100%; border-radius: 2px; transition: width 0.7s ease; }
          .delta-up { color: var(--zone-safe-text); background: var(--zone-safe-bg); }
          .delta-down { color: var(--zone-critical-text); background: var(--zone-critical-bg); }
        `}</style>
      </div>
    );
  }

  // Full card mode (same as before)
  return (
    <div className="metric-card glass-panel" data-zone={zone}>
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
        <div className="metric-card-status"><span className="status-dot"></span>{statusLabel}</div>
      </div>
      <div className="metric-mini-bar">
        <div className="metric-mini-fill" style={{ width: `${animatedValue}%`, background: barColor, boxShadow: `0 0 10px ${barColor}` }} />
      </div>
      <style>{`
        .metric-card { display: flex; flex-direction: column; gap: 16px; padding: 20px; border: 1px solid var(--glass-border); transition: all var(--transition-normal); }
        .metric-card:hover { transform: translateY(-4px) scale(1.02); background: rgba(255,255,255,0.05); border-color: var(--accent-primary); box-shadow: var(--shadow-glow); }
        .metric-icon-box { width: 32px; height: 32px; background: var(--bg-surface); border-radius: 8px; border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; }
        .metric-card[data-zone="optimal"] { border-left: 3px solid var(--zone-optimal-bar); }
        .metric-card[data-zone="safe"] { border-left: 3px solid var(--zone-safe-bar); }
        .metric-card[data-zone="warning"] { border-left: 3px solid var(--zone-warning-bar); }
        .metric-card[data-zone="critical"] { border-left: 3px solid var(--zone-critical-bar); }
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
        .metric-card[data-zone="optimal"] .metric-card-status { color: var(--zone-optimal-text); }
        .metric-card[data-zone="safe"] .metric-card-status { color: var(--zone-safe-text); }
        .metric-card[data-zone="warning"] .metric-card-status { color: var(--zone-warning-text); }
        .metric-card[data-zone="critical"] .metric-card-status { color: var(--zone-critical-text); }
        .metric-mini-bar { height: 3px; background: rgba(255,255,255,0.03); border-radius: 99px; overflow: hidden; }
        .metric-mini-fill { height: 100%; border-radius: 99px; transition: width 0.7s ease; }
      `}</style>
    </div>
  );
}
