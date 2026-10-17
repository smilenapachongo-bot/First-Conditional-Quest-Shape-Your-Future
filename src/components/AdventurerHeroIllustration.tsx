import React from 'react';

export const AdventurerHeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center select-none pointer-events-none">
      {/* Background Orbital Rings & Energy Field */}
      <div className="absolute inset-4 rounded-full border border-violet-500/20 animate-pulse pointer-events-none" />
      <div className="absolute inset-10 rounded-full border border-cyan-400/25 border-dashed animate-spin [animation-duration:35s] pointer-events-none" />
      <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-violet-600/15 via-fuchsia-600/15 to-cyan-500/15 blur-2xl animate-super-aura pointer-events-none" />

      {/* Main SVG Composition */}
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-[0_15px_30px_rgba(99,102,241,0.4)] animate-float-rune-1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cyberSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <linearGradient id="neonViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>

        {/* Floating Portal Pedestal */}
        <ellipse cx="250" cy="420" rx="160" ry="36" fill="url(#neonViolet)" opacity="0.3" filter="blur(8px)" />
        <ellipse cx="250" cy="415" rx="140" ry="24" fill="#0f172a" stroke="#8b5cf6" strokeWidth="3" />
        <ellipse cx="250" cy="415" rx="110" ry="18" fill="#1e1b4b" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" />

        {/* Branching Decision Pathways Conduit */}
        <path d="M 250 415 Q 160 380 120 320" stroke="#06b6d4" strokeWidth="3" strokeDasharray="5 3" opacity="0.8" />
        <path d="M 250 415 Q 340 380 380 320" stroke="#ec4899" strokeWidth="3" strokeDasharray="5 3" opacity="0.8" />

        {/* Decision Portal Nodes */}
        <circle cx="120" cy="320" r="14" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
        <text x="120" y="325" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">IF</text>

        <circle cx="380" cy="320" r="14" fill="#0f172a" stroke="#ec4899" strokeWidth="3" />
        <text x="380" y="325" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">WILL</text>

        {/* Floating Holographic Books */}
        <g transform="translate(60, 210) rotate(-14)">
          <rect width="68" height="48" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
          <path d="M 8 12 L 60 12 M 8 22 L 45 22 M 8 32 L 52 32" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
          <circle cx="56" cy="36" r="4" fill="#fbbf24" />
        </g>

        {/* Holographic Compass of Future */}
        <g transform="translate(365, 170)">
          <circle cx="32" cy="32" r="28" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="22" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
          {/* Compass needle pointing toward future */}
          <polygon points="32,12 37,32 32,35 27,32" fill="#f43f5e" />
          <polygon points="32,52 37,32 32,35 27,32" fill="#94a3b8" />
          <circle cx="32" cy="32" r="3" fill="#fbbf24" />
          <text x="32" y="9" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">FUTURE</text>
        </g>

        {/* Holographic Clock */}
        <g transform="translate(75, 110)">
          <circle cx="24" cy="24" r="20" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
          <line x1="24" y1="24" x2="24" y2="12" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="24" x2="34" y2="24" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="24" r="2.5" fill="#f59e0b" />
        </g>

        {/* Adventurer Student Character */}
        {/* Shadow */}
        <ellipse cx="250" cy="390" rx="35" ry="10" fill="#020617" opacity="0.6" />

        {/* Legs / Boots */}
        <rect x="236" y="315" width="10" height="60" rx="5" fill="#1e293b" />
        <rect x="254" y="315" width="10" height="60" rx="5" fill="#1e293b" />
        <rect x="232" y="365" width="16" height="15" rx="4" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
        <rect x="252" y="365" width="16" height="15" rx="4" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />

        {/* Coat / Explorer Jacket */}
        <path d="M 226 215 L 274 215 L 282 320 L 218 320 Z" fill="url(#neonViolet)" />
        {/* Belt */}
        <rect x="223" y="278" width="54" height="8" rx="2" fill="#0f172a" />
        <rect x="244" y="276" width="12" height="12" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />

        {/* Holographic Backpack with English Learning Gadgets */}
        <rect x="210" y="215" width="14" height="65" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="217" cy="235" r="3" fill="#22d3ee" />

        {/* Arms and Holographic Tablet */}
        {/* Left Arm */}
        <path d="M 224 220 Q 205 250 220 270" stroke="#8b5cf6" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Right Arm holding tablet */}
        <path d="M 276 220 Q 295 250 270 275" stroke="#8b5cf6" strokeWidth="10" strokeLinecap="round" fill="none" />

        {/* Glowing Holographic Learning Tablet in hands */}
        <g transform="translate(225, 255)">
          <rect width="50" height="34" rx="4" fill="#020617" stroke="#06b6d4" strokeWidth="2" />
          <rect x="4" y="4" width="42" height="26" rx="2" fill="#0e7490" opacity="0.3" />
          <line x1="8" y1="10" x2="42" y2="10" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="17" x2="32" y2="17" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="24" x2="24" y2="24" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Head and Face */}
        <circle cx="250" cy="180" r="22" fill="#fed7aa" />
        {/* Hair */}
        <path d="M 230 180 Q 250 150 270 180 Q 260 160 230 180 Z" fill="#451a03" />
        <path d="M 232 170 C 235 155, 265 155, 268 170 C 265 160, 235 160, 232 170 Z" fill="#78350f" />

        {/* Explorer Cyber Headset with Visor */}
        <path d="M 232 174 Q 250 168 268 174" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="230" cy="176" r="4.5" fill="#38bdf8" />
        <circle cx="270" cy="176" r="4.5" fill="#38bdf8" />
        <line x1="269" y1="178" x2="260" y2="186" stroke="#22d3ee" strokeWidth="1.5" />

        {/* Smile and Eyes */}
        <circle cx="244" cy="179" r="2" fill="#0f172a" />
        <circle cx="256" cy="179" r="2" fill="#0f172a" />
        <path d="M 246 186 Q 250 191 254 186" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Floating Speech Bubbles with Condition & Result */}
        <g transform="translate(145, 75)" className="animate-float-rune-2">
          <rect width="90" height="28" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <text x="45" y="18" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">If I study hard...</text>
        </g>

        <g transform="translate(265, 75)" className="animate-float-rune-1">
          <rect width="105" height="28" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
          <text x="52" y="18" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">...I will succeed!</text>
        </g>

        {/* Star Accents */}
        <circle cx="100" cy="80" r="2" fill="#fde047" />
        <circle cx="410" cy="110" r="2.5" fill="#38bdf8" />
        <circle cx="390" cy="270" r="2" fill="#ec4899" />
        <circle cx="90" cy="380" r="2" fill="#a78bfa" />
      </svg>
    </div>
  );
};
