// Displays: 📘 ISO/IEC/IEEE 29119-[Part] §[Section]: [Title]
import { useState } from 'react';
import { QUESTION_BANK } from '../../data/iso29119QuestionBank.js';
import { ISO_REFERENCE_CONTENT } from '../../data/isoReferenceContent.js';

// Map ISO part numbers to human-readable names
const ISO_PARTS = {
  1: { name: 'Concepts & Definitions',    color: '#a78bfa' },
  2: { name: 'Test Processes',            color: '#60a5fa' },
  3: { name: 'Test Documentation',        color: '#34d399' },
  4: { name: 'Test Techniques',           color: '#fbbf24' },
  5: { name: 'Keyword-Driven Testing',    color: '#f87171' },
};

// ISO reference content — primary source: ISO_REFERENCE_CONTENT (29119-1:2022)
const ISO_REFERENCE = { ...ISO_REFERENCE_CONTENT };

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
