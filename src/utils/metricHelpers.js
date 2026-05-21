// Metric helpers — formatting and delta application (no clamping)

export function applyDeltas(metrics, deltas) {
  const updated = { ...metrics };
  Object.entries(deltas || {}).forEach(([key, delta]) => {
    if (key in updated) {
      updated[key] = (updated[key] ?? 0) + delta;
    }
  });
  return updated;
}

export function formatDelta(delta) {
  if (delta === 0) return '±0';
  return delta > 0 ? `+${delta}` : `${delta}`;
}
