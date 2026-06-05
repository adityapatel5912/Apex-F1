/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Search, 
  ArrowUpRight, 
  X, 
  Award, 
  HelpCircle,
  Users
} from 'lucide-react';
import { useF1Store } from '../store/f1Store';
import { DRIVERS, TEAMS } from '../data/f1Data';

export default function StandingsView() {
  const { standingsTab, setStandingsTab, selectDriver, selectTeam, setView, selectedYear, historicalData } = useF1Store();
  const [search, setSearch] = useState('');
  
  // Decide datasource based on selected global season year
  const activeDrivers = selectedYear === '2026' ? DRIVERS : historicalData.drivers;
  const activeTeams = selectedYear === '2026' ? TEAMS : historicalData.teams;

  // Sorting local parameters
  const [sortField, setSortField] = useState<'points' | 'wins' | 'name'>('points');
  const [sortAsc, setSortAsc] = useState(false);

  const toggleSort = (field: 'points' | 'wins' | 'name') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Drivers Standings computed calculations
  const driverStandings = useMemo(() => {
    let list = [...activeDrivers];
    
    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.teamName.toLowerCase().includes(q) ||
        d.nationality.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q)
      );
    }

    // Sort order
    list.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'points') comparison = a.points - b.points;
      else if (sortField === 'wins') comparison = a.wins - b.wins;
      else if (sortField === 'name') comparison = a.name.localeCompare(b.name);

      return sortAsc ? comparison : -comparison;
    });

    return list;
  }, [activeDrivers, search, sortField, sortAsc]);

  // Constructors Standings computed calculations
  const constructorStandings = useMemo(() => {
    let list = [...activeTeams];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t => 
        t.fullName.toLowerCase().includes(q) ||
        t.base.toLowerCase().includes(q) ||
        t.powerUnit.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'points') comparison = a.points - b.points;
      else if (sortField === 'wins') comparison = a.wins - b.wins;
      else if (sortField === 'name') comparison = a.name.localeCompare(b.name);

      return sortAsc ? comparison : -comparison;
    });

    return list;
  }, [activeTeams, search, sortField, sortAsc]);

  return (
    <div className="space-y-6" id="championship-standings">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">WORLD CHAMPIONSHIPS</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Explore active point distributions, constructor values, and global grids.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-zinc-100 border border-zinc-200 p-1 rounded-xl shrink-0">
          <button
            onClick={() => {
              setStandingsTab('drivers');
              setSearch('');
            }}
            className={`p-2 px-4 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${standingsTab === 'drivers' ? 'bg-white text-red-600 shadow-xs ring-1 ring-zinc-200/50' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            <Trophy className="h-3.5 w-3.5" />
            DRIVERS SQUAD
          </button>
          <button
            onClick={() => {
              setStandingsTab('constructors');
              setSearch('');
            }}
            className={`p-2 px-4 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${standingsTab === 'constructors' ? 'bg-white text-red-600 shadow-xs ring-1 ring-zinc-200/50' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            <Users className="h-3.5 w-3.5" />
            CONSTRUCTORS
          </button>
        </div>
      </div>

      {/* FILTER SEARCH INPUT */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
        <input 
          type="text"
          placeholder={standingsTab === 'drivers' ? "Search driver name, nationality, or racing code..." : "Search constructors, bases, engine spec..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-10 py-3 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-350 font-medium shadow-sm"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* INTERACTIVE TABLE CONTENT */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm animate-smooth">
        {standingsTab === 'drivers' ? (
          /* --- DRIVERS TABLE --- */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider">
                  <th className="py-4 px-4 text-center w-16">RANK</th>
                  <th className="py-4 px-3 cursor-pointer hover:text-zinc-900 transition-colors" onClick={() => toggleSort('name')}>
                    DRIVERS COMPETITOR {sortField === 'name' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th className="py-4 px-3 hidden sm:table-cell">NATIONALITY</th>
                  <th className="py-4 px-3 cursor-pointer hover:text-zinc-900 transition-colors text-right" onClick={() => toggleSort('wins')}>
                    WINS {sortField === 'wins' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th className="py-4 px-3 text-right hidden sm:table-cell">PODIUMS</th>
                  <th className="py-4 px-4 cursor-pointer hover:text-zinc-900 transition-colors text-right font-mono" onClick={() => toggleSort('points')}>
                    POINTS {sortField === 'points' && (sortAsc ? '▲' : '▼')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                {driverStandings.map((driver, index) => {
                  // Find real rank in overall DRIVERS table (not local filtered index)
                  const overallRank = activeDrivers.findIndex(d => d.id === driver.id) + 1;

                  return (
                    <tr 
                      key={driver.id}
                      className="hover:bg-zinc-50/85 transition-all cursor-pointer text-xs"
                      onClick={() => {
                        selectDriver(driver.id);
                        setView('drivers');
                      }}
                    >
                      {/* Rank item */}
                      <td className="py-4 px-4 text-center">
                        {overallRank === 1 ? (
                          <span className="inline-flex h-6 w-6 rounded bg-amber-50 text-amber-600 font-bold items-center justify-center border border-amber-200 font-mono text-[10px] shadow-xs">1</span>
                        ) : overallRank === 2 ? (
                          <span className="inline-flex h-6 w-6 rounded bg-zinc-100 text-zinc-650 font-bold items-center justify-center border border-zinc-200/80 font-mono text-[10px] shadow-xs">2</span>
                        ) : overallRank === 3 ? (
                          <span className="inline-flex h-6 w-6 rounded bg-amber-100/60 text-amber-800 font-bold items-center justify-center border border-amber-250/50 font-mono text-[10px] shadow-xs">3</span>
                        ) : (
                          <span className="font-mono text-zinc-400 font-bold">{overallRank}</span>
                        )}
                      </td>

                      {/* Driver description */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <span className="h-3 w-1 rounded-full" style={{ backgroundColor: driver.teamColor }} />
                          <img 
                            src={driver.avatar} 
                            alt={driver.name} 
                            className="h-8 w-8 rounded-lg object-cover border border-zinc-200 shadow-xs"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="text-zinc-900 font-bold tracking-wide hover:text-red-650 transition-colors uppercase block sm:inline">{driver.name}</span>
                            <span className="text-[10px] font-mono text-zinc-400 sm:ml-1.5 uppercase font-bold">({driver.code})</span>
                            <span className="block text-[10px] text-zinc-450 font-bold mt-0.5 sm:hidden">{driver.teamName}</span>
                            <span className="hidden sm:inline text-[10px] text-zinc-455 font-bold ml-2">• {driver.teamName}</span>
                          </div>
                        </div>
                      </td>

                      {/* Nationality */}
                      <td className="py-4 px-3 hidden sm:table-cell text-zinc-500 font-medium">
                        <span className="mr-1.5">{driver.flag}</span>
                        {driver.nationality}
                      </td>

                      {/* Wins */}
                      <td className="py-4 px-3 text-right font-mono font-bold text-zinc-700">
                        {driver.wins || '0'}
                      </td>

                      {/* Podiums */}
                      <td className="py-4 px-3 text-right font-mono text-zinc-500 hidden sm:table-cell">
                        {driver.podiums || '0'}
                      </td>

                      {/* Ultimate points */}
                      <td className="py-4 px-4 text-right font-mono font-extrabold text-zinc-900 text-sm">
                        {driver.points} <span className="text-[10px] text-zinc-400 font-medium">pts</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* --- CONSTRUCTORS TABLE --- */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider">
                  <th className="py-4 px-4 text-center w-16">RANK</th>
                  <th className="py-4 px-3 cursor-pointer hover:text-zinc-900 transition-colors" onClick={() => toggleSort('name')}>
                    CONSTRUCTOR MANUFACTURER {sortField === 'name' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th className="py-4 px-3 hidden sm:table-cell">HEADQUARTERS BASE</th>
                  <th className="py-4 px-3 cursor-pointer hover:text-zinc-900 transition-colors text-right" onClick={() => toggleSort('wins')}>
                    TOTAL GP WINS {sortField === 'wins' && (sortAsc ? '▲' : '▼')}
                  </th>
                  <th className="py-4 px-3 text-right hidden sm:table-cell">TOTAL PODIUMS</th>
                  <th className="py-4 px-4 text-right cursor-pointer hover:text-zinc-900 transition-colors font-mono" onClick={() => toggleSort('points')}>
                    SEASON SCORE {sortField === 'points' && (sortAsc ? '▲' : '▼')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-600">
                {constructorStandings.map((team, index) => {
                  const overallRank = activeTeams.findIndex(t => t.id === team.id) + 1;

                  return (
                    <tr 
                      key={team.id}
                      className="hover:bg-zinc-50/85 transition-all text-zinc-650 cursor-pointer text-xs"
                      onClick={() => {
                        selectTeam(team.id);
                        setView('teams');
                      }}
                    >
                      {/* Rank icon */}
                      <td className="py-4 px-4 text-center">
                        {overallRank === 1 ? (
                          <span className="inline-flex h-6 w-6 rounded bg-amber-50 text-amber-600 font-bold items-center justify-center border border-amber-200 font-mono text-[10px] shadow-xs">1</span>
                        ) : overallRank === 2 ? (
                          <span className="inline-flex h-6 w-6 rounded bg-zinc-100 text-zinc-650 font-bold items-center justify-center border border-zinc-200/80 font-mono text-[10px] shadow-xs">2</span>
                        ) : overallRank === 3 ? (
                          <span className="inline-flex h-6 w-6 rounded bg-amber-100/60 text-amber-800 font-bold items-center justify-center border border-amber-250/50 font-mono text-[10px] shadow-xs">3</span>
                        ) : (
                          <span className="font-mono text-zinc-400 font-bold">{overallRank}</span>
                        )}
                      </td>

                      {/* Visual constructor */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <span className="h-6 w-1 rounded-full" style={{ backgroundColor: team.color }} />
                          <div className={`h-8 w-8 rounded ${team.logoBg} font-mono font-black text-white text-[10px] flex items-center justify-center border border-zinc-100 shadow-sm shrink-0`}>
                            {team.name.slice(0, 3).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-zinc-900 font-bold tracking-wide hover:text-red-650 transition-colors uppercase block">{team.fullName}</span>
                            <span className="text-[10px] text-zinc-450 font-bold mt-0.5 sm:hidden">{team.powerUnit} powertrain</span>
                            <span className="hidden sm:inline text-[10px] text-zinc-450 font-semibold font-mono">• Engine Unit: {team.powerUnit}</span>
                          </div>
                        </div>
                      </td>

                      {/* HQ location */}
                      <td className="py-4 px-3 text-zinc-500 hidden sm:table-cell">
                        {team.base}
                      </td>

                      {/* Wins */}
                      <td className="py-4 px-3 text-right font-mono font-bold text-zinc-700">
                        {team.wins}
                      </td>

                      {/* Podiums */}
                      <td className="py-4 px-3 text-right font-mono text-zinc-500 hidden sm:table-cell">
                        {team.podiums}
                      </td>

                      {/* Season Score */}
                      <td className="py-4 px-4 text-right font-mono font-extrabold text-zinc-900 text-sm">
                        {team.points} <span className="text-[10px] text-zinc-400 font-medium font-mono">pts</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty matching filters state */}
        {((standingsTab === 'drivers' && driverStandings.length === 0) || 
          (standingsTab === 'constructors' && constructorStandings.length === 0)) && (
          <div className="p-12 text-center text-zinc-400 font-bold">
            <HelpCircle className="h-8 w-8 text-zinc-300 mx-auto mb-2" />
            No records match selected parameters.
          </div>
        )}
      </div>
    </div>
  );
}
