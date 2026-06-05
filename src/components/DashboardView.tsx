/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Zap, 
  Compass, 
  Sliders, 
  BarChart2, 
  Users 
} from 'lucide-react';
import { useF1Store } from '../store/f1Store';
import { DRIVERS, TEAMS, RACES } from '../data/f1Data';

export default function DashboardView() {
  const { setView, selectDriver, selectTeam, selectedYear, historicalData } = useF1Store();
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 2, minutes: 1, seconds: 22 });

  // Decide active data sources
  const activeDrivers = selectedYear === '2026' ? DRIVERS : historicalData.drivers;
  const activeTeams = selectedYear === '2026' ? TEAMS : historicalData.teams;
  const activeRaces = selectedYear === '2026' ? RACES : historicalData.races;

  // Live countdown calculation to Silverstone GP on July 5, 2026
  useEffect(() => {
    const targetDate = new Date('2026-07-05T14:00:00Z').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Leaders compute
  const driverLeader = activeDrivers.length > 0 
    ? activeDrivers.reduce((prev, current) => (prev.points > current.points ? prev : current), activeDrivers[0])
    : null;
  const constructorLeader = activeTeams.length > 0
    ? activeTeams.reduce((prev, current) => (prev.points > current.points ? prev : current), activeTeams[0])
    : null;

  const completedRaces = activeRaces.filter((r) => r.status === 'Completed');
  const recentRace = completedRaces.length > 0 ? completedRaces[completedRaces.length - 1] : null;
  const upcomingRaces = selectedYear === '2026'
    ? activeRaces.filter((r) => r.status === 'Upcoming').slice(0, 3)
    : activeRaces.slice(0, 3);

  // Fallbacks for empty states
  const fallbackDriver = { 
    id: 'unknown', 
    name: 'No Competitors Selected', 
    teamName: 'N/A', 
    avatar: 'https://images.unsplash.com/photo-1542909168-82c357fd4aea?auto=format&fit=crop&q=80&w=300', 
    points: 0, 
    wins: 0, 
    flag: '🏁', 
    championships: 0, 
    bio: '',
    nationality: 'N/A',
    number: 0,
    code: 'N/A',
    teamId: 'unknown',
    teamColor: '#7a7a7a',
    podiums: 0,
    poles: 0,
    age: 25,
    placeOfBirth: 'N/A',
    history: [] as any[],
    seasonProgress: [] as number[]
  };
  const fallbackTeam = { id: 'unknown', name: 'N/A', fullName: 'No Manufacturers Selected', base: 'N/A', points: 0, championships: 0, logoBg: 'bg-zinc-805', teamPrincipal: 'N/A', chassis: 'N/A', powerUnit: 'N/A', color: '#7a7a7a', wins: 0, podiums: 0, worldRank: 1, drivers: [] as string[], bio: '', history: [] as any[], stats: { fastestLaps: 0, polePositions: 0 } };

  const dLeader = driverLeader || fallbackDriver;
  const cLeader = constructorLeader || fallbackTeam;

  // Featured sections
  const featuredDriver = activeDrivers.find(d => d.id === 'hamilton') || activeDrivers[0] || fallbackDriver;
  const featuredTeam = activeTeams.find(t => t.id === 'ferrari') || activeTeams[0] || fallbackTeam;

  return (
    <div className="space-y-8" id="dashboard-view">
      {/* Top Banner (Hero Section) */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-teal-500/5" />
        <div className="absolute top-0 right-0 h-full w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-100 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle decorative background patterns - Technical Carbon grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:14px_14px]" />

        <div className="relative p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-semibold text-red-600 uppercase tracking-widest">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              {selectedYear === '2026' ? 'Live Season Status' : `${selectedYear} Historical Season`}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              APEX<span className="text-red-600">F1</span> TELEMETRY PLATFORM
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
              Explore custom driver comparative engines, team dynamic profiles, track layout analytics, and deep sector statistics built for the {selectedYear === '2026' ? 'fully optimized 2026 regulation era' : `historic ${selectedYear} Formula One championship season`}.
            </p>
          </div>

          {/* Conditional banner block based on selectedYear */}
          {selectedYear !== '2026' ? (
            <div className="w-full lg:w-auto bg-zinc-50 border border-zinc-200 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-lg bg-red-50 text-red-600">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider">CHAMPIONSHIP SUMMARY</span>
                  <span className="text-xs font-bold text-zinc-800">{selectedYear} Season Stats</span>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-zinc-200" />

              <div className="flex gap-4">
                <div className="text-center min-w-[70px]">
                  <span className="block text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono">ROUNDS</span>
                  <span className="text-sm font-black text-zinc-800 font-mono">{activeRaces.length} GP</span>
                </div>
                <div className="text-center min-w-[100px]">
                  <span className="block text-[9px] text-zinc-405 font-bold uppercase tracking-wider font-mono text-zinc-400">CHAMPION P1</span>
                  <span className="text-sm font-black text-red-650 truncate max-w-[110px] block">{dLeader.name}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Premium Countdown Clock */
            <div className="w-full lg:w-auto bg-zinc-50 border border-zinc-200 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-lg bg-red-50 text-red-600">
                  <Clock className="h-5 w-5 animate-spin" style={{ animationDuration: '60s' }} />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider">NEXT GRAND PRIX</span>
                  <span className="text-sm font-semibold text-zinc-800">Silverstone GP</span>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-zinc-200" />

              <div className="flex items-center gap-3">
                {[
                  { label: 'D', value: timeLeft.days },
                  { label: 'H', value: timeLeft.hours },
                  { label: 'M', value: timeLeft.minutes },
                  { label: 'S', value: timeLeft.seconds }
                ].map((t, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-12 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center font-mono text-base font-bold text-zinc-800 shadow-sm">
                      {String(t.value).padStart(2, '0')}
                    </div>
                    <span className="text-[9px] text-zinc-400 mt-1 font-bold">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Overview Widgets / Leaders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Driver Leader Card */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white border border-zinc-200 p-5 rounded-xl hover:border-zinc-350 hover:shadow-md transition-all cursor-pointer relative overflow-hidden shadow-sm"
          onClick={() => {
            if (dLeader.id !== 'unknown') {
              selectDriver(dLeader.id);
              setView('drivers');
            }
          }}
        >
          <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none transform translate-x-4 translate-y-4">
            <Trophy className="h-32 w-32 text-zinc-900" />
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">DRIVERS CHAMPIONSHIP LEADER</span>
            <Trophy className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            {dLeader.avatar && (
              <img 
                src={dLeader.avatar} 
                alt={dLeader.name} 
                className="h-12 w-12 rounded-lg object-cover border border-zinc-200"
                referrerPolicy="no-referrer"
              />
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-zinc-400">{dLeader.flag}</span>
                <span className="font-semibold text-zinc-800 tracking-wide">{dLeader.name}</span>
              </div>
              <span className="text-xs font-medium text-zinc-400 block">{dLeader.teamName}</span>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-zinc-100 flex justify-between items-end">
            <div>
              <span className="text-[9px] text-zinc-400 block font-bold uppercase tracking-wider">TOTAL POINTS</span>
              <span className="text-xl font-bold text-zinc-800 font-mono">{dLeader.points} pts</span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-400 block font-bold uppercase tracking-wider text-right">TOTAL WINS</span>
              <span className="text-lg font-bold text-red-600 font-mono text-right block">{dLeader.wins} Wins</span>
            </div>
          </div>
        </motion.div>

        {/* Constructor Leader Card */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white border border-zinc-200 p-5 rounded-xl hover:border-zinc-350 hover:shadow-md transition-all cursor-pointer relative overflow-hidden shadow-sm"
          onClick={() => {
            if (cLeader.id !== 'unknown') {
              selectTeam(cLeader.id);
              setView('teams');
            }
          }}
        >
          <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none transform translate-x-4 translate-y-4">
            <Trophy className="h-32 w-32 text-zinc-900" />
          </div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">CONSTRUCTORS LEADER</span>
            <TrendingUp className="h-4 w-4 text-teal-600" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className={`h-11 w-11 rounded-lg ${cLeader.logoBg} flex items-center justify-center font-bold text-white text-xs`}>
              {cLeader.name.slice(0, 3).toUpperCase()}
            </div>
            <div>
              <span className="font-semibold text-zinc-800 tracking-wide block">{cLeader.fullName}</span>
              <span className="text-xs font-medium text-zinc-400 block">Base: {cLeader.base}</span>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-zinc-100 flex justify-between items-end">
            <div>
              <span className="text-[9px] text-zinc-400 block font-bold uppercase tracking-wider">TOTAL POINTS</span>
              <span className="text-xl font-bold text-zinc-800 font-mono">{cLeader.points} pts</span>
            </div>
            <div>
              <span className="text-[9px] text-zinc-400 block font-bold uppercase tracking-wider text-right">CHAMPIONSHIPS</span>
              <span className="text-lg font-bold text-teal-600 font-mono text-right block">{cLeader.championships} Titles</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Results Widget */}
        <div className="bg-white border border-zinc-200 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">RECENT EVENT DETAILS</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-650">Round {recentRace?.round}</span>
          </div>
          <h3 className="text-zinc-800 font-bold tracking-wide">{recentRace?.name}</h3>
          <p className="text-xs text-zinc-400 mt-0.5">{recentRace?.circuitName}, {recentRace?.location}</p>

          <div className="mt-4 space-y-2.5">
            <div className="flex justify-between items-center bg-zinc-50 p-2 border border-zinc-150 rounded-lg">
              <span className="text-xs text-zinc-500 font-medium">Winner</span>
              <span className="text-xs font-bold text-zinc-850 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: recentRace?.winner?.teamColor }} />
                {recentRace?.winner?.driverName}
              </span>
            </div>
            <div className="flex justify-between items-center bg-zinc-50 p-2 border border-zinc-150 rounded-lg">
              <span className="text-xs text-zinc-500 font-medium">Winning Duration</span>
              <span className="text-xs font-mono font-bold text-red-650">{recentRace?.winner?.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Main Dashboard Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (Upcoming Races & Quick Stats) */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-5 w-1 bg-red-600 rounded-full" />
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 uppercase">UPCOMING RACING WEEKENDS</h2>
            </div>
            <button 
              onClick={() => setView('races')} 
              className="text-xs text-zinc-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
            >
              See Full Calendar <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-4">
            {upcomingRaces.map((race) => (
              <div 
                key={race.id}
                className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-zinc-300 hover:bg-zinc-50/50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-[10px] uppercase font-extrabold text-red-600">R{race.round}</span>
                    <Calendar className="h-4 w-4 text-zinc-400 mt-0.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-zinc-400">{race.flag}</span>
                      <h4 className="text-sm font-bold text-zinc-800 tracking-wide">{race.name}</h4>
                    </div>
                    <p className="text-xs text-zinc-400">{race.circuitName}, {race.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start border-t border-zinc-100 sm:border-t-0 pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] text-zinc-450 font-bold uppercase tracking-wider font-mono">EVENT CALENDAR DATE</span>
                    <span className="text-xs font-semibold text-zinc-700">{race.date}</span>
                  </div>
                  <button 
                    onClick={() => {
                      // Navigate to circuits and preselect’
                      setView('circuits');
                    }}
                    className="p-1 px-3 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 text-xs text-zinc-650 hover:text-zinc-900 rounded-lg transition-all font-semibold shadow-sm"
                  >
                    Inspect Track
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Platform Navigation Nodes */}
          <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm font-extrabold text-zinc-400 tracking-wider uppercase mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-teal-600" /> COMPANION CO-PILOT NODES
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'Compare Drivers', desc: 'Active analytics simulator', view: 'analytics' as const, icon: BarChart2, color: 'text-red-600 bg-red-50' },
                { title: 'Teams Directory', desc: '10 world-class rosters', view: 'teams' as const, icon: Users, color: 'text-teal-600 bg-teal-50' },
                { title: 'Circuits Intel', desc: 'Telemetry layout maps', view: 'circuits' as const, icon: Compass, color: 'text-amber-600 bg-amber-50' },
                { title: 'Customize preferences', desc: 'Configure system values', view: 'settings' as const, icon: Sliders, color: 'text-purple-600 bg-purple-50' }
              ].map((node, i) => (
                <div 
                  key={i}
                  onClick={() => setView(node.view)}
                  className="bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md p-4 rounded-xl cursor-pointer transition-all flex flex-col space-y-2 group"
                >
                  <div className={`p-2 rounded-lg w-fit ${node.color}`}>
                    <node.icon className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-700 group-hover:text-red-600 transition-colors uppercase tracking-wide">{node.title}</h4>
                  <p className="text-[10px] text-zinc-400 leading-normal">{node.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Featured Sector Spotlight (Driver & Team) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 bg-red-600 rounded-full" />
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 uppercase">{selectedYear} GRID SPOTLIGHT</h2>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
            {/* Visual Header */}
            <div className="relative h-44 bg-zinc-50 border-b border-zinc-200 flex items-center justify-center p-6 text-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale transform scale-110" style={{ backgroundImage: `url(${featuredDriver.avatar})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
              
              <div className="relative space-y-1">
                <span className="text-xs font-extrabold text-red-600 font-mono tracking-widest bg-white border border-zinc-205 p-1 px-2.5 rounded shadow-sm">HISTORIC MOVE</span>
                <h3 className="text-lg font-black text-zinc-900 uppercase tracking-wider">{featuredDriver.name}</h3>
                <span className="text-xs text-zinc-500 flex items-center justify-center gap-1.5 font-medium">
                  <span>{featuredDriver.flag} {featuredDriver.nationality}</span>
                  <span>•</span>
                  <span>Car No. {featuredDriver.number}</span>
                </span>
              </div>
            </div>

            {/* Core Stats Overview */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between bg-white">
              <p className="text-xs text-zinc-500 leading-relaxed italic text-center">
                "{featuredDriver.bio.split('.')[0] + '.'}"
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-50 p-2.5 border border-zinc-200 rounded-xl text-center">
                  <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">WORLD CHAMPIONSHIPS</span>
                  <span className="text-lg font-extrabold text-zinc-800 font-mono">{featuredDriver.championships}</span>
                </div>
                <div className="bg-zinc-50 p-2.5 border border-zinc-200 rounded-xl text-center">
                  <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">CAREER WINS</span>
                  <span className="text-lg font-extrabold text-red-650 font-mono">{featuredDriver.wins} GP</span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex flex-col space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-semibold">Constructor Team</span>
                  <span className="font-semibold text-zinc-805">{featuredDriver.teamName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400 font-semibold">Season Rank</span>
                  <span className="font-semibold text-zinc-805 font-mono">P5 Overall</span>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => {
                    selectDriver(featuredDriver.id);
                    setView('drivers');
                  }}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Inspect Driver telemetry
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
