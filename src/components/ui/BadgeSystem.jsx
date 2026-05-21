// Badge system — earned based on performance and ISO 29119 area coverage
import React from 'react';

// Badge definitions keyed by id
export const BADGE_DEFINITIONS = {
  // ISO Part mastery badges
  'iso2-master': {
    id: 'iso2-master',
    icon: '⚙️',
    title: '29119-2 Process Master',
    desc: 'Demonstrated excellence in ISO 29119 Test Processes',
    color: '#60a5fa',
    condition: (log) => countByISO(log, 2, 'best') >= 3,
  },
  'iso3-master': {
    id: 'iso3-master',
    icon: '📋',
    title: '29119-3 Documentation Pro',
    desc: 'Expert in ISO 29119 Test Documentation standards',
    color: '#34d399',
    condition: (log) => countByISO(log, 3, 'best') >= 2,
  },
  'iso4-master': {
    id: 'iso4-master',
    icon: '🔬',
    title: '29119-4 Techniques Expert',
    desc: 'Mastery of ISO 29119 Test Techniques',
    color: '#fbbf24',
    condition: (log) => countByISO(log, 4, 'best') >= 3,
  },
  'iso1-master': {
    id: 'iso1-master',
    icon: '📖',
    title: '29119-1 Concepts Champion',
    desc: 'Deep understanding of ISO 29119 Concepts & Definitions',
    color: '#a78bfa',
    condition: (log) => countByISO(log, 1, 'best') >= 2,
  },
  // Performance badges
  'risk-analyst': {
    id: 'risk-analyst',
    icon: '⚠️',
    title: 'Risk Analyst',
    desc: 'Consistently reduced Risk Exposure through smart decisions',
    color: '#f87171',
    condition: (log, metrics) => (metrics?.riskExposure || 100) <= 30,
  },
  'trust-builder': {
    id: 'trust-builder',
    icon: '🤝',
    title: 'Trust Builder',
    desc: 'Maintained Stakeholder Trust above 80%',
    color: '#fbbf24',
    condition: (log, metrics) => (metrics?.stakeholderTrust || 0) >= 80,
  },
  'coverage-hero': {
    id: 'coverage-hero',
    icon: '🎯',
    title: 'Coverage Hero',
    desc: 'Achieved Test Coverage above 85%',
    color: '#60a5fa',
    condition: (log, metrics) => (metrics?.testCoverage || 0) >= 85,
  },
  'budget-guru': {
    id: 'budget-guru',
    icon: '💰',
    title: 'Budget Guru',
    desc: 'Maintained Budget Efficiency above 75%',
    color: '#34d399',
    condition: (log, metrics) => (metrics?.budgetEfficiency || 0) >= 75,
  },
  'morale-captain': {
    id: 'morale-captain',
    icon: '💪',
    title: 'Morale Captain',
    desc: 'Kept Team Morale high throughout the simulation',
    color: '#fb923c',
    condition: (log, metrics) => (metrics?.teamMorale || 0) >= 80,
  },
  // Play style badges
  'swift-responder': {
    id: 'swift-responder',
    icon: '⚡',
    title: 'Swift Responder',
    desc: 'Made all decisions with time to spare',
    color: '#f0abfc',
    condition: (log) => log.length >= 8 && log.every(d => !d.timedOut),
  },
  'no-bad-calls': {
    id: 'no-bad-calls',
    icon: '✅',
    title: 'Flawless Protocol',
    desc: 'Made zero poor decisions in the simulation',
    color: '#34d399',
    condition: (log) => log.length > 0 && log.filter(d => d.quality === 'poor' || d.quality === 'worst').length === 0,
  },
  'crisis-survivor': {
    id: 'crisis-survivor',
    icon: '🔥',
    title: 'Crisis Survivor',
    desc: 'Successfully resolved a live crisis event',
    color: '#f87171',
    condition: (log) => log.some(d => d.isCrisis && (d.quality === 'best' || d.quality === 'good')),
  },
  // Grade badges
  'grade-s': {
    id: 'grade-s',
    icon: '🏆',
    title: 'S-Rank Lead Tester',
    desc: 'Achieved 90%+ correctness',
    color: '#ffd700',
    condition: (log, metrics, stats) => {
      const pct = typeof stats === 'object' && stats ? stats.correctPct : computeCorrectPct(log);
      return pct >= 90;
    },
  },
  'grade-a': {
    id: 'grade-a',
    icon: '🥇',
    title: 'Elite QA Engineer',
    desc: 'Achieved 80%+ correctness',
    color: '#30d158',
    condition: (log, metrics, stats) => {
      const pct = typeof stats === 'object' && stats ? stats.correctPct : computeCorrectPct(log);
      return pct >= 80 && pct < 90;
    },
  },
};

function countByISO(log, partNum, quality) {
  return log.filter(d => {
    const ref = d.isoRef || '';
    return ref.includes(`29119-${partNum}`) && d.quality === quality;
  }).length;
}

function computeCorrectPct(log) {
  if (!log || log.length === 0) return 0;
  const correct = log.filter(d => d.correct ?? d.quality === 'best').length;
  return (correct / log.length) * 100;
}

export function computeEarnedBadges(decisionsLog, metrics, score) {
  return Object.values(BADGE_DEFINITIONS).filter(badge =>
    badge.condition(decisionsLog, metrics, score)
  );
}

export default function BadgeDisplay({ badges, compact = false }) {
  if (!badges || badges.length === 0) return null;

  return (
    <div className={`badge-display ${compact ? 'badge-compact' : ''}`}>
      {!compact && <div className="badge-display-title">🏅 BADGES EARNED</div>}
      <div className="badge-grid">
        {badges.map(badge => (
          <div key={badge.id} className="badge-card" style={{ '--badge-color': badge.color }}>
            <div className="badge-icon-wrap">
              <span className="badge-icon">{badge.icon}</span>
            </div>
            {!compact && (
              <div className="badge-info">
                <div className="badge-title">{badge.title}</div>
                <div className="badge-desc">{badge.desc}</div>
              </div>
            )}
            {compact && (
              <div className="badge-compact-tooltip">{badge.title}</div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .badge-display { display: flex; flex-direction: column; gap: 16px; }
        .badge-display-title {
          font-size: 0.7rem; font-weight: 900; color: var(--text-muted);
          letter-spacing: 0.15em;
        }
        .badge-grid { display: flex; flex-direction: column; gap: 10px; }
        .badge-compact .badge-grid {
          flex-direction: row; flex-wrap: wrap; gap: 8px;
        }

        .badge-card {
          display: flex; align-items: center; gap: 14px;
          background: color-mix(in srgb, var(--badge-color) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--badge-color) 35%, transparent);
          border-radius: 12px; padding: 12px 16px;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
        }
        .badge-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px color-mix(in srgb, var(--badge-color) 25%, transparent);
        }
        .badge-compact .badge-card {
          padding: 8px; border-radius: 10px; gap: 0;
        }

        .badge-icon-wrap {
          width: 40px; height: 40px; border-radius: 10px; display: flex;
          align-items: center; justify-content: center; flex-shrink: 0;
          background: color-mix(in srgb, var(--badge-color) 20%, transparent);
          font-size: 1.2rem;
        }
        .badge-compact .badge-icon-wrap {
          width: 32px; height: 32px; font-size: 1rem;
        }

        .badge-info { flex: 1; }
        .badge-title { font-size: 0.85rem; font-weight: 800; color: white; margin-bottom: 2px; }
        .badge-desc { font-size: 0.7rem; color: var(--text-muted); line-height: 1.4; }

        .badge-compact-tooltip {
          display: none; position: absolute; bottom: calc(100% + 6px); left: 50%;
          transform: translateX(-50%); background: rgba(10,15,30,0.95);
          border: 1px solid var(--badge-color); border-radius: 6px;
          padding: 4px 10px; font-size: 0.65rem; white-space: nowrap;
          color: white; font-weight: 700; pointer-events: none; z-index: 100;
        }
        .badge-compact .badge-card:hover .badge-compact-tooltip { display: block; }
      `}</style>
    </div>
  );
}
