// FR-17: Save/resume hook

import { useEffect, useCallback } from 'react';
import { storageService } from '../state/storageService.js';

export function useSaveLoad(state, loadSave) {
  // Auto-save on every meaningful state change
  useEffect(() => {
    if (state.screen === 'game' && state.startedAt) {
      storageService.save(state);
    }
    if (state.screen === 'result') {
      storageService.clear();
    }
  }, [state]);

  const hasSave = !!storageService.load();

  const resumeGame = useCallback(() => {
    const saved = storageService.load();
    if (saved) loadSave(saved);
  }, [loadSave]);

  const clearSave = useCallback(() => {
    storageService.clear();
  }, []);

  return { hasSave, resumeGame, clearSave };
}
