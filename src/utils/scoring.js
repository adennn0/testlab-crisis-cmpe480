// FR-07: Scoring logic

import { METRICS_CONFIG } from '../state/initialState.js';

const QUALITY_BONUS = { best: 15, good: 8, neutral: 0, bad: -10 };
const BASE_PHASE_SCORE = 100;

/**
 * Calculate score earned from a single decision.
 */
export function calcDecisionScore(decision, phaseIndex) {
  const qualityBonus = QUALITY_BONUS[decision.quality] ?? 0;
  const phaseMultiplier = 1 + phaseIndex * 0.1; // Later phases worth more
  return Math.round((BASE_PHASE_SCORE / 4 + qualityBonus) * phaseMultiplier);
}

/**
 * Calculate score earned from a crisis resolution.
 */
export function calcCrisisScore(option) {
  const qualityBonus = QUALITY_BONUS[option.quality] ?? 0;
  return Math.round(BASE_PHASE_SCORE * 0.5 + qualityBonus * 2);
}

/**
 * Compute the weighted metric score (0-1000) from final metric values.
 */
export function calcFinalMetricScore(metrics) {
  let total = 0;
  Object.values(METRICS_CONFIG).forEach(({ key, weight, inverted }) => {
    const raw = Math.max(0, Math.min(100, metrics[key]));
    const normalised = inverted ? (100 - raw) / 100 : raw / 100;
    total += normalised * weight * 1000;
  });
  return Math.round(total);
}

/**
 * Get letter grade from numeric score.
 */
export function getGrade(score) {
  if (score >= 850) return 'S';
  if (score >= 700) return 'A';
  if (score >= 550) return 'B';
  if (score >= 400) return 'C';
  return 'F';
}

export function getGradeColor(grade) {
  const map = { S: 'var(--grade-s)', A: 'var(--grade-a)', B: 'var(--grade-b)', C: 'var(--grade-c)', F: 'var(--grade-f)' };
  return map[grade] ?? 'var(--text-muted)';
}
