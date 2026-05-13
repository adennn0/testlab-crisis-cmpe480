// FR-07: Score display with live counter and grade badge

import { useCountAnimation } from '../../hooks/useMetricAnimation.js';
import { getGrade, getGradeColor } from '../../utils/scoring.js';

export default function ScoreDisplay({ score, compact = false }) {
  const animated = useCountAnimation(score, 800);
  const grade = getGrade(score);
  const gradeColor = getGradeColor(grade);

  return (
    <div className={`score-display ${compact ? 'score-display--compact' : ''}`}>
      <div className="score-grade" style={{ color: gradeColor, borderColor: gradeColor }}>
        {grade}
      </div>
      <div className="score-value-wrap">
        <span className="score-label">SCORE</span>
        <span className="score-value font-mono">{animated.toLocaleString()}</span>
      </div>

      <style>{`
        .score-display { display: flex; align-items: center; gap: 10px; }
        .score-grade {
          width: 38px; height: 38px; border-radius: 8px; border: 2px solid;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Orbitron', sans-serif; font-size: 1rem; font-weight: 900;
          transition: all var(--transition-normal);
          box-shadow: 0 0 12px currentColor;
        }
        .score-display--compact .score-grade { width: 30px; height: 30px; font-size: 0.8125rem; }
        .score-value-wrap { display: flex; flex-direction: column; }
        .score-label {
          font-size: 0.6rem; font-weight: 800; letter-spacing: 0.12em;
          color: var(--text-muted); line-height: 1;
        }
        .score-value {
          font-size: 1.125rem; font-weight: 700; color: var(--text-primary);
          transition: all 0.1s; line-height: 1.2;
        }
        .score-display--compact .score-value { font-size: 0.9375rem; }
      `}</style>
    </div>
  );
}
