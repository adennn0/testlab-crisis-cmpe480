// Animated SVG mascot — bounce, blink, wiggle

const SMILE_PATHS = {
  idle: 'M 30 52 Q 40 60 50 52',
  happy: 'M 28 51 Q 40 62 52 51',
  worried: 'M 30 56 Q 40 50 50 56',
  panic: 'M 28 58 Q 40 48 52 58',
};

export function timerMoodFromTimeLeft(timeLeft) {
  if (timeLeft == null) return 'idle';
  if (timeLeft < 5) return 'panic';
  if (timeLeft < 15) return 'worried';
  if (timeLeft > 30) return 'happy';
  return 'idle';
}

export function moodToDisplayMood(mood) {
  if (mood === 'happy' || mood === 'excited' || mood === 'wink') return 'happy';
  if (mood === 'sad' || mood === 'angry') return 'worried';
  if (mood === 'thinking' || mood === 'neutral') return 'idle';
  return mood === 'worried' || mood === 'panic' ? mood : 'idle';
}

export default function YebuerMascot({ mood = 'idle' }) {
  const displayMood = SMILE_PATHS[mood] ? mood : 'idle';
  const smilePath = SMILE_PATHS[displayMood];
  const eyeR = displayMood === 'panic' ? 9 : 8;
  const pupilR = displayMood === 'panic' ? 5 : 4;

  return (
    <svg
      width="80"
      height="100"
      viewBox="0 0 80 100"
      xmlns="http://www.w3.org/2000/svg"
      className="yebuer-mascot-svg"
      aria-hidden="true"
    >
      <style>{`
        @keyframes yebuer-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes yebuer-blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes yebuer-wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .mascot-body { animation: yebuer-bounce 2s ease-in-out infinite; }
        .mascot-eye { animation: yebuer-blink 4s ease-in-out infinite; transform-origin: center; }
        .mascot-antenna { animation: yebuer-wiggle 1.5s ease-in-out infinite; transform-origin: bottom center; }
      `}</style>

      <g className="mascot-antenna">
        <line x1="40" y1="8" x2="40" y2="20" stroke="#63B3ED" strokeWidth="3" strokeLinecap="round" />
        <circle cx="40" cy="6" r="4" fill="#63B3ED" />
      </g>

      <g className="mascot-body">
        <rect x="15" y="20" width="50" height="48" rx="16" ry="16" fill="#2B6CB0" />
        <rect x="20" y="24" width="40" height="20" rx="10" fill="#3182CE" opacity="0.6" />

        <g className="mascot-eye">
          <circle cx="29" cy="38" r={eyeR} fill="white" />
          <circle cx="29" cy="39" r={pupilR} fill="#1A202C" />
          <circle cx="31" cy="37" r="1.5" fill="white" />
        </g>
        <g className="mascot-eye" style={{ animationDelay: '0.2s' }}>
          <circle cx="51" cy="38" r={eyeR} fill="white" />
          <circle cx="51" cy="39" r={pupilR} fill="#1A202C" />
          <circle cx="53" cy="37" r="1.5" fill="white" />
        </g>

        <path d={smilePath} stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        <ellipse cx="22" cy="48" rx="5" ry="3" fill="#FC8181" opacity="0.6" />
        <ellipse cx="58" cy="48" rx="5" ry="3" fill="#FC8181" opacity="0.6" />

        <rect x="28" y="54" width="24" height="10" rx="4" fill="#1A365D" />
        <circle cx="35" cy="59" r="2" fill="#63B3ED" />
        <circle cx="40" cy="59" r="2" fill="#68D391" />
        <circle cx="45" cy="59" r="2" fill="#FC8181" />

        <rect x="5" y="30" width="12" height="28" rx="6" fill="#2B6CB0" />
        <rect x="63" y="30" width="12" height="28" rx="6" fill="#2B6CB0" />
        <circle cx="11" cy="60" r="6" fill="#3182CE" />
        <circle cx="69" cy="60" r="6" fill="#3182CE" />

        <rect x="24" y="66" width="13" height="20" rx="6" fill="#2B6CB0" />
        <rect x="43" y="66" width="13" height="20" rx="6" fill="#2B6CB0" />
        <ellipse cx="30" cy="86" rx="9" ry="6" fill="#1A365D" />
        <ellipse cx="50" cy="86" rx="9" ry="6" fill="#1A365D" />
      </g>
    </svg>
  );
}
