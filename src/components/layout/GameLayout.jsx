// GameLayout — sidebar (metrics + log) + main content area

import MetricPanel from '../ui/MetricPanel.jsx';
import DecisionLog from '../ui/DecisionLog.jsx';

export default function GameLayout({ metrics, prevMetrics, decisionsLog, children }) {
  return (
    <div className="game-layout">
      <aside className="game-sidebar">
        <MetricPanel metrics={metrics} prevMetrics={prevMetrics} />
        <DecisionLog log={decisionsLog} />
      </aside>
      <main className="game-main">
        {children}
      </main>

      <style>{`
        .game-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 0;
          min-height: calc(100vh - 57px);
        }
        .game-sidebar {
          padding: 20px 16px;
          background: var(--bg-deep);
          border-right: 1px solid var(--border-subtle);
          display: flex; flex-direction: column; gap: 16px;
          overflow-y: auto;
          position: sticky; top: 57px; height: calc(100vh - 57px);
        }
        .game-main {
          padding: 24px 28px;
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 24px;
        }
        @media (max-width: 900px) {
          .game-layout { grid-template-columns: 1fr; }
          .game-sidebar {
            position: static; height: auto;
            flex-direction: row; flex-wrap: wrap; border-right: none;
            border-bottom: 1px solid var(--border-subtle);
          }
          .game-sidebar > * { flex: 1; min-width: 240px; }
        }
      `}</style>
    </div>
  );
}
