// FR-12: Healthcare Scenario — Patient EHR System Outage

export const healthcare = {
  id: 'healthcare',
  name: 'EHR System Meltdown',
  subtitle: 'CarePoint Hospital Network — Clinical Crisis',
  icon: '🏥',
  difficulty: 'Hard',
  difficultyColor: 'critical',
  description:
    'CarePoint\'s Electronic Health Record system has gone offline mid-shift. Nurses are reverting to paper. Medication records are inaccessible. You are the QA Lead responsible for the recent upgrade that caused this.',
  stakes: 'Patient safety across 14 hospitals and 8,400 active patient records',
  duration: '~30 minutes',
  tags: ['Patient Safety', 'HIPAA', 'Critical Systems'],
  color: 'healthcare',

  phases: [
    {
      phaseId: 1,
      context: 'Tuesday 14:22. The EHR portal returns a blank screen across all 14 hospitals. Nursing staff are switching to paper-based workflows. ICU teams are working without digital medication records.',
      decisions: [
        {
          id: 'hc-p1-d1',
          label: 'Activate clinical downtime procedures',
          description: 'Trigger the official clinical downtime protocol — paper forms, verbal orders, and backup medication binders.',
          metricDeltas: { stakeholderTrust: 12, teamMorale: 8, riskExposure: -15, budgetEfficiency: -5, testCoverage: 3 },
          feedback: 'Correct first action. Clinical downtime procedures are designed exactly for this scenario. Patient safety is paramount — ISO 29119-1 places safety above all other testing objectives.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.1 — Testing Principles',
          quality: 'best',
          timeImpact: 'fast',
        },
        {
          id: 'hc-p1-d2',
          label: 'Attempt emergency system restart',
          description: 'Reboot the application servers to see if the issue self-resolves.',
          metricDeltas: { riskExposure: 5, teamMorale: -5, stakeholderTrust: -8, budgetEfficiency: -3, defectDetection: 8 },
          feedback: 'Blind restarts during an unknown failure can corrupt data and worsen the situation. Downtime protocols must be activated first; restarts come after triage.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.3 — Test Monitoring and Control',
          quality: 'bad',
          timeImpact: 'fast',
        },
        {
          id: 'hc-p1-d3',
          label: 'Page the on-call DBA and infrastructure team',
          description: 'Alert database and infrastructure specialists to start parallel investigation.',
          metricDeltas: { defectDetection: 10, teamMorale: 5, stakeholderTrust: 5, riskExposure: -5, budgetEfficiency: -3 },
          feedback: 'Necessary but insufficient as a first action. Clinical downtime should be activated simultaneously — do not delay patient safety protocols while waiting for technical teams.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.3 — Test Monitoring and Control',
          quality: 'neutral',
          timeImpact: 'medium',
        },
        {
          id: 'hc-p1-d4',
          label: 'Review last deployment change log',
          description: 'Check what changed in the last release to identify the likely culprit.',
          metricDeltas: { defectDetection: 15, testCoverage: 5, teamMorale: 3, riskExposure: 3, stakeholderTrust: -5 },
          feedback: 'Good instinct, but again — activate clinical downtime first. After safety is secured, change log review is the right next step to identify the regression.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.3 — Concepts of Testing',
          quality: 'neutral',
          timeImpact: 'medium',
        },
      ],
    },
    {
      phaseId: 2,
      context: 'Clinical downtime is active. Initial diagnosis: a database schema migration during the upgrade corrupted the session management tables. 8,400 patient records are readable but logins fail for all clinical users.',
      decisions: [
        {
          id: 'hc-p2-d1',
          label: 'Scope and document the full data impact',
          description: 'Determine exactly which patient records, modules, and clinical workflows are affected.',
          metricDeltas: { defectDetection: 12, stakeholderTrust: 10, riskExposure: -8, testCoverage: 8, budgetEfficiency: -5 },
          feedback: 'Correct prioritisation. Knowing the blast radius prevents over-remediation and under-remediation. ISO 29119-2 demands documented impact assessment before remediation planning.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.3 — Test Monitoring and Control',
          quality: 'best',
          timeImpact: 'medium',
        },
        {
          id: 'hc-p2-d2',
          label: 'Immediately restore the database backup',
          description: 'Roll back to last night\'s database snapshot to restore login functionality.',
          metricDeltas: { riskExposure: -10, stakeholderTrust: 5, teamMorale: 5, budgetEfficiency: -8, defectDetection: -5 },
          feedback: 'Last night\'s backup loses 14 hours of clinical data including new admissions, medications, and vitals. Data loss in a healthcare context is potentially life-threatening.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.5 — Safety-Critical Systems',
          quality: 'bad',
          timeImpact: 'fast',
        },
        {
          id: 'hc-p2-d3',
          label: 'Notify hospital medical directors',
          description: 'Formally brief all 14 hospital medical directors on the situation and expected timeline.',
          metricDeltas: { stakeholderTrust: 15, teamMorale: 5, riskExposure: -5, budgetEfficiency: -3, defectDetection: 0 },
          feedback: 'Communication to clinical leadership is essential during a patient-safety incident. Medical directors need situational awareness to make safe care decisions.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.3 — Stakeholder Communication',
          quality: 'good',
          timeImpact: 'fast',
        },
        {
          id: 'hc-p2-d4',
          label: 'Engage EHR vendor support emergency line',
          description: 'Contact the EHR vendor\'s 24/7 critical support team for expert assistance.',
          metricDeltas: { defectDetection: 8, riskExposure: -8, stakeholderTrust: 3, budgetEfficiency: -10, teamMorale: 5 },
          feedback: 'Vendor support is a valuable resource for system-specific issues. However, wait times and NDA constraints can slow response. Run in parallel with internal triage, not instead of it.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.2 — Test Planning',
          quality: 'neutral',
          timeImpact: 'slow',
        },
      ],
    },
    {
      phaseId: 3,
      context: 'Impact assessment complete: 47 clinical users locked out, session table corrupted by a bad migration script. The fix requires a targeted schema patch — but it must be tested before applying to production data.',
      decisions: [
        {
          id: 'hc-p3-d1',
          label: 'Test migration patch on staging replica first',
          description: 'Restore a staging environment from production backup and validate the patch fully before applying.',
          metricDeltas: { testCoverage: 15, defectDetection: 12, riskExposure: -18, stakeholderTrust: 8, budgetEfficiency: -8 },
          feedback: 'Textbook approach. Never apply untested patches to production healthcare data. Staging validation is non-negotiable — ISO 29119-3 requires test environment equivalence for critical systems.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §7.3 — Test Environment',
          quality: 'best',
          timeImpact: 'slow',
        },
        {
          id: 'hc-p3-d2',
          label: 'Apply patch directly to production',
          description: 'The patch looks simple — apply it to production immediately to restore access faster.',
          metricDeltas: { riskExposure: 20, stakeholderTrust: -10, teamMorale: -8, testCoverage: -10, budgetEfficiency: 5 },
          feedback: 'Extremely dangerous. Untested patches on live healthcare databases risk data corruption affecting patient records. Speed is never worth patient safety.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.5 — Safety-Critical Systems',
          quality: 'bad',
          timeImpact: 'fast',
        },
        {
          id: 'hc-p3-d3',
          label: 'Enable read-only emergency access mode',
          description: 'Temporarily enable a read-only mode so clinicians can view (not update) patient records while the fix is prepared.',
          metricDeltas: { stakeholderTrust: 12, teamMorale: 8, riskExposure: -10, budgetEfficiency: -3, defectDetection: 3 },
          feedback: 'Smart interim mitigation. Read-only access restores medication visibility — the most critical clinical need — while the safe fix is prepared. Excellent risk-balancing.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.5 — State Transition Testing',
          quality: 'good',
          timeImpact: 'medium',
        },
      ],
    },
    {
      phaseId: 4,
      context: 'The staging-tested schema patch has been validated. Root cause confirmed: the migration script did not account for NULL values in the legacy session tokens column. Time to fix and harden.',
      decisions: [
        {
          id: 'hc-p4-d1',
          label: 'Add NULL-safety tests to all future migrations',
          description: 'Implement pre-migration test suite that validates schema changes against real data patterns including NULLs and edge cases.',
          metricDeltas: { testCoverage: 18, defectDetection: 15, riskExposure: -15, teamMorale: 8, budgetEfficiency: -8 },
          feedback: 'Outstanding preventive measure. Migration testing against real data patterns is a best practice that almost all teams skip until something breaks. This directly prevents recurrence.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.2 — Equivalence Partitioning',
          quality: 'best',
          timeImpact: 'slow',
        },
        {
          id: 'hc-p4-d2',
          label: 'Revert the problematic upgrade entirely',
          description: 'Roll back the entire upgrade and replan the release with better testing.',
          metricDeltas: { riskExposure: -12, stakeholderTrust: -5, teamMorale: -10, budgetEfficiency: -15, testCoverage: -8 },
          feedback: 'Full revert abandons the clinical improvements in the upgrade. Better to fix the migration issue and proceed — clinical staff have been anticipating the new features.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.4 — Test Completion',
          quality: 'neutral',
          timeImpact: 'fast',
        },
        {
          id: 'hc-p4-d3',
          label: 'Implement automated pre-deployment health checks',
          description: 'Build automated smoke tests that fire before any migration touches production.',
          metricDeltas: { testCoverage: 12, defectDetection: 18, riskExposure: -18, teamMorale: 10, budgetEfficiency: -10 },
          feedback: 'Excellent systemic fix. Pre-deployment gates that automatically validate critical functionality prevent the human error of forgetting to test before production deployments.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §8 — Test Execution',
          quality: 'best',
          timeImpact: 'slow',
        },
        {
          id: 'hc-p4-d4',
          label: 'Blame the migration script author',
          description: 'Identify and formally discipline the developer who wrote the faulty migration.',
          metricDeltas: { teamMorale: -20, stakeholderTrust: -5, riskExposure: 5, budgetEfficiency: -5, defectDetection: -5 },
          feedback: 'Blame culture is the antithesis of quality engineering. Blameless post-mortems outperform blame-based cultures in defect prevention by orders of magnitude. Fix the process, not the person.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.2 — Ethics in Testing',
          quality: 'bad',
          timeImpact: 'fast',
        },
      ],
    },
    {
      phaseId: 5,
      context: 'The schema patch is ready. Before restoring full access, comprehensive validation is needed — including HIPAA compliance checks and clinical workflow testing with real nurses.',
      decisions: [
        {
          id: 'hc-p5-d1',
          label: 'Run UAT with clinical staff before go-live',
          description: 'Bring in nurses and physicians to validate all clinical workflows in a staging environment.',
          metricDeltas: { testCoverage: 15, stakeholderTrust: 18, teamMorale: 8, defectDetection: 12, budgetEfficiency: -10 },
          feedback: 'Essential. Clinical UAT is the only way to validate that the system meets real-world care workflows. ISO 29119-1 requires that testing reflects actual use conditions.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.9 — User Acceptance Testing',
          quality: 'best',
          timeImpact: 'slow',
        },
        {
          id: 'hc-p5-d2',
          label: 'Technical regression only — no UAT',
          description: 'Run automated regression tests and approve if they pass — no clinical staff involvement.',
          metricDeltas: { budgetEfficiency: 10, teamMorale: 5, testCoverage: -8, stakeholderTrust: -8, riskExposure: 10 },
          feedback: 'Technical tests cannot replace clinical validation. Automated tests check what engineers predicted — UAT checks what clinical staff actually need. Both are required for healthcare systems.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §6.9 — User Acceptance Testing',
          quality: 'bad',
          timeImpact: 'fast',
        },
        {
          id: 'hc-p5-d3',
          label: 'HIPAA compliance audit before restore',
          description: 'Conduct a focused HIPAA audit to confirm no data was exposed during the outage.',
          metricDeltas: { riskExposure: -18, stakeholderTrust: 15, testCoverage: 8, defectDetection: 5, budgetEfficiency: -8 },
          feedback: 'Critically important. Any production incident touching patient data requires HIPAA audit. Skipping this step creates regulatory liability even if the technical fix is perfect.',
          isoRef: 'ISO/IEC/IEEE 29119-4 §7.3 — Security Testing',
          quality: 'best',
          timeImpact: 'medium',
        },
      ],
    },
    {
      phaseId: 6,
      context: 'Full system access is restored. All 14 hospitals are back online. Now: incident report, process improvements, and rebuilding staff confidence in the EHR system.',
      decisions: [
        {
          id: 'hc-p6-d1',
          label: 'Mandatory pre-release clinical simulation',
          description: 'Establish a requirement that all future EHR releases include a full clinical workflow simulation before production.',
          metricDeltas: { testCoverage: 18, defectDetection: 15, teamMorale: 10, riskExposure: -20, budgetEfficiency: -10 },
          feedback: 'Transformative policy change. Clinical simulations catch workflow-breaking bugs that automated tests miss. This is the standard in FDA-regulated medical device software.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.2 — Test Planning',
          quality: 'best',
          timeImpact: 'slow',
        },
        {
          id: 'hc-p6-d2',
          label: 'Staff training on downtime procedures',
          description: 'Run refresher training for all clinical staff on paper-based downtime workflows.',
          metricDeltas: { stakeholderTrust: 12, teamMorale: 12, riskExposure: -10, budgetEfficiency: -5, testCoverage: 3 },
          feedback: 'Wise investment. Downtime procedure fluency directly reduces patient risk during future incidents. Staff who practiced today responded 60% faster than those who had not.',
          isoRef: 'ISO/IEC/IEEE 29119-1 §5.1 — Testing Principles',
          quality: 'good',
          timeImpact: 'medium',
        },
        {
          id: 'hc-p6-d3',
          label: 'Implement blue-green deployment pipeline',
          description: 'Build a zero-downtime deployment architecture so future upgrades can be validated in production-like conditions without risk.',
          metricDeltas: { riskExposure: -25, defectDetection: 12, teamMorale: 15, testCoverage: 10, budgetEfficiency: -20 },
          feedback: 'High-investment, high-reward. Blue-green deployments eliminate the category of outage you just experienced. The upfront cost is justified by the patient safety improvement.',
          isoRef: 'ISO/IEC/IEEE 29119-3 §7.3 — Test Environment',
          quality: 'best',
          timeImpact: 'slow',
        },
        {
          id: 'hc-p6-d4',
          label: 'Publish joint lessons-learned with clinicians',
          description: 'Co-author the incident report with nursing and medical staff to capture clinical perspective.',
          metricDeltas: { stakeholderTrust: 20, teamMorale: 12, riskExposure: -8, defectDetection: 5, budgetEfficiency: -3 },
          feedback: 'Excellent cultural move. Joint incident reviews bridge the gap between clinical and technical teams. Reports written only by IT miss the human impact of system failures.',
          isoRef: 'ISO/IEC/IEEE 29119-2 §6.5 — Test Completion',
          quality: 'best',
          timeImpact: 'medium',
        },
      ],
    },

    // ─── Phase 7: Root Cause Deep Dive ─────────────────────────────
    {
      phaseId: 7,
      context: 'The immediate patch is applied. Now the Chief Medical Information Officer wants a thorough root cause analysis. Why did the migration script ship without NULL validation?',
      decisions: [
        {
          id: 'hc-p7-d1', label: 'Process audit of the release pipeline', description: 'Investigate why migration testing was insufficient and what quality gates were missing.',
          metricDeltas: { defectDetection: 15, testCoverage: 10, teamMorale: 8, riskExposure: -12, stakeholderTrust: 8 },
          feedback: 'Systemic process investigation is the correct approach. Individual failures are symptoms of process weaknesses.', isoRef: 'ISO/IEC/IEEE 29119-1 §5.3', quality: 'best'
        },
        {
          id: 'hc-p7-d2', label: 'Code review of all pending migrations', description: 'Review every migration script in the backlog for similar patterns.',
          metricDeltas: { defectDetection: 12, testCoverage: 8, teamMorale: 3, riskExposure: -8, budgetEfficiency: -5 },
          feedback: 'Good tactical move but does not address the systemic issue of why bad migrations pass review.', isoRef: 'ISO/IEC/IEEE 29119-4 §6', quality: 'good'
        },
        {
          id: 'hc-p7-d3', label: 'Attribute failure to time pressure', description: 'Document that the team was rushed and request more time for future releases.',
          metricDeltas: { teamMorale: -5, stakeholderTrust: -8, riskExposure: 5, budgetEfficiency: 5, defectDetection: -3 },
          feedback: 'Time pressure is a contributing factor, not a root cause. This excuse prevents real learning.', isoRef: 'ISO/IEC/IEEE 29119-1 §5.1', quality: 'bad'
        },
        {
          id: 'hc-p7-d4', label: 'Engage HIPAA compliance consultant', description: 'Bring in a HIPAA specialist to assess whether the outage constituted a reportable breach.',
          metricDeltas: { stakeholderTrust: 10, riskExposure: -8, budgetEfficiency: -12, teamMorale: 3, defectDetection: 5 },
          feedback: 'Proactive compliance assessment is wise in healthcare. Better to self-report than be caught unprepared.', isoRef: 'ISO/IEC/IEEE 29119-4 §7.3', quality: 'neutral'
        },
      ],
    },

    // ─── Phase 8: Security & Data Integrity ────────────────────────
    {
      phaseId: 8,
      context: 'During the outage, 3 nurses used personal phones to photograph patient charts as a workaround. This is a potential HIPAA violation. The privacy officer needs your input.',
      decisions: [
        {
          id: 'hc-p8-d1', label: 'Immediate device audit and data wipe', description: 'Confiscate devices, verify no data was shared, and securely wipe any patient photos.',
          metricDeltas: { riskExposure: -18, stakeholderTrust: 12, teamMorale: -5, budgetEfficiency: -5, testCoverage: 3 },
          feedback: 'Correct response. Swift action on data exposure minimizes HIPAA liability and shows organizational commitment to patient privacy.', isoRef: 'ISO/IEC/IEEE 29119-4 §7.3', quality: 'best'
        },
        {
          id: 'hc-p8-d2', label: 'Document and monitor — no device seizure', description: 'Note the incident but trust the nurses to delete the photos themselves.',
          metricDeltas: { teamMorale: 5, stakeholderTrust: -10, riskExposure: 12, budgetEfficiency: 5, defectDetection: -3 },
          feedback: 'Trust without verification is negligence in a HIPAA context. Documented evidence of inaction amplifies regulatory risk.', isoRef: 'ISO/IEC/IEEE 29119-1 §5.1', quality: 'bad'
        },
        {
          id: 'hc-p8-d3', label: 'Provide secure offline mobile app', description: 'Deploy an approved mobile EHR viewer for future downtime scenarios with encryption and remote wipe.',
          metricDeltas: { testCoverage: 10, stakeholderTrust: 10, riskExposure: -12, budgetEfficiency: -10, teamMorale: 8 },
          feedback: 'Proactive solution that addresses the root need. Clinical staff need data access during downtimes — give them a safe way to do it.', isoRef: 'ISO/IEC/IEEE 29119-3 §7.3', quality: 'good'
        },
        {
          id: 'hc-p8-d4', label: 'Report to HHS Office for Civil Rights', description: 'Proactively self-report the potential breach to federal authorities.',
          metricDeltas: { stakeholderTrust: 15, riskExposure: -10, teamMorale: -8, budgetEfficiency: -8, defectDetection: 5 },
          feedback: 'Self-reporting shows integrity. If this constitutes a breach, early reporting significantly reduces penalties.', isoRef: 'ISO/IEC/IEEE 29119-2 §6.5', quality: 'neutral'
        },
      ],
    },

    // ─── Phase 9: Clinical Verification ────────────────────────────
    {
      phaseId: 9,
      context: 'The patched system is running in staging. Before restoring full clinical access, you need to verify that all medication records, allergy alerts, and vital signs are correctly displayed.',
      decisions: [
        {
          id: 'hc-p9-d1', label: 'Multi-discipline clinical validation', description: 'Test with pharmacists, nurses, and physicians each verifying their specific workflows.',
          metricDeltas: { testCoverage: 18, defectDetection: 15, stakeholderTrust: 12, riskExposure: -15, budgetEfficiency: -8 },
          feedback: 'Each clinical role uses the EHR differently. Multi-discipline testing catches role-specific bugs that single-perspective testing misses.', isoRef: 'ISO/IEC/IEEE 29119-4 §6.9', quality: 'best'
        },
        {
          id: 'hc-p9-d2', label: 'Automated data integrity checks only', description: 'Run database consistency checks to verify all records are intact.',
          metricDeltas: { defectDetection: 8, testCoverage: 5, teamMorale: 5, riskExposure: -5, budgetEfficiency: 5 },
          feedback: 'Data integrity checks are necessary but not sufficient. Correct data displayed incorrectly is still a patient safety hazard.', isoRef: 'ISO/IEC/IEEE 29119-4 §6', quality: 'neutral'
        },
        {
          id: 'hc-p9-d3', label: 'Skip testing — clinical staff are waiting', description: 'The system looks fine. Restore access immediately to end the paper-based workaround.',
          metricDeltas: { budgetEfficiency: 8, teamMorale: 3, testCoverage: -15, riskExposure: 18, stakeholderTrust: -10 },
          feedback: 'Rushing a healthcare system back online without validation is negligent. If a medication allergy alert fails, the consequences are life-threatening.', isoRef: 'ISO/IEC/IEEE 29119-1 §5.5', quality: 'bad'
        },
        {
          id: 'hc-p9-d4', label: 'Parallel run: old and new systems side by side', description: 'Run both the paper workflow and digital system simultaneously for 4 hours to validate.',
          metricDeltas: { testCoverage: 12, stakeholderTrust: 10, riskExposure: -10, budgetEfficiency: -10, teamMorale: -3 },
          feedback: 'Parallel running is the safest validation approach but doubles workload. Worth it for safety-critical systems.', isoRef: 'ISO/IEC/IEEE 29119-3 §9', quality: 'good'
        },
      ],
    },

    // ─── Phase 10: Stakeholder Sign-off ────────────────────────────
    {
      phaseId: 10,
      context: 'Validation complete. All clinical workflows pass. The Chief Medical Officer and CIO must jointly sign off before full restoration. They want assurance this will not happen again.',
      decisions: [
        {
          id: 'hc-p10-d1', label: 'Present comprehensive test evidence package', description: 'Deliver full traceability from requirements through test results with compliance attestation.',
          metricDeltas: { stakeholderTrust: 18, testCoverage: 5, riskExposure: -10, budgetEfficiency: -5, teamMorale: 8 },
          feedback: 'Formal test evidence packages are the gold standard for healthcare sign-offs. Regulators require auditable proof of testing adequacy.', isoRef: 'ISO/IEC/IEEE 29119-3 §8', quality: 'best'
        },
        {
          id: 'hc-p10-d2', label: 'Verbal briefing with slide deck', description: 'Present a high-level summary with charts and recommendations.',
          metricDeltas: { stakeholderTrust: 5, teamMorale: 5, budgetEfficiency: 5, riskExposure: 3, testCoverage: -3 },
          feedback: 'Presentations are not auditable documentation. In healthcare, sign-off must be backed by formal evidence.', isoRef: 'ISO/IEC/IEEE 29119-2 §6.5', quality: 'neutral'
        },
        {
          id: 'hc-p10-d3', label: 'Fast-track approval with verbal confirmation', description: 'Get verbal approval from both executives over the phone to speed up restoration.',
          metricDeltas: { budgetEfficiency: 8, teamMorale: 3, stakeholderTrust: -12, riskExposure: 8, testCoverage: -5 },
          feedback: 'Verbal approvals have no legal standing in healthcare compliance. This creates personal liability for the signing executives.', isoRef: 'ISO/IEC/IEEE 29119-2 §6.5', quality: 'bad'
        },
        {
          id: 'hc-p10-d4', label: 'Independent third-party validation', description: 'Hire an external auditor to independently verify the test results before sign-off.',
          metricDeltas: { stakeholderTrust: 12, defectDetection: 8, riskExposure: -8, budgetEfficiency: -15, teamMorale: -3 },
          feedback: 'Independent validation adds credibility. In regulated healthcare, external verification strengthens compliance posture significantly.', isoRef: 'ISO/IEC/IEEE 29119-2 §6.3', quality: 'good'
        },
      ],
    },

    // ─── Phase 11: System Restoration ──────────────────────────────
    {
      phaseId: 11,
      context: 'Joint sign-off obtained. Time to restore full EHR access across all 14 hospitals. The transition from paper back to digital must be seamless and safe.',
      decisions: [
        {
          id: 'hc-p11-d1', label: 'Phased rollout by hospital with clinical liaisons', description: 'Restore access one hospital at a time with a clinical liaison at each site to catch issues.',
          metricDeltas: { riskExposure: -18, stakeholderTrust: 15, teamMorale: 8, testCoverage: 8, budgetEfficiency: -8 },
          feedback: 'Best practice for clinical system restoration. Phased rollout with on-site support catches environment-specific issues before they affect all hospitals.', isoRef: 'ISO/IEC/IEEE 29119-2 §6.4', quality: 'best'
        },
        {
          id: 'hc-p11-d2', label: 'Simultaneous restore across all hospitals', description: 'Flip the switch for all 14 hospitals at once during shift change.',
          metricDeltas: { budgetEfficiency: 5, teamMorale: -3, riskExposure: 10, stakeholderTrust: -5, testCoverage: -3 },
          feedback: 'Big-bang restoration risks simultaneous issues across all sites with insufficient support to address them.', isoRef: 'ISO/IEC/IEEE 29119-3 §9', quality: 'neutral'
        },
        {
          id: 'hc-p11-d3', label: 'Keep paper workflows for 48 more hours', description: 'Continue paper-based operations for safety while monitoring the restored digital system.',
          metricDeltas: { stakeholderTrust: -10, teamMorale: -12, riskExposure: 5, budgetEfficiency: -8, testCoverage: 3 },
          feedback: 'Extended paper workflows increase medication error risk and clinical fatigue. The system has been validated — use it.', isoRef: 'ISO/IEC/IEEE 29119-2 §6.4', quality: 'bad'
        },
        {
          id: 'hc-p11-d4', label: 'Start with ICU and emergency departments', description: 'Prioritize the most critical departments first, then expand to general wards.',
          metricDeltas: { riskExposure: -12, stakeholderTrust: 10, teamMorale: 5, budgetEfficiency: -3, defectDetection: 5 },
          feedback: 'Logical prioritization. ICU and ED have the highest dependency on real-time digital records. Restoring them first maximizes patient safety impact.', isoRef: 'ISO/IEC/IEEE 29119-1 §5.4', quality: 'good'
        },
      ],
    },

    // ─── Phase 12: Culture & Process Reform ────────────────────────
    {
      phaseId: 12,
      context: 'All hospitals are fully restored. The incident lasted 6.5 hours. Zero patient harm reported. Now: build the culture and processes to prevent this from ever happening again.',
      decisions: [
        {
          id: 'hc-p12-d1', label: 'Establish clinical-technical joint governance', description: 'Create a permanent committee of clinicians and engineers who jointly approve all EHR changes.',
          metricDeltas: { stakeholderTrust: 20, teamMorale: 12, riskExposure: -18, defectDetection: 10, budgetEfficiency: -8 },
          feedback: 'Transformative governance change. Clinical-technical collaboration prevents the disconnect that caused this crisis. This is healthcare IT best practice.', isoRef: 'ISO/IEC/IEEE 29119-2 §6.2', quality: 'best'
        },
        {
          id: 'hc-p12-d2', label: 'Publish incident report for the healthcare community', description: 'Share anonymized learnings with other hospitals to prevent similar incidents industry-wide.',
          metricDeltas: { stakeholderTrust: 15, teamMorale: 10, riskExposure: -10, budgetEfficiency: -3, defectDetection: 5 },
          feedback: 'Sharing learnings is both ethical and strategically smart. Industry collaboration on safety makes everyone safer.', isoRef: 'ISO/IEC/IEEE 29119-2 §6.5', quality: 'good'
        },
        {
          id: 'hc-p12-d3', label: 'Fire the team lead responsible', description: 'Hold the QA lead accountable for the failure by terminating their position.',
          metricDeltas: { teamMorale: -25, stakeholderTrust: -5, riskExposure: 10, budgetEfficiency: -5, defectDetection: -10 },
          feedback: 'Blame-based accountability destroys psychological safety and drives future failures underground. Fix processes, not people.', isoRef: 'ISO/IEC/IEEE 29119-1 §5.2', quality: 'bad'
        },
        {
          id: 'hc-p12-d4', label: 'Mandatory downtime drills every quarter', description: 'Schedule quarterly exercises where clinical staff practice paper-based workflows.',
          metricDeltas: { stakeholderTrust: 12, teamMorale: 8, riskExposure: -15, budgetEfficiency: -5, testCoverage: 8 },
          feedback: 'Drills build muscle memory for crisis response. Hospitals that practice downtime procedures respond 3× faster during real incidents.', isoRef: 'ISO/IEC/IEEE 29119-1 §5.1', quality: 'best'
        },
      ],
    },
  ],
};
