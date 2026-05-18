// Yebuer — the game mascot (like Duolingo owl but unique)
import { useState, useEffect } from 'react';

const YEBUER_MOODS = {
  happy: { face: '😊', body: '🟢', anim: 'yebuer-bounce' },
  excited: { face: '🤩', body: '🟢', anim: 'yebuer-jump' },
  sad: { face: '😢', body: '🔴', anim: 'yebuer-shake' },
  angry: { face: '😤', body: '🔴', anim: 'yebuer-shake' },
  thinking: { face: '🤔', body: '🟡', anim: 'yebuer-tilt' },
  neutral: { face: '😐', body: '🔵', anim: '' },
  wink: { face: '😉', body: '🟢', anim: 'yebuer-bounce' },
};

const CORNER_POSITIONS = [
  { bottom: '20px', right: '20px' },
  { bottom: '20px', left: '20px' },
  { top: '120px', right: '20px' },
  { top: '120px', left: '20px' },
];

const IDLE_QUOTES = [
  "Take your time, no pressure! ...okay maybe a little pressure 😅",
  "I believe in you! Mostly. 🤞",
  "Hmm, this is a tough one. Even I'm sweating!",
  "Remember: there are no wrong answers... just career-ending ones 😬",
  "Fun fact: I've seen 847 test managers cry. Don't be #848!",
  "ISO 29119 is my bedtime reading. I'm not weird, you're weird.",
];

const GOOD_REACTIONS = [
  "YESSS! That's what I'm talking about! 🎉",
  "Brilliant move! You're a natural crisis manager!",
  "Chef's kiss! 🤌 Perfect decision!",
  "I knew you had it in you! Gold star! ⭐",
  "If I had hands, I'd high-five you right now!",
  "Outstanding! The ISO committee would be proud!",
  "Wow, you're making this look EASY!",
];

const BAD_REACTIONS = [
  "Oh no... that's gonna leave a mark 😬",
  "Uhh... bold choice? Let's call it 'bold' 😅",
  "I'm not crying, YOU'RE crying! 😭",
  "The CTO just spit out their coffee...",
  "Well... at least we learned what NOT to do!",
  "That decision hurt MY metrics and I'm fictional!",
  "Pro tip: maybe don't do that again? Just saying 🙃",
];

const NEUTRAL_REACTIONS = [
  "Hmm, not bad but not great. You're the vanilla ice cream of crisis management 🍦",
  "It's fine... FINE. Everything is FINE. 🔥🐶🔥",
  "Could be worse! Could also be better though...",
  "Middle of the road! Safe but not spectacular.",
  "Acceptable. The review board will have... thoughts.",
];

export default function Yebuer({ mood = 'neutral', message = null, visible = true, questionIndex = 0 }) {
  const [showBubble, setShowBubble] = useState(!!message);
  const [currentMessage, setCurrentMessage] = useState(message);
  const [position, setPosition] = useState(CORNER_POSITIONS[0]);

  useEffect(() => {
    const pos = CORNER_POSITIONS[questionIndex % CORNER_POSITIONS.length];
    setPosition(pos);
  }, [questionIndex]);

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setShowBubble(true);
      const timer = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const moodData = YEBUER_MOODS[mood] || YEBUER_MOODS.neutral;

  if (!visible) return null;

  return (
    <div className={`yebuer-container ${moodData.anim}`} style={position}>
      {showBubble && currentMessage && (
        <div className="yebuer-bubble anim-scale-in">
          <p className="yebuer-bubble-text">{currentMessage}</p>
          <div className="yebuer-bubble-arrow" />
        </div>
      )}

      <div className={`yebuer-body ${mood === 'sad' || mood === 'angry' ? 'yebuer-sad' : ''} ${mood === 'excited' || mood === 'happy' ? 'yebuer-happy' : ''}`}>
        {/* Yebuer SVG Character */}
        <svg viewBox="0 0 120 140" className="yebuer-svg" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <ellipse cx="60" cy="90" rx="40" ry="45" fill="#4FC3F7" stroke="#0288D1" strokeWidth="2" />
          {/* Belly */}
          <ellipse cx="60" cy="100" rx="28" ry="30" fill="#B3E5FC" opacity="0.6" />
          {/* Head */}
          <circle cx="60" cy="45" r="30" fill="#4FC3F7" stroke="#0288D1" strokeWidth="2" />
          {/* Left eye */}
          <ellipse cx="48" cy="40" rx="8" ry="9" fill="white" />
          <circle cx="50" cy="40" r="5" fill="#1a1a2e" />
          <circle cx="52" cy="38" r="2" fill="white" />
          {/* Right eye */}
          <ellipse cx="72" cy="40" rx="8" ry="9" fill="white" />
          <circle cx="70" cy="40" r="5" fill="#1a1a2e" />
          <circle cx="72" cy="38" r="2" fill="white" />

          {/* Mouth - changes by mood */}
          {(mood === 'happy' || mood === 'excited' || mood === 'wink') && (
            <path d="M 45 55 Q 60 68 75 55" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
          {(mood === 'sad' || mood === 'angry') && (
            <path d="M 45 60 Q 60 50 75 60" stroke="#1a1a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
          {(mood === 'neutral' || mood === 'thinking') && (
            <line x1="47" y1="57" x2="73" y2="57" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Wink eye override */}
          {mood === 'wink' && (
            <line x1="65" y1="40" x2="78" y2="40" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Sad tears */}
          {mood === 'sad' && (
            <>
              <circle cx="45" cy="50" r="3" fill="#2196F3" opacity="0.7" className="tear-drop" />
              <circle cx="78" cy="50" r="3" fill="#2196F3" opacity="0.7" className="tear-drop-2" />
            </>
          )}

          {/* Angry eyebrows */}
          {mood === 'angry' && (
            <>
              <line x1="40" y1="30" x2="55" y2="33" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
              <line x1="80" y1="30" x2="65" y2="33" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Excited sparkles */}
          {mood === 'excited' && (
            <>
              <text x="15" y="25" fontSize="12" className="sparkle-1">✨</text>
              <text x="90" y="20" fontSize="12" className="sparkle-2">⭐</text>
              <text x="95" y="85" fontSize="10" className="sparkle-3">✨</text>
            </>
          )}

          {/* Left arm */}
          <ellipse cx="22" cy="85" rx="10" ry="14" fill="#4FC3F7" stroke="#0288D1" strokeWidth="1.5" />
          {/* Right arm */}
          <ellipse cx="98" cy="85" rx="10" ry="14" fill="#4FC3F7" stroke="#0288D1" strokeWidth="1.5" />

          {/* Crown/hat (small cute detail) */}
          <path d="M 42 18 L 48 8 L 54 15 L 60 5 L 66 15 L 72 8 L 78 18" fill="#FFD700" stroke="#FFA000" strokeWidth="1" />
          
          {/* Feet */}
          <ellipse cx="45" cy="132" rx="12" ry="6" fill="#0288D1" />
          <ellipse cx="75" cy="132" rx="12" ry="6" fill="#0288D1" />
        </svg>

        <div className="yebuer-name">YEBUER</div>
      </div>

      <style>{`
        .yebuer-container {
          position: fixed; z-index: 1000;
          display: flex; flex-direction: column; align-items: center;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
        }

        .yebuer-body {
          width: 80px; display: flex; flex-direction: column; align-items: center;
          filter: drop-shadow(0 4px 12px rgba(79, 195, 247, 0.4));
          transition: filter 0.3s;
        }
        .yebuer-happy { filter: drop-shadow(0 4px 16px rgba(76, 175, 80, 0.6)); }
        .yebuer-sad { filter: drop-shadow(0 4px 16px rgba(244, 67, 54, 0.5)); }

        .yebuer-svg { width: 80px; height: 93px; }

        .yebuer-name {
          font-size: 0.55rem; font-weight: 900; color: var(--accent-primary);
          letter-spacing: 0.15em; margin-top: 4px;
          text-shadow: 0 0 10px var(--accent-glow);
        }

        .yebuer-bubble {
          background: rgba(20, 30, 50, 0.95); backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border); border-radius: 16px;
          padding: 12px 16px; max-width: 220px; margin-bottom: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.6);
          pointer-events: auto;
        }
        .yebuer-bubble-text {
          font-size: 0.75rem; color: white; line-height: 1.5; font-weight: 600;
          margin: 0;
        }
        .yebuer-bubble-arrow {
          width: 0; height: 0; border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid rgba(20, 30, 50, 0.95);
          margin: 0 auto;
        }

        /* Animations */
        .yebuer-bounce { animation: yebuerBounce 2s ease-in-out infinite; }
        .yebuer-jump { animation: yebuerJump 0.6s ease-out; }
        .yebuer-shake { animation: yebuerShake 0.5s ease-in-out; }
        .yebuer-tilt { animation: yebuerTilt 3s ease-in-out infinite; }

        @keyframes yebuerBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes yebuerJump {
          0% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-25px) scale(1.1); }
          50% { transform: translateY(-30px) scale(1.05); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes yebuerShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes yebuerTilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }

        .tear-drop { animation: tearFall 1.5s ease-in infinite; }
        .tear-drop-2 { animation: tearFall 1.5s ease-in infinite 0.5s; }
        @keyframes tearFall {
          0% { opacity: 0.7; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(15px); }
        }

        .sparkle-1 { animation: sparkle 1s ease-in-out infinite; }
        .sparkle-2 { animation: sparkle 1s ease-in-out infinite 0.3s; }
        .sparkle-3 { animation: sparkle 1s ease-in-out infinite 0.6s; }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.5); }
        }
      `}</style>
    </div>
  );
}

export { GOOD_REACTIONS, BAD_REACTIONS, NEUTRAL_REACTIONS, IDLE_QUOTES };
