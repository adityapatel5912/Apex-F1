/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Clock, 
  CheckCircle, 
  Compass, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useF1Store } from '../store/f1Store';
import { RACES } from '../data/f1Data';

export default function CalendarView() {
  const { selectedYear, historicalData } = useF1Store();
  
  // Choose datasource based on selected season
  const activeRaces = selectedYear === '2026' ? RACES : historicalData.races;

  return (
    <div className="space-y-6" id="race-calendar-view animate-smooth">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">{selectedYear} RACE CALENDAR</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Explore the official {selectedYear} season grand prix weekends, timelines, and completed podium archives.</p>
      </div>

      {/* TIMELINE SEGMENT CONTAINER */}
      <div className="relative border-l-2 border-zinc-200 ml-4 pl-6 sm:pl-8 space-y-8 py-4">
        
        {activeRaces.map((race, index) => {
          const isCompleted = race.status === 'Completed';
          const isNext = selectedYear === '2026' && race.round === 3; // British GP is upcoming next in demo

          return (
            <div key={race.id} className="relative group">
              
              {/* Timeline chronological marker badge node */}
              <div className="absolute -left-[41px] sm:-left-[49px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-zinc-200 z-10 shadow-xs">
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                ) : isNext ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-ping absolute" />
                ) : (
                  <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                )}
                {isNext && <span className="h-2 w-2 rounded-full bg-red-600 z-10" />}
              </div>

              {/* Main timeline item box */}
              <motion.div
                whileHover={{ y: -2 }}
                className={`p-5 rounded-2xl border transition-all ${isCompleted ? 'bg-white border-zinc-200 shadow-sm' : isNext ? 'bg-red-50/10 border-red-200 ring-2 ring-red-100 shadow-sm' : 'bg-zinc-50 border-zinc-200/60 text-zinc-500 shadow-xs'}`}
              >
                {/* Upper line metadata */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-red-600 font-mono bg-red-55 text-red-600 border border-red-200/50 p-0.5 px-2 rounded-md">
                      ROUND {race.round}
                    </span>
                    <span className="text-xs text-zinc-450 font-bold font-mono">Flag: {race.flag}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-wider bg-emerald-50 text-emerald-600 p-1 px-2.5 rounded uppercase border border-emerald-200/50">
                        COMPLETED GP
                      </span>
                    ) : isNext ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-wider bg-red-600 text-white p-1 px-2.5 rounded uppercase animate-pulse shadow-xs">
                        NEXT RACE WEEKEND
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-wider bg-zinc-100 border border-zinc-200 text-zinc-500 p-1 px-2.5 rounded uppercase">
                        UPCOMING
                      </span>
                    )}
                  </div>
                </div>

                {/* Main description section */}
                <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-base font-black text-zinc-900 tracking-wide uppercase group-hover:text-red-650 transition-colors">
                      {race.name}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-500 mt-1 text-xs font-medium">
                      <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span>{race.circuitName}, {race.location}, {race.country}</span>
                    </div>
                  </div>

                  {/* Timing metadata */}
                  <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 p-2 px-3 rounded-xl text-xs sm:w-auto w-full font-mono shadow-xs">
                    <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                    <div>
                      <span className="block text-[8px] text-zinc-400 font-bold uppercase tracking-wider font-sans">OFFICIAL TIME DETAILS</span>
                      <span className="text-zinc-850 font-bold">{race.date} @ {race.timeUtc} UTC</span>
                    </div>
                  </div>
                </div>

                {/* Completed Details section / Podium positions */}
                {isCompleted && race.winner && (
                  <div className="mt-4 pt-4 border-t border-zinc-150 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    
                    {/* Winner info strip */}
                    <div className="bg-zinc-50/50 p-3 rounded-xl border border-zinc-150 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-xs">
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-450 block uppercase font-bold">WINNER NOMINATION</span>
                        <span className="text-zinc-850 font-black block uppercase tracking-wider mt-0.5">
                          {race.winner.driverName}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-450 block mt-0.5">Time duration: {race.winner.time}</span>
                      </div>
                    </div>

                    {/* Overall podium positions */}
                    {race.podium && (
                      <div className="bg-zinc-50/50 p-3 rounded-xl border border-zinc-150">
                        <span className="text-[10px] text-zinc-450 block uppercase font-bold tracking-wider mb-2">PODIUM FINISHERS P1-P3</span>
                        <div className="flex items-center gap-4 text-xs font-bold text-zinc-500">
                          {race.podium.map((name, index) => (
                            <div key={index} className="flex items-center gap-1.5">
                              <span className={`text-xs font-mono font-extrabold ${index === 0 ? 'text-amber-500 bg-amber-50 rounded px-1' : index === 1 ? 'text-zinc-400 bg-zinc-100 rounded px-1' : 'text-amber-700 bg-amber-50 rounded px-1'}`}>
                                P{index + 1}
                              </span>
                              <span className="text-zinc-800 font-semibold">{name.split(' ')[1]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </motion.div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
