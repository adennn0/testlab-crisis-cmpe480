// FR-14: Animated metric bar component

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

  return (
    <div className={`metric-card ${compact ? 'metric-card--compact' : ''}`} data-zone={zone}>
      <div className="metric-card-top">
        <div className="metric-card-info">
          <span className="metric-card-icon">{config?.icon}</span>
          <span className="metric-card-title">{config?.label}</span>
        </div>
        {showDelta && (
          <span className={`metric-card-delta ${delta > 0 ? 'delta-up' : 'delta-down'}`}>
            {formatDelta(delta)}
          </span>
        )}
      </div>

      <div className="metric-card-body">
        <span className="metric-card-value">{Math.round(animatedValue)}</span>
        <div className="metric-card-status">
          <span className="status-dot"></span>
          {statusLabel}
        </div>
      </div>

      <div className="metric-card-footer">
        <div className="metric-mini-bar">
          <div
            className="metric-mini-fill"
            style={{
              width: `${animatedValue}%`,
              background: barColor,
              boxShadow: `0 0 6px ${barColor}`,
            }}
          />
        </div>
      </div>

      <style>{`
        .metric-card {
          display: flex; flex-direction: column; gap: 12px;
          background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); padding: 16px;
          transition: all var(--transition-normal);
          position: relative; overflow: hidden;
          cursor: default;
        }
        .metric-card:hover {
          transform: translateY(-2px) scale(1.02);
          background: var(--bg-card-hover);
          border-color: var(--border-glow);
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }

        /* Status Accents */
        .metric-card[data-zone="optimal"] { border-left: 4px solid var(--zone-optimal-bar); }
        .metric-card[data-zone="safe"]    { border-left: 4px solid var(--zone-safe-bar); }
        .metric-card[data-zone="warning"] { border-left: 4px solid var(--zone-warning-bar); }
        .metric-card[data-zone="critical"]{ border-left: 4px solid var(--zone-critical-bar); }

        .metric-card-top { display: flex; justify-content: space-between; align-items: center; }
        .metric-card-info { display: flex; align-items: center; gap: 8px; }
        .metric-card-icon { font-size: 1rem; }
        .metric-card-title {
          font-size: 0.7rem; font-weight: 700; color: var(--text-secondary);
          letter-spacing: 0.05em; text-transform: uppercase;
        }

        .metric-card-delta {
          font-family: var(--mono); font-size: 0.7rem; font-weight: 800;
          padding: 2px 6px; border-radius: 4px;
        }
        .delta-up { color: var(--zone-safe-text); background: var(--zone-safe-bg); }
        .delta-down { color: var(--zone-critical-text); background: var(--zone-critical-bg); }

        .metric-card-body {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-top: -4px;
        }
        .metric-card-value {
          font-family: var(--mono); font-size: 1.75rem; font-weight: 800;
          color: var(--text-primary); line-height: 1;
        }
        .metric-card-status {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.65rem; font-weight: 800; letter-spacing: 0.08em;
          color: var(--text-muted); text-transform: uppercase;
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

        .metric-card[data-zone="optimal"] .metric-card-status { color: var(--zone-optimal-text); }
        .metric-card[data-zone="safe"]    .metric-card-status { color: var(--zone-safe-text); }
        .metric-card[data-zone="warning"] .metric-card-status { color: var(--zone-warning-text); }
        .metric-card[data-zone="critical"].metric-card-status { color: var(--zone-critical-text); }

        .metric-card-footer { margin-top: auto; }
        .metric-mini-bar {
          height: 4px; background: rgba(255,255,255,0.05);
          border-radius: var(--radius-full); overflow: hidden;
        }
        .metric-mini-fill {
          height: 100%; border-radius: var(--radius-full);
          transition: width 0.7s cubic-bezier(0.4,0,0.2,1);
        }

        .metric-card--compact { padding: 12px; gap: 8px; }
        .metric-card--compact .metric-card-value { font-size: 1.25rem; }
      `}</style>
    </div>
  );
}
