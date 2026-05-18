// FR-15: Redesigned Result Screen
import React from 'react';

export default function ResultScreen({ outcome, metrics, decisionsLog, onReplay, onMenu }) {
  const getGradeIcon = (grade) => {
    switch (grade) {
      case 'S': return '🏆';
      case 'A': return '🥇';
      case 'B': return '🥈';
      case 'C': return '🥉';
      default: return '💀';
    }
  };

  return (
    <div className="result-screen">
      <div className="result-bg-overlay" />
      
      <div className="result-content anim-fade-in">
        <header className="result-header">
          <div className="simulation-badge">SIMULATION COMPLETE</div>
          <h1 className="result-title">OPERATION <span className="text-glow">REPORT</span></h1>
        </header>

        <div className="result-main-grid">
          {/* Grade & Outcome */}
          <div className="grade-panel glass-panel">
            <div className="grade-badge" data-grade={outcome.grade}>
              <span className="grade-icon">{getGradeIcon(outcome.grade)}</span>
              <span className="grade-text">{outcome.grade}</span>
            </div>
            <div className="outcome-info">
              <h2 className="outcome-title">{outcome.title}</h2>
              <p className="outcome-desc">{outcome.description}</p>
            </div>
            <div className="reward-box">
              <span className="reward-label">REWARDS EARNED</span>
              <div className="reward-items">
                <div className="reward-item">💎 1,250 XP</div>
                <div className="reward-item">🪙 400 COINS</div>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="stats-panel glass-panel">
            <h3 className="panel-title">SYSTEM PERFORMANCE</h3>
            <div className="stats-grid">
              {Object.entries(metrics).map(([key, val]) => (
                <div key={key} className="stat-card">
                  <span className="stat-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                  <div className="stat-value-row">
                    <div className="stat-bar-track">
                      <div className="stat-bar-fill" style={{ width: `${val}%`, background: val > 50 ? 'var(--zone-safe-bar)' : 'var(--zone-critical-bar)' }} />
                    </div>
                    <span className="stat-value">{Math.round(val)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="result-actions">
          <button className="btn-replay" onClick={onReplay}>
            <span className="btn-icon">🔄</span>
            RETRY SIMULATION
          </button>
          <button className="btn-menu" onClick={onMenu}>
            <span className="btn-icon">🏠</span>
            RETURN TO TERMINAL
          </button>
        </div>
      </div>

      <style>{`
        .result-screen {
          min-height: 100vh; background: var(--bg-void); color: white;
          display: flex; align-items: center; justify-content: center;
          padding: 60px 40px; position: relative; overflow: hidden;
        }
        .result-bg-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(61, 127, 255, 0.08) 0%, transparent 70%);
        }

        .result-content { max-width: 1000px; width: 100%; z-index: 10; display: flex; flex-direction: column; gap: 40px; }
        
        .result-header { text-align: left; }
        .simulation-badge { font-size: 0.7rem; font-weight: 800; color: var(--accent-primary); letter-spacing: 0.2em; margin-bottom: 8px; }
        .result-title { font-size: 3rem; font-weight: 900; letter-spacing: -0.01em; margin: 0; }
        .text-glow { color: var(--accent-primary); text-shadow: 0 0 20px var(--accent-glow); }

        .result-main-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; }

        .grade-panel { 
          display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px;
          padding: 48px 32px;
        }
        .grade-badge {
          width: 140px; height: 140px; background: var(--bg-surface);
          border-radius: 40px; border: 2px solid var(--accent-primary);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          box-shadow: var(--shadow-neon); position: relative;
        }
        .grade-icon { font-size: 2.5rem; }
        .grade-text { font-size: 2rem; font-weight: 900; line-height: 1; margin-top: 4px; }

        .outcome-title { font-size: 1.5rem; font-weight: 900; color: white; margin-bottom: 8px; }
        .outcome-desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }

        .reward-box { 
          width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border);
          border-radius: var(--radius-md); padding: 16px; display: flex; flex-direction: column; gap: 12px;
        }
        .reward-label { font-size: 0.6rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; }
        .reward-items { display: flex; justify-content: center; gap: 20px; font-weight: 800; font-size: 0.9rem; }

        .stats-panel { padding: 32px; display: flex; flex-direction: column; gap: 24px; }
        .panel-title { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); letter-spacing: 0.15em; }
        .stats-grid { display: flex; flex-direction: column; gap: 16px; }
        
        .stat-card { display: flex; flex-direction: column; gap: 8px; }
        .stat-label { font-size: 0.65rem; font-weight: 800; color: var(--text-secondary); }
        .stat-value-row { display: flex; align-items: center; gap: 16px; }
        .stat-bar-track { height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; flex: 1; overflow: hidden; }
        .stat-bar-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
        .stat-value { font-family: var(--mono); font-size: 0.9rem; font-weight: 800; color: white; width: 45px; text-align: right; }

        .result-actions { display: flex; gap: 20px; }
        .btn-replay, .btn-menu {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 24px; border-radius: var(--radius-md); font-weight: 800; letter-spacing: 0.05em;
          cursor: pointer; transition: all 0.2s; border: 1px solid var(--glass-border);
        }
        .btn-replay { background: var(--accent-primary); color: white; border-color: var(--accent-primary); }
        .btn-replay:hover { transform: translateY(-5px); box-shadow: var(--shadow-glow); }
        .btn-menu { background: rgba(255,255,255,0.03); color: white; }
        .btn-menu:hover { background: rgba(255,255,255,0.08); transform: translateY(-5px); }

        @media (max-width: 800px) {
          .result-main-grid { grid-template-columns: 1fr; }
          .result-actions { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
