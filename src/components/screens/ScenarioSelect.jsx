export default function ScenarioSelect({ onSelect, onBack }) {
  const scenarios = [
    {
      id: 'banking',
      title: 'FINANCIAL SECTOR',
      subtitle: 'CORE BANKING UPGRADE',
      icon: '🏦',
      difficulty: 'HARD',
      reward: '2,500 XP',
      risk: 'CRITICAL',
      desc: 'A legacy banking system migration. High stakes, zero downtime tolerance.',
    },
    {
      id: 'healthcare',
      title: 'HEALTHCARE NETWORK',
      subtitle: 'PATIENT DATA MIGRATION',
      icon: '🏥',
      difficulty: 'NORMAL',
      reward: '1,800 XP',
      risk: 'HIGH',
      desc: 'Implementing a new real-time patient monitoring protocol.',
    },
    {
      id: 'ecommerce',
      title: 'E-COMMERCE GIANT',
      subtitle: 'PEAK SEASON STABILITY',
      icon: '🛒',
      difficulty: 'EASY',
      reward: '1,200 XP',
      risk: 'MODERATE',
      desc: 'Scaling the checkout engine for a global flash sale event.',
    }
  ];

  return (
    <div className="mission-select-screen">
      <div className="mission-bg-overlay" />
      
      <div className="mission-content anim-fade-in">
        <header className="mission-header">
          <button className="btn-back" onClick={onBack}>
            <span className="back-icon">←</span> BACK TO TERMINAL
          </button>
          <div className="header-text">
            <h1 className="mission-title">SELECT <span className="text-glow">OPERATION</span></h1>
            <p className="mission-subtitle">CHOOSE YOUR SECTOR FOR CRISIS SIMULATION</p>
          </div>
        </header>

        <div className="mission-grid">
          {scenarios.map((s, i) => (
            <div 
              key={s.id} 
              className={`mission-card glass-card anim-slide-in scenario-${s.id}`}
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => onSelect(s.id)}
            >
              <div className="card-tag">{s.difficulty}</div>
              
              <div className="card-top">
                <div className="mission-icon-wrap">
                  <span className="mission-icon">{s.icon}</span>
                </div>
                <div className="mission-meta">
                  <span className="meta-reward">REWARD: {s.reward}</span>
                  <span className={`meta-risk risk-${s.risk.toLowerCase()}`}>RISK: {s.risk}</span>
                </div>
              </div>

              <div className="card-body">
                <h2 className="card-title">{s.title}</h2>
                <h3 className="card-subtitle">{s.subtitle}</h3>
                <p className="card-desc">{s.desc}</p>
              </div>

              <div className="card-footer">
                <button className="btn-deploy">DEPLOY MANAGER</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .mission-select-screen {
          min-height: 100vh; background: var(--bg-void); color: white;
          display: flex; flex-direction: column; align-items: center; padding: 60px 40px;
          position: relative; overflow: hidden;
        }
        .mission-bg-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(61, 127, 255, 0.1) 0%, transparent 60%);
        }

        .mission-content { max-width: 1200px; width: 100%; z-index: 10; }

        .mission-header { 
          display: flex; flex-direction: column; gap: 32px; margin-bottom: 60px;
          text-align: left;
        }
        .btn-back {
          align-self: flex-start; background: transparent; border: 1px solid var(--glass-border);
          color: var(--text-muted); padding: 10px 20px; border-radius: var(--radius-full);
          font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: all 0.2s;
        }
        .btn-back:hover { border-color: var(--accent-primary); color: white; transform: translateX(-5px); }

        .mission-title { font-size: 3rem; font-weight: 900; letter-spacing: -0.01em; line-height: 1; }
        .text-glow { color: var(--accent-primary); text-shadow: 0 0 20px var(--accent-glow); }
        .mission-subtitle { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); letter-spacing: 0.3em; margin-top: 12px; }

        .mission-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 32px; }

        .mission-card {
          padding: 40px; background: var(--bg-glass); backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border); border-radius: var(--radius-lg);
          cursor: pointer; transition: all var(--transition-normal);
          position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 32px;
        }
        .mission-card:hover {
          transform: translateY(-12px); border-color: var(--accent-glow);
          background: rgba(255, 255, 255, 0.05); box-shadow: var(--glass-shadow);
        }

        .card-tag {
          position: absolute; top: 20px; right: 20px; font-size: 0.65rem; font-weight: 900;
          color: white; padding: 4px 10px; border-radius: 6px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1);
        }

        .card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .mission-icon-wrap {
          width: 72px; height: 72px; background: var(--bg-surface);
          border-radius: 20px; border: 1px solid var(--glass-border);
          display: flex; align-items: center; justify-content: center; font-size: 2.5rem;
          box-shadow: 0 8px 16px rgba(0,0,0,0.4);
        }
        .mission-meta { display: flex; flex-direction: column; gap: 4px; text-align: right; }
        .meta-reward { font-size: 0.65rem; font-weight: 800; color: #ffd700; }
        .meta-risk { font-size: 0.65rem; font-weight: 800; }
        .risk-critical { color: var(--zone-critical-text); }
        .risk-high { color: var(--zone-warning-text); }
        .risk-moderate { color: var(--zone-safe-text); }

        .card-title { font-size: 1.5rem; font-weight: 900; color: white; line-height: 1.1; }
        .card-subtitle { font-size: 0.75rem; font-weight: 700; color: var(--accent-primary); letter-spacing: 0.05em; margin: 4px 0 16px; }
        .card-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }

        .btn-deploy {
          width: 100%; padding: 16px; background: var(--bg-surface);
          border: 1px solid var(--glass-border); border-radius: var(--radius-md);
          color: white; font-size: 0.85rem; font-weight: 800; letter-spacing: 0.1em;
          transition: all 0.2s;
        }
        .mission-card:hover .btn-deploy { background: var(--accent-primary); border-color: var(--accent-primary); box-shadow: var(--shadow-glow); }

        /* Scenario Accents */
        .scenario-banking:hover { border-color: var(--scenario-banking-primary); }
        .scenario-healthcare:hover { border-color: var(--scenario-healthcare-primary); }
        .scenario-ecommerce:hover { border-color: var(--scenario-ecommerce-primary); }
      `}</style>
    </div>
  );
}
