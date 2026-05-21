// Displays: 📘 ISO/IEC/IEEE 29119-[Part] §[Section]: [Title]
import { useState } from 'react';
import { QUESTION_BANK } from '../../data/iso29119QuestionBank.js';

// Map ISO part numbers to human-readable names
const ISO_PARTS = {
  1: { name: 'Concepts & Definitions',    color: '#a78bfa' },
  2: { name: 'Test Processes',            color: '#60a5fa' },
  3: { name: 'Test Documentation',        color: '#34d399' },
  4: { name: 'Test Techniques',           color: '#fbbf24' },
  5: { name: 'Keyword-Driven Testing',    color: '#f87171' },
};

// ISO reference content used in the expanded learning panel.
// Keys are "<part>:<section>".
const ISO_REFERENCE = {
  '1:3.131': {
    title: 'Testing',
    definition: 'set of activities conducted to facilitate discovery and evaluation of properties of test items',
    why: 'Testing is the primary mechanism for quality control in software development — it generates evidence that a system meets requirements and stakeholder needs.',
    related: [
      { ref: '§3.85', title: 'Test Case' },
      { ref: '§3.114', title: 'Test Objective' },
      { ref: '§4.1.8', title: 'Purpose of Testing' },
    ],
  },
  '1:3.85': {
    title: 'Test Case',
    definition: 'set of preconditions, inputs and expected results, developed to drive the execution of a test item to meet test objectives',
    why: 'Test cases are the atomic unit of testing — without well-defined preconditions and expected results, you cannot objectively determine pass or fail.',
    related: [
      { ref: '§3.84', title: 'Test Basis' },
      { ref: '§3.115', title: 'Test Oracle' },
      { ref: '§3.94', title: 'Test Design Technique' },
    ],
  },
  '1:3.84': {
    title: 'Test Basis',
    definition: 'information used as the basis for designing and implementing test cases',
    why: 'Poor or missing test basis means test cases cannot be completed — testers need clear requirements, specs, or documented understanding of expected behavior.',
    related: [
      { ref: '§3.85', title: 'Test Case' },
      { ref: '§3.115', title: 'Test Oracle' },
      { ref: '§4.1.9', title: 'Test Basis' },
    ],
  },
  '1:3.115': {
    title: 'Test Oracle',
    definition: 'source of information for determining whether a test has passed or failed',
    why: 'Without an oracle, testers cannot objectively judge results — this is a fundamental challenge especially for AI-based systems.',
    related: [
      { ref: '§3.116', title: 'Test Oracle Problem' },
      { ref: '§3.35', title: 'Expected Result' },
      { ref: '§3.5', title: 'Actual Result' },
    ],
  },
  '1:3.116': {
    title: 'Test Oracle Problem',
    definition: 'challenge of determining whether a test has passed or failed for a given set of test inputs and state',
    why: 'Complex systems (especially AI) make it impossible for humans to know the correct output — requiring alternative oracle strategies like metamorphic testing.',
    related: [
      { ref: '§3.115', title: 'Test Oracle' },
      { ref: '§3.49', title: 'Metamorphic Testing' },
      { ref: '§3.52', title: 'Non-deterministic System' },
    ],
  },
  '2:3.117': {
    title: 'Test Plan',
    definition: 'detailed description of test objectives to be achieved and the means and schedule for achieving them, organized to coordinate testing activities for some test item or set of test items',
    why: 'The test plan is the master reference document — it drives all testing decisions including strategy, staffing, scheduling, and completion criteria.',
    related: [
      { ref: '§3.127', title: 'Test Strategy' },
      { ref: '§3.113', title: 'Test Monitoring and Control Process' },
      { ref: '§3.86', title: 'Test Completion Process' },
    ],
  },
  '2:3.127': {
    title: 'Test Strategy',
    definition: 'part of the test plan that describes the approach to testing for a specific project, test level or test type',
    why: 'Strategy defines HOW testing is done — selecting test levels, types, techniques, and criteria that address the identified risks.',
    related: [
      { ref: '§3.117', title: 'Test Plan' },
      { ref: '§4.2.2', title: 'Risk-based Testing' },
      { ref: '§3.94', title: 'Test Design Technique' },
    ],
  },
  '1:3.69': {
    title: 'Risk-based Testing',
    definition: 'testing in which the management, selection, prioritization, and use of testing activities and resources are consciously based on corresponding types and levels of analysed risk',
    why: 'Since exhaustive testing is impossible, risk-based testing ensures effort is directed toward the areas most likely to cause significant harm if they fail.',
    related: [
      { ref: '§4.2.2', title: 'Risks and Risk Management' },
      { ref: '§3.61', title: 'Product Risk' },
      { ref: '§3.62', title: 'Project Risk' },
    ],
  },
  '1:3.64': {
    title: 'Regression Testing',
    definition: 'testing performed following modifications to a test item or to its operational environment, to identify whether failures in unmodified parts of the test item occur',
    why: 'Every code change risks breaking existing functionality — regression testing is the safety net that catches unintended side effects.',
    related: [
      { ref: '§3.68', title: 'Retesting' },
      { ref: '§4.4.6', title: 'Retesting and Regression Testing' },
      { ref: '§4.4.7', title: 'Automated Testing' },
    ],
  },
  '1:3.68': {
    title: 'Retesting',
    definition: 'testing performed to check that modifications made to correct a fault have successfully removed the fault',
    why: 'Retesting confirms the fix actually worked — without it, you cannot close a defect with confidence.',
    related: [
      { ref: '§3.64', title: 'Regression Testing' },
      { ref: '§3.39', title: 'Incident' },
      { ref: '§3.40', title: 'Incident Report' },
    ],
  },
  '1:3.78': {
    title: 'Static Testing',
    definition: 'testing in which a test item is examined against a set of quality or other criteria without the test item being executed',
    why: 'Static testing (reviews, static analysis) catches defects BEFORE execution is possible — often cheaper and earlier than dynamic testing.',
    related: [
      { ref: '§3.29', title: 'Dynamic Testing' },
      { ref: '§4.1.5', title: 'Static and Dynamic Testing' },
      { ref: '§4.2.4.6', title: 'Static Testing' },
    ],
  },
  '1:3.29': {
    title: 'Dynamic Testing',
    definition: 'testing in which a test item is evaluated by executing it',
    why: 'Dynamic testing verifies actual runtime behavior — it cannot be replaced by static analysis alone for confirming real execution outcomes.',
    related: [
      { ref: '§3.78', title: 'Static Testing' },
      { ref: '§3.99', title: 'Test Execution' },
      { ref: '§3.102', title: 'Test Execution Process' },
    ],
  },
  '4:3.12': {
    title: 'Boundary Value Analysis',
    definition: 'specification-based test design technique based on exercising the boundaries of equivalence partitions',
    why: 'Defects are disproportionately found at the edges of input ranges — BVA targets these high-risk boundary values systematically.',
    related: [
      { ref: '§3.31', title: 'Equivalence Partitioning' },
      { ref: '§3.94', title: 'Test Design Technique' },
      { ref: '§3.90', title: 'Test Coverage Item' },
    ],
  },
  '4:3.31': {
    title: 'Equivalence Partitioning',
    definition: 'test design technique in which test cases are designed to exercise equivalence partitions by using one or more representative members of each partition',
    why: 'Instead of testing every possible input, EP reduces the test set to representative values from each class — maintaining coverage while reducing effort.',
    related: [
      { ref: '§3.12', title: 'Boundary Value Analysis' },
      { ref: '§3.30', title: 'Equivalence Partition' },
      { ref: '§3.89', title: 'Test Coverage' },
    ],
  },
  '4:3.74': {
    title: 'Security Testing',
    definition: 'test type conducted to evaluate the degree to which a test item, and associated data and information, are protected so that unauthorized persons or systems cannot use, read, or modify them, and authorized persons or systems are not denied access',
    why: 'Security failures can expose sensitive data or compromise entire systems — security testing is essential for any externally accessible application.',
    related: [
      { ref: '§3.130', title: 'Test Type' },
      { ref: '§3.79', title: 'Stress Testing' },
      { ref: '§4.4.5', title: 'Experience-based Testing' },
    ],
  },
  '4:3.37': {
    title: 'Exploratory Testing',
    definition: 'experience-based testing in which the tester spontaneously designs and executes tests based on the tester\'s existing relevant knowledge, prior exploration of the test item, and heuristic rules of thumb regarding common software behaviours and types of failure',
    why: 'Scripted tests can only find known problem types — exploratory testing discovers unexpected behaviors that formal test cases would never reach.',
    related: [
      { ref: '§3.36', title: 'Experience-based Testing' },
      { ref: '§3.73', title: 'Scripted Testing' },
      { ref: '§4.4.3', title: 'Scripted and Exploratory Testing' },
    ],
  },
  '3:3.94': {
    title: 'Test Design Technique',
    definition: 'procedure used to create or select a test model, identify test coverage items, and derive corresponding test cases',
    why: 'Test design techniques provide systematic, repeatable methods for generating effective test cases — reducing reliance on individual tester intuition.',
    related: [
      { ref: '§3.111', title: 'Test Model' },
      { ref: '§3.90', title: 'Test Coverage Item' },
      { ref: '§3.85', title: 'Test Case' },
    ],
  },
  '3:3.95': {
    title: 'Test Environment',
    definition: 'environment containing facilities, hardware, software, firmware, procedures, needed to conduct a test',
    why: 'An unrepresentative test environment produces misleading results — the closer to production, the more trustworthy the test outcomes.',
    related: [
      { ref: '§3.98', title: 'Test Environment Requirements' },
      { ref: '§3.97', title: 'Test Environment Readiness Report' },
      { ref: '§3.96', title: 'Test Environment and Data Management Process' },
    ],
  },
  '1:4.1.11': {
    title: 'Test Independence',
    definition: 'degree to which those performing testing have separate responsibilities from those developing the test item',
    why: 'Developers testing their own code suffer from confirmation bias — independent testers are more likely to challenge assumptions and find real defects.',
    related: [
      { ref: '§3.106', title: 'Test Independence' },
      { ref: '§4.1.3', title: 'Verification and Validation' },
      { ref: '§3.69', title: 'Risk-based Testing' },
    ],
  },
};

const ISO_REFERENCE_FALLBACK = (() => {
  const map = {};
  for (const q of QUESTION_BANK) {
    const key = `${q.part}:${q.section}`;
    if (!map[key]) {
      map[key] = {
        title: q.title,
        definition: q.definition,
      };
    }
  }
  return map;
})();

// Parse isoRef like "ISO/IEC/IEEE 29119-4 §3.12: Boundary Value Analysis"
function parseISORef(isoRef) {
  if (!isoRef) return null;
  const partMatch = isoRef.match(/29119-(\d)/);
  const sectionMatch = isoRef.match(/§\s*([\d.]+)/);
  const titleMatch = isoRef.match(/:\s*(.+)$/) || isoRef.match(/—\s*(.+)$/);
  return {
    part: partMatch ? parseInt(partMatch[1]) : null,
    section: sectionMatch ? sectionMatch[1] : null,
    title: titleMatch ? titleMatch[1].trim() : null,
  };
}

export default function ISOBadge({ isoRef, compact = false }) {
  const [expanded, setExpanded] = useState(false);

  if (!isoRef) return null;
  const parsed = parseISORef(isoRef);
  if (!parsed?.part) return null;

  const partInfo = ISO_PARTS[parsed.part] || { name: 'Unknown', color: '#64748b' };
  const color = partInfo.color;
  const refKey = parsed.section ? `${parsed.part}:${parsed.section}` : null;
  const refData = refKey ? (ISO_REFERENCE[refKey] || ISO_REFERENCE_FALLBACK[refKey]) : null;
  const displayTitle = refData?.title || parsed.title;

  return (
    <div className={`iso-badge-wrap ${compact ? 'iso-compact' : ''}`}>
      <button
        className="iso-badge"
        style={{ '--iso-color': color }}
        onClick={() => setExpanded(e => !e)}
        title="Click to learn more about this standard"
      >
        <span className="iso-book">📘</span>
        <span className="iso-text">
          <span className="iso-ref">ISO/IEC/IEEE 29119-{parsed.part}</span>
          {parsed.section && <span className="iso-section"> §{parsed.section}</span>}
          {parsed.title && !compact && <span className="iso-title">: {parsed.title}</span>}
        </span>
        <span className="iso-expand-icon">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="iso-detail-panel anim-scale-in">
          <div className="iso-detail-top">
            <div className="iso-detail-top-ref font-mono">📘 ISO/IEC/IEEE 29119-{parsed.part}{parsed.section ? ` §${parsed.section}` : ''}</div>
            {displayTitle && <div className="iso-detail-top-title">{displayTitle}</div>}
          </div>

          <div className="iso-detail-grid">
            <div className="iso-detail-row">
              <span className="iso-detail-label">PART</span>
              <span className="iso-detail-val">Part {parsed.part} — {partInfo.name}</span>
            </div>
            {parsed.section && (
              <div className="iso-detail-row">
                <span className="iso-detail-label">SECTION</span>
                <span className="iso-detail-val font-mono">§{parsed.section}</span>
              </div>
            )}
            {displayTitle && (
              <div className="iso-detail-row">
                <span className="iso-detail-label">TITLE</span>
                <span className="iso-detail-val">{displayTitle}</span>
              </div>
            )}
          </div>

          <div className="iso-block">
            <div className="iso-block-title">DEFINITION</div>
            <div className="iso-block-body">
              {refData?.definition ? (
                <span className="iso-quote">“{refData.definition}”</span>
              ) : (
                <span className="iso-missing">Definition not available for this section in the current knowledge base.</span>
              )}
            </div>
          </div>

          <div className="iso-block">
            <div className="iso-block-title">WHY IT MATTERS IN PRACTICE</div>
            <div className="iso-block-body">
              {refData?.why ? (
                <span>{refData.why}</span>
              ) : (
                <span className="iso-missing">—</span>
              )}
            </div>
          </div>

          <div className="iso-block">
            <div className="iso-block-title">RELATED SECTIONS</div>
            <div className="iso-related">
              {(refData?.related || []).length > 0 ? (
                refData.related.map((r) => (
                  <button key={r.ref} type="button" className="iso-chip" title="Related section (not linked yet)">
                    <span className="iso-chip-ref font-mono">{r.ref}</span>
                    <span className="iso-chip-title">{r.title}</span>
                  </button>
                ))
              ) : (
                <span className="iso-missing">—</span>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .iso-badge-wrap { display: flex; flex-direction: column; gap: 8px; }

        .iso-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.03); border: 1px solid var(--iso-color, #60a5fa);
          border-left: 3px solid var(--iso-color, #60a5fa);
          border-radius: 8px; padding: 8px 14px; cursor: pointer;
          transition: all 0.2s; text-align: left; width: 100%;
          font-family: inherit;
        }
        .iso-badge:hover {
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 20px color-mix(in srgb, var(--iso-color) 25%, transparent);
        }
        .iso-compact .iso-badge { padding: 5px 10px; }

        .iso-book { font-size: 0.9rem; }
        .iso-text { flex: 1; display: flex; flex-wrap: wrap; align-items: center; gap: 2px; font-size: 0.75rem; }
        .iso-ref { font-weight: 900; color: var(--iso-color, #60a5fa); font-family: var(--mono); }
        .iso-section { font-weight: 700; color: var(--iso-color, #60a5fa); font-family: var(--mono); opacity: 0.8; }
        .iso-title { color: var(--text-muted); font-weight: 600; }
        .iso-expand-icon { font-size: 0.55rem; color: var(--text-muted); margin-left: auto; }

        .iso-detail-panel {
          background: rgba(10,15,30,0.9); border: 1px solid var(--iso-color, #60a5fa);
          border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 10px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
          max-height: 420px;
          overflow-y: auto;
        }
        .iso-detail-top-ref {
          font-size: 0.7rem;
          font-weight: 900;
          color: var(--iso-color, #60a5fa);
          letter-spacing: 0.08em;
        }
        .iso-detail-top-title {
          font-size: 0.9rem;
          font-weight: 900;
          color: white;
        }
        .iso-detail-top { display: flex; flex-direction: column; gap: 4px; }
        .iso-detail-grid { display: flex; flex-direction: column; gap: 8px; padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .iso-detail-row { display: flex; align-items: baseline; gap: 10px; }
        .iso-detail-label { font-size: 0.6rem; font-weight: 900; color: var(--text-muted); letter-spacing: 0.1em; min-width: 60px; }
        .iso-detail-val { font-size: 0.8rem; color: var(--text-secondary); }

        .iso-block { display: flex; flex-direction: column; gap: 6px; }
        .iso-block-title { font-size: 0.6rem; font-weight: 900; color: var(--text-muted); letter-spacing: 0.14em; }
        .iso-block-body { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.65; }
        .iso-quote { color: white; font-weight: 700; }
        .iso-missing { color: var(--text-muted); }

        .iso-related { display: flex; flex-wrap: wrap; gap: 8px; }
        .iso-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 10px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.03);
          color: white;
          cursor: pointer;
          font-family: inherit;
        }
        .iso-chip:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.16); }
        .iso-chip-ref { font-size: 0.68rem; font-weight: 900; color: var(--iso-color, #60a5fa); }
        .iso-chip-title { font-size: 0.68rem; font-weight: 800; color: var(--text-secondary); }
      `}</style>
    </div>
  );
}
