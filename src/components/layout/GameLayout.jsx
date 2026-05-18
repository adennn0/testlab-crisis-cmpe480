// GameLayout — metrics on top bar + main content area (no sidebar)

import MetricPanel from '../ui/MetricPanel.jsx';

export default function GameLayout({ metrics, prevMetrics, children }) {
  return (
    <div className="game-layout">
      <div className="game-metrics-top">
        <MetricPanel metrics={metrics} prevMetrics={prevMetrics} horizontal />
      </div>
      <main className="game-main">
        {children}
      </main>

      <style>{`
        .game-layout {
          display: flex; flex-direction: column;
          min-height: calc(100vh - 57px);
          background: var(--bg-void);
        }
        .game-metrics-top {
          padding: 16px 24px;
          background: var(--bg-deep);
          border-bottom: 1px solid var(--glass-border);
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(12px);
        }
        .game-main {
          padding: 32px 40px;
          flex: 1;
          display: flex; flex-direction: column; gap: 28px;
          max-width: 1100px; margin: 0 auto; width: 100%;
        }
        @media (max-width: 900px) {
          .game-metrics-top { padding: 12px 16px; }
          .game-main { padding: 20px 16px; }
        }
      `}</style>
    </div>
  );
}
