// NFR-16: localStorage save/resume service

const SAVE_KEY = 'testlab_crisis_save';
const RESULTS_KEY = 'testlab_crisis_scenario_results_v1';

export const storageService = {
  save(state) {
    try {
      const saveData = {
        version: 4,
        savedAt: Date.now(),
        state: {
          scenarioId:     state.scenarioId,
          currentQuestion: state.currentQuestion,
          totalQuestions: state.totalQuestions,
          questionSequence: state.questionSequence,
          decisionsLog:   state.decisionsLog,
          metrics:        state.metrics,
          prevMetrics:    state.prevMetrics,
          score:          state.score,
          correctCount:   state.correctCount,
          answeredCount:  state.answeredCount,
          startedAt:      state.startedAt,
        },
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      return true;
    } catch {
      return false;
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.version !== 4) return null;
      return data;
    } catch {
      return null;
    }
  },

  hasSave() {
    return !!localStorage.getItem(SAVE_KEY);
  },

  clear() {
    localStorage.removeItem(SAVE_KEY);
  },

  loadScenarioResults() {
    try {
      const raw = localStorage.getItem(RESULTS_KEY);
      if (!raw) return {};
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return {};
      return data;
    } catch {
      return {};
    }
  },

  saveScenarioResult(scenarioId, result) {
    if (!scenarioId) return false;
    try {
      const existing = storageService.loadScenarioResults();
      const next = {
        ...existing,
        [scenarioId]: {
          ...(existing?.[scenarioId] || {}),
          ...result,
          savedAt: Date.now(),
        },
      };
      localStorage.setItem(RESULTS_KEY, JSON.stringify(next));
      return true;
    } catch {
      return false;
    }
  },
};
