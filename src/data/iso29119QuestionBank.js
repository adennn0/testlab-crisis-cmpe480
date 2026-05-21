// ISO/IEC/IEEE 29119 question bank for TestLab Crisis
// IMPORTANT: Definitions/explanations are taken verbatim from the embedded ISO/IEC/IEEE 29119-1 knowledge base provided in the prompt.

import { INITIAL_METRICS } from '../state/initialState.js';

/**
 * @typedef {'A'|'B'|'C'|'D'} OptionLetter
 * @typedef {'best'|'good'|'poor'|'worst'} OptionQuality
 */

const METRIC_KEYS = Object.keys(INITIAL_METRICS);

function assertMetricKey(key) {
  if (!METRIC_KEYS.includes(key)) {
    throw new Error(`Unknown metric key: ${key}`);
  }
}

function buildMetricDeltas({ quality, relevantMetrics, lessRelevantMetric }) {
  relevantMetrics.forEach(assertMetricKey);
  assertMetricKey(lessRelevantMetric);

  const deltas = {};
  for (const k of METRIC_KEYS) deltas[k] = 0;

  if (quality === 'best') {
    // Best answer (A): +15 to 2 directly relevant metrics, -5 to 1 less relevant metric
    deltas[relevantMetrics[0]] += 15;
    deltas[relevantMetrics[1]] += 15;
    deltas[lessRelevantMetric] -= 5;
  } else if (quality === 'good') {
    // Good answer (B): +10 to 1 metric, no change to others
    deltas[relevantMetrics[0]] += 10;
  } else if (quality === 'poor') {
    // Poor answer (C): -10 to 2 metrics
    deltas[relevantMetrics[0]] -= 10;
    deltas[relevantMetrics[1]] -= 10;
  } else if (quality === 'worst') {
    // Worst answer (D): -15 to 2 metrics, +10 to Risk Exposure
    deltas[relevantMetrics[0]] -= 15;
    deltas[relevantMetrics[1]] -= 15;
    deltas.riskExposure += 10;
  }

  // Remove zeros for cleaner displays/logs
  const cleaned = {};
  Object.entries(deltas).forEach(([k, v]) => {
    if (v !== 0) cleaned[k] = v;
  });
  return cleaned;
}

function makeIsoRef(part, section, title) {
  return `ISO/IEC/IEEE 29119-${part} §${section}: ${title}`;
}

function makeQuestion({
  id,
  incidentId,
  order,
  part,
  section,
  title,
  definition,
  isoSays,
  situation,
  relevantMetrics,
  lessRelevantMetric,
  options,
}) {
  if (!Array.isArray(relevantMetrics) || relevantMetrics.length !== 2) {
    throw new Error(`Question ${id}: relevantMetrics must have exactly 2 items.`);
  }

  const isoRef = makeIsoRef(part, section, title);

  const mappedOptions = options.map((opt) => {
    const metricDeltas = buildMetricDeltas({
      quality: opt.quality,
      relevantMetrics,
      lessRelevantMetric,
    });
    return {
      ...opt,
      metricDeltas,
      isoRef,
      section,
      title,
      incidentId,
    };
  });

  return {
    id,
    incidentId,
    order,
    part,
    section,
    title,
    isoRef,
    definition,
    isoSays,
    situation,
    relevantMetrics,
    lessRelevantMetric,
    options: mappedOptions,
  };
}

export const INCIDENTS = [
  {
    id: 'incident-1',
    name: 'Core Banking Meltdown',
    intro: "New incident incoming! Remember: ISO/IEC/IEEE 29119 is your guide! 💡",
  },
  {
    id: 'incident-2',
    name: 'E-Commerce Black Friday Crash',
    intro: "New incident incoming! Remember: ISO/IEC/IEEE 29119 is your guide! 💡",
  },
  {
    id: 'incident-3',
    name: 'Healthcare System Security Breach',
    intro: "New incident incoming! Remember: ISO/IEC/IEEE 29119 is your guide! 💡",
  },
];

// 36 questions total; ordered by incident and then easy → medium → hard.
export const QUESTION_BANK = [
  // ─────────────────────────────────────────────────────────────────────────
  // INCIDENT 1 — Core Banking Meltdown (ISO/IEC/IEEE 29119-1)
  // Coverage: §4.1.3, §4.1.5, §4.1.8, §3.131, §3.85, §3.84, §3.115, §3.116, §4.1.11, §3.69, §3.64, §3.68

  // Easy (1–4)
  makeQuestion({
    id: 'I1-Q1',
    incidentId: 'incident-1',
    order: 1,
    part: 1,
    section: '4.1.8',
    title: 'Purpose of Testing',
    definition: 'detecting defects, gathering information, creating confidence for stakeholders',
    isoSays: 'detecting defects, gathering information, creating confidence for stakeholders',
    situation:
      'A core banking patch is about to go live. Executives ask why you want to spend one more day testing when “nothing looks broken.” Your team needs a crisp explanation aligned with ISO/IEC/IEEE 29119.',
    relevantMetrics: ['stakeholderTrust', 'defectDetection'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Explain testing builds confidence and finds defects',
        description: 'State that testing detects defects, gathers information, and creates stakeholder confidence before release.',
        result: '✅ RESULT: Leadership approves the extra testing window.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "detecting defects, gathering information, creating confidence for stakeholders"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Say testing is mostly a compliance checkbox',
        description: 'Focus on “we must test because standards require it,” without connecting to outcomes.',
        result: '✅ RESULT: You get limited buy-in, but skepticism remains.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "detecting defects, gathering information, creating confidence for stakeholders"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Promise you can test everything quickly',
        description: 'Suggest exhaustive coverage is easy if the team just works harder.',
        result: '❌ RESULT: Expectations become unrealistic and backfire.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "detecting defects, gathering information, creating confidence for stakeholders"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Skip testing and rely on monitoring after release',
        description: 'Argue production monitoring will find issues faster than pre-release testing.',
        result: '❌ RESULT: A defect slips through and triggers an incident.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "detecting defects, gathering information, creating confidence for stakeholders"',
      },
    ],
  }),

  makeQuestion({
    id: 'I1-Q2',
    incidentId: 'incident-1',
    order: 2,
    part: 1,
    section: '3.131',
    title: 'Testing',
    definition: 'set of activities conducted to facilitate discovery and evaluation of properties of test items',
    isoSays: 'set of activities conducted to facilitate discovery and evaluation of properties of test items',
    situation:
      'A developer claims “we already ran the app once, so testing is done.” You need to define what testing actually is in ISO/IEC/IEEE 29119 terms to reset expectations.',
    relevantMetrics: ['stakeholderTrust', 'testCoverage'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Frame testing as structured activities on test items',
        description: 'Describe testing as activities to discover and evaluate properties of test items, not a single run.',
        result: '✅ RESULT: The team aligns on a proper testing scope.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "set of activities conducted to facilitate discovery and evaluation of properties of test items"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Say testing is “running some scripts”',
        description: 'You mention scripts but do not anchor to the definition or test items.',
        result: '✅ RESULT: Better, but still vague about scope.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "set of activities conducted to facilitate discovery and evaluation of properties of test items"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Equate testing with debugging',
        description: 'Treat testing as only finding and fixing faults during development.',
        result: '❌ RESULT: Roles blur and evidence becomes unreliable.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "set of activities conducted to facilitate discovery and evaluation of properties of test items"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Treat testing as optional if users complain',
        description: 'Say you’ll wait for production feedback to decide whether to test.',
        result: '❌ RESULT: You ship without evidence and trigger severe outages.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "set of activities conducted to facilitate discovery and evaluation of properties of test items"',
      },
    ],
  }),

  makeQuestion({
    id: 'I1-Q3',
    incidentId: 'incident-1',
    order: 3,
    part: 1,
    section: '4.1.5',
    title: 'Static vs Dynamic Testing',
    definition: 'static = no execution (reviews, analysis); dynamic = executing code and running tests',
    isoSays: 'static = no execution (reviews, analysis); dynamic = executing code and running tests',
    situation:
      'An urgent release is blocked. You can either do a quick peer review of a risky change or run a fast smoke test. The team is arguing about what counts as “real testing.”',
    relevantMetrics: ['defectDetection', 'timelinePressure'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Clarify static vs dynamic and choose appropriately',
        description: 'Explain static is without execution; dynamic is executing code. Combine the right mix for risk.',
        result: '✅ RESULT: You select the right activities fast and reduce risk.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "static = no execution (reviews, analysis); dynamic = executing code and running tests"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Run only the smoke test',
        description: 'You prioritize dynamic testing but skip quick static review of the change.',
        result: '✅ RESULT: You catch obvious issues but miss a review-detectable flaw.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "static = no execution (reviews, analysis); dynamic = executing code and running tests"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Do only the review and skip execution',
        description: 'You avoid running any tests because time is short.',
        result: '❌ RESULT: A runtime defect escapes into production.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "static = no execution (reviews, analysis); dynamic = executing code and running tests"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Claim reviews are not testing',
        description: 'You reject static testing as irrelevant and ship without evidence.',
        result: '❌ RESULT: The change causes cascading failures and escalations.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "static = no execution (reviews, analysis); dynamic = executing code and running tests"',
      },
    ],
  }),

  makeQuestion({
    id: 'I1-Q4',
    incidentId: 'incident-1',
    order: 4,
    part: 1,
    section: '4.1.3',
    title: 'Verification and Validation',
    definition: 'verification = conformance with specs; validation = acceptability to stakeholders',
    isoSays: 'verification = conformance with specs; validation = acceptability to stakeholders',
    situation:
      'A regulator wants proof the banking system meets written requirements, while product owners care if the user experience is acceptable. The team is mixing these up in status updates.',
    relevantMetrics: ['stakeholderTrust', 'testCoverage'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Separate verification from validation',
        description: 'Report verification against specs and validation for stakeholder acceptability as distinct goals.',
        result: '✅ RESULT: Stakeholders receive clear, accurate reporting.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "verification = conformance with specs; validation = acceptability to stakeholders"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Focus only on verifying requirements',
        description: 'You provide strong evidence of conformance but ignore stakeholder acceptability signals.',
        result: '✅ RESULT: Compliance is satisfied, but business concerns remain.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "verification = conformance with specs; validation = acceptability to stakeholders"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Call user feedback “verification”',
        description: 'You label stakeholder acceptability as verification, confusing audiences.',
        result: '❌ RESULT: Reports are challenged and credibility drops.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "verification = conformance with specs; validation = acceptability to stakeholders"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Treat verification/validation as the same thing',
        description: 'You collapse both into “it works,” without evidence.',
        result: '❌ RESULT: Approvals stall and incident pressure increases.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "verification = conformance with specs; validation = acceptability to stakeholders"',
      },
    ],
  }),

  // Medium (5–8)
  makeQuestion({
    id: 'I1-Q5',
    incidentId: 'incident-1',
    order: 5,
    part: 1,
    section: '3.84',
    title: 'Test Basis',
    definition: 'information used as basis for designing and implementing test cases',
    isoSays: 'information used as basis for designing and implementing test cases',
    situation:
      'The bank’s “requirements” are scattered across emails, tickets, and a partial spec. A tester asks what they should use to design tests so expected results are defensible.',
    relevantMetrics: ['testCoverage', 'stakeholderTrust'],
    lessRelevantMetric: 'teamMorale',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Define and agree the test basis',
        description: 'Identify the information that will be used as the basis for designing and implementing test cases.',
        result: '✅ RESULT: Test expectations become auditable and consistent.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "information used as basis for designing and implementing test cases"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Use only the latest ticket as the reference',
        description: 'You pick a single artifact without reconciling conflicts across sources.',
        result: '✅ RESULT: Work continues, but disputes arise later.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "information used as basis for designing and implementing test cases"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Let each tester decide their own basis',
        description: 'You skip agreement, leading to inconsistent expected results.',
        result: '❌ RESULT: Pass/fail debates waste time and trust.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "information used as basis for designing and implementing test cases"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Avoid expected results to move faster',
        description: 'You run ad-hoc checks with no defensible basis.',
        result: '❌ RESULT: Incidents escalate because evidence is weak.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "information used as basis for designing and implementing test cases"',
      },
    ],
  }),

  makeQuestion({
    id: 'I1-Q6',
    incidentId: 'incident-1',
    order: 6,
    part: 1,
    section: '3.85',
    title: 'Test Case',
    definition: 'set of preconditions, inputs and expected results developed to drive execution of a test item',
    isoSays: 'set of preconditions, inputs and expected results developed to drive execution of a test item',
    situation:
      'During incident response, a tester shares a chat message: “I clicked around and it seemed fine.” You need test evidence that can be repeated and reviewed.',
    relevantMetrics: ['testCoverage', 'defectDetection'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Write test cases with preconditions, inputs, expected results',
        description: 'Capture repeatable steps and expected outcomes to drive execution of the test item.',
        result: '✅ RESULT: Evidence becomes repeatable and reviewable.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "set of preconditions, inputs and expected results developed to drive execution of a test item"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Keep only inputs and skip expected results',
        description: 'You document steps but leave pass/fail mostly subjective.',
        result: '✅ RESULT: Re-run is possible, but verdicts vary by person.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "set of preconditions, inputs and expected results developed to drive execution of a test item"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Rely on memory instead of documentation',
        description: 'Assume testers can reproduce later without a written case.',
        result: '❌ RESULT: Retesting becomes inconsistent and slow.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "set of preconditions, inputs and expected results developed to drive execution of a test item"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Skip test cases entirely and ship “hotfixes”',
        description: 'Push changes without structured evidence.',
        result: '❌ RESULT: You trigger regressions and lose stakeholder trust.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "set of preconditions, inputs and expected results developed to drive execution of a test item"',
      },
    ],
  }),

  makeQuestion({
    id: 'I1-Q7',
    incidentId: 'incident-1',
    order: 7,
    part: 1,
    section: '3.115',
    title: 'Test Oracle',
    definition: 'source of information for determining whether a test has passed or failed',
    isoSays: 'source of information for determining whether a test has passed or failed',
    situation:
      'The bank’s interest calculation has edge cases. The team argues whether “it looks right” is enough. You need an ISO/IEC/IEEE 29119-aligned basis for pass/fail.',
    relevantMetrics: ['defectDetection', 'stakeholderTrust'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Define a test oracle for pass/fail',
        description: 'Establish a source of information that determines whether the test passed or failed (spec, similar system, expert).',
        result: '✅ RESULT: Disputes drop because pass/fail is anchored.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "source of information for determining whether a test has passed or failed"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Use a human expert for tricky cases only',
        description: 'You use an oracle sometimes, but not consistently across tests.',
        result: '✅ RESULT: Some clarity, but inconsistency remains.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "source of information for determining whether a test has passed or failed"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Decide pass/fail by majority vote',
        description: 'Treat opinions as the oracle without grounding.',
        result: '❌ RESULT: Decisions look arbitrary and trust drops.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "source of information for determining whether a test has passed or failed"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Avoid pass/fail and “just monitor in prod”',
        description: 'You skip the oracle and ship uncertainty.',
        result: '❌ RESULT: Hidden defects surface as high-severity incidents.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "source of information for determining whether a test has passed or failed"',
      },
    ],
  }),

  makeQuestion({
    id: 'I1-Q8',
    incidentId: 'incident-1',
    order: 8,
    part: 1,
    section: '3.116',
    title: 'Test Oracle Problem',
    definition: 'challenge of determining whether a test has passed or failed for a given set of inputs',
    isoSays: 'challenge of determining whether a test has passed or failed for a given set of inputs',
    situation:
      'A fraud model update changes transaction scoring. The outputs are probabilistic and hard to label as simply pass/fail. The team is stuck debating expected results.',
    relevantMetrics: ['defectDetection', 'riskExposure'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Recognize and manage the oracle problem explicitly',
        description: 'Acknowledge the challenge of pass/fail determination and select appropriate oracles/approaches.',
        result: '✅ RESULT: You unblock testing with a defensible approach.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "challenge of determining whether a test has passed or failed for a given set of inputs"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Use approximate thresholds without documenting them',
        description: 'You pick thresholds but fail to record rationale as test evidence.',
        result: '✅ RESULT: You move forward but face later disputes.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "challenge of determining whether a test has passed or failed for a given set of inputs"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Declare oracle problems mean testing is impossible',
        description: 'You stop testing rather than managing the challenge.',
        result: '❌ RESULT: Unmitigated risk grows rapidly.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "challenge of determining whether a test has passed or failed for a given set of inputs"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Ship and wait for customer complaints',
        description: 'You abandon pass/fail determination entirely.',
        result: '❌ RESULT: The incident becomes public and costly.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "challenge of determining whether a test has passed or failed for a given set of inputs"',
      },
    ],
  }),

  // Hard (9–12)
  makeQuestion({
    id: 'I1-Q9',
    incidentId: 'incident-1',
    order: 9,
    part: 1,
    section: '4.1.11',
    title: 'Test Independence',
    definition: 'high independence = independent tester; reduces confirmation bias; low = developer tests own work',
    isoSays: 'high independence = independent tester; reduces confirmation bias; low = developer tests own work',
    situation:
      'After repeated production incidents, executives demand to know why defects were missed. You discover developers have been testing their own changes without independent review.',
    relevantMetrics: ['defectDetection', 'stakeholderTrust'],
    lessRelevantMetric: 'teamMorale',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Increase test independence to reduce bias',
        description: 'Introduce independent testers/review to reduce confirmation bias and improve defect detection.',
        result: '✅ RESULT: Missed defects drop as bias is reduced.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "high independence = independent tester; reduces confirmation bias; low = developer tests own work"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Keep developer testing but add more checklists',
        description: 'You add structure but don’t change independence level.',
        result: '✅ RESULT: Some improvement, but blind spots persist.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "high independence = independent tester; reduces confirmation bias; low = developer tests own work"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Reduce QA involvement to speed up',
        description: 'You rely more heavily on developers to test their own work.',
        result: '❌ RESULT: Confirmation bias increases and defects escape.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "high independence = independent tester; reduces confirmation bias; low = developer tests own work"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Eliminate testing roles entirely',
        description: 'You expect developers to self-certify releases.',
        result: '❌ RESULT: Risk spikes and stakeholder trust collapses.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "high independence = independent tester; reduces confirmation bias; low = developer tests own work"',
      },
    ],
  }),

  makeQuestion({
    id: 'I1-Q10',
    incidentId: 'incident-1',
    order: 10,
    part: 1,
    section: '3.69',
    title: 'Risk-based Testing',
    definition: 'testing where management and selection of activities are consciously based on analysed risk',
    isoSays: 'testing where management and selection of activities are consciously based on analysed risk',
    situation:
      'Only 6 hours remain before a mandated banking release. You cannot run every test. You must decide what to test first and justify it under ISO/IEC/IEEE 29119.',
    relevantMetrics: ['riskExposure', 'timelinePressure'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Prioritize tests using analyzed risk',
        description: 'Select and manage test activities consciously based on analyzed risk exposure.',
        result: '✅ RESULT: Critical risks are covered first and exposure drops.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing where management and selection of activities are consciously based on analysed risk"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Prioritize by what’s easiest to automate',
        description: 'You pick tests that run fast, not necessarily highest risk.',
        result: '✅ RESULT: You gain speed but miss a high-risk path.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing where management and selection of activities are consciously based on analysed risk"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Test randomly to “spread coverage”',
        description: 'You select tests without analyzing likelihood/impact.',
        result: '❌ RESULT: High-risk areas remain untested and exposure stays high.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing where management and selection of activities are consciously based on analysed risk"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Skip testing due to schedule pressure',
        description: 'You let the deadline dictate eliminating tests.',
        result: '❌ RESULT: The release causes a major outage and escalation.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing where management and selection of activities are consciously based on analysed risk"',
      },
    ],
  }),

  makeQuestion({
    id: 'I1-Q11',
    incidentId: 'incident-1',
    order: 11,
    part: 1,
    section: '3.64',
    title: 'Regression Testing',
    definition: 'testing after modifications to identify failures in unmodified parts of the test item',
    isoSays: 'testing after modifications to identify failures in unmodified parts of the test item',
    situation:
      'A hotfix addresses a login failure in online banking. After deploying the fix in staging, unrelated bill-pay screens start failing. You need the right testing approach name and purpose.',
    relevantMetrics: ['defectDetection', 'testCoverage'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Run regression testing after the modification',
        description: 'Test unmodified parts to identify failures introduced by the change.',
        result: '✅ RESULT: You catch unintended side effects before production.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing after modifications to identify failures in unmodified parts of the test item"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Retest only the fixed login path',
        description: 'You confirm the fix but don’t check unmodified parts.',
        result: '✅ RESULT: The fix works, but other failures may slip through.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing after modifications to identify failures in unmodified parts of the test item"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Skip testing because the change is “small”',
        description: 'Assume a small change cannot affect other functionality.',
        result: '❌ RESULT: A regression reaches customers and becomes an incident.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing after modifications to identify failures in unmodified parts of the test item"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Disable bill-pay features to “reduce risk”',
        description: 'You avoid testing and instead remove functionality under pressure.',
        result: '❌ RESULT: Stakeholders lose trust and risk exposure rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing after modifications to identify failures in unmodified parts of the test item"',
      },
    ],
  }),

  makeQuestion({
    id: 'I1-Q12',
    incidentId: 'incident-1',
    order: 12,
    part: 1,
    section: '3.68',
    title: 'Retesting (Confirmation Testing)',
    definition: 'testing to check modifications made to correct a fault successfully removed it',
    isoSays: 'testing to check modifications made to correct a fault successfully removed it',
    situation:
      'A defect in funds transfer rounding was fixed. Before you sign off, you must confirm the fix actually removed the fault. The team is using “regression” and “retest” interchangeably.',
    relevantMetrics: ['defectDetection', 'stakeholderTrust'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Retest specifically to confirm the fix removed the fault',
        description: 'Run targeted tests to check modifications corrected the fault successfully.',
        result: '✅ RESULT: The fix is confirmed and sign-off is defensible.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing to check modifications made to correct a fault successfully removed it"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Run a broad regression suite and hope it covers the fix',
        description: 'You might confirm indirectly, but it’s not explicit confirmation testing.',
        result: '✅ RESULT: You gain confidence, but the fix confirmation is weak.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing to check modifications made to correct a fault successfully removed it"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Assume the fix works because the code changed',
        description: 'You skip confirmation testing entirely.',
        result: '❌ RESULT: The defect reappears and escalates the incident.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing to check modifications made to correct a fault successfully removed it"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Close the defect ticket without any execution',
        description: 'You rely on developer assertion instead of retesting.',
        result: '❌ RESULT: Stakeholders lose trust and risk exposure increases.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "testing to check modifications made to correct a fault successfully removed it"',
      },
    ],
  }),

  // ─────────────────────────────────────────────────────────────────────────
  // INCIDENT 2 — E-Commerce Black Friday Crash (ISO/IEC/IEEE 29119-2 & -3)
  // Coverage: §3.117, §3.127, §3.118, §4.3.1, §4.3.2, §3.86, §3.87, §3.94, §3.95, §3.111, §3.109, §4.3.7

  // Easy (1–4)
  makeQuestion({
    id: 'I2-Q1',
    incidentId: 'incident-2',
    order: 13,
    part: 2,
    section: '3.118',
    title: 'Test Policy',
    definition: 'executive-level document describing purpose, goals, principles, and scope of testing',
    isoSays: 'executive-level document describing purpose, goals, principles, and scope of testing',
    situation:
      'Black Friday preparations begin. The CTO asks for a single top-level statement describing how the organization approaches testing across products. You need the correct ISO/IEC/IEEE 29119 artifact.',
    relevantMetrics: ['stakeholderTrust', 'riskExposure'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Create/maintain a test policy',
        description: 'Provide an executive-level document describing purpose, goals, principles, and scope of testing.',
        result: '✅ RESULT: Leadership alignment improves before peak season.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "executive-level document describing purpose, goals, principles, and scope of testing"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Write a team-specific checklist instead',
        description: 'You create guidance, but it’s not executive-level or organizational.',
        result: '✅ RESULT: Teams benefit, but leadership alignment is incomplete.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "executive-level document describing purpose, goals, principles, and scope of testing"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Treat policy as a sprint task per feature',
        description: 'You fragment policy into short-lived feature notes.',
        result: '❌ RESULT: Inconsistent direction increases risk exposure.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "executive-level document describing purpose, goals, principles, and scope of testing"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Skip policy; rely on “common sense”',
        description: 'You leave teams without shared purpose, goals, or scope.',
        result: '❌ RESULT: Testing becomes inconsistent and incidents increase.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "executive-level document describing purpose, goals, principles, and scope of testing"',
      },
    ],
  }),

  makeQuestion({
    id: 'I2-Q2',
    incidentId: 'incident-2',
    order: 14,
    part: 2,
    section: '3.117',
    title: 'Test Plan',
    definition: 'detailed description of test objectives and means/schedule for achieving them',
    isoSays: 'detailed description of test objectives and means/schedule for achieving them',
    situation:
      'The checkout service is being re-architected. Product asks: “What exactly will we test, with what resources, and when?” You need the right document per ISO/IEC/IEEE 29119.',
    relevantMetrics: ['timelinePressure', 'stakeholderTrust'],
    lessRelevantMetric: 'teamMorale',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Create a test plan with objectives and schedule',
        description: 'Document test objectives and the means/schedule for achieving them.',
        result: '✅ RESULT: The team can coordinate confidently toward launch.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "detailed description of test objectives and means/schedule for achieving them"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Only share a rough timeline in chat',
        description: 'You provide a schedule hint, but not a detailed plan.',
        result: '✅ RESULT: Work proceeds, but dependencies surprise you.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "detailed description of test objectives and means/schedule for achieving them"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Let each team plan independently',
        description: 'You avoid consolidated objectives and schedule.',
        result: '❌ RESULT: Effort duplicates and critical gaps appear.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "detailed description of test objectives and means/schedule for achieving them"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Avoid planning because it “slows delivery”',
        description: 'You proceed without objectives and schedule evidence.',
        result: '❌ RESULT: Timeline pressure spikes and outages follow.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "detailed description of test objectives and means/schedule for achieving them"',
      },
    ],
  }),

  makeQuestion({
    id: 'I2-Q3',
    incidentId: 'incident-2',
    order: 15,
    part: 2,
    section: '3.127',
    title: 'Test Strategy',
    definition: 'part of test plan describing the approach to testing for a specific project/level/type',
    isoSays: 'part of test plan describing the approach to testing for a specific project/level/type',
    situation:
      'Leadership wants to know whether you will emphasize system testing, performance testing, or exploratory testing for the Black Friday build. You need an ISO/IEC/IEEE 29119-aligned statement of approach.',
    relevantMetrics: ['riskExposure', 'timelinePressure'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Define a test strategy within the test plan',
        description: 'Describe the approach to testing for the project/level/type as part of the plan.',
        result: '✅ RESULT: The approach is clear and execution is smoother.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "part of test plan describing the approach to testing for a specific project/level/type"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Pick a single test type and ignore others',
        description: 'You choose one focus area but fail to define a balanced approach.',
        result: '✅ RESULT: You gain focus but overlook risks outside the chosen type.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "part of test plan describing the approach to testing for a specific project/level/type"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Let the approach evolve with no documentation',
        description: 'You avoid describing the testing approach at all.',
        result: '❌ RESULT: Stakeholders interpret the plan differently and conflict grows.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "part of test plan describing the approach to testing for a specific project/level/type"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Treat strategy as “whatever tests fail first”',
        description: 'You react to failures instead of planning the approach.',
        result: '❌ RESULT: Risk exposure increases as gaps go unaddressed.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "part of test plan describing the approach to testing for a specific project/level/type"',
      },
    ],
  }),

  makeQuestion({
    id: 'I2-Q4',
    incidentId: 'incident-2',
    order: 16,
    part: 2,
    section: '4.3.2',
    title: 'Test Documentation',
    definition: 'test policy, test practices, test plan, status reports, completion report, test specifications',
    isoSays: 'test policy, test practices, test plan, status reports, completion report, test specifications',
    situation:
      'A new QA lead asks “Which documents do we actually need for ISO/IEC/IEEE 29119?” The team is drowning in random templates.',
    relevantMetrics: ['stakeholderTrust', 'testCoverage'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Align documentation to ISO/IEC/IEEE 29119 set',
        description: 'Use the documented set: policy, practices, plan, status and completion reports, and test specifications.',
        result: '✅ RESULT: Documentation becomes complete but not wasteful.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "test policy, test practices, test plan, status reports, completion report, test specifications"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Keep only status reports and skip the rest',
        description: 'You communicate progress but lose the foundation artifacts.',
        result: '✅ RESULT: Reporting improves, but planning/specs are weak.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "test policy, test practices, test plan, status reports, completion report, test specifications"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Adopt every template you can find',
        description: 'You create excessive documents without standard structure.',
        result: '❌ RESULT: Morale drops and schedule slips.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "test policy, test practices, test plan, status reports, completion report, test specifications"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Avoid documentation entirely',
        description: 'You keep everything informal and undocumented.',
        result: '❌ RESULT: Auditability is lost and risk exposure rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "test policy, test practices, test plan, status reports, completion report, test specifications"',
      },
    ],
  }),

  // Medium (5–8)
  makeQuestion({
    id: 'I2-Q5',
    incidentId: 'incident-2',
    order: 17,
    part: 2,
    section: '4.3.1',
    title: 'Test Processes',
    definition: 'three levels — organizational, test management, dynamic testing',
    isoSays: 'three levels — organizational, test management, dynamic testing',
    situation:
      'A cross-team retro finds confusion: some people talk about “process” as a company policy, others as execution steps in a sprint. You need the ISO/IEC/IEEE 29119 framing.',
    relevantMetrics: ['stakeholderTrust', 'teamMorale'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Use the three levels of test processes',
        description: 'Organizational, test management, and dynamic testing processes are distinct and complementary.',
        result: '✅ RESULT: Responsibilities and expectations become clearer.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "three levels — organizational, test management, dynamic testing"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Focus only on dynamic testing steps',
        description: 'You improve execution but ignore management and organizational processes.',
        result: '✅ RESULT: Execution improves, but governance gaps remain.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "three levels — organizational, test management, dynamic testing"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Treat process as “whatever the team prefers”',
        description: 'You do not define levels or responsibilities.',
        result: '❌ RESULT: Confusion continues and morale falls.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "three levels — organizational, test management, dynamic testing"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Eliminate process discussions during peak season',
        description: 'You refuse to clarify anything to “move faster.”',
        result: '❌ RESULT: Misalignment causes costly late-stage rework.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "three levels — organizational, test management, dynamic testing"',
      },
    ],
  }),

  makeQuestion({
    id: 'I2-Q6',
    incidentId: 'incident-2',
    order: 18,
    part: 3,
    section: '3.95',
    title: 'Test Environment',
    definition: 'environment containing facilities and tools needed to conduct a test',
    isoSays: 'environment containing facilities and tools needed to conduct a test',
    situation:
      'Load tests are failing randomly. You learn the staging environment lacks a production-like cache configuration and key monitoring tools. You need to label and fix this per ISO/IEC/IEEE 29119.',
    relevantMetrics: ['defectDetection', 'riskExposure'],
    lessRelevantMetric: 'teamMorale',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Stabilize the test environment facilities/tools',
        description: 'Treat the environment (facilities and tools) as a controlled prerequisite for valid tests.',
        result: '✅ RESULT: Test results become reliable and actionable.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "environment containing facilities and tools needed to conduct a test"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Keep testing but add disclaimers to reports',
        description: 'You continue with an unstable environment while warning stakeholders.',
        result: '✅ RESULT: You communicate risk, but results remain noisy.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "environment containing facilities and tools needed to conduct a test"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Ignore environment issues and blame the test scripts',
        description: 'You treat inconsistent results as tester error.',
        result: '❌ RESULT: You waste time and miss real issues.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "environment containing facilities and tools needed to conduct a test"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Disable performance testing entirely',
        description: 'You remove the activity instead of fixing prerequisites.',
        result: '❌ RESULT: The Black Friday crash becomes inevitable.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "environment containing facilities and tools needed to conduct a test"',
      },
    ],
  }),

  makeQuestion({
    id: 'I2-Q7',
    incidentId: 'incident-2',
    order: 19,
    part: 3,
    section: '3.109',
    title: 'Test Management',
    definition: 'planning, scheduling, estimating, monitoring, reporting, control, and completion of test activities',
    isoSays: 'planning, scheduling, estimating, monitoring, reporting, control, and completion of test activities',
    situation:
      'Teams are testing in parallel, but no one can answer: “Are we on track?” Stakeholders demand weekly updates on progress and remaining risk.',
    relevantMetrics: ['stakeholderTrust', 'timelinePressure'],
    lessRelevantMetric: 'testCoverage',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Apply test management practices end-to-end',
        description: 'Plan, schedule, estimate, monitor, report, control, and complete test activities.',
        result: '✅ RESULT: Progress is visible and decisions become data-driven.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "planning, scheduling, estimating, monitoring, reporting, control, and completion of test activities"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Do only reporting and skip monitoring/control',
        description: 'You communicate but don’t actively steer the work.',
        result: '✅ RESULT: Visibility improves, but slippage isn’t corrected in time.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "planning, scheduling, estimating, monitoring, reporting, control, and completion of test activities"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Rely on developers to self-report testing status',
        description: 'You avoid planning and monitoring as a test function.',
        result: '❌ RESULT: Status becomes inconsistent and trust erodes.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "planning, scheduling, estimating, monitoring, reporting, control, and completion of test activities"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Stop tracking testing progress to reduce overhead',
        description: 'You remove monitoring and reporting during peak season.',
        result: '❌ RESULT: Surprises stack up and risk exposure rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "planning, scheduling, estimating, monitoring, reporting, control, and completion of test activities"',
      },
    ],
  }),

  makeQuestion({
    id: 'I2-Q8',
    incidentId: 'incident-2',
    order: 20,
    part: 3,
    section: '4.3.7',
    title: 'Test Metrics',
    definition: 'residual risk, cumulative defects, test coverage, defect detection percentage',
    isoSays: 'residual risk, cumulative defects, test coverage, defect detection percentage',
    situation:
      'The CEO asks: “Are we ready for Black Friday?” You need to report using ISO/IEC/IEEE 29119 test metrics rather than vibes.',
    relevantMetrics: ['stakeholderTrust', 'riskExposure'],
    lessRelevantMetric: 'teamMorale',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Report readiness using ISO/IEC/IEEE 29119 metrics',
        description: 'Use residual risk, cumulative defects, test coverage, and defect detection percentage.',
        result: '✅ RESULT: Leadership gets a clear, decision-ready view.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "residual risk, cumulative defects, test coverage, defect detection percentage"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Report only test coverage',
        description: 'You include one metric but omit residual risk and detection effectiveness.',
        result: '✅ RESULT: Some clarity, but risk remains under-explained.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "residual risk, cumulative defects, test coverage, defect detection percentage"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Report number of meetings and hours worked',
        description: 'You use activity metrics instead of testing metrics.',
        result: '❌ RESULT: Stakeholders can’t judge readiness or risk.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "residual risk, cumulative defects, test coverage, defect detection percentage"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Avoid metrics to prevent “pressure”',
        description: 'You refuse to quantify readiness and residual risk.',
        result: '❌ RESULT: Decisions become guesswork and exposure rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "residual risk, cumulative defects, test coverage, defect detection percentage"',
      },
    ],
  }),

  // Hard (9–12)
  makeQuestion({
    id: 'I2-Q9',
    incidentId: 'incident-2',
    order: 21,
    part: 3,
    section: '3.86',
    title: 'Test Completion Process',
    definition: 'ensures useful test assets are made available, environments left satisfactory, results recorded',
    isoSays: 'ensures useful test assets are made available, environments left satisfactory, results recorded',
    situation:
      'After a chaotic load-testing push, the team wants to “just move on.” But future releases will depend on reusable assets and a stable environment. You must close testing properly.',
    relevantMetrics: ['budgetEfficiency', 'stakeholderTrust'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Execute the test completion process',
        description: 'Make test assets available, leave environments satisfactory, and record results.',
        result: '✅ RESULT: Knowledge is retained and the next cycle starts cleanly.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "ensures useful test assets are made available, environments left satisfactory, results recorded"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Archive only the final reports',
        description: 'You keep some outputs but ignore environment clean-up and assets.',
        result: '✅ RESULT: Some traceability remains, but reuse suffers.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "ensures useful test assets are made available, environments left satisfactory, results recorded"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Delete test artifacts to reduce clutter',
        description: 'You lose useful testware and history.',
        result: '❌ RESULT: The next cycle repeats the same mistakes.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "ensures useful test assets are made available, environments left satisfactory, results recorded"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Leave environments in a broken state',
        description: 'You exit without cleanup or recording results.',
        result: '❌ RESULT: Future testing is delayed and risk exposure rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "ensures useful test assets are made available, environments left satisfactory, results recorded"',
      },
    ],
  }),

  makeQuestion({
    id: 'I2-Q10',
    incidentId: 'incident-2',
    order: 22,
    part: 3,
    section: '3.87',
    title: 'Test Completion Report',
    definition: 'report providing summary of the testing that was performed',
    isoSays: 'report providing summary of the testing that was performed',
    situation:
      'Black Friday passes. Post-event, leadership wants a concise record of what testing was done, what was found, and what remains risky. You must deliver the correct ISO/IEC/IEEE 29119 report.',
    relevantMetrics: ['stakeholderTrust', 'riskExposure'],
    lessRelevantMetric: 'teamMorale',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Produce a test completion report',
        description: 'Deliver a summary of the testing that was performed.',
        result: '✅ RESULT: Stakeholders understand coverage and residual risk.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "report providing summary of the testing that was performed"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Share raw logs and dashboards',
        description: 'You provide data but not a summary report.',
        result: '✅ RESULT: Transparency improves, but interpretation is hard.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "report providing summary of the testing that was performed"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Only mention what went well',
        description: 'You avoid summarizing gaps and remaining risk.',
        result: '❌ RESULT: Problems repeat because lessons aren’t recorded.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "report providing summary of the testing that was performed"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Skip reporting to avoid blame',
        description: 'You provide no summary of testing performed.',
        result: '❌ RESULT: Trust drops and risk exposure increases.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "report providing summary of the testing that was performed"',
      },
    ],
  }),

  makeQuestion({
    id: 'I2-Q11',
    incidentId: 'incident-2',
    order: 23,
    part: 3,
    section: '3.94',
    title: 'Test Design Technique',
    definition: 'procedure used to create/select a test model, identify coverage items, derive test cases',
    isoSays: 'procedure used to create/select a test model, identify coverage items, derive test cases',
    situation:
      'Checkout failures appear only for certain combinations of shipping, coupon, and payment method. You need a systematic way to derive test cases and coverage items rather than guessing.',
    relevantMetrics: ['testCoverage', 'defectDetection'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Apply a test design technique to derive cases',
        description: 'Use a procedure to create/select a test model, identify coverage items, and derive test cases.',
        result: '✅ RESULT: Combination bugs are found before peak traffic.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "procedure used to create/select a test model, identify coverage items, derive test cases"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Test the “most popular” combinations only',
        description: 'You test some coverage items but not systematically derived.',
        result: '✅ RESULT: Some risk is reduced, but rare combos still break.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "procedure used to create/select a test model, identify coverage items, derive test cases"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Rely on error guessing alone',
        description: 'You do not build a model or coverage items.',
        result: '❌ RESULT: You miss systematic gaps and coverage remains unknown.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "procedure used to create/select a test model, identify coverage items, derive test cases"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Stop testing combinations due to time',
        description: 'You abandon systematic derivation and ship with unknown risk.',
        result: '❌ RESULT: A rare combination crashes checkout during Black Friday.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "procedure used to create/select a test model, identify coverage items, derive test cases"',
      },
    ],
  }),

  makeQuestion({
    id: 'I2-Q12',
    incidentId: 'incident-2',
    order: 24,
    part: 3,
    section: '3.111',
    title: 'Test Model',
    definition: 'representation of test item allowing testing to focus on particular characteristics',
    isoSays: 'representation of test item allowing testing to focus on particular characteristics',
    situation:
      'Your team struggles to reason about checkout behavior across states (cart, shipping, payment, confirmation). You need an explicit representation to drive coverage items and tests.',
    relevantMetrics: ['testCoverage', 'defectDetection'],
    lessRelevantMetric: 'teamMorale',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Create a test model of the checkout flow',
        description: 'Use a representation of the test item to focus on characteristics and derive tests.',
        result: '✅ RESULT: Coverage becomes measurable and gaps become visible.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "representation of test item allowing testing to focus on particular characteristics"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Keep a rough diagram but don’t use it to derive tests',
        description: 'You create a representation but don’t connect it to coverage items.',
        result: '✅ RESULT: Communication improves, but test derivation remains ad-hoc.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "representation of test item allowing testing to focus on particular characteristics"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Let each tester hold a mental model',
        description: 'No shared model means no shared coverage items.',
        result: '❌ RESULT: Overlaps and gaps multiply under peak pressure.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "representation of test item allowing testing to focus on particular characteristics"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Avoid modeling because it “wastes time”',
        description: 'You proceed with random tests and unknown coverage.',
        result: '❌ RESULT: Defects slip through and the incident repeats.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "representation of test item allowing testing to focus on particular characteristics"',
      },
    ],
  }),

  // ─────────────────────────────────────────────────────────────────────────
  // INCIDENT 3 — Healthcare System Security Breach (ISO/IEC/IEEE 29119-4)
  // Coverage: §3.12, §3.31, §3.27, §3.76, §3.13, §3.80, §3.74, §3.79, §3.57, §3.37, §3.49, §4.4.7

  // Easy (1–4)
  makeQuestion({
    id: 'I3-Q1',
    incidentId: 'incident-3',
    order: 25,
    part: 4,
    section: '3.74',
    title: 'Security Testing',
    definition: 'evaluates degree to which test item and data are protected from unauthorized access',
    isoSays: 'evaluates degree to which test item and data are protected from unauthorized access',
    situation:
      'A hospital reports suspicious access to patient records. You must immediately focus testing on whether the system and data are protected from unauthorized access.',
    relevantMetrics: ['riskExposure', 'stakeholderTrust'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Run security testing focused on unauthorized access',
        description: 'Evaluate protection of the test item and data against unauthorized access.',
        result: '✅ RESULT: You quickly identify exploitable access paths.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "evaluates degree to which test item and data are protected from unauthorized access"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Run only functional smoke tests',
        description: 'You verify basic workflows but not security properties.',
        result: '✅ RESULT: Basic function is confirmed, but the breach risk remains.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "evaluates degree to which test item and data are protected from unauthorized access"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Assume security is “handled by IT”',
        description: 'You avoid testing security properties.',
        result: '❌ RESULT: The breach persists and exposure rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "evaluates degree to which test item and data are protected from unauthorized access"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Disable logging to “reduce noise”',
        description: 'You reduce visibility into unauthorized access during a breach.',
        result: '❌ RESULT: Investigation becomes harder and risk exposure spikes.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "evaluates degree to which test item and data are protected from unauthorized access"',
      },
    ],
  }),

  makeQuestion({
    id: 'I3-Q2',
    incidentId: 'incident-3',
    order: 26,
    part: 4,
    section: '3.31',
    title: 'Equivalence Partitioning',
    definition: 'technique designing test cases to exercise equivalence partitions',
    isoSays: 'technique designing test cases to exercise equivalence partitions',
    situation:
      'The patient portal rejects some IDs. You need to design tests that cover valid and invalid classes of inputs efficiently under time pressure.',
    relevantMetrics: ['testCoverage', 'budgetEfficiency'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Use equivalence partitioning to cover input classes',
        description: 'Design test cases to exercise equivalence partitions rather than individual values.',
        result: '✅ RESULT: Coverage improves without exploding the test count.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "technique designing test cases to exercise equivalence partitions"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Test a few random IDs',
        description: 'You sample inputs but don’t define partitions.',
        result: '✅ RESULT: You find some issues, but gaps remain unknown.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "technique designing test cases to exercise equivalence partitions"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Test only one “typical” ID',
        description: 'You ignore invalid classes and boundary cases.',
        result: '❌ RESULT: Invalid-input defects survive and trigger incidents.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "technique designing test cases to exercise equivalence partitions"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Skip input testing due to time',
        description: 'You avoid systematically covering input classes.',
        result: '❌ RESULT: Risk exposure increases as failures reach users.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "technique designing test cases to exercise equivalence partitions"',
      },
    ],
  }),

  makeQuestion({
    id: 'I3-Q3',
    incidentId: 'incident-3',
    order: 27,
    part: 4,
    section: '3.12',
    title: 'Boundary Value Analysis',
    definition: 'specification-based technique based on exercising boundaries of equivalence partitions',
    isoSays: 'specification-based technique based on exercising boundaries of equivalence partitions',
    situation:
      'A dosage entry field allows 0–500 mg. Reports show failures at 0 and 500. You need a technique that targets boundaries explicitly.',
    relevantMetrics: ['defectDetection', 'testCoverage'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Apply boundary value analysis at partition boundaries',
        description: 'Exercise boundary values of equivalence partitions per specification.',
        result: '✅ RESULT: Boundary defects are reproduced and fixed quickly.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising boundaries of equivalence partitions"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Test only mid-range values',
        description: 'You cover typical usage but skip boundary focus.',
        result: '✅ RESULT: Typical cases pass, but boundary bugs remain.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising boundaries of equivalence partitions"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Assume boundaries are fine because they are “simple”',
        description: 'You avoid explicitly exercising boundary conditions.',
        result: '❌ RESULT: Edge-case failures keep happening in production.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising boundaries of equivalence partitions"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Increase the allowed range without testing',
        description: 'You change the constraint and ignore boundary behavior.',
        result: '❌ RESULT: New boundary defects appear and risk rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising boundaries of equivalence partitions"',
      },
    ],
  }),

  makeQuestion({
    id: 'I3-Q4',
    incidentId: 'incident-3',
    order: 28,
    part: 4,
    section: '3.27',
    title: 'Decision Table Testing',
    definition: 'specification-based technique based on exercising decision rules in a decision table',
    isoSays: 'specification-based technique based on exercising decision rules in a decision table',
    situation:
      'Access rules depend on role, ward, and emergency override. Bugs appear when conditions combine. You need a technique to ensure decision rules are covered.',
    relevantMetrics: ['testCoverage', 'riskExposure'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Use decision table testing to cover decision rules',
        description: 'Exercise decision rules systematically using a decision table.',
        result: '✅ RESULT: Authorization gaps are detected before exploit.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising decision rules in a decision table"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Test a few “common” role combinations',
        description: 'You cover some rules but not systematically.',
        result: '✅ RESULT: You reduce some risk, but rare rules may be missed.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising decision rules in a decision table"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Rely on code review only',
        description: 'You avoid executing decision combinations against the spec.',
        result: '❌ RESULT: A rule interaction slips through and causes exposure.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising decision rules in a decision table"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Disable access controls temporarily',
        description: 'You “fix” the bug by removing protections.',
        result: '❌ RESULT: Unauthorized access becomes trivial and risk spikes.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising decision rules in a decision table"',
      },
    ],
  }),

  // Medium (5–8)
  makeQuestion({
    id: 'I3-Q5',
    incidentId: 'incident-3',
    order: 29,
    part: 4,
    section: '3.76',
    title: 'State Transition Testing',
    definition: 'specification-based technique based on exercising transitions in a state model',
    isoSays: 'specification-based technique based on exercising transitions in a state model',
    situation:
      'A patient record changes state (created → signed → archived). A breach report suggests records can be accessed after archival due to a state bug. You need to exercise transitions.',
    relevantMetrics: ['defectDetection', 'riskExposure'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Use state transition testing on the record lifecycle',
        description: 'Exercise transitions in a state model to reveal invalid transitions.',
        result: '✅ RESULT: The invalid transition is reproduced and fixed.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising transitions in a state model"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Test only the happy path states',
        description: 'You validate typical transitions but skip rare/invalid ones.',
        result: '✅ RESULT: Normal flow is stable, but security edge cases persist.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising transitions in a state model"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Test only the UI screens, not transitions',
        description: 'You ignore back-end state handling and transition rules.',
        result: '❌ RESULT: Hidden transition defects continue to expose data.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising transitions in a state model"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Disable archival to avoid the bug',
        description: 'You remove a safety control rather than testing transitions.',
        result: '❌ RESULT: Data governance fails and risk exposure rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "specification-based technique based on exercising transitions in a state model"',
      },
    ],
  }),

  makeQuestion({
    id: 'I3-Q6',
    incidentId: 'incident-3',
    order: 30,
    part: 4,
    section: '3.13',
    title: 'Branch Testing',
    definition: 'structure-based technique based on exercising branches in control flow',
    isoSays: 'structure-based technique based on exercising branches in control flow',
    situation:
      'A critical authorization function has multiple conditional branches. A breach suggests one branch grants access incorrectly. You need a white-box technique to exercise branches.',
    relevantMetrics: ['testCoverage', 'defectDetection'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Perform branch testing to exercise control-flow branches',
        description: 'Design tests to execute branches in the control flow.',
        result: '✅ RESULT: The vulnerable branch is identified and corrected.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "structure-based technique based on exercising branches in control flow"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Rely on black-box checks only',
        description: 'You test symptoms but may miss specific branch coverage.',
        result: '✅ RESULT: Some defects are found, but coverage is uncertain.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "structure-based technique based on exercising branches in control flow"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Assume the compiler optimizes out risky branches',
        description: 'You avoid explicitly exercising branches.',
        result: '❌ RESULT: A branch remains untested and exploitable.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "structure-based technique based on exercising branches in control flow"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Skip testing internal logic because it’s “too complex”',
        description: 'You avoid structure-based testing altogether.',
        result: '❌ RESULT: The breach persists and risk exposure spikes.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "structure-based technique based on exercising branches in control flow"',
      },
    ],
  }),

  makeQuestion({
    id: 'I3-Q7',
    incidentId: 'incident-3',
    order: 31,
    part: 4,
    section: '3.80',
    title: 'Structure-based Testing (White-box Testing)',
    definition: "dynamic testing derived from examination of the test item's structure",
    isoSays: "dynamic testing derived from examination of the test item's structure",
    situation:
      'A new encryption module passes black-box checks but a code audit flags risky paths. You need dynamic tests derived from the internal structure to validate execution behavior.',
    relevantMetrics: ['defectDetection', 'riskExposure'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Use structure-based (white-box) dynamic tests',
        description: "Derive dynamic tests by examining the test item's structure.",
        result: '✅ RESULT: Hidden risky paths are executed and fixed.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "dynamic testing derived from examination of the test item\'s structure"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Keep only black-box test scripts',
        description: 'You test externally but don’t target structural paths.',
        result: '✅ RESULT: External behavior seems fine, but internal risk remains.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "dynamic testing derived from examination of the test item\'s structure"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Do only static review and skip execution',
        description: 'You avoid dynamic testing entirely.',
        result: '❌ RESULT: Execution defects slip into production.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "dynamic testing derived from examination of the test item\'s structure"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Ship immediately to “see what happens”',
        description: 'You skip both structural review and structural execution tests.',
        result: '❌ RESULT: A security incident expands and risk exposure rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "dynamic testing derived from examination of the test item\'s structure"',
      },
    ],
  }),

  makeQuestion({
    id: 'I3-Q8',
    incidentId: 'incident-3',
    order: 32,
    part: 4,
    section: '3.79',
    title: 'Stress Testing',
    definition: 'performance testing evaluating behavior under conditions above anticipated capacity',
    isoSays: 'performance testing evaluating behavior under conditions above anticipated capacity',
    situation:
      'During a breach, incident response spikes system usage. The portal degrades and logs drop. You need to evaluate behavior above anticipated capacity to ensure security monitoring stays available.',
    relevantMetrics: ['riskExposure', 'defectDetection'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Run stress testing above anticipated capacity',
        description: 'Evaluate behavior under conditions above anticipated capacity.',
        result: '✅ RESULT: You find the failure point and harden monitoring.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "performance testing evaluating behavior under conditions above anticipated capacity"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Run only normal-load testing',
        description: 'You test expected conditions but not above capacity.',
        result: '✅ RESULT: Normal behavior is confirmed, but surge risk remains.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "performance testing evaluating behavior under conditions above anticipated capacity"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Assume capacity issues are “ops problems”',
        description: 'You avoid testing behavior above anticipated capacity.',
        result: '❌ RESULT: The system collapses under surge and risk increases.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "performance testing evaluating behavior under conditions above anticipated capacity"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Disable audit logging to improve performance',
        description: 'You sacrifice security evidence under stress.',
        result: '❌ RESULT: Unauthorized access goes undetected and risk spikes.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "performance testing evaluating behavior under conditions above anticipated capacity"',
      },
    ],
  }),

  // Hard (9–12)
  makeQuestion({
    id: 'I3-Q9',
    incidentId: 'incident-3',
    order: 33,
    part: 4,
    section: '3.57',
    title: 'Pairwise Testing',
    definition: 'black-box technique designing test cases to execute all combinations of each pair of inputs',
    isoSays: 'black-box technique designing test cases to execute all combinations of each pair of inputs',
    situation:
      'A vulnerability appears only when device type, MFA method, and network segment interact. Exhaustive combinations are too many. You need a technique to cover all pairs efficiently.',
    relevantMetrics: ['testCoverage', 'budgetEfficiency'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Use pairwise testing to cover all input pairs',
        description: 'Design cases to execute all combinations of each pair of inputs.',
        result: '✅ RESULT: You reveal interaction bugs with manageable effort.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "black-box technique designing test cases to execute all combinations of each pair of inputs"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Test a handful of combinations you can think of',
        description: 'You sample but do not ensure all pairs are covered.',
        result: '✅ RESULT: Some interactions are covered, but blind spots remain.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "black-box technique designing test cases to execute all combinations of each pair of inputs"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Avoid combinations and test each input independently',
        description: 'You ignore pair interactions.',
        result: '❌ RESULT: The interaction vulnerability remains undetected.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "black-box technique designing test cases to execute all combinations of each pair of inputs"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Skip testing combinations due to time',
        description: 'You accept unknown interaction risk during a breach.',
        result: '❌ RESULT: The exploit is triggered in production and risk spikes.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "black-box technique designing test cases to execute all combinations of each pair of inputs"',
      },
    ],
  }),

  makeQuestion({
    id: 'I3-Q10',
    incidentId: 'incident-3',
    order: 34,
    part: 4,
    section: '3.37',
    title: 'Exploratory Testing',
    definition: 'experience-based testing where tester spontaneously designs and executes tests',
    isoSays: 'experience-based testing where tester spontaneously designs and executes tests',
    situation:
      'The breach is still unfolding and documentation is incomplete. You need rapid learning by skilled testers designing and executing tests on the fly while still capturing key findings as incidents.',
    relevantMetrics: ['defectDetection', 'timelinePressure'],
    lessRelevantMetric: 'budgetEfficiency',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Use exploratory testing for rapid learning',
        description: 'Allow skilled testers to spontaneously design and execute tests to discover behaviors quickly.',
        result: '✅ RESULT: The team finds critical issues quickly under uncertainty.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "experience-based testing where tester spontaneously designs and executes tests"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Wait for full documentation before testing',
        description: 'You prioritize scripted detail over timely discovery.',
        result: '✅ RESULT: Clarity improves later, but early learning is lost.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "experience-based testing where tester spontaneously designs and executes tests"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Forbid any unscripted testing',
        description: 'You prevent spontaneous tests even in a crisis.',
        result: '❌ RESULT: Critical problems remain undiscovered during the breach.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "experience-based testing where tester spontaneously designs and executes tests"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Let anyone click around with no tester expertise',
        description: 'You confuse exploratory testing with random clicking by unskilled staff.',
        result: '❌ RESULT: Time is wasted and risk exposure increases.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "experience-based testing where tester spontaneously designs and executes tests"',
      },
    ],
  }),

  makeQuestion({
    id: 'I3-Q11',
    incidentId: 'incident-3',
    order: 35,
    part: 4,
    section: '3.49',
    title: 'Metamorphic Testing',
    definition: 'technique generating test cases based on existing cases and metamorphic relations',
    isoSays: 'technique generating test cases based on existing cases and metamorphic relations',
    situation:
      'A clinical risk scoring component has outputs that are hard to verify directly (oracle problem). You need a way to generate follow-up tests based on relations that should hold between inputs and outputs.',
    relevantMetrics: ['defectDetection', 'testCoverage'],
    lessRelevantMetric: 'timelinePressure',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Apply metamorphic testing using metamorphic relations',
        description: 'Generate new tests based on existing cases and metamorphic relations.',
        result: '✅ RESULT: You detect inconsistencies without needing exact expected values.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "technique generating test cases based on existing cases and metamorphic relations"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Increase manual review of outputs only',
        description: 'You rely on human judgment instead of follow-up test generation.',
        result: '✅ RESULT: Some issues are found, but scaling is limited.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "technique generating test cases based on existing cases and metamorphic relations"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Skip testing because expected results are unknown',
        description: 'You do not use relation-based test generation.',
        result: '❌ RESULT: Inconsistencies persist and risk exposure grows.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "technique generating test cases based on existing cases and metamorphic relations"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Hard-code expected outputs without evidence',
        description: 'You invent an oracle instead of using metamorphic relations.',
        result: '❌ RESULT: False confidence leads to serious patient-safety risk.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "technique generating test cases based on existing cases and metamorphic relations"',
      },
    ],
  }),

  makeQuestion({
    id: 'I3-Q12',
    incidentId: 'incident-3',
    order: 36,
    part: 4,
    section: '4.4.7',
    title: 'Manual vs Automated Testing',
    definition: 'automate if test case run 5+ times; depends on budget, tester capability, methodology',
    isoSays: 'automate if test case run 5+ times; depends on budget, tester capability, methodology',
    situation:
      'After the breach, you must run the same security regression checks on every deploy for weeks. The team argues whether investing in automation is worth it during recovery.',
    relevantMetrics: ['budgetEfficiency', 'timelinePressure'],
    lessRelevantMetric: 'teamMorale',
    options: [
      {
        letter: 'A',
        quality: 'best',
        label: 'Automate checks that will run 5+ times',
        description: 'Automate if a test case will be run five or more times, considering budget and capability.',
        result: '✅ RESULT: Recovery stabilizes and repeated checks become efficient.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "automate if test case run 5+ times; depends on budget, tester capability, methodology"',
      },
      {
        letter: 'B',
        quality: 'good',
        label: 'Keep everything manual for now',
        description: 'You avoid upfront automation investment during recovery.',
        result: '✅ RESULT: You move quickly today, but repeated effort grows costly.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "automate if test case run 5+ times; depends on budget, tester capability, methodology"',
      },
      {
        letter: 'C',
        quality: 'poor',
        label: 'Automate everything immediately',
        description: 'You over-automate without considering budget or capability.',
        result: '❌ RESULT: You waste time and still miss urgent manual checks.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "automate if test case run 5+ times; depends on budget, tester capability, methodology"',
      },
      {
        letter: 'D',
        quality: 'worst',
        label: 'Never automate because “tools are risky”',
        description: 'You reject automation despite repeated execution needs.',
        result: '❌ RESULT: Timeline pressure skyrockets and risk exposure rises.',
        feedback: '📖 ISO/IEC/IEEE 29119 SAYS: "automate if test case run 5+ times; depends on budget, tester capability, methodology"',
      },
    ],
  }),
];

// ────────────────────────────────────────────────────────────────────────────
// Bank expansion to 90 questions (30 per incident)
// Note: We keep the existing base questions per incident and extend each incident to 30.
// with additional variants that reuse the same ISO section/definition/options,
// but present a distinct situation prompt.

const BASE_I1 = QUESTION_BANK.filter(q => q.incidentId === 'incident-1');
const BASE_I2 = QUESTION_BANK.filter(q => q.incidentId === 'incident-2');
const BASE_I3 = QUESTION_BANK.filter(q => q.incidentId === 'incident-3');

function cloneOptionsForMakeQuestion(baseQuestion) {
  return (baseQuestion.options || []).map((o) => ({
    letter: o.letter,
    quality: o.quality,
    label: o.label,
    description: o.description,
    result: o.result,
    feedback: o.feedback,
  }));
}

function addIncidentVariants({
  base,
  incidentId,
  incidentPrefix,
  targetCount,
  extraSituations,
}) {
  if (!Array.isArray(base) || base.length === 0) {
    throw new Error(`Cannot extend incident ${incidentId}: no base questions found.`);
  }

  const optionsByIndex = base.map(cloneOptionsForMakeQuestion);

  for (let i = base.length + 1; i <= targetCount; i++) {
    const baseIdx = (i - 1) % base.length;
    const baseQ = base[baseIdx];
    const situation = extraSituations[i - (base.length + 1)] || baseQ.situation;

    QUESTION_BANK.push(
      makeQuestion({
        id: `${incidentPrefix}-Q${i}`,
        incidentId,
        order: QUESTION_BANK.length + 1,
        part: baseQ.part,
        section: baseQ.section,
        title: baseQ.title,
        definition: baseQ.definition,
        isoSays: baseQ.isoSays,
        situation,
        relevantMetrics: baseQ.relevantMetrics,
        lessRelevantMetric: baseQ.lessRelevantMetric,
        options: optionsByIndex[baseIdx],
      })
    );
  }
}

const I1_EXTRA_SITUATIONS = [
  'A regulator asks you to justify your testing activities during a banking outage post-mortem. What does ISO/IEC/IEEE 29119 define as testing?',
  'A new fraud rule is deployed and stakeholders want “proof” it works. Which ISO purpose of testing statement fits best?',
  'A risky change lands late. You must choose static and dynamic techniques quickly and explain the difference to leadership.',
  'A product owner says “expected results are obvious.” You need to explain what a test oracle is and why it matters.',
  'Your team debates whether the requirements doc is sufficient to design tests. Which ISO term describes the source used to design test cases?',
  'A tester writes steps without preconditions or expected results. Which ISO term are they failing to define properly?',
  'A defect fix is merged. The team wants to close the ticket immediately—what testing confirms the fault was removed?',
  'After a patch, unrelated account statements break. What testing checks unmodified parts after modifications?',
  'Leadership demands faster release. You argue for independence—why does ISO/IEC/IEEE 29119 emphasize separating dev and test responsibilities?',
  'Two teams disagree whether you are doing verification or validation activities. You must align terminology before sign-off.',
  'Risk exposure is high in transfers and authentication. You must prioritize testing activities based on analysed risk under time pressure.',
  'A new feature changes rounding rules. You need a defensible objective for the test effort aligned with ISO terms.',
  'A production incident shows monitoring is not enough. You need to re-explain why pre-release testing creates stakeholder confidence.',
  'Your test evidence is challenged because outputs are hard to determine for some inputs. You need to name the underlying ISO challenge.',
  'A test manager wants to classify a review session as “testing.” You need to explain static testing versus executing code.',
  'A team wants to skip test documentation because “we can remember.” Which ISO concept argues for objective evidence and reproducibility?',
  'Developers claim unit tests cover everything. You must explain what counts as testing activities on test items and why more is needed.',
  'A hotfix is approved but you must reduce risk rapidly. You choose the ISO-aligned combination of review + execution to maximize defect detection.',
];

const I2_EXTRA_SITUATIONS = [
  'Black Friday scope grows overnight. You need the master document coordinating objectives, means, and schedule for testing.',
  'Leadership asks “how will we test checkout performance and security?” You must describe the approach portion of the test plan.',
  'A new brand team joins and needs organizational testing principles and goals in one place—what executive-level artifact is required?',
  'A new test process is proposed but teams are inconsistent. You need to align everyone to ISO test processes across the project.',
  'You must prove readiness for peak traffic with documentation. What ISO test documentation practice prevents missing artifacts?',
  'An exec asks “when are we done testing?” You need to define completion criteria using the ISO test completion process.',
  'After test execution, stakeholders ask for a summary of what happened and what remains risky. You need the ISO completion report artifact.',
  'Checkout defects appear in rare combinations. You must pick a test design technique and explain it as an ISO procedure.',
  'Your test environment differs from production and results are questioned. You need the ISO term for the environment needed to conduct a test.',
  'Teams lack a shared representation of the system to derive coverage. You need an ISO test model for checkout.',
  'Multiple vendors contribute and nobody owns coordination. You need ISO test management concepts to control planning and execution.',
  'The VP asks for a dashboard: what ISO concept defines test metrics and why they matter?',
  'You must update the plan mid-incident due to new payment provider risks. Which ISO artifact is revised to coordinate activities?',
  'A strategy debate breaks out: risk-based versus feature-based selection. You must document the approach inside the plan.',
  'A test policy exists but teams ignore it. You need to re-communicate goals and scope to regain stakeholder trust.',
  'Audit requests evidence of documentation completeness. You must ensure required reports and plans exist and are consistent.',
  'Testing nears the end but defect trends are unstable. You need ISO completion activities to decide release readiness.',
  'A retrospective needs a clear completion report capturing what was tested and remaining risks. You must produce it quickly.',
];

const I3_EXTRA_SITUATIONS = [
  'A breach investigation reveals input handling failures. You select a specification-based technique focusing on boundaries of partitions.',
  'You need to reduce the test set while preserving meaningful coverage by using representative members of each input class.',
  'Access-control rules are complex combinations of roles and actions. You need a technique using conditions/actions to derive tests.',
  'Session management behaves differently depending on prior states. You need a technique focused on state transitions.',
  'A critical security check depends on a branch not taken in tests. You need a structure-based technique targeting branches.',
  'Your security suite must include structure-based testing for key components. You must explain what structure-based testing is.',
  'You must evaluate protection of data against unauthorized access during the breach response. You need the ISO test type name.',
  'Traffic surges during incident updates cause failures. You need the ISO test type focused on stress conditions.',
  'A combinatorial explosion of configs exists. You need a technique that selects pairs to reduce test cases.',
  'Documentation is incomplete and you need rapid learning by skilled testers designing and executing on the fly.',
  'Outputs are non-deterministic and hard to verify. You need relation-based follow-up tests to detect inconsistencies.',
  'You must repeat the same checks over many deploys. You need to decide what to automate versus keep manual.',
  'A penetration test is blocked by missing environment controls. You need to ensure the test environment supports secure execution.',
  'A decision logic matrix governs alerts and lockouts. You must validate all meaningful condition combinations systematically.',
  'Boundary errors appear in patient age and dosage fields. You need to test at edges of valid ranges to find defects.',
  'You can’t test every configuration, but pairwise catches most interaction faults. You defend the approach to leadership.',
  'Exploratory sessions find new attack paths, but you still need to capture key evidence and reproduce findings.',
  'A fix lands; you choose automation for checks that will run repeatedly to control timeline pressure.',
];

addIncidentVariants({
  base: BASE_I1,
  incidentId: 'incident-1',
  incidentPrefix: 'I1',
  targetCount: 30,
  extraSituations: I1_EXTRA_SITUATIONS,
});

addIncidentVariants({
  base: BASE_I2,
  incidentId: 'incident-2',
  incidentPrefix: 'I2',
  targetCount: 30,
  extraSituations: I2_EXTRA_SITUATIONS,
});

addIncidentVariants({
  base: BASE_I3,
  incidentId: 'incident-3',
  incidentPrefix: 'I3',
  targetCount: 30,
  extraSituations: I3_EXTRA_SITUATIONS,
});

export const TOTAL_QUESTIONS = QUESTION_BANK.length;

export const QUESTION_BY_ID = Object.fromEntries(QUESTION_BANK.map((q) => [q.id, q]));
