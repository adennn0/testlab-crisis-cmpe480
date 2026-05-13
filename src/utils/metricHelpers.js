// Metric display helpers — color zones and formatting

export function getMetricZone(value, inverted = false) {
  const v = inverted ? 100 - value : value;
  if (v >= 75) return 'optimal';
  if (v >= 50) return 'safe';
  if (v >= 30) return 'warning';
  return 'critical';
}

export function getMetricColor(value, inverted = false) {
  const zone = getMetricZone(value, inverted);
  const map = {
    optimal:  'var(--zone-optimal-bar)',
    safe:     'var(--zone-safe-bar)',
    warning:  'var(--zone-warning-bar)',
    critical: 'var(--zone-critical-bar)',
  };
  return map[zone];
}

export function getMetricTextColor(value, inverted = false) {
  const zone = getMetricZone(value, inverted);
  const map = {
    optimal:  'var(--zone-optimal-text)',
    safe:     'var(--zone-safe-text)',
    warning:  'var(--zone-warning-text)',
    critical: 'var(--zone-critical-text)',
  };
  return map[zone];
}

export function getZoneLabel(value, inverted = false) {
  const zone = getMetricZone(value, inverted);
  const map = { optimal: 'OPTIMAL', safe: 'STABLE', warning: 'WARNING', critical: 'CRITICAL' };
  return map[zone];
}

export function clampMetric(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function applyDeltas(metrics, deltas) {
  const updated = { ...metrics };
  Object.entries(deltas || {}).forEach(([key, delta]) => {
    if (key in updated) {
      updated[key] = clampMetric(updated[key] + delta);
    }
  });
  return updated;
}

export function formatDelta(delta) {
  if (delta === 0) return '±0';
  return delta > 0 ? `+${delta}` : `${delta}`;
}
