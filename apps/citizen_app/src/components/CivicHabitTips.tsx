import React from 'react';
import { SEED_TIPS } from '../core/seedData';
import { Language, translations } from '../core/localization';
import { Recycle, Droplets, BellRing, ShieldAlert, Sparkles } from 'lucide-react';

interface CivicHabitTipsProps {
  lang: Language;
}

export const CivicHabitTips: React.FC<CivicHabitTipsProps> = ({ lang }) => {
  const t = translations[lang];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Recycle':
        return <Recycle className="w-5 h-5 text-[#1B7A3F] dark:text-[#2ECC71]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#2F6FDE] dark:text-[#60A5FA]" />;
      case 'BellRing':
        return <BellRing className="w-5 h-5 text-[#F0873A] dark:text-[#FB923C]" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-[#1B7A3F] dark:text-[#2ECC71]" />;
    }
  };

  return (
    <div className="flex flex-col gap-2.5 py-1">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#1B7A3F] dark:text-[#2ECC71]" />
          <h3 className="text-xs sm:text-sm font-extrabold text-[#14201A] dark:text-white uppercase tracking-wider">
            {t.habitsTitle}
          </h3>
        </div>
        <span className="text-[10px] font-bold text-[#1B7A3F] dark:text-[#2ECC71] bg-[#E4F1DF] dark:bg-[#1B7A3F]/30 px-2 py-0.5 rounded-full">
          Swachh Panchmahal
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-1 px-1">
        {SEED_TIPS.map(tip => (
          <div
            key={tip.id}
            className="shrink-0 w-[260px] sm:w-[280px] snap-start bg-white dark:bg-[#1F2E25] p-3.5 rounded-[22px] border border-[#DCE5D9] dark:border-[#2F4437] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E4F1DF] dark:bg-[#2A4032] flex items-center justify-center">
                  {getIcon(tip.icon)}
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E9F1E6] dark:bg-[#2A4032] text-[#1B7A3F] dark:text-[#2ECC71]">
                  {lang === 'gu' ? tip.badgeGu : tip.badgeEn}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#14201A] dark:text-white leading-snug line-clamp-2">
                {lang === 'gu' ? tip.titleGu : tip.titleEn}
              </h4>
              <p className="text-[11px] text-[#566259] dark:text-[#A3B8AA] mt-1 leading-relaxed line-clamp-3">
                {lang === 'gu' ? tip.descGu : tip.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
