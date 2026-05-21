// Clickable glossary popups for ISO 29119 terminology
import { useState, useRef, useEffect } from 'react';

export const GLOSSARY = {
  'test basis': {
    term: 'Test Basis',
    definition: 'The body of knowledge used as the basis for test analysis and design. Examples include requirements specifications, design documents, user stories, and source code.',
    isoRef: 'ISO 29119-1 §4.47',
    example: 'A requirements document is used as a test basis to derive test cases.',
  },
  'test oracle': {
    term: 'Test Oracle',
    definition: 'A mechanism to determine whether the actual results of a test match the expected results. It can be a specification, another system, or human expertise.',
    isoRef: 'ISO 29119-1 §4.50',
    example: 'A reference database is used as a test oracle to verify calculation outputs.',
  },
  'test coverage': {
    term: 'Test Coverage',
    definition: 'The degree to which specified coverage items have been exercised by a test suite, expressed as a percentage.',
    isoRef: 'ISO 29119-4 §6.1',
    example: '85% branch coverage means 85% of code branches have been tested.',
  },
  'risk-based testing': {
    term: 'Risk-Based Testing',
    definition: 'A testing approach where test activities are prioritized based on a risk assessment of the software under test, focusing effort on highest-risk areas.',
    isoRef: 'ISO 29119-1 §5.4',
    example: 'Payment processing gets more tests than a rarely-used settings page.',
  },
  'test plan': {
    term: 'Test Plan',
    definition: 'A document that describes the scope, approach, resources, and schedule of intended test activities, identifying test items, features to be tested, and entry/exit criteria.',
    isoRef: 'ISO 29119-3 §8.2',
    example: 'A test plan defines that regression testing will take 2 days before each release.',
  },
  'defect density': {
    term: 'Defect Density',
    definition: 'The number of defects identified in a component or system divided by the size of that component or system (e.g., defects per 1000 lines of code).',
    isoRef: 'ISO 29119-1 §4.11',
    example: '5 defects per KLOC (thousand lines of code) is a common defect density metric.',
  },
  'test completion': {
    term: 'Test Completion',
    definition: 'The process of consolidating and archiving test artifacts and evaluating the testing process, producing a test completion report.',
    isoRef: 'ISO 29119-2 §6.5',
    example: 'A test completion report summarizes passed/failed tests and outstanding defects.',
  },
  'equivalence partitioning': {
    term: 'Equivalence Partitioning',
    definition: 'A black-box test technique where test conditions are divided into groups/partitions that can be considered equivalent, reducing the number of test cases needed.',
    isoRef: 'ISO 29119-4 §6.3',
    example: 'For age input, valid partition: 0–120; invalid partition: negative or >120.',
  },
  'boundary value analysis': {
    term: 'Boundary Value Analysis',
    definition: 'A black-box test technique that focuses on the boundaries of equivalence partitions, as errors tend to cluster near boundary conditions.',
    isoRef: 'ISO 29119-4 §6.4',
    example: 'Testing age=0, age=1, age=119, age=120 for a 0–120 valid range.',
  },
  'test harness': {
    term: 'Test Harness',
    definition: 'A set of software and test data configured for testing a program under various conditions, including monitoring output against expected outputs.',
    isoRef: 'ISO 29119-1 §4.49',
    example: 'A mock server and stub database form a test harness for integration testing.',
  },
  'regression testing': {
    term: 'Regression Testing',
    definition: 'Testing of a previously tested program after modification to ensure that defects have not been introduced or uncovered due to changes.',
    isoRef: 'ISO 29119-4 §6.1',
    example: 'Running all existing tests after a bug fix to ensure nothing new broke.',
  },
  'entry criteria': {
    term: 'Entry Criteria',
    definition: 'The set of conditions that must be met before a defined activity (such as a test phase) can begin.',
    isoRef: 'ISO 29119-2 §6.1',
    example: 'Entry criteria for system testing: all unit tests pass, code review complete.',
  },
  'exit criteria': {
    term: 'Exit Criteria',
    definition: 'The set of conditions that must be met for a defined activity (such as a test phase) to be considered complete.',
    isoRef: 'ISO 29119-2 §6.5',
    example: 'Exit criteria: 95% test cases pass, no critical open defects.',
  },
  'test strategy': {
    term: 'Test Strategy',
    definition: 'A high-level description of the test levels to be performed and the testing within those levels, defining the overall approach to testing.',
    isoRef: 'ISO 29119-2 §6.1',
    example: 'Strategy: risk-based approach, with exploratory testing for UX and automation for regression.',
  },
};

// Auto-highlight glossary terms in a string of text
export function GlossaryText({ text }) {
  if (!text) return null;
  const terms = Object.keys(GLOSSARY);
  const regex = new RegExp(`\\b(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');

  const parts = [];
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(<GlossaryTerm key={match.index} term={match[0]} />);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export default function GlossaryTerm({ term }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const key = term.toLowerCase();
  const entry = GLOSSARY[key] || Object.values(GLOSSARY).find(e => e.term.toLowerCase() === key);

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!entry) return <span>{term}</span>;

  return (
    <span className="glossary-wrap" ref={ref}>
      <button className="glossary-term" onClick={() => setOpen(o => !o)}>
        {term}<span className="glossary-indicator">?</span>
      </button>
      {open && (
        <div className="glossary-popup anim-scale-in">
          <div className="glossary-header">
            <span className="glossary-tag">📚 GLOSSARY</span>
            <button className="glossary-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <h4 className="glossary-title">{entry.term}</h4>
          <p className="glossary-def">{entry.definition}</p>
          {entry.example && (
            <div className="glossary-example">
              <span className="glossary-example-label">EXAMPLE</span>
              <p className="glossary-example-text">{entry.example}</p>
            </div>
          )}
          <div className="glossary-iso-ref">{entry.isoRef}</div>
        </div>
      )}
      <style>{`
        .glossary-wrap { position: relative; display: inline; }
        .glossary-term {
          background: none; border: none; padding: 0;
          color: #fbbf24; text-decoration: underline dotted;
          cursor: pointer; font: inherit; font-weight: 700;
        }
        .glossary-term:hover { color: #fde68a; }
        .glossary-indicator {
          display: inline-flex; align-items: center; justify-content: center;
          width: 14px; height: 14px; background: #fbbf24; color: #000;
          border-radius: 50%; font-size: 9px; font-weight: 900;
          margin-left: 2px; vertical-align: super;
        }
        .glossary-popup {
          position: absolute; bottom: calc(100% + 8px); left: 0; z-index: 9999;
          background: rgba(10,15,30,0.98); border: 1px solid #fbbf24;
          border-radius: 12px; padding: 14px 16px; min-width: 280px; max-width: 340px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.8), 0 0 20px rgba(251,191,36,0.2);
          display: flex; flex-direction: column; gap: 10px;
        }
        .glossary-header { display: flex; justify-content: space-between; align-items: center; }
        .glossary-tag { font-size: 0.6rem; font-weight: 900; color: #fbbf24; letter-spacing: 0.1em; }
        .glossary-close {
          background: none; border: none; color: var(--text-muted); cursor: pointer;
          font-size: 0.75rem; padding: 2px 6px; border-radius: 4px;
        }
        .glossary-close:hover { color: white; background: rgba(255,255,255,0.1); }
        .glossary-title { font-size: 1rem; font-weight: 900; color: white; }
        .glossary-def { font-size: 0.78rem; color: var(--text-secondary); line-height: 1.6; }
        .glossary-example {
          background: rgba(255,255,255,0.04); border-radius: 8px;
          padding: 8px 12px; border-left: 2px solid #fbbf24;
        }
        .glossary-example-label { font-size: 0.6rem; font-weight: 900; color: #fbbf24; letter-spacing: 0.1em; display: block; margin-bottom: 4px; }
        .glossary-example-text { font-size: 0.72rem; color: var(--text-muted); line-height: 1.5; }
        .glossary-iso-ref { font-size: 0.65rem; color: var(--text-muted); font-family: var(--mono); padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.06); }
      `}</style>
    </span>
  );
}
