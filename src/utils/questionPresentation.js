// Shuffle answer options and assign A–D labels per playthrough (best answer ≠ always A)

const LETTERS = ['A', 'B', 'C', 'D'];

function randFloat() {
  try {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return buf[0] / 2 ** 32;
    }
  } catch {
    // ignore
  }
  return Math.random();
}

function shuffleIndices(length) {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(randFloat() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

/**
 * Randomize option order and A/B/C/D labels for one question.
 * correctAnswer is the letter assigned to the option with quality 'best'.
 */
export function shuffleOptionsForPlay(options) {
  if (!options?.length) {
    return { options: [], correctAnswer: 'A' };
  }

  const order = shuffleIndices(options.length);
  const shuffled = order.map((origIdx, displayIdx) => ({
    ...options[origIdx],
    letter: LETTERS[displayIdx] ?? LETTERS[displayIdx % LETTERS.length],
  }));

  const best = shuffled.find((o) => o.quality === 'best');
  const correctAnswer = best?.letter ?? shuffled[0]?.letter ?? 'A';

  return { options: shuffled, correctAnswer };
}

/**
 * Build presentation map for all questions in a playthrough sequence.
 */
export function buildQuestionPresentations(questionIds, questionById) {
  const presentations = {};
  for (const id of questionIds) {
    const q = questionById[id];
    if (q) {
      presentations[id] = shuffleOptionsForPlay(q.options);
    }
  }
  return presentations;
}
