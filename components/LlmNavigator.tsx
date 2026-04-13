
import React, { useState, useEffect } from 'react';
import { getSmartRoute } from '../services/geminiService';
import { NavigationResult, Language } from '../types';
import { translations } from '../locales/translations';
import CityMap from './CityMap';

interface LlmNavigatorProps {
  lang: Language;
}

interface ExtendedNavigationResult extends NavigationResult {
  smartAdvice?: string;
}

const LlmNavigator: React.FC<LlmNavigatorProps> = ({ lang }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExtendedNavigationResult | null>(null);
  const [userPos, setUserPos] = useState({ lat: 65, lng: 50 }); // Center of Panfilov approx
  
  const t = translations[lang].pedestrian;

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          // Normalize real coordinates to Almaty Golden Square grid (approx 43.23-43.25 lat, 76.93-76.95 lng)
          const latMin = 43.235, latMax = 43.255;
          const lngMin = 76.935, lngMax = 76.955;
          
          const normLat = 100 - ((position.coords.latitude - latMin) / (latMax - latMin) * 100);
          const normLng = (position.coords.longitude - lngMin) / (lngMax - lngMin) * 100;

          setUserPos({ 
            lat: Math.max(5, Math.min(95, normLat)), 
            lng: Math.max(5, Math.min(95, normLng)) 
          });
        },
        (error) => console.log("GPS unavailable:", error.message),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const finalQuery = typeof e === 'string' ? e : query;
    if (!finalQuery.trim()) return;
    
    setLoading(true);
    try {
      const data = await getSmartRoute(finalQuery, lang);
      setResult(data);
    } catch (error) {
      console.error("AI Brain Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Left: Intelligence Panel */}
      <div className="col-span-4 flex flex-col h-full space-y-4">
        <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
               <i className="fas fa-brain text-emerald-400"></i>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400">AI-City Brain</h2>
              <p className="text-[10px] text-slate-500">ALMATY ENVIRONMENTAL CORE</p>
            </div>
          </div>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 pr-10 placeholder:text-slate-600"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-500 p-2 hover:bg-emerald-500/10 rounded-lg transition-colors"
            >
              {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-paper-plane text-xs"></i>}
            </button>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {result ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                   <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">{t.quietness}</p>
                   <div className="flex items-end gap-2">
                     <span className="text-xl font-bold text-emerald-400">{result.totalQuietness}%</span>
                     <span className="text-[9px] text-emerald-500/60 mb-1">ACOUSTIC</span>
                   </div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                   <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">{t.greenery}</p>
                   <div className="flex items-end gap-2">
                     <span className="text-xl font-bold text-emerald-400">{result.greeneryIndex}%</span>
                     <span className="text-[9px] text-emerald-500/60 mb-1">SHADE</span>
                   </div>
                </div>
              </div>

              {result.smartAdvice && (
                <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                   <p className="text-[10px] font-bold text-blue-400 uppercase mb-1 flex items-center gap-2">
                     <i className="fas fa-lightbulb"></i> Smart Insight
                   </p>
                   <p className="text-xs text-blue-200/80 leading-relaxed italic">"{result.smartAdvice}"</p>
                </div>
              )}

              <div className="space-y-3">
                {result.route.map((step, idx) => (
                  <div key={idx} className="bg-slate-800/20 p-3 rounded-xl border border-slate-800/50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/40"></div>
                    <p className="text-xs font-semibold text-slate-200 mb-1">{step.instruction}</p>
                    <p className="text-[10px] text-slate-500 leading-snug group-hover:text-slate-400 transition-colors">{step.reason}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 text-center p-8 opacity-50">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800">
                 <i className="fas fa-location-arrow text-2xl"></i>
              </div>
              <p className="text-xs font-medium">{t.ready}</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {t.samples.map((s: string) => (
                  <button 
                    key={s} 
                    onClick={() => handleSearch(s)}
                    className="px-3 py-1 bg-slate-900 rounded-full text-[10px] hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors border border-slate-800"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Immersive Live Map */}
      <div className="col-span-8 h-full">
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 h-full flex flex-col overflow-hidden relative">
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">{t.liveMap}</span>
            </div>
            {result && (
               <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-xl flex items-center gap-2">
                  <i className="fas fa-route text-emerald-400 text-[10px]"></i>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">ECO_ROUTE_ACTIVE</span>
               </div>
            )}
          </div>
          
          <CityMap userPos={userPos} highlightRoute={!!result} />
        </div>
      </div>
    </div>
  );
};

export default LlmNavigator;
