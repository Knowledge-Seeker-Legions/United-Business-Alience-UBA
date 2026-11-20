import React from 'react';
import { IndustryCategory } from '../types/uba';

export function UBALogo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          width="32"
          height="32"
          rx="6"
          fill={light ? '#10B981' : '#0B253A'}
        />
        <rect x="6" y="18" width="4" height="8" rx="1" fill={light ? '#0B253A' : '#FFFFFF'} />
        <rect x="12" y="13" width="4" height="13" rx="1" fill={light ? '#0B253A' : '#FFFFFF'} />
        <rect x="18" y="8" width="4" height="18" rx="1" fill={light ? '#FFFFFF' : '#10B981'} />
        <path
          d="M24.5 7.5L26 10.5H23L24.5 7.5Z"
          fill={light ? '#FFFFFF' : '#10B981'}
        />
        <rect x="23.5" y="11" width="2" height="15" rx="1" fill={light ? '#0B253A' : '#FFFFFF'} />
      </svg>
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          light ? 'text-white' : 'text-[#0B253A]'
        }`}
      >
        UBA
      </span>
    </span>
  );
}

interface IndustryArtworkProps {
  industry: IndustryCategory;
  className?: string;
}

export const IndustryArtwork: React.FC<IndustryArtworkProps> = ({
  industry,
  className = 'w-full h-44',
}) => {
  switch (industry) {
    case 'Agriculture':
      return (
        <svg
          viewBox="0 0 400 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Agriculture and hydroponic greenhouse illustration"
        >
          <rect width="400" height="220" fill="#F0FDF4" />
          <circle cx="328" cy="54" r="24" fill="#FDE68A" />
          <path d="M0 164C85 138 165 140 245 154C315 166 360 152 400 144V220H0V164Z" fill="#0B253A" />
          <path d="M0 176C95 160 185 164 275 182C330 193 368 186 400 178V220H0V176Z" fill="#10B981" fillOpacity="0.28" />
          {/* Greenhouse structure */}
          <path d="M72 150V104L142 74L212 104V150H72Z" fill="#FFFFFF" stroke="#0B253A" strokeWidth="2.5" />
          <line x1="142" y1="74" x2="142" y2="150" stroke="#0B253A" strokeWidth="2" />
          <line x1="107" y1="89" x2="107" y2="150" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="177" y1="89" x2="177" y2="150" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="72" y1="118" x2="212" y2="118" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Solar roof panel */}
          <polygon points="148,79 204,103 196,110 140,86" fill="#0B253A" />
          {/* Crops & leaves */}
          <path d="M268 152V112" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          <path d="M268 134C250 132 246 116 262 114C266 122 268 128 268 134Z" fill="#10B981" />
          <path d="M268 126C286 124 290 108 274 106C270 114 268 120 268 126Z" fill="#059669" />
          <path d="M312 152V120" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          <path d="M312 138C296 136 294 122 308 120C311 127 312 132 312 138Z" fill="#10B981" />
          <path d="M312 132C328 130 330 116 316 114C313 121 312 126 312 132Z" fill="#059669" />
          {/* Metric lines */}
          <rect x="34" y="34" width="64" height="8" rx="4" fill="#0B253A" fillOpacity="0.14" />
          <rect x="34" y="48" width="42" height="6" rx="3" fill="#10B981" fillOpacity="0.4" />
        </svg>
      );

    case 'Restaurant':
      return (
        <svg
          viewBox="0 0 400 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Restaurant and culinary hospitality illustration"
        >
          <rect width="400" height="220" fill="#FFFBEB" />
          <rect x="0" y="168" width="400" height="52" fill="#0B253A" />
          {/* Storefront awning */}
          <rect x="74" y="64" width="252" height="104" rx="4" fill="#FFFFFF" stroke="#0B253A" strokeWidth="2.5" />
          <path d="M62 64H338L326 94H74L62 64Z" fill="#0B253A" />
          <rect x="98" y="64" width="28" height="30" fill="#10B981" />
          <rect x="154" y="64" width="28" height="30" fill="#10B981" />
          <rect x="210" y="64" width="28" height="30" fill="#10B981" />
          <rect x="266" y="64" width="28" height="30" fill="#10B981" />
          {/* Dining windows */}
          <rect x="96" y="108" width="88" height="44" rx="3" fill="#F8FAFC" stroke="#0B253A" strokeWidth="2" />
          <rect x="216" y="108" width="88" height="44" rx="3" fill="#F8FAFC" stroke="#0B253A" strokeWidth="2" />
          {/* Cloche & pendant lights */}
          <circle cx="140" cy="122" r="10" fill="#F59E0B" fillOpacity="0.85" />
          <path d="M236 142C236 128 248 118 260 118C272 118 284 128 284 142H236Z" fill="#0B253A" />
          <circle cx="260" cy="115" r="3" fill="#F59E0B" />
          <line x1="228" y1="145" x2="292" y2="145" stroke="#0B253A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Ambient sign */}
          <rect x="152" y="34" width="96" height="18" rx="4" fill="#0B253A" />
          <rect x="166" y="40" width="68" height="6" rx="3" fill="#10B981" />
        </svg>
      );

    case 'Construction Developer':
      return (
        <svg
          viewBox="0 0 400 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Construction and commercial real estate development illustration"
        >
          <rect width="400" height="220" fill="#F1F5F9" />
          <rect x="0" y="176" width="400" height="44" fill="#0B253A" />
          {/* Blueprint grid lines */}
          <line x1="40" y1="0" x2="40" y2="176" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="360" y1="0" x2="360" y2="176" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="4 4" />
          {/* Main tower */}
          <rect x="108" y="56" width="112" height="120" fill="#FFFFFF" stroke="#0B253A" strokeWidth="2.5" />
          <rect x="124" y="74" width="22" height="20" fill="#0B253A" />
          <rect x="154" y="74" width="22" height="20" fill="#10B981" />
          <rect x="184" y="74" width="22" height="20" fill="#0B253A" />
          <rect x="124" y="106" width="22" height="20" fill="#0B253A" />
          <rect x="154" y="106" width="22" height="20" fill="#0B253A" />
          <rect x="184" y="106" width="22" height="20" fill="#10B981" />
          <rect x="124" y="138" width="52" height="38" fill="#0B253A" />
          <rect x="184" y="138" width="22" height="20" fill="#CBD5E1" />
          {/* Adjacent wing */}
          <rect x="220" y="96" width="76" height="80" fill="#E2E8F0" stroke="#0B253A" strokeWidth="2.5" />
          <rect x="236" y="114" width="18" height="18" fill="#0B253A" />
          <rect x="262" y="114" width="18" height="18" fill="#0B253A" />
          <rect x="236" y="142" width="18" height="18" fill="#10B981" />
          <rect x="262" y="142" width="18" height="18" fill="#0B253A" />
          {/* Tower crane */}
          <line x1="74" y1="32" x2="74" y2="176" stroke="#0B253A" strokeWidth="4" />
          <line x1="48" y1="40" x2="188" y2="40" stroke="#F59E0B" strokeWidth="4" />
          <line x1="74" y1="40" x2="152" y2="24" stroke="#0B253A" strokeWidth="2" />
          <line x1="168" y1="40" x2="168" y2="66" stroke="#0B253A" strokeWidth="2" />
          <rect x="160" y="66" width="16" height="10" fill="#F59E0B" />
        </svg>
      );

    case 'Organic Food':
      return (
        <svg
          viewBox="0 0 400 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Organic food packaging and natural provisions illustration"
        >
          <rect width="400" height="220" fill="#ECFDF5" />
          <rect x="0" y="168" width="400" height="52" fill="#0B253A" />
          {/* Glass oil bottle */}
          <rect x="108" y="88" width="54" height="80" rx="10" fill="#FFFFFF" stroke="#0B253A" strokeWidth="2.5" />
          <rect x="126" y="64" width="18" height="24" fill="#FFFFFF" stroke="#0B253A" strokeWidth="2.5" />
          <rect x="123" y="56" width="24" height="10" rx="2" fill="#0B253A" />
          <rect x="116" y="114" width="38" height="36" rx="4" fill="#10B981" fillOpacity="0.22" />
          <circle cx="135" cy="132" r="9" fill="#10B981" />
          {/* Honey / grain jar */}
          <rect x="182" y="102" width="66" height="66" rx="8" fill="#FDE68A" stroke="#0B253A" strokeWidth="2.5" />
          <rect x="188" y="90" width="54" height="12" rx="3" fill="#0B253A" />
          <rect x="194" y="122" width="42" height="26" rx="3" fill="#FFFFFF" />
          <line x1="202" y1="132" x2="228" y2="132" stroke="#0B253A" strokeWidth="2" strokeLinecap="round" />
          <line x1="202" y1="140" x2="220" y2="140" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          {/* Botanical branch & QR verification card */}
          <rect x="266" y="82" width="56" height="86" rx="6" fill="#FFFFFF" stroke="#0B253A" strokeWidth="2.5" />
          <path d="M294 148V104" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M294 128C280 126 278 114 290 112C293 118 294 123 294 128Z" fill="#10B981" />
          <path d="M294 120C308 118 310 106 298 104C295 110 294 115 294 120Z" fill="#059669" />
          <circle cx="322" cy="54" r="14" fill="#10B981" fillOpacity="0.2" />
          <path d="M316 54L320 58L329 49" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'Export & Import':
      return (
        <svg
          viewBox="0 0 400 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Global maritime export and import logistics illustration"
        >
          <rect width="400" height="220" fill="#EFF6FF" />
          {/* Sea horizon */}
          <rect x="0" y="152" width="400" height="68" fill="#0B253A" />
          <path d="M0 172C40 164 80 180 120 172C160 164 200 180 240 172C280 164 320 180 360 172C380 168 390 170 400 172" stroke="#10B981" strokeWidth="2" strokeOpacity="0.55" />
          {/* Cargo vessel hull */}
          <path d="M72 132H316L294 162H92L72 132Z" fill="#FFFFFF" stroke="#0B253A" strokeWidth="2.5" />
          {/* Bridge tower */}
          <rect x="248" y="84" width="38" height="48" fill="#FFFFFF" stroke="#0B253A" strokeWidth="2.5" />
          <rect x="256" y="94" width="22" height="10" fill="#0B253A" />
          {/* Shipping containers */}
          <rect x="96" y="106" width="44" height="26" fill="#10B981" stroke="#0B253A" strokeWidth="2" />
          <rect x="144" y="106" width="44" height="26" fill="#0B253A" stroke="#0B253A" strokeWidth="2" />
          <rect x="192" y="106" width="44" height="26" fill="#F59E0B" stroke="#0B253A" strokeWidth="2" />
          <rect x="120" y="80" width="44" height="26" fill="#0B253A" stroke="#0B253A" strokeWidth="2" />
          <rect x="168" y="80" width="44" height="26" fill="#10B981" stroke="#0B253A" strokeWidth="2" />
          {/* Global trade arc */}
          <path d="M64 56C140 24 260 24 336 56" stroke="#0B253A" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="64" cy="56" r="5" fill="#10B981" />
          <circle cx="336" cy="56" r="5" fill="#0B253A" />
        </svg>
      );

    case 'Travel Agency':
      return (
        <svg
          viewBox="0 0 400 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          role="img"
          aria-label="Travel agency and eco-expedition routes illustration"
        >
          <rect width="400" height="220" fill="#F0F9FF" />
          {/* Mountain & coastal silhouette */}
          <path d="M0 166L86 98L154 148L228 84L312 152L400 112V220H0V166Z" fill="#CBD5E1" fillOpacity="0.45" />
          <rect x="0" y="168" width="400" height="52" fill="#0B253A" />
          {/* Route arc & pins */}
          <path d="M88 140C140 62 256 62 312 126" stroke="#0B253A" strokeWidth="2.5" strokeDasharray="6 4" />
          <circle cx="88" cy="140" r="8" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="312" cy="126" r="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          {/* Paper plane / aviation emblem */}
          <path d="M214 66L182 82L194 88L214 66ZM214 66L194 88L198 100L214 66Z" fill="#0B253A" />
          <path d="M214 66L198 100L206 90L214 66Z" fill="#10B981" />
          {/* Compass badge */}
          <circle cx="336" cy="54" r="20" fill="#FFFFFF" stroke="#0B253A" strokeWidth="2" />
          <polygon points="336,41 341,54 336,67 331,54" fill="#10B981" />
          <circle cx="336" cy="54" r="2.5" fill="#0B253A" />
        </svg>
      );
  }
};
