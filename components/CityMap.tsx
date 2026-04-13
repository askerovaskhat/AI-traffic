
import React from 'react';

interface CityMapProps {
  userPos?: { lat: number; lng: number };
  highlightRoute?: boolean;
}

const CityMap: React.FC<CityMapProps> = ({ userPos }) => {
  // Almaty Golden Square center
  const centerLat = 43.2389;
  const centerLng = 76.9454;

  return (
    <div className="relative w-full h-full min-h-[400px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 group shadow-2xl">
      {/* Real Google Maps Embed */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          title="Almaty City Map"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ 
            border: 0,
            filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2) grayscale(0.2)',
            pointerEvents: 'auto'
          }}
          src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=15&output=embed&t=m`}
          allowFullScreen
        ></iframe>
      </div>

      {/* Overlay to catch some clicks but allow iframe interaction if needed */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/40"></div>

      {/* User Position Overlay (Simulated on top of real map) */}
      {userPos && (
        <div 
          className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
          style={{ top: `${userPos.lat}%`, left: `${userPos.lng}%` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 bg-blue-500/30 rounded-full animate-ping"></div>
            <div className="relative w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.9)] border-2 border-blue-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="absolute top-7 bg-slate-900/95 text-[8px] font-bold text-blue-400 px-2 py-0.5 rounded border border-blue-500/30 whitespace-nowrap backdrop-blur-md uppercase tracking-tighter">
              LIVE_COORD_SYNC
            </div>
          </div>
        </div>
      )}

      {/* Top Status Indicators */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-2 rounded-lg text-[9px] font-mono text-slate-300 shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-blue-400 font-bold uppercase">Google Maps Layer</span>
          </div>
          LAT: {userPos ? (43.23 + (userPos.lat / 5000)).toFixed(5) : centerLat}<br/>
          LNG: {userPos ? (76.94 + (userPos.lng / 5000)).toFixed(5) : centerLng}
        </div>
      </div>

      {/* Bottom Data Overlays */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-20">
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-3 py-1.5 rounded-xl">
          <i className="fas fa-traffic-light text-amber-400 text-[10px]"></i>
          <span className="text-[9px] font-mono text-slate-300">Sergek Flow Analytics: ACTIVE</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-3 py-1.5 rounded-xl">
          <i className="fas fa-leaf text-emerald-400 text-[10px]"></i>
          <span className="text-[9px] font-mono text-slate-300">AirKaz AQI: 42 (Healthy)</span>
        </div>
      </div>

      {/* Decorative Grid Overlay (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  );
};

export default CityMap;
