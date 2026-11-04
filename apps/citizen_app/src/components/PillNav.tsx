import React from 'react';
import { Map, Inbox, Settings } from 'lucide-react';
import { Language } from '../core/localization';

export type NavTab = 'map' | 'complaints' | 'settings';

interface PillNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  complaintsCount: number;
  lang: Language;
  hidden?: boolean;
}

export const PillNav: React.FC<PillNavProps> = ({
  currentTab,
  onSelectTab,
  complaintsCount,
  lang,
  hidden = false,
}) => {
  return (
    <nav
      className={`fixed bottom-5 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 transition-all duration-300 ease-out ${
        hidden ? 'translate-y-28 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="bg-white/95 dark:bg-[#16221B]/95 backdrop-blur-xl rounded-full shadow-elev3 border border-[#DCE5D9] dark:border-[#2A3B31] p-1.5 flex items-center gap-1.5 pointer-events-auto transition-all">
        {/* 1. Map Tab */}
        <button
          onClick={() => onSelectTab('map')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all active:scale-95 ${
            currentTab === 'map'
              ? 'bg-[#111A14] dark:bg-[#F2F7EE] text-white dark:text-[#111A14] shadow font-semibold'
              : 'text-[#566259] dark:text-[#9DB0A2] hover:bg-[#F3F6F2] dark:hover:bg-[#1E2D24]'
          }`}
          aria-label="Map"
        >
          <Map className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold">
            {lang === 'gu' ? 'નકશો' : 'Live Map'}
          </span>
        </button>

        {/* 2. Complaints Tab with Badge */}
        <button
          onClick={() => onSelectTab('complaints')}
          className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all active:scale-95 ${
            currentTab === 'complaints'
              ? 'bg-[#111A14] dark:bg-[#F2F7EE] text-white dark:text-[#111A14] shadow font-semibold'
              : 'text-[#566259] dark:text-[#9DB0A2] hover:bg-[#F3F6F2] dark:hover:bg-[#1E2D24]'
          }`}
          aria-label="My Complaints"
        >
          <div className="relative">
            <Inbox className="w-5 h-5 shrink-0" />
            {complaintsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-[#B34A0B] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-[#16221B] shadow">
                {complaintsCount}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold">
            {lang === 'gu' ? 'ફરિયાદો' : 'Tickets'}
          </span>
        </button>

        {/* 3. Settings Tab */}
        <button
          onClick={() => onSelectTab('settings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all active:scale-95 ${
            currentTab === 'settings'
              ? 'bg-[#111A14] dark:bg-[#F2F7EE] text-white dark:text-[#111A14] shadow font-semibold'
              : 'text-[#566259] dark:text-[#9DB0A2] hover:bg-[#F3F6F2] dark:hover:bg-[#1E2D24]'
          }`}
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold">
            {lang === 'gu' ? 'સેટિંગ્સ' : 'Settings'}
          </span>
        </button>
      </div>
    </nav>
  );
};
