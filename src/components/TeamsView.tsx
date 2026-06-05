/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Building, 
  Wrench, 
  Trophy, 
  Award, 
  MapPin, 
  ChevronLeft, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  Bookmark
} from 'lucide-react';
import { useF1Store } from '../store/f1Store';
import { TEAMS, DRIVERS } from '../data/f1Data';
import { Team, Driver } from '../types';

export default function TeamsView() {
  const { 
    selectedTeamId, 
    selectTeam, 
    selectDriver, 
    setView, 
    searchQuery, 
    setSearchQuery,
    selectedYear,
    historicalData
  } = useF1Store();

  const activeTeams = selectedYear === '2026' ? TEAMS : historicalData.teams;
  const activeDrivers = selectedYear === '2026' ? DRIVERS : historicalData.drivers;

  const activeTeam = useMemo(() => {
    return activeTeams.find(t => t.id === selectedTeamId) || null;
  }, [selectedTeamId, activeTeams]);

  // Find active drivers of the team
  const activeTeamDrivers = useMemo(() => {
    if (!activeTeam) return [];
    return activeDrivers.filter(d => d.teamId === activeTeam.id || activeTeam.drivers?.includes(d.id));
  }, [activeTeam, activeDrivers]);

  // Filter team directory based on search queries
  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) return activeTeams;
    const q = searchQuery.toLowerCase();
    return activeTeams.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.fullName.toLowerCase().includes(q) ||
      t.base.toLowerCase().includes(q) ||
      t.powerUnit.toLowerCase().includes(q)
    );
  }, [activeTeams, searchQuery]);

  if (activeTeam) {
    // --- INDIVIDUAL TEAM / CONSTRUCTOR PROFILE PAGE ---
    return (
      <div className="space-y-8" id="team-profile-view">
        {/* Navigation bar */}
        <div className="flex items-center justify-between animate-smooth">
          <button 
            onClick={() => selectTeam(null)}
            className="group flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-950 uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 text-zinc-400 group-hover:text-red-650 transition-colors" />
            Back to Team Directory
          </button>
          <div className="text-xs text-zinc-450 font-mono">
            CONSTRUCTOR REGISTRATION: <span className="text-teal-600 font-bold">CNSTR_{activeTeam.name.toUpperCase()}</span>
          </div>
        </div>

        {/* Brand Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: activeTeam.color }} />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-0" />
          
          <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[9px] text-zinc-500 font-extrabold uppercase tracking-widest bg-zinc-100 p-1 px-3 rounded-md border border-zinc-200">
                ACTIVE MANUFACTURER
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 mt-1 uppercase leading-none">
                {activeTeam.fullName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 font-medium pt-1">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-zinc-400" /> {activeTeam.base}</span>
                <span className="hidden sm:inline text-zinc-200">•</span>
                <span className="flex items-center gap-1"><Cpu className="h-3.5 w-3.5 text-zinc-400" /> Power Unit: {activeTeam.powerUnit}</span>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 border border-zinc-250/50 rounded-xl text-center shrink-0 w-full md:w-auto shadow-sm">
              <span className="text-[9px] text-zinc-400 font-bold block uppercase tracking-wider">CONSTRUCTORS RANK</span>
              <span className="text-3xl font-black text-red-600 font-mono block mt-1">P{activeTeam.worldRank}</span>
              <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">{activeTeam.points} Season Points</span>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Column Data display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-smooth">
          
          {/* Main Info column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Biography */}
            <div className="bg-white border border-zinc-200 p-5 rounded-xl space-y-3 shadow-sm">
              <h3 className="text-xs font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-red-600" /> CONSTRUCTOR BIO OVERVIEW
              </h3>
              <p className="text-sm text-zinc-650 leading-relaxed font-normal">
                {activeTeam.bio}
              </p>
            </div>

            {/* Active Driver Lineup Pairings */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Building className="h-4 w-4 text-teal-605" /> ACTIVE DRIVE TEAM DUO
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {activeTeamDrivers.map((driver) => (
                  <div 
                    key={driver.id}
                    className="p-4 bg-white border border-zinc-205 rounded-xl hover:border-zinc-300 hover:bg-zinc-50 transition-all flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={driver.avatar} 
                        alt={driver.name} 
                        className="h-12 w-12 rounded-lg object-cover border border-zinc-200 shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-zinc-400">{driver.flag}</span>
                          <span className="text-sm font-bold text-zinc-900 group-hover:text-red-650 transition-colors uppercase">{driver.name}</span>
                        </div>
                        <span className="text-xs text-zinc-455 font-mono block">Car No. {driver.number}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        selectDriver(driver.id);
                        setView('drivers');
                      }}
                      className="p-1 px-3 bg-white border border-zinc-200 hover:border-zinc-350 rounded-lg text-xs font-bold text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                    >
                      Inspect <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical achievements */}
            <div className="bg-white border border-zinc-205 p-5 rounded-xl space-y-4 shadow-sm">
              <h3 className="text-xs font-extrabold text-zinc-505 uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-red-600" /> HISTORIC RANK SECTIONS
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-400 font-bold uppercase tracking-wider">
                      <th className="py-2 px-1">SEASON YEAR</th>
                      <th className="py-2 px-1 text-right">ACCUMULATED POINTS</th>
                      <th className="py-2 px-1 text-right">CONSTRUCTOR STANDING</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-150 text-zinc-650">
                    {activeTeam.history.map((row, i) => (
                      <tr key={i} className="hover:bg-zinc-50 transition-colors">
                        <td className="py-3 px-1 font-mono font-bold text-zinc-805">{row.year}</td>
                        <td className="py-3 px-1 text-right font-mono">{row.points} pts</td>
                        <td className="py-3 px-1 text-right">
                          <span className={`p-1 px-2.5 rounded font-mono font-bold ${row.position === 1 ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-zinc-100 text-zinc-500'}`}>
                            P{row.position}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column Specifications Sheet */}
          <div className="space-y-6">
            <div className="bg-white border border-zinc-200 p-5 rounded-xl space-y-4 shadow-sm">
              <h3 className="text-xs font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Wrench className="h-4 w-4 text-teal-650" /> CHASSIS & POWER SPECS
              </h3>

              <div className="space-y-3.5 text-xs text-zinc-500 font-semibold font-mono">
                <div className="flex justify-between items-center pb-2.5 border-b border-zinc-150">
                  <span>Chassis Design</span>
                  <span className="font-bold text-zinc-800">{activeTeam.chassis}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-zinc-150">
                  <span>Powerplant Units</span>
                  <span className="font-bold text-zinc-800">{activeTeam.powerUnit}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-zinc-150">
                  <span className="font-sans">Team Principal</span>
                  <span className="font-bold text-zinc-800 font-sans">{activeTeam.teamPrincipal}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-zinc-150">
                  <span className="font-sans">HQ Base Operations</span>
                  <span className="font-bold text-zinc-805 font-sans">{activeTeam.base}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-zinc-150">
                  <span>Qualifying Poles</span>
                  <span className="font-bold text-teal-600">{activeTeam.stats.polePositions} Poles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Official Fast Laps</span>
                  <span className="font-bold text-teal-600">{activeTeam.stats.fastestLaps} Flaps</span>
                </div>
              </div>
            </div>

            {/* Quick stats totals */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-zinc-200 p-4 rounded-xl text-center shadow-sm">
                <span className="text-[9px] text-zinc-400 font-bold block uppercase tracking-wider">TOTAL HISTORIC WINS</span>
                <span className="text-xl font-black text-red-650 font-mono block mt-1">{activeTeam.wins} GP</span>
              </div>
              <div className="bg-white border border-zinc-200 p-4 rounded-xl text-center shadow-sm">
                <span className="text-[9px] text-zinc-400 font-bold block uppercase tracking-wider">PODIUM FINISHES</span>
                <span className="text-xl font-black text-zinc-800 font-mono block mt-1">{activeTeam.podiums} Pods</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- TEAM DIRECTORY CATALOG VIEW ---
  return (
    <div className="space-y-6" id="team-catalogue">
      <div>
        <h1 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">CONSTRUCTOR DIRECTORY</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Explore the {selectedYear === '2026' ? '10 multi-million constructors operating' : `world-class constructor lineups that raced`} in the {selectedYear} season.</p>
      </div>

      {/* FILTER SEARCH BAR */}
      <div className="relative flex flex-col sm:flex-row gap-4">
        <input 
          type="text"
          placeholder="Filtering manufacturer base location, principal name, power units..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-350 font-medium shadow-sm"
        />
        <select 
          onChange={(e) => setSearchQuery(e.target.value === 'all' ? '' : e.target.value)}
          value={searchQuery || 'all'}
          className="bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-teal-605 font-bold cursor-pointer focus:outline-none shadow-sm"
        >
          <option value="all">Quick Select</option>
          {activeTeams.map(t => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* TEAMS GRID LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeams.map((team) => {
          // Identify drivers names
          const driversList = activeDrivers.filter(d => d.teamId === team.id || team.drivers?.includes(d.id));

          return (
            <motion.div
              key={team.id}
              whileHover={{ y: -3 }}
              className="group bg-white hover:border-zinc-300 border border-zinc-200 rounded-2xl p-5 flex flex-col justify-between space-y-6 cursor-pointer transition-all shadow-sm hover:shadow-md"
              onClick={() => selectTeam(team.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-xl ${team.logoBg} font-mono font-black text-white text-xs flex items-center justify-center border border-zinc-200 shadow-sm`}>
                    {team.name.slice(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-zinc-900 group-hover:text-red-600 transition-colors uppercase tracking-wide">
                      {team.name}
                    </h3>
                    <p className="text-[10px] uppercase font-bold text-zinc-405 tracking-wider font-mono">
                      Base HQ: {team.base}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">RANK</span>
                  <span className="text-lg font-mono font-extrabold text-red-600">P{team.worldRank}</span>
                </div>
              </div>

              {/* Drivers Lineup strip tags */}
              <div className="grid grid-cols-2 gap-3.5 bg-zinc-50 p-3 border border-zinc-150 rounded-xl">
                {driversList.map((driver) => (
                  <div key={driver.id} className="flex items-center gap-2">
                    <img 
                      src={driver.avatar} 
                      alt={driver.name} 
                      className="h-7 w-7 rounded object-cover border border-zinc-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <span className="text-xs font-bold text-zinc-700 block leading-tight truncate uppercase">{driver.name.split(' ')[1]}</span>
                      <span className="text-[9px] text-zinc-450 font-mono block leading-none">No. {driver.number}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specs and points line footer */}
              <div className="pt-4 border-t border-zinc-100 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-zinc-400 block uppercase font-bold tracking-wider font-mono animate-pulse-slow">POWERPLANT ENGINE</span>
                  <span className="font-semibold text-zinc-500 mt-0.5 block">{team.powerUnit}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-zinc-400 block uppercase font-bold tracking-wider font-mono">ACCUMULATED RECORD</span>
                  <span className="font-extrabold text-zinc-800 mt-0.5 block font-mono">{team.points} pts</span>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
