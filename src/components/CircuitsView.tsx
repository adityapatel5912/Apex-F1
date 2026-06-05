/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Award, 
  Users, 
  Database,
  Info,
  Calendar
} from 'lucide-react';
import { CIRCUITS } from '../data/f1Data';

export default function CircuitsView() {
  const [selectedCircuit, setSelectedCircuit] = useState(CIRCUITS[0]);

  return (
    <div className="space-y-6 animate-smooth" id="circuit-explorer">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">CIRCUIT TELEMETRY PORTAL</h1>
        <p className="text-xs text-zinc-500 mt-0.5">Inspect physical track configurations, corner specifications, lap velocity records, and layout outlines.</p>
      </div>

      {/* Main Grid content layout divided between sidebar and active display panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column list selections */}
        <div className="col-span-1 space-y-3.5">
          <span className="text-[10px] font-bold text-zinc-450 tracking-widest block uppercase font-mono">GLOBAL CIRCUITS MAPS</span>
          
          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {CIRCUITS.map((circuit) => {
              const worksActive = selectedCircuit.id === circuit.id;

              return (
                <div
                  key={circuit.id}
                  onClick={() => setSelectedCircuit(circuit)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${worksActive ? 'bg-white border-red-600/40 ring-1 ring-red-100 shadow-md translate-x-1' : 'bg-white border-zinc-200/80 hover:bg-zinc-50 hover:border-zinc-300 shadow-xs'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-extrabold text-zinc-900 uppercase tracking-wide">{circuit.name.split(' ')[0]} GP</span>
                    <span className="text-zinc-500 text-sm">{circuit.flag}</span>
                  </div>
                  <p className="text-[10px] text-zinc-450 mt-1 font-semibold block">{circuit.location}, {circuit.country}</p>

                  <div className="mt-3 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                    <span className="font-semibold">{circuit.laps} Laps</span>
                    <span className="font-semibold">{circuit.lengthKm} KM</span>
                    <span className="text-red-600 font-bold">{circuit.corners} Corners</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column detailed maps showcase */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[9px] text-zinc-500 font-extrabold uppercase tracking-widest bg-zinc-100 p-1 px-3 rounded-md border border-zinc-200 shadow-xs">
                  <span>{selectedCircuit.flag}</span>
                  <span>{selectedCircuit.country.toUpperCase()} SECTOR</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 uppercase tracking-wide mt-1.5">{selectedCircuit.fullName}</h2>
                <span className="text-xs text-zinc-450 mt-0.5 block font-medium">HQ Operations Location: {selectedCircuit.location}</span>
              </div>

              {/* Quick stats totals */}
              <div className="flex gap-4">
                <div className="text-center">
                  <span className="text-[9px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">TRACK LAP COUNT</span>
                  <span className="text-lg font-black text-zinc-800 font-mono">{selectedCircuit.laps}</span>
                </div>
                <div className="w-px h-8 bg-zinc-150 self-center" />
                <div className="text-center">
                  <span className="text-[9px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">TOTAL LENGTH</span>
                  <span className="text-lg font-black text-red-600 font-mono">{selectedCircuit.lengthKm} km</span>
                </div>
              </div>
            </div>

            {/* Layout Telemetry SVG Graph Map */}
            <div className="bg-zinc-50 border border-zinc-200 h-64 rounded-xl flex items-center justify-center p-6 relative overflow-hidden group">
              <div className="absolute top-3 left-3 bg-white border border-zinc-200 text-[9px] font-bold text-teal-6e0 px-2 py-0.5 rounded font-mono uppercase shadow-xs">
                LAYOUT SCHEMATIC MODEL (ACTIVE)
              </div>
              <div className="absolute bottom-3 right-3 text-[9px] text-zinc-400 font-mono">
                SCALE: MERCATOR GRID MATRIX
              </div>

              {/* Dynamic telemetry grid decoration lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

              {/* SVG drawing contour line */}
              <svg className="w-full h-full max-w-xs overflow-visible" viewBox="0 0 200 160">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  d={selectedCircuit.svgPath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.35)] cursor-pointer"
                />
              </svg>
            </div>

            {/* In Depth metrics list */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Opened Year', value: selectedCircuit.opened, icon: Calendar },
                { label: 'Corners list', value: `${selectedCircuit.corners} corners`, icon: Compass },
                { label: 'Crowd Capacity', value: `${selectedCircuit.capacity.toLocaleString()} fans`, icon: Users },
                { label: 'Lap Distance', value: `${selectedCircuit.distanceKm} km`, icon: Database },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-50/50 p-4 border border-zinc-200 rounded-xl space-y-1 shadow-xs">
                  <span className="text-[9px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">{item.label}</span>
                  <span className="text-xs font-bold text-zinc-800 block">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Lap Qualification Record speed info */}
            <div className="p-4 bg-zinc-50/80 border border-zinc-200 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs shadow-xs">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-red-50 text-red-650 flex items-center justify-center border border-red-200">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 block font-bold uppercase tracking-wider font-mono">OFFICIAL TELEMETRY LAP RECORD</span>
                  <span className="text-zinc-805 font-black mt-0.5 block uppercase font-mono">
                    Competitor Ref: <span className="text-red-600 font-extrabold">{selectedCircuit.lapRecord.driverCode}</span> ({selectedCircuit.lapRecord.year})
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right bg-white border border-zinc-200 p-2.5 px-4 rounded-lg font-mono font-black text-xs text-teal-600 shadow-sm">
                RECORD TIME: {selectedCircuit.lapRecord.time}
              </div>
            </div>

            {/* Informational Fact */}
            <div className="bg-zinc-55/40 p-4 border border-dashed border-zinc-200 rounded-xl flex gap-3 text-xs text-zinc-500">
              <Info className="h-4.5 w-4.5 text-zinc-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {selectedCircuit.bio}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
