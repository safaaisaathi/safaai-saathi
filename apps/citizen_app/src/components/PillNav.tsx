import React from 'react';
import { Map, Inbox, Settings, Camera, Plus } from 'lucide-react';
import { Language } from '../core/localization';

export type NavTab = 'map' | 'complaints' | 'settings';

interface PillNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  complaintsCount: number;
  lang: Language;
  onOpenReport?: () => void;
}

export const PillNav: React.FC<PillNavProps> = ({
  currentTab,
  onSelectTab,
  complaintsCount,
  lang,
  onOpenReport,
}) => {
  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-30 flex justify-center pointer-events-none px-3">
      <div className="bg-white/95 dark:bg-[#16221B]/95 backdrop-blur-xl rounded-full shadow-elev3 border border-[#DCE5D9] dark:border-[#2A3B31] px-2 py-1.5 flex items-center gap-1 sm:gap-2 pointer-events-auto transition-all">
        {/* 1. Map Tab */}
        <button
          onClick={() => onSelectTab('map')}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-full transition-all active:scale-95 ${
            currentTab === 'map'
              ? 'bg-[#111A14] dark:bg-[#F2F7EE] text-white dark:text-[#111A14] shadow-sm font-bold'
              : 'text-[#566259] dark:text-[#9DB0A2] hover:bg-[#F3F6F2] dark:hover:bg-[#1E2D24]'
          }`}
          aria-label="Map"
        >
          <Map className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold">
            {lang === 'gu' ? 'નકશો' : 'Map'}
          </span>
        </button>

        {/* 2. Center "Report Grievance" FAB */}
        {onOpenReport && (
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-full bg-gradient-to-r from-[#1B7A3F] to-[#156032] hover:from-[#156032] hover:to-[#0F4725] text-white shadow-elev2 font-bold text-xs active:scale-95 transition-all border border-white/20 mx-0.5 sm:mx-1"
            title={lang === 'gu' ? 'કચરો / ગટર રિપોર્ટ કરો' : 'Report Sanitation Issue'}
          >
            <Camera className="w-4 h-4 shrink-0 animate-pulse text-[#F2F7EE]" />
            <span className="text-xs font-bold tracking-tight">
              {lang === 'gu' ? '+ રિપોર્ટ' : '+ Report'}
            </span>
          </button>
        )}

        {/* 3. Complaints Tab with Badge */}
        <button
          onClick={() => onSelectTab('complaints')}
          className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-full transition-all active:scale-95 ${
            currentTab === 'complaints'
              ? 'bg-[#111A14] dark:bg-[#F2F7EE] text-white dark:text-[#111A14] shadow-sm font-bold'
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

        {/* 4. Settings Tab */}
        <button
          onClick={() => onSelectTab('settings')}
          className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2.5 rounded-full transition-all active:scale-95 ${
            currentTab === 'settings'
              ? 'bg-[#111A14] dark:bg-[#F2F7EE] text-white dark:text-[#111A14] shadow-sm font-bold'
              : 'text-[#566259] dark:text-[#9DB0A2] hover:bg-[#F3F6F2] dark:hover:bg-[#1E2D24]'
          }`}
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold">
            {lang === 'gu' ? 'સેવા' : 'More'}
          </span>
        </button>
      </div>
    </nav>
  );
};
