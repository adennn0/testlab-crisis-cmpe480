// FR-10: Outcome determination algorithm — 4 possible endings

import { getGrade } from './scoring.js';

const OUTCOMES = {
  legendary: {
    id: 'legendary',
    title: 'Crisis Mastery',
    subtitle: 'You turned disaster into triumph',
    emoji: '🏆',
    description:
      'Your leadership transformed a catastrophic crisis into a case study in excellence. Stakeholder trust reached new heights, the team is stronger, and your testing practices are now the benchmark for the industry.',
    color: 'var(--outcome-legendary)',
    bgClass: 'outcome-legendary',
    achievements: [
      'Zero-regression release post-crisis',
      'Stakeholder trust above 80',
      'Team morale sustained throughout',
      'Risk exposure fully mitigated',
    ],
    shareText: 'I achieved Crisis Mastery in TestLab Crisis — the ultimate QA simulation!',
  },
  success: {
    id: 'success',
    title: 'Successful Recovery',
    subtitle: 'Professional crisis management',
    emoji: '✅',
    description:
      'You guided the team through the crisis with competence and composure. The system is restored, stakeholders are satisfied, and you\'ve laid strong foundations for future resilience.',
    color: 'var(--outcome-success)',
    bgClass: 'outcome-success',
    achievements: [
      'Crisis contained within timeline',
      'All critical defects resolved',
      'Positive stakeholder outcome',
    ],
    shareText: 'I successfully resolved the crisis in TestLab Crisis — a QA simulation game!',
  },
  partial: {
    id: 'partial',
    title: 'Partial Recovery',
    subtitle: 'Some fires still smouldering',
    emoji: '⚠️',
    description:
      'You managed to stabilise the system but left some critical areas unresolved. Stakeholders are cautiously satisfied but the team carries the weight of unfinished work and deferred risks.',
    color: 'var(--outcome-partial)',
    bgClass: 'outcome-partial',
    achievements: [
      'Core systems restored',
      'Some risks remain unmitigated',
    ],
    shareText: 'I achieved a partial recovery in TestLab Crisis. Can you do better?',
  },
  catastrophe: {
    id: 'catastrophe',
    title: 'Catastrophic Failure',
    subtitle: 'The crisis won',
    emoji: '💀',
    description:
      'Critical decisions undermined the crisis response. Stakeholder trust collapsed, the team is burnt out, and unresolved technical debt will haunt the organisation for months. A hard but valuable lesson.',
    color: 'var(--outcome-crisis)',
    bgClass: 'outcome-catastrophe',
    achievements: [],
    shareText: 'I learned hard lessons in TestLab Crisis. Try the QA crisis simulation!',
  },
};

/**
 * FR-10: Determine outcome based on final metrics and score.
 */
export function calculateOutcome(metrics, score) {
  const grade = getGrade(score);
  const { stakeholderTrust, teamMorale, riskExposure } = metrics;

  // Catastrophe: grade F or multiple metrics in critical zone
  if (grade === 'F' || stakeholderTrust < 30 || riskExposure > 80) {
    return { ...OUTCOMES.catastrophe, grade, score };
  }

  // Partial: grade C or one key metric severely degraded
  if (grade === 'C' || stakeholderTrust < 50 || teamMorale < 35) {
    return { ...OUTCOMES.partial, grade, score };
  }

  // Legendary: grade S with strong metrics
  if (grade === 'S' && stakeholderTrust >= 75 && teamMorale >= 60 && riskExposure <= 35) {
    return { ...OUTCOMES.legendary, grade, score };
  }

  // Default: successful recovery
  return { ...OUTCOMES.success, grade, score };
}

export { OUTCOMES };
