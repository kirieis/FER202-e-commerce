import React from 'react';

interface UniGearLogoProps {
  className?: string;
  showBadge?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const UniGearLogo: React.FC<UniGearLogoProps> = ({
  className = '',
  showBadge = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon SVG: Stylized 'U' + Gear Core + Student Cap Angle */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Primary Neon Gradient */}
            <linearGradient id="ug-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6F5CFF" />
              <stop offset="50%" stopColor="#8A7BFF" />
              <stop offset="100%" stopColor="#FF8A4C" />
            </linearGradient>
            {/* Metallic Accent */}
            <linearGradient id="ug-grad-accent" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF8A4C" />
              <stop offset="100%" stopColor="#FF4D8D" />
            </linearGradient>
            {/* Gear Glow Filter */}
            <filter id="ug-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#6F5CFF" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Outer Rounded Tech Hexagon Container */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="11"
            fill="url(#ug-grad-primary)"
            filter="url(#ug-glow)"
          />

          {/* Inner Contrast Plate */}
          <rect
            x="4"
            y="4"
            width="32"
            height="32"
            rx="9"
            fill="#0F1220"
            fillOpacity="0.92"
          />

          {/* Stylized 'U' + Graduation Cap / Tech Gear Teeth Emblem */}
          {/* Left Wing */}
          <path
            d="M12 12V22C12 26.4 15.6 29 20 29C24.4 29 28 26.4 28 22V12"
            stroke="url(#ug-grad-primary)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Power Dot / Gear Core */}
          <circle cx="20" cy="20" r="2.4" fill="url(#ug-grad-accent)" />

          {/* Tech Student Mortarboard Chevron Peak */}
          <path
            d="M15 13L20 9.5L25 13"
            stroke="url(#ug-grad-accent)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex items-center gap-2">
        <div className="flex items-baseline">
          <span className={`${textSizes[size]} font-extrabold tracking-tight text-[var(--tx)]`}>
            Uni
          </span>
          <span className={`${textSizes[size]} font-extrabold tracking-tight bg-gradient-to-r from-[var(--pri)] via-[var(--pri-h)] to-[var(--warm)] bg-clip-text text-transparent`}>
            Gear
          </span>
        </div>

        {showBadge && (
          <span className="hidden xl:inline-block text-xs font-bold text-[var(--mu)] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--ln)]">
            STUDENT
          </span>
        )}
      </div>
    </div>
  );
};
