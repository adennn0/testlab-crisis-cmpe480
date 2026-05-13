// NFR-16: localStorage save/resume service

const SAVE_KEY = 'testlab_crisis_save';

export const storageService = {
  save(state) {
    try {
      const saveData = {
        version: 1,
        savedAt: Date.now(),
        state: {
          scenarioId:     state.scenarioId,
          currentPhase:   state.currentPhase,
          decisionsLog:   state.decisionsLog,
          metrics:        state.metrics,
          score:          state.score,
          crisisResolved: state.crisisResolved,
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
      if (data.version !== 1) return null;
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
};
