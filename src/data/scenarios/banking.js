// FR-01: Banking Scenario — Core Banking System Crisis

export const banking = {
  id: 'banking',
  name: 'Core Banking Meltdown',
  subtitle: 'National Digital Bank — Production Incident',
  icon: '🏦',
  difficulty: 'Medium',
  difficultyColor: 'warning',
  description:
    'NovaBanca\'s core banking platform has suffered a critical failure during a major release. Transaction processing is degraded, API error rates are spiking, and regulators are watching. You are the Lead Test Manager.',
  stakes: 'Financial stability of 2.4M customers and £340M daily transaction volume',
  duration: '~25 minutes',
  tags: ['Regulatory', 'High Stakes', 'Fintech'],
  color: 'banking',

  phases: [
    // ─── Phase 1: Discovery & Triage ────────────────────────────────────────
    {
      phaseId: 1,
      context:
        'Monday 06:47. On-call alerts are firing across the board. The payment processing service is returning HTTP 500 errors for 23% of requests. You have 15 minutes before the CEO calls.',
      decisions: [
        {
          id: 'bk-p1-d1',
          label: 'Activate war-room protocol immediately',
          description: 'Assemble the full incident response team, assign roles, and open a dedicated communications channel.',
          metricDeltas: { teamMorale: 8, stakeholderTrust: 10, riskExposure: -8, budgetEfficiency: -5, testCoverage: 3 },
          feedback: 'Excellent first move. Structured incident response (ISO 29119-2 §6.3) reduces MTTR by up to 40% compared to ad-hoc coordination. Clear role assignment prevents duplicated effort.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.3 — Test Monitoring and Control',
          quality: 'best',
          timeImpact: 'fast',
        },
        {
          id: 'bk-p1-d2',
          label: 'Run automated diagnostics first',
          description: 'Let the monitoring suite collect baseline data before assembling the team.',
          metricDeltas: { defectDetection: 12, testCoverage: 8, teamMorale: -3, stakeholderTrust: -5, riskExposure: 3 },
          feedback: 'Diagnostics are valuable but should run in parallel, not instead of, human mobilisation. Data collection while stakeholders wait unnotified increases reputational risk.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.2 — Test Planning',
          quality: 'neutral',
          timeImpact: 'slow',
        },
        {
          id: 'bk-p1-d3',
          label: 'Escalate to CTO and wait for direction',
          description: 'Brief the CTO immediately and wait for executive decision-making before acting.',
          metricDeltas: { stakeholderTrust: 5, teamMorale: -8, riskExposure: 10, budgetEfficiency: -3, defectDetection: -5 },
          feedback: 'Escalating is appropriate but waiting for direction is not. Every minute of inaction during a P0 incident is measurable damage. The Test Manager must act while escalating simultaneously.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.3 — Test Monitoring and Control',
          quality: 'bad',
          timeImpact: 'slow',
        },
        {
          id: 'bk-p1-d4',
          label: 'Triage error logs with junior analyst',
          description: 'Start log analysis with one team member to identify the root cause quickly.',
          metricDeltas: { defectDetection: 8, testCoverage: 5, teamMorale: -2, stakeholderTrust: -3, budgetEfficiency: 5 },
          feedback: 'Reactive triage without coordination structure is inefficient. A single analyst reviewing logs cannot handle the breadth of a P0 incident. Structured triage needs the full team.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §7 — Test Execution',
          quality: 'neutral',
          timeImpact: 'medium',
        },
      ],
    },

    // ─── Phase 2: Impact Assessment ─────────────────────────────────────────
    {
      phaseId: 2,
      context:
        'The war-room is running. Initial data: 23% of API calls failing, 3 microservices degraded, transaction queue backing up at 4,000 msgs/min. Leadership needs a formal impact assessment within 2 hours.',
      decisions: [
        {
          id: 'bk-p2-d1',
          label: 'Produce a risk-ranked defect matrix',
          description: 'Categorise all known defects by business impact and create a prioritised remediation plan.',
          metricDeltas: { defectDetection: 12, stakeholderTrust: 10, riskExposure: -10, testCoverage: 8, budgetEfficiency: -5 },
          feedback: 'Exemplary. Risk-ranked defect matrices (ISO 29119-1 §5.4) enable leadership to make informed prioritisation decisions. This is the gold standard for impact assessment.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.4 — Risk-Based Testing',
          quality: 'best',
          timeImpact: 'medium',
        },
        {
          id: 'bk-p2-d2',
          label: 'Verbal briefing only to save time',
          description: 'Deliver an oral status update to leadership without formal documentation.',
          metricDeltas: { stakeholderTrust: -8, teamMorale: 5, budgetEfficiency: 8, riskExposure: 5, testCoverage: -5 },
          feedback: 'Verbal briefings are unauditable. In regulated environments, all assessment outputs must be documented. This shortcut will cause problems during the post-incident review.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.3 — Test Monitoring and Control',
          quality: 'bad',
          timeImpact: 'fast',
        },
        {
          id: 'bk-p2-d3',
          label: 'Customer-impact-first triage',
          description: 'Focus assessment entirely on customer-facing failures before internal systems.',
          metricDeltas: { stakeholderTrust: 8, teamMorale: 5, riskExposure: -5, defectDetection: 5, budgetEfficiency: 3 },
          feedback: 'Customer-first prioritisation is correct in principle. However, internal system failures often cascade to customer impact — full-scope assessment prevents missed risks.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.3 — Concepts of Testing',
          quality: 'neutral',
          timeImpact: 'medium',
        },
        {
          id: 'bk-p2-d4',
          label: 'Commission external expert review',
          description: 'Bring in a specialist consulting firm to conduct the impact assessment.',
          metricDeltas: { stakeholderTrust: 5, defectDetection: 8, budgetEfficiency: -18, riskExposure: -5, teamMorale: -5 },
          feedback: 'External expertise has value in complex scenarios, but the significant budget cost and time delay (external onboarding) makes this suboptimal for a live P0 incident.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.2 — Test Planning',
          quality: 'neutral',
          timeImpact: 'slow',
        },
      ],
    },

    // ─── Phase 3: Containment (Crisis Event triggers here) ──────────────────
    {
      phaseId: 3,
      context:
        'The impact assessment is complete: 3 critical defects, 12 high-severity bugs, estimated £1.2M business impact per hour. You now need to stop the bleeding before permanent damage sets in.',
      decisions: [
        {
          id: 'bk-p3-d1',
          label: 'Deploy feature flags to isolate failures',
          description: 'Use feature flag toggles to disable the failing components without a full rollback.',
          metricDeltas: { riskExposure: -15, testCoverage: 8, teamMorale: 5, budgetEfficiency: 5, stakeholderTrust: 8 },
          feedback: 'Elegant containment strategy. Feature flags allow surgical isolation without downtime. This is a modern DevOps best practice aligned with continuous delivery principles.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §9 — Dynamic Testing Techniques',
          quality: 'best',
          timeImpact: 'fast',
        },
        {
          id: 'bk-p3-d2',
          label: 'Full service rollback to last stable build',
          description: 'Revert all affected services to the last known-good state.',
          metricDeltas: { riskExposure: -20, stakeholderTrust: 5, teamMorale: -5, budgetEfficiency: -8, testCoverage: -5 },
          feedback: 'Rollback is safe and effective but loses 2 weeks of development. Feature flags or blue-green deployment would achieve containment while preserving forward momentum.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.4 — Test Completion',
          quality: 'good',
          timeImpact: 'medium',
        },
        {
          id: 'bk-p3-d3',
          label: 'Implement rate limiting on affected endpoints',
          description: 'Throttle traffic to failing services to reduce error rate while fixing proceeds.',
          metricDeltas: { riskExposure: -8, stakeholderTrust: -5, teamMorale: 3, budgetEfficiency: 5, defectDetection: 5 },
          feedback: 'Rate limiting reduces blast radius but does not fix the underlying issue. It is a valid partial measure but must be paired with active remediation, not used as the sole containment strategy.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §9.2 — Performance Testing',
          quality: 'neutral',
          timeImpact: 'fast',
        },
      ],
    },

    // ─── Phase 4: Root Cause & Remediation ──────────────────────────────────
    {
      phaseId: 4,
      context:
        'Containment is holding. Now the hard work: find the root cause, apply permanent fixes, and harden the test suite so this cannot happen again.',
      decisions: [
        {
          id: 'bk-p4-d1',
          label: 'Full 5-Whys root cause analysis',
          description: 'Conduct structured RCA with the full incident team; document causal chain.',
          metricDeltas: { defectDetection: 15, testCoverage: 10, teamMorale: 8, riskExposure: -12, stakeholderTrust: 8 },
          feedback: 'Best practice. The 5-Whys method systematically traces defects to their organisational root — not just technical symptoms. This prevents recurrence rather than just fixing symptoms.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.3 — Concepts of Testing',
          quality: 'best',
          timeImpact: 'slow',
        },
        {
          id: 'bk-p4-d2',
          label: 'Fix symptoms, defer deep RCA',
          description: 'Apply targeted fixes to the immediate defects; schedule RCA for next sprint.',
          metricDeltas: { budgetEfficiency: 10, teamMorale: 5, defectDetection: -8, riskExposure: 8, testCoverage: -5 },
          feedback: 'Deferred RCA almost always results in recurrence. The same root cause will manifest differently in 4-8 weeks. Technical debt compounds — pay the RCA cost now.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.3 — Concepts of Testing',
          quality: 'bad',
          timeImpact: 'fast',
        },
        {
          id: 'bk-p4-d3',
          label: 'Add regression tests around every fixed bug',
          description: 'For each defect fixed, write a regression test before closing the ticket.',
          metricDeltas: { testCoverage: 18, defectDetection: 12, teamMorale: 5, budgetEfficiency: -8, riskExposure: -10 },
          feedback: 'Excellent discipline. Bug-driven regression testing (ISO 29119-4) ensures each defect becomes a permanent test case. This directly increases defect detection efficacy going forward.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6 — Test Techniques',
          quality: 'best',
          timeImpact: 'medium',
        },
        {
          id: 'bk-p4-d4',
          label: 'Implement automated API contract testing',
          description: 'Add contract tests across all microservice boundaries to catch integration failures earlier.',
          metricDeltas: { testCoverage: 10, defectDetection: 15, teamMorale: 3, budgetEfficiency: -10, riskExposure: -8 },
          feedback: 'Forward-thinking choice. API contract testing (consumer-driven contracts) is one of the highest-ROI testing investments in a microservices architecture.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.8 — Component Integration Testing',
          quality: 'good',
          timeImpact: 'slow',
        },
      ],
    },

    // ─── Phase 5: Verification & Validation (Crisis Event triggers here) ─────
    {
      phaseId: 5,
      context:
        'Fixes are in place. Time for full regression, performance, and acceptance testing before clearance. The team is tired but the finish line is in sight.',
      decisions: [
        {
          id: 'bk-p5-d1',
          label: 'Full regression suite with new edge cases',
          description: 'Run the complete regression suite plus additional tests targeting the discovered failure modes.',
          metricDeltas: { testCoverage: 18, defectDetection: 12, stakeholderTrust: 10, riskExposure: -15, teamMorale: -5 },
          feedback: 'Gold standard verification. Extended regression targeting failure modes ensures you catch variants of the original defect. This is the ISO 29119-5 model for test execution.',
          isoRef: 'ISO/IEC/IEEE 29119-5 §7 — Keyword-Driven Testing',
          quality: 'best',
          timeImpact: 'slow',
        },
        {
          id: 'bk-p5-d2',
          label: 'Smoke test only to save time',
          description: 'Run a minimal happy-path test suite to get the release out faster.',
          metricDeltas: { budgetEfficiency: 10, teamMorale: 5, testCoverage: -15, defectDetection: -12, riskExposure: 15 },
          feedback: 'High risk. Smoke tests catch nothing subtle. Given the severity of this incident, minimal testing is unjustifiable. The next failure will be worse and you will have no defence.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.1 — Test Coverage',
          quality: 'bad',
          timeImpact: 'fast',
        },
        {
          id: 'bk-p5-d3',
          label: 'Performance + load testing focus',
          description: 'Prioritise performance validation since the failure was transaction-volume related.',
          metricDeltas: { testCoverage: 8, defectDetection: 10, stakeholderTrust: 8, riskExposure: -10, budgetEfficiency: 3 },
          feedback: 'Good prioritisation given the root cause. Performance testing is critical here. However, pair it with at least partial functional regression to avoid blind spots.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §7.1 — Performance Testing',
          quality: 'good',
          timeImpact: 'medium',
        },
      ],
    },

    // ─── Phase 6: Recovery & Lessons Learned ────────────────────────────────
    {
      phaseId: 6,
      context:
        'The system is stable. Now you must restore full operations, publish the incident report, and build resilience so NovaBanca never faces this scale of crisis again.',
      decisions: [
        {
          id: 'bk-p6-d1',
          label: 'Publish full incident post-mortem publicly',
          description: 'Release a detailed, blameless post-mortem to customers, regulators, and the public.',
          metricDeltas: { stakeholderTrust: 20, teamMorale: 10, riskExposure: -15, budgetEfficiency: -5, defectDetection: 5 },
          feedback: 'Blameless post-mortems are the gold standard in engineering culture. Public transparency after a crisis builds more trust than the crisis itself destroys — if the response was good.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.5 — Test Completion',
          quality: 'best',
          timeImpact: 'medium',
        },
        {
          id: 'bk-p6-d2',
          label: 'Internal lessons-learned only',
          description: 'Conduct an internal review but keep findings confidential.',
          metricDeltas: { stakeholderTrust: -5, teamMorale: 8, riskExposure: -8, budgetEfficiency: 5, testCoverage: 5 },
          feedback: 'Internal reviews have value but in a regulated industry, hiding incident learnings from regulators is a compliance risk. Transparency is not optional for financial institutions.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.5 — Test Completion',
          quality: 'neutral',
          timeImpact: 'fast',
        },
        {
          id: 'bk-p6-d3',
          label: 'Implement Chaos Engineering programme',
          description: 'Launch a proactive chaos engineering practice to find weaknesses before they become crises.',
          metricDeltas: { testCoverage: 15, defectDetection: 18, teamMorale: 12, riskExposure: -20, budgetEfficiency: -12 },
          feedback: 'Visionary. Chaos engineering (Netflix-style) proactively surfaces failure modes in production-like environments. This transforms a crisis into a catalyst for engineering excellence.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §7.1 — Fault Injection Testing',
          quality: 'best',
          timeImpact: 'slow',
        },
        {
          id: 'bk-p6-d4',
          label: 'Customer compensation programme',
          description: 'Offer affected customers fee waivers and goodwill credits.',
          metricDeltas: { stakeholderTrust: 18, teamMorale: 5, budgetEfficiency: -20, riskExposure: -5, defectDetection: 0 },
          feedback: 'Customer compensation is the right ethical choice and protects brand loyalty. However, it must accompany technical improvements, not replace them.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.1 — Testing Principles',
          quality: 'good',
          timeImpact: 'fast',
        },
      ],
    },

    // ─── Phase 7: Root Cause Analysis ──────────────────────────────
    {
      phaseId: 7,
      context:
        'The immediate fire is out. Now the CTO wants a formal 5-Whys analysis before any code ships to production again. The board meeting is in 48 hours.',
      decisions: [
        {
          id: 'bk-p7-d1',
          label: 'Full 5-Whys with cross-functional team',
          description: 'Assemble engineers, QA, product, and ops for a structured root cause investigation.',
          metricDeltas: { defectDetection: 15, testCoverage: 8, teamMorale: 8, riskExposure: -12, stakeholderTrust: 10 },
          feedback: 'Best practice. Cross-functional RCA uncovers systemic issues that single-team analysis misses. This is exactly what ISO 29119 recommends.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.3',
          quality: 'best',
        },
        {
          id: 'bk-p7-d2',
          label: 'Automated log correlation analysis',
          description: 'Use ML-powered log analysis to trace the failure chain automatically.',
          metricDeltas: { defectDetection: 12, testCoverage: 5, teamMorale: 3, riskExposure: -8, budgetEfficiency: -8 },
          feedback: 'Automated analysis is fast but can miss human process failures. Good as a supplement, not a replacement for human RCA.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6',
          quality: 'good',
        },
        {
          id: 'bk-p7-d3',
          label: 'Blame the deployment pipeline and move on',
          description: 'Attribute the failure to CI/CD and implement a quick pipeline fix.',
          metricDeltas: { budgetEfficiency: 8, teamMorale: -10, defectDetection: -8, riskExposure: 10, stakeholderTrust: -8 },
          feedback: 'Blame culture is toxic and prevents real learning. The deployment pipeline is a symptom, not the cause. This will guarantee recurrence.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.1',
          quality: 'bad',
        },
        {
          id: 'bk-p7-d4',
          label: 'External forensic audit',
          description: 'Hire a third-party firm to conduct an independent investigation.',
          metricDeltas: { stakeholderTrust: 8, defectDetection: 10, budgetEfficiency: -15, teamMorale: -5, riskExposure: -5 },
          feedback: 'Independent audits add credibility but are expensive and slow. Best reserved for regulatory-mandated reviews.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.3',
          quality: 'neutral',
        },
      ],
    },

    // ─── Phase 8: Remediation Strategy ─────────────────────────────
    {
      phaseId: 8,
      context:
        'Root cause identified: a database migration script corrupted transaction indices. The fix is known but the deployment strategy is critical — one wrong move and you are back to square one.',
      decisions: [
        {
          id: 'bk-p8-d1',
          label: 'Blue-green deployment with canary release',
          description: 'Deploy the fix to 5% of traffic first, monitor, then gradually roll out.',
          metricDeltas: { riskExposure: -15, testCoverage: 10, stakeholderTrust: 10, teamMorale: 5, budgetEfficiency: -5 },
          feedback: 'Canary releases are the gold standard for high-risk deployments. This minimises blast radius while proving the fix works in production.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §9',
          quality: 'best',
        },
        {
          id: 'bk-p8-d2',
          label: 'Full deployment during maintenance window',
          description: 'Schedule a 2-hour maintenance window at 3AM and deploy everything at once.',
          metricDeltas: { riskExposure: -8, stakeholderTrust: -5, teamMorale: -8, budgetEfficiency: 5, testCoverage: 3 },
          feedback: 'Big-bang deployments are risky even with maintenance windows. If the fix fails, rollback under time pressure is stressful and error-prone.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.4',
          quality: 'neutral',
        },
        {
          id: 'bk-p8-d3',
          label: 'Hot-fix directly to production',
          description: 'Push the fix immediately without staged rollout.',
          metricDeltas: { budgetEfficiency: 10, teamMorale: -5, riskExposure: 12, testCoverage: -10, stakeholderTrust: -8 },
          feedback: 'Never hot-fix a P0 incident without staged validation. The rush to fix often creates a second incident worse than the first.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §9.2',
          quality: 'bad',
        },
        {
          id: 'bk-p8-d4',
          label: 'Parallel environment validation first',
          description: 'Spin up a production-mirror environment and validate the fix there before touching production.',
          metricDeltas: { testCoverage: 12, defectDetection: 10, riskExposure: -10, budgetEfficiency: -12, teamMorale: 5 },
          feedback: 'Excellent risk management. Parallel validation catches environment-specific issues that staging misses. Worth the infrastructure cost.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.8',
          quality: 'good',
        },
      ],
    },

    // ─── Phase 9: Verification & Testing ───────────────────────────
    {
      phaseId: 9,
      context:
        'The fix is deployed to canary. Initial metrics look promising but the QA team needs to run comprehensive validation before full rollout. Time pressure is mounting — the CEO wants an all-clear by end of day.',
      decisions: [
        {
          id: 'bk-p9-d1',
          label: 'Full regression suite plus chaos tests',
          description: 'Run complete regression, add targeted chaos engineering tests for the failure mode.',
          metricDeltas: { testCoverage: 18, defectDetection: 15, stakeholderTrust: 10, riskExposure: -15, teamMorale: -5 },
          feedback: 'Gold standard. Regression plus chaos testing ensures both correctness and resilience. The team fatigue cost is worth the confidence gained.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6',
          quality: 'best',
        },
        {
          id: 'bk-p9-d2',
          label: 'Smoke test and ship',
          description: 'Run a quick smoke test covering the happy path and declare victory.',
          metricDeltas: { budgetEfficiency: 10, teamMorale: 8, testCoverage: -12, defectDetection: -10, riskExposure: 15 },
          feedback: 'Dangerously insufficient after a P0 incident. Smoke tests miss edge cases, and edge cases caused this crisis in the first place.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.1',
          quality: 'bad',
        },
        {
          id: 'bk-p9-d3',
          label: 'Targeted boundary-value testing',
          description: 'Focus testing on the specific transaction boundaries that caused the failure.',
          metricDeltas: { testCoverage: 10, defectDetection: 12, stakeholderTrust: 5, riskExposure: -8, budgetEfficiency: 5 },
          feedback: 'Smart targeting but incomplete coverage. Boundary-value testing catches the known failure mode but may miss related issues.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.3',
          quality: 'good',
        },
        {
          id: 'bk-p9-d4',
          label: 'Crowdsourced beta testing',
          description: 'Open the fixed version to a group of trusted users for real-world validation.',
          metricDeltas: { stakeholderTrust: 8, defectDetection: 8, teamMorale: 5, budgetEfficiency: -5, riskExposure: -3 },
          feedback: 'Creative approach but risky with financial data. Real users finding bugs in a banking app during a crisis is a PR nightmare waiting to happen.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.3',
          quality: 'neutral',
        },
      ],
    },

    // ─── Phase 10: Validation & Sign-off ───────────────────────────
    {
      phaseId: 10,
      context:
        'Test results are in: 99.7% pass rate, 3 minor edge cases documented. The release board convenes in 1 hour. Regulators have requested a compliance statement.',
      decisions: [
        {
          id: 'bk-p10-d1',
          label: 'Comprehensive compliance package with test evidence',
          description: 'Prepare full test reports, traceability matrices, and compliance statements for the board.',
          metricDeltas: { stakeholderTrust: 15, testCoverage: 5, riskExposure: -10, budgetEfficiency: -8, teamMorale: 5 },
          feedback: 'Exemplary. Full traceability from requirements through test cases to results is the ISO 29119 gold standard. Regulators love this.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §8',
          quality: 'best',
        },
        {
          id: 'bk-p10-d2',
          label: 'Quick summary email to the board',
          description: 'Send a brief status update with key metrics and a green-light recommendation.',
          metricDeltas: { budgetEfficiency: 8, teamMorale: 5, stakeholderTrust: -10, riskExposure: 5, testCoverage: -3 },
          feedback: 'Informal communication after a major incident is a compliance failure. The board and regulators need auditable documentation.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.5',
          quality: 'bad',
        },
        {
          id: 'bk-p10-d3',
          label: 'Present live dashboard to the board',
          description: 'Show real-time metrics and test results via the monitoring dashboard.',
          metricDeltas: { stakeholderTrust: 8, teamMorale: 5, budgetEfficiency: 5, riskExposure: -5, defectDetection: 3 },
          feedback: 'Live dashboards are impressive but not a substitute for formal sign-off documentation. Use them to supplement, not replace.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.3',
          quality: 'good',
        },
        {
          id: 'bk-p10-d4',
          label: 'Request 48-hour delay for more testing',
          description: 'Ask for additional time to achieve 100% pass rate before sign-off.',
          metricDeltas: { testCoverage: 8, defectDetection: 5, stakeholderTrust: -8, teamMorale: -8, budgetEfficiency: -10 },
          feedback: 'Perfectionism at the wrong time. 99.7% is excellent, and the delay costs more than the marginal test coverage gains.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.4',
          quality: 'neutral',
        },
      ],
    },

    // ─── Phase 11: Recovery & Deployment ───────────────────────────
    {
      phaseId: 11,
      context:
        'Board has given the green light. Time to restore full operations. The deployment team is standing by but the weekend traffic spike starts in 6 hours.',
      decisions: [
        {
          id: 'bk-p11-d1',
          label: 'Progressive rollout with automated rollback triggers',
          description: 'Deploy in 10% increments with automated health checks that trigger rollback if error rates spike.',
          metricDeltas: { riskExposure: -18, testCoverage: 8, stakeholderTrust: 12, teamMorale: 8, budgetEfficiency: -5 },
          feedback: 'State of the art deployment strategy. Automated rollback triggers remove human reaction time from the equation. This is how top-tier engineering teams operate.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.4',
          quality: 'best',
        },
        {
          id: 'bk-p11-d2',
          label: 'Full deployment with manual monitoring',
          description: 'Deploy everything at once and have the team manually watch dashboards for issues.',
          metricDeltas: { budgetEfficiency: 5, teamMorale: -5, riskExposure: 5, stakeholderTrust: -3, testCoverage: -3 },
          feedback: 'Manual monitoring is slow and error-prone. Humans miss patterns that automated systems catch instantly.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §9',
          quality: 'neutral',
        },
        {
          id: 'bk-p11-d3',
          label: 'Deploy after the weekend spike',
          description: 'Wait until Monday to avoid the weekend traffic risk.',
          metricDeltas: { stakeholderTrust: -12, teamMorale: -8, riskExposure: 8, budgetEfficiency: -10, defectDetection: 3 },
          feedback: 'Excessive caution. The fix has been validated and every hour of delay on the old system is a risk. Deploy with safeguards, don\'t delay.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.4',
          quality: 'bad',
        },
        {
          id: 'bk-p11-d4',
          label: 'Shadow deployment for comparison',
          description: 'Run old and new systems in parallel, comparing outputs before switching traffic.',
          metricDeltas: { testCoverage: 10, defectDetection: 12, riskExposure: -10, budgetEfficiency: -12, teamMorale: 3 },
          feedback: 'Shadow deployments are powerful for data-sensitive systems like banking. Expensive but provides ultimate confidence.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.8',
          quality: 'good',
        },
      ],
    },

    // ─── Phase 12: Lessons Learned ─────────────────────────────────
    {
      phaseId: 12,
      context:
        'The system is fully restored. Transaction success rates are at 99.99%. Now the organisation needs to learn from this crisis and build permanent resilience.',
      decisions: [
        {
          id: 'bk-p12-d1',
          label: 'Publish full blameless post-mortem',
          description: 'Release a detailed, transparent incident report to all stakeholders including the public.',
          metricDeltas: { stakeholderTrust: 20, teamMorale: 12, riskExposure: -15, budgetEfficiency: -5, defectDetection: 8 },
          feedback: 'Blameless post-mortems are the gold standard. Public transparency after a well-handled crisis actually increases trust beyond pre-crisis levels.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.5',
          quality: 'best',
        },
        {
          id: 'bk-p12-d2',
          label: 'Internal-only lessons learned document',
          description: 'Keep the findings internal and share only sanitised summaries externally.',
          metricDeltas: { stakeholderTrust: -5, teamMorale: 5, riskExposure: -5, budgetEfficiency: 5, testCoverage: 5 },
          feedback: 'In a regulated industry, hiding lessons from regulators is a compliance risk. Internal reviews have value but transparency is not optional.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.5',
          quality: 'neutral',
        },
        {
          id: 'bk-p12-d3',
          label: 'Launch chaos engineering programme',
          description: 'Proactively inject failures to find weaknesses before they become crises.',
          metricDeltas: { testCoverage: 15, defectDetection: 18, teamMorale: 10, riskExposure: -20, budgetEfficiency: -12 },
          feedback: 'Visionary. Chaos engineering transforms a crisis into a catalyst for engineering excellence. This is how Netflix, Google, and Amazon build resilience.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §7.1',
          quality: 'best',
        },
        {
          id: 'bk-p12-d4',
          label: 'Move on and focus on new features',
          description: 'The crisis is over. Redirect all engineering effort to the product roadmap.',
          metricDeltas: { budgetEfficiency: 12, teamMorale: -5, riskExposure: 15, stakeholderTrust: -10, testCoverage: -8 },
          feedback: 'Ignoring lessons learned guarantees recurrence. The next crisis will be worse because no systemic improvements were made.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.1',
          quality: 'bad',
        },
      ],
    },
  ],
};
