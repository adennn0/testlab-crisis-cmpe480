// Initial state for all 7 metrics and game metadata

export const METRICS_CONFIG = {
  testCoverage: {
    key: 'testCoverage',
    label: 'Test Coverage',
    icon: '🎯',
    description: 'Percentage of codebase covered by automated tests',
    unit: '%',
    weight: 0.18,
  },
  defectDetection: {
    key: 'defectDetection',
    label: 'Defect Detection',
    icon: '🔍',
    description: 'Effectiveness of finding and cataloguing defects',
    unit: '%',
    weight: 0.18,
  },
  stakeholderTrust: {
    key: 'stakeholderTrust',
    label: 'Stakeholder Trust',
    icon: '💛',
    description: 'Confidence of executives, clients, and regulators',
    unit: 'pts',
    weight: 0.20,
  },
  teamMorale: {
    key: 'teamMorale',
    label: 'Team Morale',
    icon: '💪',
    description: 'Energy and motivation of the testing team',
    unit: 'pts',
    weight: 0.12,
  },
  budgetEfficiency: {
    key: 'budgetEfficiency',
    label: 'Budget Efficiency',
    icon: '💰',
    description: 'How effectively resources are being spent',
    unit: 'pts',
    weight: 0.12,
  },
  timelinePressure: {
    key: 'timelinePressure',
    label: 'Timeline Pressure',
    icon: '⏱️',
    description: 'Urgency and schedule risk (lower is better)',
    unit: 'pts',
    weight: 0.10,
    inverted: true,
  },
  riskExposure: {
    key: 'riskExposure',
    label: 'Risk Exposure',
    icon: '⚠️',
    description: 'Current level of unmitigated risk (lower is better)',
    unit: 'pts',
    weight: 0.10,
    inverted: true,
  },
};

export const METRIC_KEYS = Object.keys(METRICS_CONFIG);

export const INITIAL_METRICS = {
  testCoverage:     0,
  defectDetection:  0,
  stakeholderTrust: 0,
  teamMorale:       0,
  budgetEfficiency: 0,
  timelinePressure: 0,
  riskExposure:     0,
};

export const INITIAL_STATE = {
  // Navigation
  screen: 'intro',           // 'intro' | 'game' | 'result'

  // Scenario selection
  scenarioId: null,          // incident/scenario id (e.g. 'incident-1')

  // Last run summary (shown on main menu after exit)
  lastSummary: null,         // { metrics, totalTimeMs, answeredCount, correctCount, exitedEarly }

  // Game progress
  currentQuestion: 0,        // 0-indexed (0..29)
  totalQuestions: 30,
  questionSequence: [],      // Array of question IDs in play order
  questionPresentations: {}, // { [questionId]: { options, correctAnswer } } — shuffled per playthrough
  decisionsLog: [],          // Array of { questionNumber, questionId, letter, quality, correct, isoRef, section, title, incidentId, timedOut, metricDeltas, timestamp }

  // Metrics
  metrics: { ...INITIAL_METRICS },
  prevMetrics: { ...INITIAL_METRICS },

  // Scoring
  score: 0,
  correctCount: 0,
  answeredCount: 0,

  // Feedback modal
  feedbackVisible: false,
  lastDecision: null,

  // Game completion
  gameComplete: false,
  outcome: null,

  // Timing
  startedAt: null,
  completedAt: null,
};
