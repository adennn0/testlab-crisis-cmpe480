// Central game state hook — wraps useReducer and exposes named actions

import { useReducer, useCallback } from 'react';
import { gameReducer, ACTIONS } from '../state/gameReducer.js';
import { INITIAL_STATE } from '../state/initialState.js';

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const goToScreen = useCallback((screen) =>
    dispatch({ type: ACTIONS.GO_TO_SCREEN, payload: screen }), []);

  const startGame = useCallback((scenarioId) =>
    dispatch({ type: ACTIONS.START_GAME, payload: { scenarioId } }), []);

  const startScenario = startGame;

  const answerQuestion = useCallback((question, option, questionIndex, secondsUsed) =>
    dispatch({ type: ACTIONS.ANSWER_QUESTION, payload: { question, option, questionIndex, secondsUsed } }), []);

  const closeFeedback = useCallback(() =>
    dispatch({ type: ACTIONS.CLOSE_FEEDBACK }), []);

  const nextQuestion = useCallback(() =>
    dispatch({ type: ACTIONS.NEXT_QUESTION }), []);

  const exitGame = useCallback(() =>
    dispatch({ type: ACTIONS.EXIT_GAME }), []);

  const loadSave = useCallback((saved) =>
    dispatch({ type: ACTIONS.LOAD_SAVE, payload: { saved } }), []);

  const resetGame = useCallback(() =>
    dispatch({ type: ACTIONS.RESET_GAME }), []);

  return {
    state,
    dispatch,
    goToScreen,
    startGame,
    startScenario,
    answerQuestion,
    closeFeedback,
    nextQuestion,
    exitGame,
    loadSave,
    resetGame,
  };
}
