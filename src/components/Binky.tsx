import { useEffect, useState } from 'react';

type BinkyMood = 'happy' | 'wink' | 'excited' | 'business' | 'chill';

interface BinkyProps {
  size?: number;
  mood?: BinkyMood;
  className?: string;
  accessory?: 'piggy' | 'tie' | 'shield' | 'none';
}

export default function Binky({
  size = 180,
  mood = 'happy',
  className = '',
  accessory = 'none',
}: BinkyProps) {
  const [wiggling, setWiggling] = useState(false);

  useEffect(() => {
    setWiggling(true);
    const t = setTimeout(() => setWiggling(false), 600);
    return () => clearTimeout(t);
  }, [mood]);

  const eyes = () => {
    if (mood === 'wink') {
      return (
        <>
          <circle cx="88" cy="96" r="7" fill="#1E1633" />
          <path d="M116 92 q7 6 14 0" stroke="#1E1633" strokeWidth="4" strokeLinecap="round" fill="none" />
        </>
      );
    }
    if (mood === 'excited') {
      return (
        <>
          <circle cx="88" cy="94" r="9" fill="#1E1633" />
          <circle cx="121" cy="94" r="9" fill="#1E1633" />
          <circle cx="91" cy="91" r="3" fill="#FFFFFF" />
          <circle cx="124" cy="91" r="3" fill="#FFFFFF" />
        </>
      );
    }
    return (
      <>
        <circle cx="88" cy="96" r="8" fill="#1E1633" />
        <circle cx="121" cy="96" r="8" fill="#1E1633" />
        <circle cx="91" cy="93" r="2.5" fill="#FFFFFF" />
        <circle cx="124" cy="93" r="2.5" fill="#FFFFFF" />
      </>
    );
  };

  const mouth = () => {
    if (mood === 'excited') {
      return (
        <g>
          <ellipse cx="105" cy="118" rx="10" ry="8" fill="#E44A85" />
          <ellipse cx="105" cy="121" rx="6" ry="3.5" fill="#FF85B3" />
        </g>
      );
    }
    return (
      <path
        d="M97 116 q8 7 16 0"
        stroke="#1E1633"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    );
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${className} ${wiggling ? 'animate-wiggle' : ''} transition-transform duration-300 hover:scale-105 cursor-pointer`}
      onClick={() => {
        setWiggling(true);
        setTimeout(() => setWiggling(false), 600);
      }}
      role="img"
      aria-label="Binky si maskot babi BLINK"
    >
      <defs>
        <radialGradient id="binky-body" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#FFD3E4" />
          <stop offset="60%" stopColor="#FFB3D1" />
          <stop offset="100%" stopColor="#FF9DC5" />
        </radialGradient>
        <linearGradient id="binky-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF85B3" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F9679F" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="binky-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DCCEFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#AC8EFF" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="binky-tie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9B6BFF" />
          <stop offset="100%" stopColor="#7445E0" />
        </linearGradient>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="100" cy="176" rx="52" ry="10" fill="#9B6BFF" opacity="0.12" />

      {/* body */}
      <ellipse cx="100" cy="110" rx="64" ry="58" fill="url(#binky-body)" />
      <ellipse cx="100" cy="122" rx="56" ry="42" fill="url(#binky-shade)" />

      {/* ears */}
      <path d="M52 70 q-8 -22 10 -26 q14 -3 16 14" fill="#FF9DC5" />
      <path d="M148 70 q8 -22 -10 -26 q-14 -3 -16 14" fill="#FF9DC5" />
      <path d="M56 68 q-5 -15 8 -18 q9 -2 10 9" fill="#FFC9DD" />
      <path d="M144 68 q5 -15 -8 -18 q-9 -2 -10 9" fill="#FFC9DD" />

      {/* arms */}
      <ellipse cx="40" cy="120" rx="12" ry="20" fill="#FFB3D1" transform="rotate(18 40 120)" />
      <ellipse cx="160" cy="120" rx="12" ry="20" fill="#FFB3D1" transform="rotate(-18 160 120)" />

      {/* feet */}
      <ellipse cx="76" cy="166" rx="16" ry="9" fill="#FF9DC5" />
      <ellipse cx="124" cy="166" rx="16" ry="9" fill="#FF9DC5" />

      {/* coin slot / head detail */}
      {accessory === 'piggy' && (
        <rect x="86" y="52" width="30" height="5" rx="2.5" fill="#E9B84C" />
      )}

      {/* snout */}
      <ellipse cx="105" cy="108" rx="17" ry="13" fill="#FF9DC5" />
      <ellipse cx="99.5" cy="108" rx="3" ry="4.5" fill="#D9679B" />
      <ellipse cx="110.5" cy="108" rx="3" ry="4.5" fill="#D9679B" />

      {/* eyes */}
      {eyes()}

      {/* blush */}
      <ellipse cx="70" cy="116" rx="8" ry="5" fill="#FF85B3" opacity="0.5" />
      <ellipse cx="140" cy="112" rx="8" ry="5" fill="#FF85B3" opacity="0.5" />

      {/* mouth */}
      {mouth()}

      {/* glasses */}
      {(accessory === 'tie' || mood === 'business') && (
        <g stroke="#5C33B8" strokeWidth="2.5" fill="url(#binky-glass)">
          <circle cx="88" cy="96" r="13" fill="url(#binky-glass)" fillOpacity="0.35" />
          <circle cx="121" cy="96" r="13" fill="url(#binky-glass)" fillOpacity="0.35" />
          <path d="M101 96 h7" />
          <path d="M75 94 l-14 -6" />
          <path d="M134 94 l14 -6" />
        </g>
      )}

      {/* business tie */}
      {accessory === 'tie' && (
        <g>
          <path d="M100 134 l-7 9 7 20 7 -20 z" fill="url(#binky-tie)" />
          <path d="M93 133 h14 l-4 5 h-6 z" fill="#5C33B8" />
        </g>
      )}

      {/* scarf (default charm) */}
      {accessory === 'none' && mood !== 'business' && (
        <path
          d="M78 138 q22 12 44 0 q-4 10 -22 10 q-18 0 -22 -10"
          fill="#C4ADFF"
        />
      )}

      {/* shield for deposito */}
      {accessory === 'shield' && (
        <g transform="translate(148 40)">
          <path
            d="M18 0 l16 6 v14 q0 14 -16 20 q-16 -6 -16 -20 v-14 z"
            fill="#DCCEFF"
            stroke="#9B6BFF"
            strokeWidth="2.5"
          />
          <path d="M11 18 l5 5 10 -10" stroke="#7445E0" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}
