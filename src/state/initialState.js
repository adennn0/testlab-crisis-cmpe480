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
    icon: '🤝',
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
  testCoverage:     55,
  defectDetection:  50,
  stakeholderTrust: 60,
  teamMorale:       65,
  budgetEfficiency: 70,
  timelinePressure: 45,
  riskExposure:     55,
};

export const INITIAL_STATE = {
  // Navigation
  screen: 'intro',           // 'intro' | 'select' | 'game' | 'result'
  scenarioId: null,          // 'banking' | 'healthcare' | 'ecommerce'

  // Game progress
  currentPhase: 0,           // 0-indexed
  totalPhases: 6,
  decisionsLog: [],          // Array of { phaseId, decisionId, label, delta, timestamp }

  // Metrics
  metrics: { ...INITIAL_METRICS },
  prevMetrics: { ...INITIAL_METRICS },

  // Scoring
  score: 0,
  maxPossibleScore: 1000,

  // Crisis
  crisisActive: false,
  crisisEventId: null,
  crisisResolved: [],        // Array of resolved crisis IDs

  // Feedback modal
  feedbackVisible: false,
  lastDecision: null,

  // Phase transition
  phaseTransitioning: false,

  // Game completion
  gameComplete: false,
  outcome: null,

  // Timing
  startedAt: null,
  completedAt: null,
};
