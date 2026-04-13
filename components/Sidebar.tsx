
import React from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../locales/translations';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  lang: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, lang }) => {
  const t = translations[lang].sidebar;

  const menuItems = [
    { id: ViewMode.OVERVIEW, icon: 'fa-city', label: t.overview },
    { id: ViewMode.PEDESTRIAN, icon: 'fa-walking', label: t.pedestrian },
    { id: ViewMode.TRAFFIC, icon: 'fa-traffic-light', label: t.traffic },
    { id: ViewMode.ANALYTICS, icon: 'fa-chart-line', label: t.analytics },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-full flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <i className="fas fa-microchip text-slate-900 text-xl"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">AI-City <span className="text-emerald-400">Nav</span></h1>
        </div>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-semibold">Smart City Ecosystem 2026</p>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <i className={`fas ${item.icon} text-lg w-6`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">{t.status}</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-sm font-semibold">{t.online}</p>
          <div className="mt-2 w-full bg-slate-700 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full w-[85%]"></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">{t.optimization}: 85%</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
