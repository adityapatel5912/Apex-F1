/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart2, 
  Users, 
  ArrowLeftRight, 
  TrendingUp, 
  Trophy, 
  Zap, 
  Activity, 
  Sliders,
  HelpCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart, 
  Bar, 
  Cell,
  AreaChart, 
  Area 
} from 'recharts';
import { useF1Store } from '../store/f1Store';
import { DRIVERS, TEAMS, RACE_LAP_DATAPOINTS } from '../data/f1Data';

export default function AnalyticsView() {
  const { selectedYear, historicalData } = useF1Store();

  // Pick dynamically loaded year's sets
  const activeDrivers = selectedYear === '2026' ? DRIVERS : historicalData.drivers;
  const activeTeams = selectedYear === '2026' ? TEAMS : historicalData.teams;

  // Simulator selection states
  const [driver1Id, setDriver1Id] = useState('');
  const [driver2Id, setDriver2Id] = useState('');

  const [team1Id, setTeam1Id] = useState('');
  const [team2Id, setTeam2Id] = useState('');

  // Default driver values based on selected season
  const defaultD1 = activeDrivers[0]?.id || 'unknown';
  const defaultD2 = activeDrivers[1]?.id || 'unknown';
  const defaultT1 = activeTeams[0]?.id || 'unknown';
  const defaultT2 = activeTeams[1]?.id || 'unknown';

  const d1Id = driver1Id || defaultD1;
  const d2Id = driver2Id || defaultD2;
  const t1Id = team1Id || defaultT1;
  const t2Id = team2Id || defaultT2;

  // Find simulated references
  const d1 = useMemo(() => activeDrivers.find(d => d.id === d1Id) || activeDrivers[0] || { id: 'unknown', name: 'N/A', code: 'N/A', teamName: 'N/A', flag: '🏁', championships: 0, points: 0, wins: 0, poles: 0, podiums: 0, age: 0, avatar: '' }, [d1Id, activeDrivers]);
  const d2 = useMemo(() => activeDrivers.find(d => d.id === d2Id) || activeDrivers[1] || d1, [d2Id, activeDrivers, d1]);

  const t1 = useMemo(() => activeTeams.find(t => t.id === t1Id) || activeTeams[0] || { id: 'unknown', name: 'N/A', fullName: 'N/A', base: 'N/A', points: 0, championships: 0, wins: 0, podiums: 0, logoBg: 'bg-zinc-800', stats: { polePositions: 0, fastestLaps: 0 } }, [t1Id, activeTeams]);
  const t2 = useMemo(() => activeTeams.find(t => t.id === t2Id) || activeTeams[1] || t1, [t2Id, activeTeams, t1]);

  // Points history datasets formatted for Recharts
  // Let's take the Top 5 drivers points progressions
  const pointsProgressionData = useMemo(() => {
    // Generate race-by-race accumulated points data
    const racesCount = selectedYear === '2026' ? 10 : 8;
    const progress: any[] = [];
    
    // Core candidates
    const candidates = activeDrivers.slice(0, 5);

    let acc: { [key: string]: number } = {};
    candidates.forEach(c => { acc[c.code] = 0; });

    for (let i = 0; i < racesCount; i++) {
      const dataPoint: any = { name: `Round ${i + 1}` };
      candidates.forEach(c => {
        const pointsThisRace = c.seasonProgress?.[i] || Math.round(c.points / racesCount);
        acc[c.code] += pointsThisRace;
        dataPoint[c.code] = acc[c.code];
      });
      progress.push(dataPoint);
    }

    return progress;
  }, [selectedYear, activeDrivers]);

  // Format wins distribution chart data
  const winsShareData = useMemo(() => {
    return activeDrivers.filter(d => d.wins >= 0).slice(0, 8).map(d => ({
      name: d.code,
      Wins: d.wins || 0,
      fill: d.teamColor || '#ef4444'
    }));
  }, [activeDrivers]);

  return (
    <div className="space-y-8 animate-smooth" id="analytics-portal">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">ADVANCED ANALYTICS CABINET</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Simulate side-by-side performance records, chart accumulated score progressions, and explore track lap telemetry graphs.</p>
      </div>

      {/* --- COMPARATIVE SIMULATOR SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* DRIVERS INTERACTIVE COMPARER */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-extrabold text-zinc-750 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <ArrowLeftRight className="h-4 w-4 text-red-600" /> DRIVER COMPARISON INTERFACE
            </h3>
            <span className="text-[10px] font-bold text-zinc-400 font-mono">ID: COMPARE_DRV</span>
          </div>

          {/* Menus Selectors */}
          <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-3.5 border border-zinc-150 rounded-xl">
            <div className="space-y-1">
              <label className="text-[9px] text-zinc-450 font-bold block uppercase tracking-wider">DRIVER COMP A</label>
              <select
                value={driver1Id || d1Id}
                onChange={(e) => setDriver1Id(e.target.value)}
                className="w-full bg-white text-xs font-bold text-zinc-800 p-2 rounded-lg border border-zinc-200 cursor-pointer focus:outline-none shadow-xs hover:border-zinc-300"
              >
                {activeDrivers.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-zinc-455 font-bold block uppercase tracking-wider">DRIVER COMP B</label>
              <select
                value={driver2Id || d2Id}
                onChange={(e) => setDriver2Id(e.target.value)}
                className="w-full bg-white text-xs font-bold text-zinc-800 p-2 rounded-lg border border-zinc-200 cursor-pointer focus:outline-none shadow-xs hover:border-zinc-300"
              >
                {activeDrivers.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Side-by-Side overlay matrix */}
          <div className="space-y-3 pt-2 text-xs">
            {/* Headers row */}
            <div className="flex justify-between items-center text-center font-bold pb-2 border-b border-zinc-150">
              <div className="w-1/3 text-left">
                <span className="block text-zinc-900 uppercase font-black text-sm">{d1.code}</span>
                <span className="text-[9px] text-zinc-450 font-bold truncate block">{d1.teamName}</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-extrabold uppercase w-1/3 font-mono">VS COMPARATOR</span>
              <div className="w-1/3 text-right">
                <span className="block text-zinc-900 uppercase font-black text-sm">{d2.code}</span>
                <span className="text-[9px] text-zinc-450 font-bold truncate block">{d2.teamName}</span>
              </div>
            </div>

            {/* Matrix Metrics */}
            {[
              { label: 'TITLES CHAMPIONSHIPS', val1: d1.championships, val2: d2.championships, hl1: d1.championships > d2.championships, hl2: d2.championships > d1.championships },
              { label: 'SEASON SCORE POINTS', val1: d1.points, val2: d2.points, hl1: d1.points > d2.points, hl2: d2.points > d1.points },
              { label: 'GRAND PRIX WINS', val1: d1.wins, val2: d2.wins, hl1: d1.wins > d2.wins, hl2: d2.wins > d1.wins },
              { label: 'POLE QUALIFICATIONS', val1: d1.poles, val2: d2.poles, hl1: d1.poles > d2.poles, hl2: d2.poles > d1.poles },
              { label: 'PODIUM RECORDS', val1: d1.podiums, val2: d2.podiums, hl1: d1.podiums > d2.podiums, hl2: d2.podiums > d1.podiums },
              { label: 'BIOMETRIC AGE', val1: `${d1.age} yrs`, val2: `${d2.age} yrs`, hl1: d1.age < d2.age, hl2: d2.age < d1.age },
            ].map((row, idx) => (
              <div key={idx} className="flex justify-between items-center text-center py-2.5 border-b border-zinc-100 text-xs">
                <span className={`w-1/3 text-left font-mono font-extrabold text-sm ${row.hl1 ? 'text-emerald-600' : 'text-zinc-500'}`}>{row.val1}</span>
                <span className="text-[9px] text-zinc-400 font-extrabold uppercase w-1/3 font-mono">{row.label}</span>
                <span className={`w-1/3 text-right font-mono font-extrabold text-sm ${row.hl2 ? 'text-emerald-600' : 'text-zinc-500'}`}>{row.val2}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRUCTORS INTERACTIVE COMPARER */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-extrabold text-zinc-750 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Users className="h-4 w-4 text-teal-605" /> CONSTRUCTOR COMPARISON INTERFACE
            </h3>
            <span className="text-[10px] font-bold text-zinc-400 font-mono">ID: COMPARE_CON</span>
          </div>

          {/* Menus Selectors */}
          <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-3.5 border border-zinc-150 rounded-xl">
            <div className="space-y-1">
              <label className="text-[9px] text-zinc-450 font-bold block uppercase tracking-wider">CONSTRUCTOR A</label>
              <select
                value={team1Id || t1Id}
                onChange={(e) => setTeam1Id(e.target.value)}
                className="w-full bg-white text-xs font-bold text-zinc-800 p-2 rounded-lg border border-zinc-200 cursor-pointer focus:outline-none shadow-xs hover:border-zinc-300"
              >
                {activeTeams.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-zinc-455 font-bold block uppercase tracking-wider">CONSTRUCTOR B</label>
              <select
                value={team2Id || t2Id}
                onChange={(e) => setTeam2Id(e.target.value)}
                className="w-full bg-white text-xs font-bold text-zinc-800 p-2 rounded-lg border border-zinc-200 cursor-pointer focus:outline-none shadow-xs hover:border-zinc-300"
              >
                {activeTeams.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Side-by-Side overlay constructor matrix */}
          <div className="space-y-3 pt-2 text-xs">
            {/* Headers row */}
            <div className="flex justify-between items-center text-center font-bold pb-2 border-b border-zinc-150">
              <div className="w-1/3 text-left">
                <span className="block text-zinc-900 uppercase font-black text-sm">{t1.name}</span>
                <span className="text-[9px] text-zinc-450 font-bold truncate block">{t1.fullName}</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-extrabold uppercase w-1/3 font-mono">VS COMPARATOR</span>
              <div className="w-1/3 text-right">
                <span className="block text-zinc-900 uppercase font-black text-sm">{t2.name}</span>
                <span className="text-[9px] text-zinc-450 font-bold truncate block">{t2.fullName}</span>
              </div>
            </div>

            {/* Matrix Metrics */}
            {[
              { label: 'CHAMPIONSHIP CUPS', val1: t1.championships, val2: t2.championships, hl1: t1.championships > t2.championships, hl2: t2.championships > t1.championships },
              { label: 'POINTS SCORE', val1: t1.points, val2: t2.points, hl1: t1.points > t2.points, hl2: t2.points > t1.points },
              { label: 'HISTORICAL GP WINS', val1: t1.wins, val2: t2.wins, hl1: t1.wins > t2.wins, hl2: t2.wins > t1.wins },
              { label: 'POLE QUALIFICATIONS', val1: t1.stats.polePositions, val2: t2.stats.polePositions, hl1: t1.stats.polePositions > t2.stats.polePositions, hl2: t2.stats.polePositions > t1.stats.polePositions },
              { label: 'OVERALL GRID RANK', val1: `P${t1.worldRank}`, val2: `P${t2.worldRank}`, hl1: t1.worldRank < t2.worldRank, hl2: t2.worldRank < t1.worldRank },
            ].map((row, idx) => (
              <div key={idx} className="flex justify-between items-center text-center py-2.5 border-b border-zinc-100 text-xs">
                <span className={`w-1/3 text-left font-mono font-extrabold text-sm ${row.hl1 ? 'text-emerald-600' : 'text-zinc-500'}`}>{row.val1}</span>
                <span className="text-[9px] text-zinc-400 font-extrabold uppercase w-1/3 font-mono">{row.label}</span>
                <span className={`w-1/3 text-right font-mono font-extrabold text-sm ${row.hl2 ? 'text-emerald-600' : 'text-zinc-500'}`}>{row.val2}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- RECHARTS POWERFUL DATA VISUALIZATIONS ROWS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Graph 1: Season Points Progression Chart */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <TrendingUp className="h-4 w-4 text-emerald-600" /> POINTS ACCUMULATION CURVES (R1-R10)
            </h3>
            <span className="text-[10px] text-zinc-400 font-bold font-mono">Formula 1 timeline</span>
          </div>

          <div className="h-64 select-none">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pointsProgressionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={10} fontStyle="bold" />
                <YAxis stroke="#a1a1aa" fontSize={10} fontStyle="bold" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
                  labelStyle={{ color: '#09090b', fontWeight: 'black' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="VER" stroke="#005AFF" strokeWidth={3.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="NOR" stroke="#FF8000" strokeWidth={3.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="LEC" stroke="#E80020" strokeWidth={3.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="PIA" stroke="#10b981" strokeWidth={2} dot={{ r: 1 }} />
                <Line type="monotone" dataKey="HAM" stroke="#71717a" strokeWidth={2} dot={{ r: 1 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2: Wins share Distribution */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest flex items-center gap-1.5 font-mono">
              <Trophy className="h-4 w-4 text-amber-500" /> COMPETITOR GP WINS WEIGHTS
            </h3>
            <span className="text-[10px] text-zinc-400 font-bold font-mono">Win shares</span>
          </div>

          <div className="h-64 select-none">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={winsShareData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={10} />
                <YAxis stroke="#a1a1aa" fontSize={10} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="Wins" radius={[4, 4, 0, 0]}>
                  {winsShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* --- TELEMETRY GRAPHICS FOR ACTIVE LAP PROGRESSION --- */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-wide flex items-center gap-1.5 font-mono">
              <Activity className="h-4 w-4 text-red-600 animate-pulse" /> SECTOR LAP TIME GAP GAUGE (SILVERSTONE TELEMETRY)
            </h3>
            <p className="text-[10px] text-zinc-500">Overlay time gaps (seconds) relative to the active race leader across 57 telemetry lap nodes.</p>
          </div>
          <span className="text-[9px] text-zinc-500 font-mono bg-zinc-50 p-1 px-2.5 rounded border border-zinc-200 shadow-xs font-extrabold uppercase">STREAMING PRO MODE</span>
        </div>

        <div className="h-64 select-none">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={RACE_LAP_DATAPOINTS}>
              <defs>
                <gradient id="colorVer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#005AFF" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#005AFF" stopOpacity={0} />
                </gradient>
                <gradient id="colorLec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E80020" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#E80020" stopOpacity={0} />
                </gradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis dataKey="lap" stroke="#a1a1aa" label={{ value: 'Race Lap Count', position: 'insideBottom', offset: -5, fill: '#71717a', fontSize: 10, fontWeight: 'bold' }} />
              <YAxis stroke="#a1a1aa" label={{ value: 'Gap to Leader (s)', angle: -90, position: 'insideLeft', fill: '#71717a', fontSize: 10, fontWeight: 'bold' }} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }} />
              <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
              <Area type="monotone" dataKey="VER" stroke="#005AFF" fillOpacity={1} fill="url(#colorVer)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="LEC" stroke="#E80020" fillOpacity={1} fill="url(#colorLec)" strokeWidth={2.5} />
              <Line type="monotone" dataKey="NOR" stroke="#FF8000" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
