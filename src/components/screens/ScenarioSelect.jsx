// FR-12: Scenario selection screen

const SCENARIOS = [
  {
    id: 'banking',
    name: 'Core Banking Meltdown',
    subtitle: 'National Digital Bank',
    icon: '🏦',
    difficulty: 'Medium',
    difficultyLevel: 2,
    color: 'var(--scenario-banking-primary)',
    glow: 'var(--scenario-banking-glow)',
    description: 'Transaction processing is failing for 23% of requests. 2.4M customers are affected. You have minutes before the CEO calls.',
    stakes: '£340M daily transaction volume',
    tags: ['Regulatory', 'Fintech', 'High Stakes'],
    duration: '~25 min',
  },
  {
    id: 'healthcare',
    name: 'EHR System Meltdown',
    subtitle: 'CarePoint Hospital Network',
    icon: '🏥',
    difficulty: 'Hard',
    difficultyLevel: 3,
    color: 'var(--scenario-healthcare-primary)',
    glow: 'var(--scenario-healthcare-glow)',
    description: 'The Electronic Health Record system is offline across 14 hospitals. Nurses are reverting to paper. Medication records are inaccessible.',
    stakes: '8,400 active patient records at risk',
    tags: ['Patient Safety', 'HIPAA', 'Clinical'],
    duration: '~30 min',
  },
  {
    id: 'ecommerce',
    name: 'Black Friday Collapse',
    subtitle: 'ShopVault Platform',
    icon: '🛒',
    difficulty: 'Expert',
    difficultyLevel: 4,
    color: 'var(--scenario-ecommerce-primary)',
    glow: 'var(--scenario-ecommerce-glow)',
    description: 'Peak Black Friday traffic has crashed the payment gateway. 180,000 shoppers are stuck. Revenue is draining at £48,000 per minute.',
    stakes: '£2.3M peak-day revenue at risk',
    tags: ['PCI-DSS', 'Peak Traffic', 'Revenue Critical'],
    duration: '~28 min',
  },
];

const difficultyColors = {
  Medium: 'var(--zone-safe-text)',
  Hard:   'var(--zone-warning-text)',
  Expert: 'var(--zone-critical-text)',
};

export default function ScenarioSelect({ onSelect, onBack }) {
  return (
    <div className="scenario-screen">
      <div className="scenario-header anim-fade-in">
        <button className="btn btn-ghost scenario-back" onClick={onBack}>← Back</button>
        <div>
          <h1 className="scenario-title">Choose Your Crisis</h1>
          <p className="scenario-subtitle">Select an industry scenario to test your crisis management skills</p>
        </div>
      </div>

      <div className="scenario-grid">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            id={`scenario-${s.id}`}
            className="scenario-card anim-slide-in-card"
            style={{ animationDelay: `${i * 0.1}s`, '--card-color': s.color, '--card-glow': s.glow }}
            onClick={() => onSelect(s.id)}
          >
            <div className="scenario-card-top">
              <div className="scenario-card-icon">{s.icon}</div>
              <div className="scenario-difficulty" style={{ color: difficultyColors[s.difficulty] }}>
                {'★'.repeat(s.difficultyLevel - 1)}{'☆'.repeat(4 - s.difficultyLevel + 1)} {s.difficulty}
              </div>
            </div>

            <div className="scenario-card-body">
              <div className="scenario-card-sub">{s.subtitle}</div>
              <h2 className="scenario-card-name">{s.name}</h2>
              <p className="scenario-card-desc">{s.description}</p>
            </div>

            <div className="scenario-card-footer">
              <div className="scenario-stakes">
                <span>⚠️</span>
                <span>{s.stakes}</span>
              </div>
              <div className="scenario-tags">
                {s.tags.map((t) => (
                  <span key={t} className="scenario-tag">{t}</span>
                ))}
              </div>
              <div className="scenario-duration">⏱ {s.duration}</div>
            </div>

            <div className="scenario-card-cta">Start Scenario →</div>
          </button>
        ))}
      </div>

      <style>{`
        .scenario-screen { min-height: 100vh; padding: 32px 28px; display: flex; flex-direction: column; gap: 32px; }
        .scenario-header { display: flex; align-items: flex-start; gap: 16px; }
        .scenario-back { align-self: flex-start; }
        .scenario-title { font-size: 2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
        .scenario-subtitle { font-size: 0.9rem; color: var(--text-secondary); }
        .scenario-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .scenario-card {
          display: flex; flex-direction: column; gap: 16px;
          background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl); padding: 24px; text-align: left;
          cursor: pointer; transition: all var(--transition-normal); position: relative; overflow: hidden;
        }
        .scenario-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--card-color, var(--accent-primary));
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
        }
        .scenario-card::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, var(--card-glow, var(--accent-glow)), transparent 70%);
          opacity: 0; transition: opacity var(--transition-normal);
          pointer-events: none;
        }
        .scenario-card:hover {
          border-color: var(--card-color, var(--accent-primary));
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 32px var(--card-glow, var(--accent-glow));
        }
        .scenario-card:hover::after { opacity: 1; }
        .scenario-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .scenario-card-icon { font-size: 2.5rem; }
        .scenario-difficulty { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.04em; text-align: right; }
        .scenario-card-sub { font-size: 0.6875rem; font-weight: 700; color: var(--text-muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
        .scenario-card-name { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; line-height: 1.2; }
        .scenario-card-desc { font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; }
        .scenario-card-footer { display: flex; flex-direction: column; gap: 8px; padding-top: 12px; border-top: 1px solid var(--border-subtle); }
        .scenario-stakes { display: flex; gap: 6px; font-size: 0.75rem; color: var(--zone-warning-text); font-weight: 600; align-items: center; }
        .scenario-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .scenario-tag {
          background: var(--accent-soft); color: var(--accent-primary);
          font-size: 0.6rem; font-weight: 700; padding: 2px 7px;
          border-radius: var(--radius-full); letter-spacing: 0.06em;
        }
        .scenario-duration { font-size: 0.75rem; color: var(--text-muted); }
        .scenario-card-cta {
          font-size: 0.875rem; font-weight: 700; color: var(--card-color, var(--accent-primary));
          transition: all var(--transition-fast);
        }
        .scenario-card:hover .scenario-card-cta { letter-spacing: 0.04em; }
      `}</style>
    </div>
  );
}
