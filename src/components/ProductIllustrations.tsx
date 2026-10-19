import React from 'react';

interface IllustrationProps {
  type: 'nova14' | 'nova15' | 'note11' | 'pulse' | 'keyd' | 'cube' | 'dot' | 'charger';
  className?: string;
  uniqueId?: string;
}

export const ProductIllustration: React.FC<IllustrationProps> = ({
  type,
  className = "w-full h-full max-h-[220px]",
  uniqueId = "prod"
}) => {
  const uid = uniqueId + '-' + type;

  const renderDefs = (c1: string, c2: string) => (
    <defs>
      <linearGradient id={`sc-${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={c1} />
        <stop offset="100%" stopColor={c2} />
      </linearGradient>
      <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#464C5E" />
        <stop offset="100%" stopColor="#1B1E2B" />
      </linearGradient>
      <linearGradient id={`base-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EFF1F7" />
        <stop offset="100%" stopColor="#B6BCCB" />
      </linearGradient>
    </defs>
  );

  switch (type) {
    case 'nova14':
      return (
        <svg className={className} viewBox="0 0 540 320" xmlns="http://www.w3.org/2000/svg">
          {renderDefs("#6F5CFF", "#FF8A4C")}
          <g transform="translate(45, 15)">
            <rect x="40" y="10" width="370" height="236" rx="16" fill={`url(#body-${uid})`} />
            <rect x="42" y="12" width="366" height="232" rx="14" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <rect x="52" y="22" width="346" height="212" rx="8" fill={`url(#sc-${uid})`} />
            <ellipse cx="160" cy="80" rx="130" ry="60" fill="#ffffff" opacity="0.12" />
            <circle cx="225" cy="16" r="2.2" fill="#0B0D14" />
            <path d="M0 252 h450 l-18 28 a12 12 0 0 1 -10 6 h-404 a12 12 0 0 1 -10 -6 z" fill={`url(#base-${uid})`} />
            <path d="M0 252 h450" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <rect x="180" y="252" width="90" height="6" rx="3" fill="#8F96A8" />
          </g>
        </svg>
      );

    case 'nova15':
      return (
        <svg className={className} viewBox="0 0 540 320" xmlns="http://www.w3.org/2000/svg">
          {renderDefs("#1FA2FF", "#6F5CFF")}
          <g transform="translate(45, 15)">
            <rect x="40" y="10" width="370" height="236" rx="16" fill={`url(#body-${uid})`} />
            <rect x="42" y="12" width="366" height="232" rx="14" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <rect x="52" y="22" width="346" height="212" rx="8" fill={`url(#sc-${uid})`} />
            <ellipse cx="160" cy="80" rx="130" ry="60" fill="#ffffff" opacity="0.12" />
            <circle cx="225" cy="16" r="2.2" fill="#0B0D14" />
            <path d="M0 252 h450 l-18 28 a12 12 0 0 1 -10 6 h-404 a12 12 0 0 1 -10 -6 z" fill={`url(#base-${uid})`} />
            <path d="M0 252 h450" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <rect x="180" y="252" width="90" height="6" rx="3" fill="#8F96A8" />
          </g>
        </svg>
      );

    case 'note11':
      return (
        <svg className={className} viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
          {renderDefs("#FF8A4C", "#FF4D8D")}
          <rect x="75" y="12" width="240" height="194" rx="20" fill={`url(#body-${uid})`} />
          <rect x="84" y="21" width="222" height="176" rx="12" fill={`url(#sc-${uid})`} />
          <ellipse cx="160" cy="70" rx="90" ry="40" fill="#fff" opacity="0.12" />
          <rect x="332" y="44" width="10" height="136" rx="5" fill={`url(#base-${uid})`} />
          <circle cx="195" cy="16" r="2" fill="#0B0D14" />
        </svg>
      );

    case 'pulse':
      return (
        <svg className={className} viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
          {renderDefs("#6F5CFF", "#FFFFFF")}
          <g transform="translate(15, 0)">
            <ellipse cx="145" cy="74" rx="22" ry="26" fill="#F4F5F9" />
            <rect x="156" y="82" width="10" height="48" rx="5" fill="#F4F5F9" />
            <ellipse cx="225" cy="74" rx="22" ry="26" fill="#F4F5F9" />
            <rect x="204" y="82" width="10" height="48" rx="5" fill="#F4F5F9" />
            <rect x="105" y="108" width="160" height="106" rx="44" fill={`url(#base-${uid})`} />
            <path d="M107 150 h156" stroke="#9EA6B9" strokeWidth="2" />
            <circle cx="185" cy="184" r="5" fill="#6F5CFF" />
          </g>
        </svg>
      );

    case 'keyd':
      return (
        <svg className={className} viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
          {renderDefs("#FF8A4C", "#6F5CFF")}
          <rect x="34" y="42" width="332" height="144" rx="16" fill={`url(#body-${uid})`} />
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 12 }).map((__, c) => {
              const isEsc = r === 0 && c === 0;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={50 + c * 25}
                  y={60 + r * 28}
                  width="21"
                  height="23"
                  rx="5"
                  fill={isEsc ? '#FF8A4C' : '#282E40'}
                />
              );
            })
          )}
          <rect x="50" y="144" width="60" height="23" rx="5" fill="#282E40" />
          <rect x="115" y="144" width="135" height="23" rx="5" fill="#282E40" />
          <rect x="255" y="144" width="91" height="23" rx="5" fill="#6F5CFF" />
        </svg>
      );

    case 'cube':
      return (
        <svg className={className} viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
          {renderDefs("#FF8A4C", "#6F5CFF")}
          <rect x="110" y="28" width="180" height="180" rx="50" fill={`url(#body-${uid})`} />
          <rect x="110" y="94" width="180" height="48" fill="#FF8A4C" opacity="0.9" />
          <line x1="124" x2="276" y1="118" y2="118" stroke="#0B0D14" strokeWidth="28" strokeDasharray="3 7" opacity="0.35" />
          <circle cx="200" cy="62" r="9" fill="#6F5CFF" />
        </svg>
      );

    case 'dot':
      return (
        <svg className={className} viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
          {renderDefs("#FF8A4C", "#FFFFFF")}
          <g transform="translate(15, 0)">
            <ellipse cx="145" cy="74" rx="20" ry="24" fill="#F4F5F9" />
            <rect x="156" y="82" width="8" height="44" rx="4" fill="#F4F5F9" />
            <ellipse cx="225" cy="74" rx="20" ry="24" fill="#F4F5F9" />
            <rect x="204" y="82" width="8" height="44" rx="4" fill="#F4F5F9" />
            <rect x="115" y="112" width="140" height="96" rx="40" fill={`url(#base-${uid})`} />
            <path d="M117 150 h136" stroke="#9EA6B9" strokeWidth="2" />
            <circle cx="185" cy="180" r="4" fill="#FF8A4C" />
          </g>
        </svg>
      );

    case 'charger':
      return (
        <svg className={className} viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
          {renderDefs("#3A4A7A", "#6F5CFF")}
          <rect x="150" y="14" width="100" height="212" rx="28" fill={`url(#sc-${uid})`} />
          <ellipse cx="180" cy="80" rx="22" ry="60" fill="#fff" opacity="0.14" />
          <rect x="168" y="48" width="11" height="5" rx="2.5" fill="#fff" opacity="1" />
          <rect x="185" y="48" width="11" height="5" rx="2.5" fill="#fff" opacity="1" />
          <rect x="202" y="48" width="11" height="5" rx="2.5" fill="#fff" opacity="1" />
          <rect x="219" y="48" width="11" height="5" rx="2.5" fill="#fff" opacity="0.3" />
          <rect x="150" y="130" width="100" height="6" fill="#0B0D14" opacity="0.25" />
          <rect x="184" y="210" width="32" height="6" rx="3" fill="#0B0D14" opacity="0.5" />
        </svg>
      );

    default:
      return null;
  }
};
