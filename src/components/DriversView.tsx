/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  HelpCircle, 
  Trophy, 
  Award, 
  MapPin, 
  X, 
  ChevronLeft, 
  Zap, 
  PlusCircle, 
  BarChart, 
  CheckCircle,
  Flag
} from 'lucide-react';
import { useF1Store } from '../store/f1Store';
import { DRIVERS, TEAMS } from '../data/f1Data';
import { Driver } from '../types';

export default function DriversView() {
  const { 
    selectedDriverId, 
    selectDriver, 
    searchQuery, 
    setSearchQuery, 
    setView,
    selectTeam,
    selectedYear,
    historicalData
  } = useF1Store();

  // Selected Team local filter, plus Sorting states
  const [teamFilter, setTeamFilter] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<'points' | 'wins' | 'name'>('points');

  // Decide dynamically loaded year's competitor data
  const activeDrivers = selectedYear === '2026' ? DRIVERS : historicalData.drivers;
  const activeTeams = selectedYear === '2026' ? TEAMS : historicalData.teams;

  // Find active driver if selected
  const activeDriver = useMemo(() => {
    return activeDrivers.find(d => d.id === selectedDriverId) || null;
  }, [selectedDriverId, activeDrivers]);

  // Filter & Sort core logic
  const filteredDrivers = useMemo(() => {
    let result = [...activeDrivers];

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.nationality.toLowerCase().includes(q) ||
        d.teamName.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q)
      );
    }

    // Team filter
    if (teamFilter !== 'all') {
      result = result.filter(d => d.teamId === teamFilter);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'points') return b.points - a.points;
      if (sortBy === 'wins') return b.wins - a.wins;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [activeDrivers, searchQuery, teamFilter, sortBy]);

  // Team metadata lookup for the Active profile
  const activeDriverTeam = useMemo(() => {
    if (!activeDriver) return null;
    return activeTeams.find(t => t.id === activeDriver.teamId) || null;
  }, [activeDriver, activeTeams]);

  if (activeDriver) {
    // --- INDIVIDUAL DRIVER PROFILE PAGE ---
    return (
      <div className="space-y-8" id="driver-profile-view">
        {/* Navigation Breadcrumb bar */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => selectDriver(null)}
            className="group flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-wider transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-zinc-400 group-hover:text-red-605 transition-colors" />
            Back to Driver Directory
          </button>
          
          <div className="text-xs text-zinc-400 font-mono">
            CO-PILOT ID: <span className="text-red-600 font-bold">DRV_{activeDriver.code}</span>
          </div>
        </div>

        {/* Profile Premium Showcase Panel */}
        <div className="relative overflow-hidden bg-white border border-zinc-200 rounded-2xl shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-0" />
          
          {/* Subtle decoration paths */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-0" />

          <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 shrink-0 rounded-2xl overflow-hidden border-2 border-zinc-200 bg-zinc-50 shadow-md">
              <img 
                src={activeDriver.avatar} 
                alt={activeDriver.name} 
                className="w-full h-full object-cover filtering saturate-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 text-zinc-800 font-mono text-xs font-extrabold p-1 px-2.5 rounded-md border border-zinc-200 shadow-sm">
                #{activeDriver.number}
              </div>
            </div>

            <div className="space-y-4 text-center md:text-left flex-1">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-650 font-bold uppercase tracking-widest bg-zinc-100 p-1 px-3 rounded-full border border-zinc-200">
                  <span>{activeDriver.flag}</span>
                  <span>{activeDriver.nationality} Representative</span>
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mt-2 leading-none">
                  {activeDriver.name.toUpperCase()}
                </h1>
                <p className="text-sm font-semibold mt-1" style={{ color: activeDriver.teamColor }}>
                  {activeDriver.teamName} Constructor Squad
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 pt-2 border-t border-zinc-150 max-w-lg mx-auto md:mx-0">
                <div className="text-left">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block font-mono">DATE / PLACE OF BIRTH</span>
                  <span className="text-xs font-semibold text-zinc-650 block">{activeDriver.placeOfBirth}</span>
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block font-mono">CURRENT AGE</span>
                  <span className="text-xs font-semibold text-zinc-650 block">{activeDriver.age} Years Old</span>
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block font-mono">CURRENT CHAMP POSITION</span>
                  <span className="text-xs font-bold text-red-600 block font-mono">P5 Overall</span>
                </div>
              </div>

              <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl py-2">
                {activeDriver.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Career Stats Board */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: 'PODIUM FINISHES', value: activeDriver.podiums, note: 'Top 3 finishes', color: 'text-zinc-800' },
            { label: 'GRAND PRIX WINS', value: activeDriver.wins, note: 'Victory positions', color: 'text-red-600' },
            { label: 'POLE QUALIFICATIONS', value: activeDriver.poles, note: 'S1 grid spot', color: 'text-teal-655' },
            { label: 'WORLD TITLES', value: activeDriver.championships, note: 'Overall Crowns', color: 'text-amber-600' },
            { label: 'SEASON SCORE', value: `${activeDriver.points} pt`, note: 'Overall points', color: 'text-purple-650' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-zinc-200 p-4 rounded-xl text-center space-y-1 shadow-sm">
              <span className="text-[9px] text-zinc-400 font-bold tracking-wider block uppercase">{stat.label}</span>
              <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight block ${stat.color}`}>{stat.value}</span>
              <span className="text-[9px] text-zinc-500 leading-none font-semibold">{stat.note}</span>
            </div>
          ))}
        </div>

        {/* Detailed Career History & Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Historical Progression Table */}
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-extrabold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-4 w-4 text-red-650" /> CAREER STANDINGS RECAP
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-405 font-bold uppercase tracking-wider">
                    <th className="py-3 px-2">YEAR / SEASON</th>
                    <th className="py-3 px-2">TEAM CONSTRUCTOR</th>
                    <th className="py-3 px-2 text-right">POINTS ACHIEVED</th>
                    <th className="py-3 px-2 text-right">FINAL POS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {activeDriver.history.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50 text-zinc-600 transition-colors">
                      <td className="py-3 px-2 font-bold font-mono">{row.year}</td>
                      <td className="py-3 px-2 font-semibold text-zinc-805">{row.team}</td>
                      <td className="py-3 px-2 text-right font-mono font-bold text-zinc-800">{row.points} pts</td>
                      <td className="py-3 px-2 text-right font-bold">
                        <span className={`p-1 px-2.5 rounded font-mono ${row.position === 1 ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-zinc-100 text-zinc-600'}`}>
                          P{row.position}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Current 2026 Season row */}
                  <tr className="hover:bg-red-50/20 text-zinc-900 bg-red-50/5 font-semibold">
                    <td className="py-3 px-2 font-bold font-mono">2026 (Active)</td>
                    <td className="py-3 px-2 font-extrabold text-zinc-900">{activeDriver.teamName}</td>
                    <td className="py-3 px-2 text-right font-mono font-extrabold text-red-600">{activeDriver.points} pts</td>
                    <td className="py-3 px-2 text-right font-bold">
                      <span className="p-1 px-2.5 rounded font-mono bg-red-50 text-red-600 border border-red-200 animate-pulse">
                        P5
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Constructor Specs Summary card */}
          <div className="bg-white border border-zinc-200 p-5 rounded-xl space-y-5 shadow-sm">
            <h3 className="text-sm font-extrabold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-teal-600" /> CONSTRUCTOR INTEL
            </h3>

            {activeDriverTeam && (
              <div className="space-y-4">
                <div onClick={() => {
                  selectTeam(activeDriverTeam.id);
                  setView('teams');
                }} className="p-4 bg-zinc-50 hover:bg-zinc-100/90 transition-all border border-zinc-200 rounded-xl block cursor-pointer group">
                  <span className="text-[9px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">TEAM IDENTITY</span>
                  <span className="text-sm font-bold text-zinc-800 group-hover:text-red-600 transition-colors block mt-0.5">{activeDriverTeam.fullName}</span>
                  <span className="text-xs text-zinc-500 block">HQ Base: {activeDriverTeam.base}</span>
                </div>

                <div className="space-y-3 bg-zinc-50 p-4 border border-zinc-250/50 rounded-xl text-xs text-zinc-650">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-150">
                    <span>Active Chassis</span>
                    <span className="font-bold text-zinc-800 font-mono">{activeDriverTeam.chassis}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-150">
                    <span>Powerplant spec</span>
                    <span className="font-bold text-zinc-800 font-mono">{activeDriverTeam.powerUnit}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-150">
                    <span>Team Principal</span>
                    <span className="font-bold text-zinc-800">{activeDriverTeam.teamPrincipal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Constructor Rank</span>
                    <span className="font-bold text-red-600 font-mono">P{activeDriverTeam.worldRank}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- DRIVER DIRECTORY VIEW ---
  return (
    <div className="space-y-6" id="driver-directory-view">
      {/* Title & Stats description */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">DRIVER DIRECTORY</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Filter, search, and drill into {selectedYear} grid competitor profiles.</p>
        </div>

        {/* Sorting options */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-zinc-200 text-xs text-zinc-600 shrink-0 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-zinc-400 px-2 font-mono">Sort</span>
          {(['points', 'wins', 'name'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setSortBy(mode)}
              className={`p-1 px-2.5 rounded font-bold capitalize transition-all cursor-pointer ${sortBy === mode ? 'bg-zinc-100 border border-zinc-200 text-red-600' : 'hover:text-zinc-900'}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input 
            type="text"
            placeholder="Search driver name, team, race code, or nationality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-350 font-medium shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Team filter dropdown */}
        <div className="flex items-center bg-white border border-zinc-200 rounded-xl px-2 shrink-0 shadow-sm">
          <span className="text-[10px] font-bold text-zinc-400 px-2 uppercase font-mono">Squad</span>
          <select 
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="bg-transparent text-xs font-semibold text-zinc-655 py-2 pr-4 focus:outline-none cursor-pointer"
          >
            <option value="all">All Constructors</option>
            {activeTeams.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* GRID LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDrivers.map((driver) => (
          <motion.div
            key={driver.id}
            whileHover={{ y: -4 }}
            className="group relative bg-white hover:border-zinc-300 border border-zinc-200 rounded-2xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            onClick={() => selectDriver(driver.id)}
          >
            {/* Direct color strip identifier */}
            <div className="h-1.5 w-full" style={{ backgroundColor: driver.teamColor }} />

            {/* Content area */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="block text-[11px] font-bold text-zinc-400 font-mono">#{driver.number}</span>
                  <h3 className="text-sm font-extrabold text-zinc-850 tracking-wide mt-1 group-hover:text-red-650 transition-colors uppercase">
                    {driver.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-zinc-500 block mt-0.5">{driver.teamName}</span>
                </div>
                <span className="text-base text-zinc-500">{driver.flag}</span>
              </div>

              {/* Dynamic Image / Avatar area */}
              <div className="h-32 bg-zinc-50 border border-zinc-150 rounded-xl overflow-hidden relative shadow-inner">
                <img 
                  src={driver.avatar} 
                  alt={driver.name} 
                  className="w-full h-full object-cover filter brightness-95 saturate-110 group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                
                {/* Tech Code Overlay Tag */}
                <div className="absolute right-2 bottom-2 bg-white/95 border border-zinc-200 text-[10px] font-black text-zinc-800 font-mono rounded p-0.5 px-1.5 shadow-sm">
                  {driver.code}
                </div>
              </div>

              {/* Score breakdown metrics footer */}
              <div className="pt-2 border-t border-zinc-100 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-zinc-400 block uppercase font-bold tracking-wider font-mono">POINTS SECURED</span>
                  <span className="text-sm font-extrabold text-zinc-800 font-mono">{driver.points} PTS</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 block uppercase font-bold tracking-wider text-right font-mono">SEASON WINS</span>
                  <span className="text-sm font-bold text-red-600 font-mono text-right block">{driver.wins} Wins</span>
                </div>
              </div>

            </div>
          </motion.div>
        ))}

        {/* Empty state handler */}
        {filteredDrivers.length === 0 && (
          <div className="col-span-full bg-white border border-dashed border-zinc-200 p-12 text-center rounded-2xl shadow-inner">
            <HelpCircle className="h-8 w-8 text-zinc-400 mx-auto" />
            <h4 className="text-zinc-800 font-bold mt-2">Zero drivers matched query</h4>
            <p className="text-xs text-zinc-500 mt-1">Please clean search terms or choose alternate constructor teams.</p>
          </div>
        )}
      </div>
    </div>
  );
}
