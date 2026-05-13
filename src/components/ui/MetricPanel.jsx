// MetricPanel — shows all 7 metrics in the sidebar

import MetricBar from './MetricBar.jsx';
import { METRIC_KEYS } from '../../state/initialState.js';

export default function MetricPanel({ metrics, prevMetrics }) {
  return (
    <div className="metric-panel">
      <div className="metric-panel-header">
        <span className="metric-panel-title">SYSTEM METRICS</span>
        <span className="metric-panel-subtitle">Live Status</span>
      </div>
      <div className="metric-panel-list">
        {METRIC_KEYS.map((key) => (
          <MetricBar
            key={key}
            metricKey={key}
            value={metrics[key]}
            prevValue={prevMetrics?.[key]}
          />
        ))}
      </div>

      <style>{`
        .metric-panel {
          display: flex; flex-direction: column; gap: 24px;
          background: var(--bg-surface); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg); padding: 24px;
          box-shadow: var(--shadow-card);
        }
        .metric-panel-header {
          display: flex; justify-content: space-between; align-items: baseline;
          padding-bottom: 16px; border-bottom: 1px solid var(--border-subtle);
        }
        .metric-panel-title {
          font-size: 0.75rem; font-weight: 800; letter-spacing: 0.15em;
          color: var(--accent-primary); text-transform: uppercase;
        }
        .metric-panel-subtitle {
          font-size: 0.65rem; color: var(--text-muted); font-weight: 600;
          display: flex; align-items: center; gap: 6px;
        }
        .metric-panel-subtitle::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--zone-safe-bar);
          box-shadow: 0 0 8px var(--zone-safe-bar);
          animation: pulseGlow 2s ease-in-out infinite;
          display: inline-block;
        }
        .metric-panel-list { display: flex; flex-direction: column; gap: 16px; }
      `}</style>
    </div>
  );
}
