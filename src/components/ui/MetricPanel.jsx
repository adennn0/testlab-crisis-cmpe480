// MetricPanel — compact horizontal metric cards for top bar

import MetricBar from './MetricBar.jsx';
import { METRIC_KEYS } from '../../state/initialState.js';
import { useEffect, useState } from 'react';

export default function MetricPanel({ metrics, prevMetrics, horizontal = false }) {
  const [flashState, setFlashState] = useState({});

  useEffect(() => {
    if (!metrics || !prevMetrics) return;

    const next = {};
    for (const k of METRIC_KEYS) {
      const delta = (metrics[k] ?? 0) - (prevMetrics[k] ?? 0);
      if (delta > 0) next[k] = 'increase';
      else if (delta < 0) next[k] = 'decrease';
    }

    if (Object.keys(next).length === 0) return;
    setFlashState(next);

    const t = setTimeout(() => setFlashState({}), 800);
    return () => clearTimeout(t);
  }, [metrics, prevMetrics]);

  return (
    <div className={`metric-panel ${horizontal ? 'metric-panel--horizontal' : ''}`}>
      <div className={`metric-panel-list ${horizontal ? 'metric-list--horizontal' : ''}`}>
        {METRIC_KEYS.map((key) => (
          <MetricBar
            key={key}
            metricKey={key}
            value={metrics[key]}
            prevValue={prevMetrics?.[key]}
            flash={flashState?.[key] || null}
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
