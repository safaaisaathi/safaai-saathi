import React, { useEffect, useRef } from 'react';

interface ContourCardProps {
  seed?: number;
  lines?: number;
  label?: string;
  heroValue: string | number;
  heroUnit?: string;
  subtitle?: string;
  badge?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const ContourCard: React.FC<ContourCardProps> = React.memo(({
  seed = 42,
  lines = 9,
  label,
  heroValue,
  heroUnit,
  subtitle,
  badge,
  onAction,
  actionIcon,
  children,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    // Pseudorandom generator based on seed
    let s = seed;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    const cx = width * (0.35 + rnd() * 0.3);
    const cy = height * (0.35 + rnd() * 0.3);
    const p1 = rnd() * Math.PI * 2;
    const p2 = rnd() * Math.PI * 2;

    ctx.strokeStyle = 'rgba(27, 122, 63, 0.35)'; // Brand dark at 35%
    ctx.lineWidth = 1.25;

    const maxR = Math.max(width, height) * 0.9;

    for (let i = 1; i <= lines; i++) {
      const r = (maxR * i) / lines;
      ctx.beginPath();
      for (let a = 0; a <= 360; a += 6) {
        const t = (a * Math.PI) / 180;
        const rr = r * (1 + 0.1 * Math.sin(2 * t + p1) + 0.06 * Math.sin(3 * t + p2));
        const x = cx + rr * Math.cos(t);
        const y = cy + rr * Math.sin(t) * 0.75;
        if (a === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
  }, [seed, lines]);

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] bg-[#6DB36F] p-4 sm:p-5 text-[#111A14] shadow-elev1 min-h-[135px] flex flex-col justify-between ${className}`}
    >
      {/* Topographic Contour Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Top bar inside card */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {badge && (
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#111A14] text-white rounded-full">
              {badge}
            </span>
          )}
          {label && (
            <span className="text-xs font-semibold text-[#111A14]/75 tracking-wider uppercase">
              {label}
            </span>
          )}
        </div>

        {onAction && (
          <button
            onClick={onAction}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#111A14] flex items-center justify-center shadow-sm transition active:scale-95"
            aria-label="Card action"
          >
            {actionIcon || (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Hero Display: Number + Unit */}
      <div className="relative z-10 my-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl sm:text-5xl font-bold tracking-tight font-sans tabular-nums text-[#111A14]">
            {heroValue}
          </span>
          {heroUnit && (
            <span className="text-base sm:text-lg font-bold text-[#111A14]/85">
              {heroUnit}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm font-medium text-[#111A14]/85 mt-0.5 truncate">
            {subtitle}
          </p>
        )}
      </div>

      {children && <div className="relative z-10 mt-1">{children}</div>}
    </div>
  );
});