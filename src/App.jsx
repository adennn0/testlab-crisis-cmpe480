import React from 'react';
import IntroScreen from './components/screens/IntroScreen.jsx';
import ScenarioSelect from './components/screens/ScenarioSelect.jsx';
import GameScreen from './components/screens/GameScreen.jsx';
import ResultScreen from './components/screens/ResultScreen.jsx';
import { useGameState } from './hooks/useGameState.js';
import { useSaveLoad } from './hooks/useSaveLoad.js';

function App() {
  const gameActions = useGameState();
  const { state, goToScreen, selectScenario, loadSave, resetGame } = gameActions;
  const { hasSave, resumeGame } = useSaveLoad(state, loadSave);

  const handleNewGame = () => {
    goToScreen('select');
  };

  const handleSelectScenario = (scenarioId) => {
    selectScenario(scenarioId);
    goToScreen('game');
  };

  const handleBackToMenu = () => {
    resetGame();
    goToScreen('intro');
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {state.screen === 'intro' && (
        <IntroScreen
          onNewGame={handleNewGame}
          onResume={resumeGame}
          hasSave={hasSave}
        />
      )}
      {state.screen === 'select' && (
        <ScenarioSelect
          onSelect={handleSelectScenario}
          onBack={handleBackToMenu}
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
          outcome={state.outcome}
          metrics={state.metrics}
          decisionsLog={state.decisionsLog}
          onReplay={() => {
            resetGame();
            goToScreen('select');
          }}
          onMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
