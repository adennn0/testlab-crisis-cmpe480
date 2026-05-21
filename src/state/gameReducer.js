// Game state reducer — ISO/IEC/IEEE 29119 question engine

import { INITIAL_STATE, INITIAL_METRICS } from './initialState.js';
import { applyDeltas } from '../utils/metricHelpers.js';
import { QUESTION_BANK, INCIDENTS } from '../data/iso29119QuestionBank.js';

const QUESTIONS_PER_INCIDENT = 30;

function randFloat() {
  // Prefer crypto for better randomness; fallback to Math.random
  try {
    // eslint-disable-next-line no-undef
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const buf = new Uint32Array(1);
      // eslint-disable-next-line no-undef
      crypto.getRandomValues(buf);
      return buf[0] / 2 ** 32;
    }
  } catch {
    // ignore
  }
  return Math.random();
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randFloat() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuestionSequenceForScenario(scenarioId) {
  if (!scenarioId) throw new Error('START_GAME requires a scenarioId');

  const ids = QUESTION_BANK
    .filter((q) => q.incidentId === scenarioId)
    .map((q) => q.id);

  if (ids.length !== QUESTIONS_PER_INCIDENT) {
    throw new Error(
      `Scenario ${scenarioId} must have exactly ${QUESTIONS_PER_INCIDENT} questions (found ${ids.length}).`
    );
  }

  shuffleInPlace(ids);
  return ids;
}

function scoreDeltaForOption(option, secondsUsed) {
  if (option?.timedOut) return -10;
  const letter = option?.letter;
  const base =
    letter === 'A' ? 10 :
    letter === 'B' ? 5 :
    letter === 'C' ? -5 :
    letter === 'D' ? -10 :
    (option?.quality === 'best' ? 10 : option?.quality === 'good' ? 5 : option?.quality === 'poor' ? -5 : -10);
  const bonus = typeof secondsUsed === 'number' && secondsUsed < 15 ? 3 : 0;
  return base + bonus;
}

export const ACTIONS = {
  START_GAME:      'START_GAME',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  CLOSE_FEEDBACK:  'CLOSE_FEEDBACK',
  NEXT_QUESTION:   'NEXT_QUESTION',
  EXIT_GAME:       'EXIT_GAME',
  LOAD_SAVE:       'LOAD_SAVE',
  RESET_GAME:      'RESET_GAME',
  GO_TO_SCREEN:    'GO_TO_SCREEN',
};

export function gameReducer(state, action) {
  switch (action.type) {

    case ACTIONS.GO_TO_SCREEN:
      return { ...state, screen: action.payload };

    case ACTIONS.START_GAME:
      // payload: { scenarioId }
      {
        const scenarioId = action.payload?.scenarioId;
        const questionSequence = buildQuestionSequenceForScenario(scenarioId);
        return {
          ...INITIAL_STATE,
          screen: 'game',
          scenarioId,
          totalQuestions: questionSequence.length,
          metrics: { ...INITIAL_METRICS },
          prevMetrics: { ...INITIAL_METRICS },
          startedAt: Date.now(),
          completedAt: null,
          questionSequence,
          lastSummary: state.lastSummary ?? null,
        };
      }

    case ACTIONS.ANSWER_QUESTION: {
      const { question, option, questionIndex, secondsUsed } = action.payload;

      const metricDeltas = option?.metricDeltas || {};
      const newMetrics = applyDeltas(state.metrics, metricDeltas);
      const isCorrect = option.letter === 'A';
      const scoreDelta = scoreDeltaForOption(option, secondsUsed);
      const logEntry = {
        questionNumber: questionIndex + 1,
        questionId: question.id,
        letter: option.letter,
        quality: option.quality,
        isoRef: option.isoRef,
        section: question.section,
        title: question.title,
        incidentId: question.incidentId,
        timedOut: option.timedOut || false,
        secondsUsed: typeof secondsUsed === 'number' ? secondsUsed : null,
        scoreDelta,
        metricDeltas,
        timestamp: Date.now(),
      };

      // Debug helper: set localStorage key "testlab_debug_metrics" = "1" to enable
      try {
        // eslint-disable-next-line no-undef
        if (typeof localStorage !== 'undefined' && localStorage.getItem('testlab_debug_metrics') === '1') {
          // eslint-disable-next-line no-console
          console.log('Metrics after answer:', newMetrics);
        }
      } catch {
        // ignore
      }

      return {
        ...state,
        prevMetrics: state.metrics,
        metrics: newMetrics,
        decisionsLog: [...state.decisionsLog, logEntry],
        feedbackVisible: true,
        lastDecision: {
          ...option,
          questionId: question.id,
          questionNumber: questionIndex + 1,
          correct: isCorrect,
        },
        answeredCount: state.answeredCount + 1,
        correctCount: state.correctCount + (isCorrect ? 1 : 0),
        score: state.score + scoreDelta,
      };
    }

    case ACTIONS.CLOSE_FEEDBACK:
      return { ...state, feedbackVisible: false };

    case ACTIONS.NEXT_QUESTION: {
      const nextIndex = state.currentQuestion + 1;
      const isComplete = nextIndex >= state.totalQuestions;

      if (isComplete) {
        return {
          ...state,
          currentQuestion: nextIndex,
          feedbackVisible: false,
          gameComplete: true,
          screen: 'result',
          completedAt: Date.now(),
        };
      }
      return {
        ...state,
        currentQuestion: nextIndex,
        feedbackVisible: false,
        lastDecision: null,
      };
    }

    case ACTIONS.EXIT_GAME: {
      const totalTimeMs = state.startedAt ? Date.now() - state.startedAt : 0;
      return {
        ...INITIAL_STATE,
        screen: 'intro',
        lastSummary: {
          metrics: state.metrics,
          totalTimeMs,
          answeredCount: state.answeredCount,
          correctCount: state.correctCount,
          exitedEarly: true,
        },
      };
    }

    case ACTIONS.LOAD_SAVE: {
      const { saved } = action.payload;
      return {
        ...INITIAL_STATE,
        ...saved.state,
        screen: 'game',
        prevMetrics: saved.state.prevMetrics || saved.state.metrics,
      };
    }

    case ACTIONS.RESET_GAME:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}
