// ISO/IEC/IEEE 29119-1:2022 — Why It Matters & Related Sections (exact reference copy)

function parseRelated(items) {
  return items.map((s) => {
    const m = s.match(/^(§[\d.]+)\s+(.+)$/);
    return m ? { ref: m[1], title: m[2] } : { ref: s, title: s };
  });
}

function entry(title, definition, whyItMatters, relatedList) {
  return {
    title,
    definition,
    why: whyItMatters,
    related: parseRelated(relatedList),
  };
}

/** Keys: "<part>:<section>" matching question bank part + section */
export const ISO_REFERENCE_CONTENT = {
  '4:3.13': entry(
    'Branch Testing',
    'structure-based test design technique based on exercising branches in control flow',
    'Branch testing ensures every possible path through conditional logic is exercised. Per ISO/IEC/IEEE 29119-1 §4.4.4, structure-based techniques like branch testing are essential for achieving required structural coverage in the test strategy.',
    ['§3.80 Structure-based Testing', '§3.22 Control Flow', '§3.94 Test Design Technique']
  ),
  '1:3.131': entry(
    'Testing',
    'set of activities conducted to facilitate discovery and evaluation of properties of test items',
    'Testing is the primary form of quality control in software development. Per ISO/IEC/IEEE 29119-1 §4.1.2, test results are used by both QA and QC to ensure the product meets requirements and stakeholder needs.',
    ['§3.85 Test Case', '§4.1.8 Purpose of Testing', '§3.114 Test Objective']
  ),
  '1:3.85': entry(
    'Test Case',
    'set of preconditions, inputs and expected results, developed to drive the execution of a test item to meet test objectives',
    'Test cases are the atomic unit of testing. Without well-defined preconditions and expected results, per ISO/IEC/IEEE 29119-1 §3.85, it is impossible to objectively determine whether a test has passed or failed.',
    ['§3.84 Test Basis', '§3.115 Test Oracle', '§3.94 Test Design Technique']
  ),
  '1:3.84': entry(
    'Test Basis',
    'information used as the basis for designing and implementing test cases',
    'Per ISO/IEC/IEEE 29119-1 §4.1.9, if test basis information is missing or inadequate, test case analysis and design cannot be completed. It defines the expected behaviour of the test item.',
    ['§3.85 Test Case', '§3.115 Test Oracle', '§3.35 Expected Result']
  ),
  '1:3.115': entry(
    'Test Oracle',
    'source of information for determining whether a test has passed or failed',
    'Per ISO/IEC/IEEE 29119-1 §4.1.10, test oracles may be complete or partial. Without an oracle, testers cannot objectively judge results — especially challenging for AI-based systems.',
    ['§3.116 Test Oracle Problem', '§3.35 Expected Result', '§3.5 Actual Result']
  ),
  '1:3.116': entry(
    'Test Oracle Problem',
    'challenge of determining whether a test has passed or failed for a given set of test inputs and state',
    'Per ISO/IEC/IEEE 29119-1 §4.1.10, when the complexity of the test item (e.g. an AI-based system) makes it impossible for humans to know when a test has passed or failed, metamorphic testing is recommended as an alternative.',
    ['§3.115 Test Oracle', '§3.49 Metamorphic Testing', '§3.52 Non-deterministic System']
  ),
  '2:3.117': entry(
    'Test Plan',
    'detailed description of test objectives to be achieved and the means and schedule for achieving them, organized to coordinate testing activities for some test item or set of test items',
    'Per ISO/IEC/IEEE 29119-1 §4.3.2.3.2, the test plan drives all testing — it is used by the test monitoring and control process as the basis for managing testing, and by dynamic testing processes to specify how testing should be performed.',
    ['§3.127 Test Strategy', '§3.113 Test Monitoring and Control Process', '§3.86 Test Completion Process']
  ),
  '2:3.127': entry(
    'Test Strategy',
    'part of the test plan that describes the approach to testing for a specific project, test level or test type',
    'Per ISO/IEC/IEEE 29119-1 §4.2.1, the selection of test approaches in the test strategy is typically complex because risks are often interrelated — treating one risk can introduce or increase another.',
    ['§3.117 Test Plan', '§4.2.2 Risks and Risk Management', '§3.94 Test Design Technique']
  ),
  '2:3.118': entry(
    'Test Policy',
    'executive-level document describing the purpose, goals, principles, and scope of testing',
    'Per ISO/IEC/IEEE 29119-1 §4.3.2.2.2, the test policy expresses what the organization wants to achieve from testing and guides the content of the organizational test practices document, which describes how to achieve it.',
    ['§3.53 Organizational Test Practices', '§3.55 Organizational Test Specification', '§3.54 Organizational Test Process']
  ),
  '1:3.69': entry(
    'Risk-based Testing',
    'testing in which the management, selection, prioritization, and use of testing activities and resources are consciously based on corresponding types and levels of analysed risk',
    'Per ISO/IEC/IEEE 29119-1 §4.1.6, since exhaustive testing is impossible, risk-based testing (§4.2.2) is the recommended basis for selecting which tests to run — prioritizing areas of highest impact and likelihood of failure.',
    ['§4.2.2 Risks and Risk Management', '§3.61 Product Risk', '§3.62 Project Risk']
  ),
  '1:3.64': entry(
    'Regression Testing',
    'testing performed following modifications to a test item or to its operational environment, to identify whether failures in unmodified parts of the test item occur',
    'Per ISO/IEC/IEEE 29119-1 §4.4.6, regression testing differs from retesting — it does not test that the modification works correctly, but that other unmodified parts of the system have not been accidentally affected by the change.',
    ['§3.68 Retesting', '§4.4.7 Manual and Automated Testing', '§4.4.8 Continuous Testing']
  ),
  '1:3.68': entry(
    'Retesting',
    'testing performed to check that modifications made to correct a fault have successfully removed the fault',
    'Per ISO/IEC/IEEE 29119-1 §4.4.6, retesting is often complemented by regression testing to ensure that other unmodified parts of the test item have not been adversely affected by the fix.',
    ['§3.64 Regression Testing', '§3.39 Incident', '§3.40 Incident Report']
  ),
  '1:3.78': entry(
    'Static Testing',
    'testing in which a test item is examined against a set of quality or other criteria without the test item being executed',
    'Per ISO/IEC/IEEE 29119-1 §4.2.4.6, static analysis and reviews can find defects before test execution becomes possible — most software projects use reviews (ISO/IEC 20246) to identify issues early in the lifecycle.',
    ['§3.29 Dynamic Testing', '§4.1.5 Static and Dynamic Testing', '§3.80 Structure-based Testing']
  ),
  '1:3.29': entry(
    'Dynamic Testing',
    'testing in which a test item is evaluated by executing it',
    'Per ISO/IEC/IEEE 29119-1 §4.1.5, dynamic testing can only occur in parts of the life cycle when executable code is available. It involves executing test cases and observing actual results against expected results.',
    ['§3.78 Static Testing', '§3.99 Test Execution', '§3.102 Test Execution Process']
  ),
  '4:3.12': entry(
    'Boundary Value Analysis',
    'specification-based test design technique based on exercising the boundaries of equivalence partitions',
    'Per ISO/IEC/IEEE 29119-1 §3.12, BVA is based on the principle that defects are disproportionately found at the edges of equivalence partitions. It is one of the most widely used specification-based test design techniques.',
    ['§3.31 Equivalence Partitioning', '§3.30 Equivalence Partition', '§3.94 Test Design Technique']
  ),
  '4:3.31': entry(
    'Equivalence Partitioning',
    'test design technique in which test cases are designed to exercise equivalence partitions by using one or more representative members of each partition',
    'Per ISO/IEC/IEEE 29119-1 §3.31, instead of testing every possible input value, EP reduces the test set to representative values from each class — maintaining coverage while significantly reducing test effort.',
    ['§3.12 Boundary Value Analysis', '§3.30 Equivalence Partition', '§3.89 Test Coverage']
  ),
  '4:3.27': entry(
    'Decision Table Testing',
    'specification-based test design technique based on exercising decision rules in a decision table',
    'Per ISO/IEC/IEEE 29119-1 §3.27, decision table testing exercises decision rules — combinations of conditions and their resulting actions. It is especially effective for testing business logic with multiple input conditions.',
    ['§3.26 Decision Table', '§3.25 Decision Rule', '§3.15 Cause-effect Graphing']
  ),
  '4:3.76': entry(
    'State Transition Testing',
    'specification-based test design technique based on exercising transitions in a state model',
    'Per ISO/IEC/IEEE 29119-1 §3.76, state transition testing ensures all valid transitions between states are exercised. It is essential for systems where behavior depends on current state, such as login systems or workflow engines.',
    ['§3.94 Test Design Technique', '§3.111 Test Model', '§3.85 Test Case']
  ),
  '4:3.74': entry(
    'Security Testing',
    'test type conducted to evaluate the degree to which a test item, and associated data and information, are protected so that unauthorized persons or systems cannot use, read, or modify them, and authorized persons or systems are not denied access',
    'Per ISO/IEC/IEEE 29119-1 §A.15.3, security testing is especially important for web applications due to ease of access. It addresses risks of unauthorized data access, modification, and denial of service to authorized users.',
    ['§3.130 Test Type', '§3.79 Stress Testing', '§3.66 Reliability Testing']
  ),
  '4:3.79': entry(
    'Stress Testing',
    'performance testing evaluating behavior under conditions above anticipated capacity',
    'Per ISO/IEC/IEEE 29119-1 §3.79, stress testing evaluates behavior under conditions ABOVE anticipated capacity — identifying the breaking point and degradation behavior of the system beyond its specified limits.',
    ['§3.43 Load Testing', '§3.58 Performance Testing', '§3.66 Reliability Testing']
  ),
  '4:3.57': entry(
    'Pairwise Testing',
    'black-box test design technique designing test cases to execute all combinations of each pair of inputs',
    'Per ISO/IEC/IEEE 29119-1 §3.57, pairwise testing is the most popular form of combinatorial testing (§3.18). Research shows that most software faults are triggered by interactions of at most two parameters.',
    ['§3.18 Combinatorial Testing', '§3.56 P-V Pair', '§3.94 Test Design Technique']
  ),
  '4:3.37': entry(
    'Exploratory Testing',
    "experience-based testing in which the tester spontaneously designs and executes tests based on the tester's existing relevant knowledge, prior exploration of the test item, and heuristic rules of thumb regarding common software behaviours and types of failure",
    'Per ISO/IEC/IEEE 29119-1 §4.4.3.3, exploratory tests are often not wholly unscripted — session sheets structure the session and capture what was tested. It hunts for hidden behaviors that scripted tests would never reach.',
    ['§3.36 Experience-based Testing', '§3.73 Scripted Testing', '§3.32 Error Guessing']
  ),
  '4:3.49': entry(
    'Metamorphic Testing',
    'technique generating test cases based on existing cases and metamorphic relations',
    'Per ISO/IEC/IEEE 29119-1 §A.2.3, metamorphic testing directly addresses the test oracle problem for non-deterministic systems such as AI-based systems, where expected outputs cannot be precisely calculated.',
    ['§3.116 Test Oracle Problem', '§3.48 Metamorphic Relation', '§3.52 Non-deterministic System']
  ),
  '4:4.4.7': entry(
    'Manual and Automated Testing',
    'automate if test case run 5+ times; depends on budget, tester capability, methodology',
    'Per ISO/IEC/IEEE 29119-1 §4.4.7, a common heuristic is that if a set of test cases will be executed 5 or more times (e.g. during regression testing), it is typically cost-effective to automate them.',
    ['§3.64 Regression Testing', '§4.4.8 Continuous Testing', '§3.100 Test Execution Engine']
  ),
  '3:3.94': entry(
    'Test Design Technique',
    'procedure used to create or select a test model, identify test coverage items, and derive corresponding test cases',
    'Per ISO/IEC/IEEE 29119-1 §3.94, test design techniques provide systematic, repeatable procedures for generating effective test cases — ensuring coverage is achieved and reducing reliance on individual tester intuition alone.',
    ['§3.111 Test Model', '§3.90 Test Coverage Item', '§3.89 Test Coverage']
  ),
  '3:3.95': entry(
    'Test Environment',
    'environment containing facilities, hardware, software, firmware, procedures, needed to conduct a test',
    'Per ISO/IEC/IEEE 29119-1 §4.4.12, test environment requirements must be considered during test planning so all components are acquired, set up, configured, and validated prior to test execution.',
    ['§3.98 Test Environment Requirements', '§3.97 Test Environment Readiness Report', '§3.91 Test Data']
  ),
  '3:3.111': entry(
    'Test Model',
    'representation of test item allowing testing to focus on particular characteristics',
    'Per ISO/IEC/IEEE 29119-1 §4.4.1 and Figure 8, the test model is the key artifact in test design — it models the required behavior of the test item and is used to generate test cases that achieve the required level of coverage.',
    ['§3.94 Test Design Technique', '§3.90 Test Coverage Item', '§3.112 Test Model Specification']
  ),
  '3:3.109': entry(
    'Test Management',
    'planning, scheduling, estimating, monitoring, reporting, control, and completion of test activities',
    'Per ISO/IEC/IEEE 29119-1 §4.3.1.4, test management processes include: test strategy and planning, test monitoring and control, and test completion. These are instantiated separately for each test level or test type managed.',
    ['§3.117 Test Plan', '§3.113 Test Monitoring and Control Process', '§3.86 Test Completion Process']
  ),
  '2:4.3.7': entry(
    'Test Metrics',
    'residual risk, cumulative defects, test coverage, defect detection percentage',
    'Per ISO/IEC/IEEE 29119-1 §4.3.7, metrics should be selected with care so that information needed to control the processes is collected, and no measures are collected unnecessarily. Examples include residual risk and defect detection percentage.',
    ['§3.89 Test Coverage', '§3.87 Test Completion Report', '§3.126 Test Status Report']
  ),
  '3:3.86': entry(
    'Test Completion Process',
    'ensures useful test assets are made available, environments left satisfactory, results recorded',
    'Per ISO/IEC/IEEE 29119-1 §4.3.1.4, the test completion process generates a test completion report, cleans up the test environment, archives testware, and performs lessons learned activities after testing is complete.',
    ['§3.87 Test Completion Report', '§3.132 Testware', '§3.109 Test Management']
  ),
  '4:3.80': entry(
    'Structure-based Testing',
    "dynamic testing derived from examination of the test item's structure",
    'Structure-based techniques derive test cases from the internal structure of the test item. Per ISO/IEC/IEEE 29119-1 §4.4.4, they are used to achieve structural coverage criteria defined in the test strategy.',
    ['§3.13 Branch Testing', '§3.22 Control Flow', '§3.94 Test Design Technique']
  ),
};
