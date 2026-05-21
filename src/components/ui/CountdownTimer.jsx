// Visual countdown timer ring component
import React from 'react';

const SIZE = 56;
const STROKE = 4;
const R = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function CountdownTimer({ timeLeft, progress, urgency, isRunning }) {
  const offset = CIRCUMFERENCE * (1 - progress / 100);

  const colors = {
    safe:     '#30d158',
    warning:  '#ff9f0a',
    critical: '#ff2d55',
  };
  const color = colors[urgency] || colors.safe;
  const isPanic = urgency === 'critical' && isRunning;

  return (
    <div className={`cdt-wrap ${isPanic ? 'cdt-panic' : ''}`}>
      <svg width={SIZE} height={SIZE} className="cdt-svg">
        {/* Track */}
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none" stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
        />
        {/* Progress arc */}
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          style={{
            transition: 'stroke-dashoffset 1s linear, stroke 0.3s',
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>

      {/* Center number */}
      <div className="cdt-number" style={{ color }}>
        {timeLeft}
      </div>

      {isPanic && <div className="cdt-pulse-ring" style={{ borderColor: color }} />}

      <style>{`
        .cdt-wrap {
          position: relative; width: ${SIZE}px; height: ${SIZE}px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cdt-svg { position: absolute; inset: 0; }
        .cdt-number {
          font-family: var(--mono); font-size: 0.95rem; font-weight: 900;
          line-height: 1; z-index: 1; transition: color 0.3s;
        }
        .cdt-panic .cdt-number {
          animation: cdt-flash 0.5s ease-in-out infinite;
        }
        @keyframes cdt-flash {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .cdt-pulse-ring {
          position: absolute; inset: -4px;
          border-radius: 50%; border: 2px solid;
          opacity: 0; animation: cdt-ring-pulse 1s ease-out infinite;
        }
        @keyframes cdt-ring-pulse {
          0%   { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
