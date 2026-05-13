// Central game state hook — wraps useReducer and exposes named actions

import { useReducer, useCallback } from 'react';
import { gameReducer, ACTIONS } from '../state/gameReducer.js';
import { INITIAL_STATE } from '../state/initialState.js';

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const goToScreen = useCallback((screen) =>
    dispatch({ type: ACTIONS.GO_TO_SCREEN, payload: screen }), []);

  const selectScenario = useCallback((scenarioId) =>
    dispatch({ type: ACTIONS.SELECT_SCENARIO, payload: scenarioId }), []);

  const makeDecision = useCallback((decision, phaseIndex) =>
    dispatch({ type: ACTIONS.MAKE_DECISION, payload: { decision, phaseIndex } }), []);

  const closeFeedback = useCallback(() =>
    dispatch({ type: ACTIONS.CLOSE_FEEDBACK }), []);

  const triggerCrisis = useCallback((crisisId) =>
    dispatch({ type: ACTIONS.TRIGGER_CRISIS, payload: crisisId }), []);

  const resolveCrisis = useCallback((option) =>
    dispatch({ type: ACTIONS.RESOLVE_CRISIS, payload: { option } }), []);

  const advancePhase = useCallback(() =>
    dispatch({ type: ACTIONS.ADVANCE_PHASE }), []);

  const loadSave = useCallback((saved) =>
    dispatch({ type: ACTIONS.LOAD_SAVE, payload: { saved } }), []);

  const resetGame = useCallback(() =>
    dispatch({ type: ACTIONS.RESET_GAME }), []);

  return {
    state,
    dispatch,
    goToScreen,
    selectScenario,
    makeDecision,
    closeFeedback,
    triggerCrisis,
    resolveCrisis,
    advancePhase,
    loadSave,
    resetGame,
  };
}
