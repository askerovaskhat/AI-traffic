
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CityMap from './components/CityMap';
import LlmNavigator from './components/LlmNavigator';
import Analytics from './components/Analytics';
import VisionAI from './components/VisionAI';
import { ViewMode, Language } from './types';
import { translations } from './locales/translations';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.OVERVIEW);
  const [lang, setLang] = useState<Language>('ru');

  const t = translations[lang];

  const renderContent = () => {
    switch (view) {
      case ViewMode.OVERVIEW:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column: Map and Vision */}
              <div className="col-span-8 space-y-6">
                <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      {t.overview.commandCenter}
                    </h2>
                    <div className="flex items-center space-x-2">
                       <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400">OSM DATA ACTIVE</span>
                       <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400">AIRKAZ FEED: OK</span>
                    </div>
                  </div>
                  <div className="h-[500px]">
                    <CityMap />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                    <h3 className="text-xs font-bold uppercase text-slate-500 mb-4 flex items-center justify-between">
                      <span>Live Sergek Vision</span>
                      <span className="text-emerald-400">YOLOv10 Deep Learning</span>
                    </h3>
                    <VisionAI />
                  </div>
                  <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
                    <h3 className="text-xs font-bold uppercase text-slate-500 mb-4 flex items-center justify-between">
                      <span>AirKaz Ecosystem</span>
                      <span className="text-blue-400">PM2.5 Real-time</span>
                    </h3>
                    <div className="space-y-3">
                      {[
                        { loc: 'Panfilov/Abay', pm: 14, status: 'Clear' },
                        { loc: 'Zhibek Zholy', pm: 38, status: 'Moderate' },
                        { loc: 'Dostyk/Kurmangazy', pm: 22, status: 'Good' },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                           <span className="text-sm">{s.loc}</span>
                           <div className="flex items-center gap-3">
                             <span className="text-xs font-mono font-bold text-emerald-400">{s.pm} μg/m³</span>
                             <span className={`w-2 h-2 rounded-full ${s.pm > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Insights */}
              <div className="col-span-4 space-y-6">
                <div className="bg-gradient-to-br from-emerald-600/20 to-blue-600/20 p-6 rounded-2xl border border-white/5 h-full">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <i className="fas fa-microchip"></i>
                    AI City Control
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-400 mb-1">{t.overview.adaptiveTraffic}</p>
                      <p className="font-semibold text-emerald-400">Active - Optimal Mode</p>
                      <div className="mt-2 text-[10px] text-slate-300 leading-relaxed">
                         Integrity Check: Sergek Feed CAM_928 sync'd. OpenStreetMap topology updated (2 new bike lanes detected).
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-400 mb-1">{t.overview.v2i}</p>
                      <p className="font-semibold text-blue-400">Citybus API: Route #32</p>
                      <div className="mt-2 text-[10px] text-slate-300">
                         GPS tracking: +45m from Abay intersection. Priority signal scheduled for 18:42:10.
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-xs text-slate-400 mb-1">AirKaz Cluster Analysis</p>
                      <p className="font-semibold text-cyan-400">AQI: 42 (Healthy)</p>
                      <div className="mt-2 text-[10px] text-slate-300">
                        Atmospheric pressure stable. Prevailing wind from Kok-Tobe dispersing local smog.
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="text-[10px] font-bold uppercase text-emerald-500 mb-2">System Log</p>
                    <div className="font-mono text-[9px] text-emerald-400/80 space-y-1">
                      <p>&gt; [INFO] YOLOv10 weights loaded.</p>
                      <p>&gt; [INFO] AirKaz API handshake OK.</p>
                      <p>&gt; [INFO] Citybus GPS feed latency: 12ms.</p>
                      <p>&gt; [INFO] OSM Overpass cache refreshed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case ViewMode.PEDESTRIAN:
        return <LlmNavigator lang={lang} />;
      case ViewMode.TRAFFIC:
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <i className="fas fa-signal text-amber-400"></i>
                {t.traffic.signalTitle}
              </h2>
              <div className="space-y-4">
                {[
                  { intersection: 'Abylai Khan / Abay', status: 'Adaptive (Sergek)', flow: 'High', delay: '-12%' },
                  { intersection: 'Panfilov / Tole Bi', status: 'Pedestrian Priority', flow: 'Heavy', delay: '0%' },
                  { intersection: 'Zhibek Zholy / Kaldayakov', status: 'OSM Synced', flow: 'Normal', delay: '-18%' },
                  { intersection: 'Abay / Dostyk', status: 'Manual Override', flow: 'Congested', delay: '+4%' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                    <div>
                      <p className="font-semibold">{item.intersection}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">{item.flow} Flow</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${item.delay.startsWith('-') ? 'text-emerald-400' : 'text-slate-400'}`}>{item.delay} Delay</p>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <i className="fas fa-bus text-blue-400"></i>
                {t.traffic.busTitle}
              </h2>
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center">
                 <i className="fas fa-map-marked-alt text-4xl text-blue-500 mb-4 opacity-50"></i>
                 <p className="text-lg font-bold">Avtobys / Citybus Integration</p>
                 <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto">
                   Real-time GPS tracking for 40+ routes in the center. Analyzing dwell times at stops for optimization.
                 </p>
                 <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-colors">
                   View Fleet Analytics
                 </button>
              </div>
            </div>
          </div>
        );
      case ViewMode.ANALYTICS:
        return <Analytics lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar currentView={view} onViewChange={setView} lang={lang} />
      
      <main className="flex-1 p-8 overflow-y-auto overflow-x-hidden h-full">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold">
              {view === ViewMode.OVERVIEW && t.header.overview}
              {view === ViewMode.PEDESTRIAN && t.header.pedestrian}
              {view === ViewMode.TRAFFIC && t.header.traffic}
              {view === ViewMode.ANALYTICS && t.header.analytics}
            </h1>
            <p className="text-slate-400 text-sm">{t.header.hub} • Real-time Data Active</p>
          </div>
          <div className="flex items-center space-x-6">
             <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1">
               {(['en', 'ru', 'kk'] as Language[]).map((l) => (
                 <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      lang === l ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'
                    }`}
                 >
                   {l}
                 </button>
               ))}
             </div>
             <button className="bg-emerald-500 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors">
               Live Control Panel
             </button>
          </div>
        </header>

        <div className="h-[calc(100%-80px)]">
          {renderContent()}
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </div>
  );
};

export default App;
