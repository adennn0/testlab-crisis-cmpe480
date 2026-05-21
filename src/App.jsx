import React, { useEffect, useRef } from 'react';
import IntroScreen from './components/screens/IntroScreen.jsx';
import GameScreen from './components/screens/GameScreen.jsx';
import ResultScreen from './components/screens/ResultScreen.jsx';
import { useGameState } from './hooks/useGameState.js';
import { useSaveLoad } from './hooks/useSaveLoad.js';
import { storageService } from './state/storageService.js';

function App() {
  const gameActions = useGameState();
  const { state, goToScreen, startGame, loadSave, resetGame } = gameActions;
  const { hasSave, resumeGame } = useSaveLoad(state, loadSave);

  const lastSavedCompletedAtRef = useRef(null);

  useEffect(() => {
    if (state.screen !== 'result') return;
    if (!state.scenarioId) return;
    if (!state.completedAt) return;
    if (lastSavedCompletedAtRef.current === state.completedAt) return;

    storageService.saveScenarioResult(state.scenarioId, {
      score: state.score,
      answeredCount: state.answeredCount,
      correctCount: state.correctCount,
      totalTimeMs: state.startedAt && state.completedAt ? (state.completedAt - state.startedAt) : 0,
    });

    lastSavedCompletedAtRef.current = state.completedAt;
  }, [state.screen, state.scenarioId, state.completedAt, state.score, state.answeredCount, state.correctCount, state.startedAt]);

  const handleStartScenario = (scenarioId) => {
    startGame(scenarioId);
  };

  const handleBackToMenu = () => {
    resetGame();
    goToScreen('intro');
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {state.screen === 'intro' && (
        <IntroScreen
          onSelectScenario={handleStartScenario}
          onResume={resumeGame}
          hasSave={hasSave}
        />
      )}
      {state.screen === 'game' && (
        <GameScreen
          state={state}
          actions={gameActions}
        />
      )}
      {state.screen === 'result' && (
        <ResultScreen
          metrics={state.metrics}
          decisionsLog={state.decisionsLog}
          startedAt={state.startedAt}
          completedAt={state.completedAt}
          answeredCount={state.answeredCount}
          correctCount={state.correctCount}
          score={state.score}
          onReplay={() => {
            resetGame();
            startGame(state.scenarioId);
          }}
          onMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
