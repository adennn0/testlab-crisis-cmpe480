// MetricPanel — compact horizontal metric cards for top bar

import MetricBar from './MetricBar.jsx';
import { METRIC_KEYS } from '../../state/initialState.js';

export default function MetricPanel({ metrics, prevMetrics, horizontal = false }) {
  return (
    <div className={`metric-panel ${horizontal ? 'metric-panel--horizontal' : ''}`}>
      <div className={`metric-panel-list ${horizontal ? 'metric-list--horizontal' : ''}`}>
        {METRIC_KEYS.map((key) => (
          <MetricBar
            key={key}
            metricKey={key}
            value={metrics[key]}
            prevValue={prevMetrics?.[key]}
            compact={horizontal}
          />
        ))}
      </div>

      <style>{`
        .metric-panel {
          display: flex; flex-direction: column; gap: 16px;
        }
        .metric-panel--horizontal { gap: 0; }
        .metric-panel-list { display: flex; flex-direction: column; gap: 12px; }
        .metric-list--horizontal {
          flex-direction: row; gap: 8px; overflow-x: auto;
          scrollbar-width: none;
        }
        .metric-list--horizontal::-webkit-scrollbar { display: none; }
        .metric-list--horizontal > * { flex: 1; min-width: 130px; }
      `}</style>
    </div>
  );
}
