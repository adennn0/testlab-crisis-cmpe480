// FR-03, FR-07: Game state reducer

import { INITIAL_STATE, INITIAL_METRICS } from './initialState.js';
import { applyDeltas, clampMetric } from '../utils/metricHelpers.js';
import { calcDecisionScore, calcCrisisScore, calcFinalMetricScore } from '../utils/scoring.js';
import { calculateOutcome } from '../utils/outcomeCalculator.js';

export const ACTIONS = {
  START_GAME:       'START_GAME',
  SELECT_SCENARIO:  'SELECT_SCENARIO',
  MAKE_DECISION:    'MAKE_DECISION',
  CLOSE_FEEDBACK:   'CLOSE_FEEDBACK',
  TRIGGER_CRISIS:   'TRIGGER_CRISIS',
  RESOLVE_CRISIS:   'RESOLVE_CRISIS',
  ADVANCE_PHASE:    'ADVANCE_PHASE',
  COMPLETE_GAME:    'COMPLETE_GAME',
  LOAD_SAVE:        'LOAD_SAVE',
  RESET_GAME:       'RESET_GAME',
  GO_TO_SCREEN:     'GO_TO_SCREEN',
};

export function gameReducer(state, action) {
  switch (action.type) {

    case ACTIONS.GO_TO_SCREEN:
      return { ...state, screen: action.payload };

    case ACTIONS.SELECT_SCENARIO:
      return {
        ...state,
        scenarioId:   action.payload,
        screen:       'game',
        currentPhase: 0,
        metrics:      { ...INITIAL_METRICS },
        prevMetrics:  { ...INITIAL_METRICS },
        decisionsLog: [],
        score:        0,
        crisisActive: false,
        crisisEventId: null,
        crisisResolved: [],
        feedbackVisible: false,
        lastDecision:  null,
        gameComplete:  false,
        outcome:       null,
        startedAt:     Date.now(),
        completedAt:   null,
      };

    case ACTIONS.MAKE_DECISION: {
      const { decision, phaseIndex } = action.payload;
      const newMetrics = applyDeltas(state.metrics, decision.metricDeltas);
      const points = calcDecisionScore(decision, phaseIndex);
      const newScore = state.score + points;
      const logEntry = {
        phaseId:    phaseIndex + 1,
        decisionId: decision.id,
        label:      decision.label,
        quality:    decision.quality,
        deltas:     decision.metricDeltas,
        points,
        timestamp:  Date.now(),
      };
      return {
        ...state,
        prevMetrics:    state.metrics,
        metrics:        newMetrics,
        score:          newScore,
        decisionsLog:   [...state.decisionsLog, logEntry],
        feedbackVisible: true,
        lastDecision:   decision,
      };
    }

    case ACTIONS.CLOSE_FEEDBACK:
      return { ...state, feedbackVisible: false };

    case ACTIONS.TRIGGER_CRISIS:
      return {
        ...state,
        crisisActive:   true,
        crisisEventId:  action.payload,
        feedbackVisible: false,
      };

    case ACTIONS.RESOLVE_CRISIS: {
      const { option } = action.payload;
      const newMetrics = applyDeltas(state.metrics, option.metricDeltas);
      const points = calcCrisisScore(option);
      const logEntry = {
        phaseId:    state.currentPhase + 1,
        decisionId: option.id,
        label:      `[CRISIS] ${option.label}`,
        quality:    option.quality,
        deltas:     option.metricDeltas,
        points,
        isCrisis:   true,
        timestamp:  Date.now(),
      };
      return {
        ...state,
        prevMetrics:    state.metrics,
        metrics:        newMetrics,
        score:          state.score + points,
        crisisActive:   false,
        crisisResolved: [...state.crisisResolved, state.crisisEventId],
        crisisEventId:  null,
        decisionsLog:   [...state.decisionsLog, logEntry],
        feedbackVisible: true,
        lastDecision:   { ...option, isCrisis: true },
      };
    }

    case ACTIONS.ADVANCE_PHASE: {
      const nextPhase = state.currentPhase + 1;
      if (nextPhase >= state.totalPhases) {
        // Game complete
        const finalScore = state.score + calcFinalMetricScore(state.metrics);
        const outcome = calculateOutcome(state.metrics, finalScore);
        return {
          ...state,
          currentPhase:  nextPhase,
          score:         finalScore,
          gameComplete:  true,
          outcome,
          screen:        'result',
          completedAt:   Date.now(),
        };
      }
      return {
        ...state,
        currentPhase:      nextPhase,
        feedbackVisible:   false,
        phaseTransitioning: false,
      };
    }

    case ACTIONS.LOAD_SAVE: {
      const { saved } = action.payload;
      return {
        ...INITIAL_STATE,
        ...saved.state,
        screen:      'game',
        prevMetrics: saved.state.metrics,
      };
    }

    case ACTIONS.RESET_GAME:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}
