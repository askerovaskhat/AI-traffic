
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Language } from '../types';
import { translations } from '../locales/translations';

interface AnalyticsProps {
  lang: Language;
}

const data = [
  { name: '08:00', traffic: 85, optimized: 65, air: 45 },
  { name: '10:00', traffic: 60, optimized: 40, air: 30 },
  { name: '12:00', traffic: 75, optimized: 50, air: 40 },
  { name: '14:00', traffic: 65, optimized: 45, air: 35 },
  { name: '16:00', traffic: 90, optimized: 68, air: 55 },
  { name: '18:00', traffic: 95, optimized: 72, air: 60 },
  { name: '20:00', traffic: 50, optimized: 35, air: 30 },
];

const Analytics: React.FC<AnalyticsProps> = ({ lang }) => {
  const t = translations[lang].analytics;

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold flex items-center gap-2">
            <i className="fas fa-car text-blue-400"></i>
            {t.trafficTitle}
          </h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">-22% Today</span>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Bar dataKey="traffic" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Static" />
              <Bar dataKey="optimized" fill="#10b981" radius={[4, 4, 0, 0]} name="AI Optimized" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold flex items-center gap-2">
            <i className="fas fa-wind text-cyan-400"></i>
            {t.airTitle}
          </h3>
          <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded">PM2.5 Sensor Array</span>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorAir" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Tooltip 
                 contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="air" stroke="#22d3ee" fillOpacity={1} fill="url(#colorAir)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-2 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-center justify-around">
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{t.co2}</p>
          <p className="text-3xl font-bold text-emerald-400">14.2 <span className="text-sm font-normal text-slate-400">{t.tons}</span></p>
        </div>
        <div className="w-px h-12 bg-slate-800"></div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{t.transit}</p>
          <p className="text-3xl font-bold text-blue-400">92% <span className="text-sm font-normal text-slate-400">{t.efficiency}</span></p>
        </div>
        <div className="w-px h-12 bg-slate-800"></div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{t.citizen}</p>
          <p className="text-3xl font-bold text-amber-400">4.9/5</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
