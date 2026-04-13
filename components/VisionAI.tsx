
import React, { useState, useEffect } from 'react';

const VisionAI: React.FC = () => {
  const [objects, setObjects] = useState<{ id: number, x: number, y: number, label: string, conf: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const mockDetections = Array.from({ length: 3 + Math.floor(Math.random() * 4) }).map(() => ({
        id: Math.random(),
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        label: Math.random() > 0.4 ? 'Car' : 'Pedestrian',
        conf: 0.85 + Math.random() * 0.14
      }));
      setObjects(mockDetections);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1545147986-a9d6f210df77?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
      
      {/* Scanning Line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent h-20 w-full animate-scan"></div>
      
      {/* YOLO Bounding Boxes */}
      {objects.map((obj) => (
        <div 
          key={obj.id}
          className="absolute border-2 transition-all duration-700 ease-in-out"
          style={{ 
            left: `${obj.x}%`, 
            top: `${obj.y}%`, 
            width: '60px', 
            height: obj.label === 'Car' ? '40px' : '70px',
            borderColor: obj.label === 'Car' ? '#3b82f6' : '#10b981'
          }}
        >
          <div className={`absolute -top-5 left-0 text-[8px] px-1 font-bold rounded ${obj.label === 'Car' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
            {obj.label} {(obj.conf * 100).toFixed(0)}%
          </div>
        </div>
      ))}

      <div className="absolute top-2 left-2 flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
        <span className="text-[10px] font-mono font-bold bg-black/60 px-2 py-0.5 rounded">SERGEK LIVE: CAM_402_GOLDEN</span>
      </div>
      
      <div className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/60 px-2 py-1 rounded">
        MODEL: YOLOv10n-Almaty
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VisionAI;
