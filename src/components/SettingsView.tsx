/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Sliders, 
  HelpCircle, 
  Trash2, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Database,
  ShieldAlert,
  Save,
  Cpu
} from 'lucide-react';
import { useF1Store } from '../store/f1Store';
import { DRIVERS, TEAMS } from '../data/f1Data';

export default function SettingsView() {
  const { preferences, updatePreferences } = useF1Store();

  const handleUnitToggle = (unit: 'kph' | 'mph') => {
    updatePreferences({ speedUnit: unit });
  };

  const [saveNotify, setSaveNotify] = React.useState(false);

  const triggerSaveNotify = () => {
    setSaveNotify(true);
    setTimeout(() => setSaveNotify(false), 2000);
  };

  return (
    <div className="space-y-6 animate-smooth" id="settings-preferences">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">SYSTEM PREFERENCES</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Configure diagnostic companion feeds, favorites tracking flags, and telemetry metrics.</p>
        </div>

        {/* Saved status banner */}
        {saveNotify && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-xs font-bold uppercase tracking-wider animate-bounce shrink-0 shadow-xs">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            Config Saved
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column Parameters */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section: Core telemetry speed metrics */}
          <div className="bg-white border border-zinc-200 p-5 rounded-2xl space-y-4 shadow-sm">
            <span className="text-[10px] font-bold text-zinc-400 tracking-widest block uppercase font-mono">TELEMETRY VELOCITY UNITS</span>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-50 p-4 border border-zinc-150 rounded-xl gap-4">
              <div>
                <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wide">SPEED MEASUREMENT INDEX</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Configure speeds (km/h vs mph) and circuit lengths across telemetry overlays.</p>
              </div>

              <div className="flex bg-zinc-100 border border-zinc-200 p-1 rounded-lg shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    handleUnitToggle('kph');
                    triggerSaveNotify();
                  }}
                  className={`p-1.5 px-3.5 rounded text-[10px] font-black uppercase tracking-wider font-mono cursor-pointer transition-all ${preferences.speedUnit === 'kph' ? 'bg-white text-red-650 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'}`}
                >
                  Metric (KPH)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUnitToggle('mph');
                    triggerSaveNotify();
                  }}
                  className={`p-1.5 px-3.5 rounded text-[10px] font-black uppercase tracking-wider font-mono cursor-pointer transition-all ${preferences.speedUnit === 'mph' ? 'bg-white text-red-650 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'}`}
                >
                  Imperial (MPH)
                </button>
              </div>
            </div>
          </div>

          {/* Section: Favorites Spotlight tracking */}
          <div className="bg-white border border-zinc-200 p-5 rounded-2xl space-y-5 shadow-sm">
            <span className="text-[10px] font-bold text-zinc-400 tracking-widest block uppercase font-mono">DASHBOARD SPOTLIGHT FAVORITES</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
              {/* Driver Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-505 block font-mono">FAVORITE GRID DRIVER</label>
                <select
                  value={preferences.favoriteDriverId}
                  onChange={(e) => {
                    updatePreferences({ favoriteDriverId: e.target.value });
                    triggerSaveNotify();
                  }}
                  className="w-full bg-white text-xs font-bold text-zinc-800 p-2.5 rounded-xl border border-zinc-200 cursor-pointer focus:outline-none focus:border-zinc-350 shadow-xs"
                >
                  {DRIVERS.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                  ))}
                </select>
                <span className="text-[10px] text-zinc-400 leading-normal block mt-1">Pre-pin metrics and biography updates directly to your dashboard center modules.</span>
              </div>

              {/* Team Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-505 block font-mono">FAVORITE MANUFACTURER</label>
                <select
                  value={preferences.favoriteTeamId}
                  onChange={(e) => {
                    updatePreferences({ favoriteTeamId: e.target.value });
                    triggerSaveNotify();
                  }}
                  className="w-full bg-white text-xs font-bold text-zinc-800 p-2.5 rounded-xl border border-zinc-200 cursor-pointer focus:outline-none focus:border-zinc-350 shadow-xs"
                >
                  {TEAMS.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <span className="text-[10px] text-zinc-400 leading-normal block mt-1">Pin historical engine statistics, chassis specs, and principal details.</span>
              </div>
            </div>
          </div>

          {/* Section: Simulated active telemetry pipeline stream */}
          <div className="bg-white border border-zinc-200 p-5 rounded-2xl space-y-4 shadow-sm">
            <span className="text-[10px] font-bold text-zinc-400 tracking-widest block uppercase font-mono">REAL-TIME DATA COMPILER PUMP</span>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wide">ACTIVE FEED PIPELINE STREAM</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Inject high frequencies of mock telemetry pings to optimize dashboard charts.</p>
                </div>

                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={preferences.enableTelemetryStream}
                    onChange={(e) => {
                      updatePreferences({ enableTelemetryStream: e.target.checked });
                      triggerSaveNotify();
                    }}
                    id="telemetry-switch"
                  />
                  <label htmlFor="telemetry-switch" className="w-11 h-6 bg-zinc-205 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-zinc-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-650 cursor-pointer shadow-xs" />
                </div>
              </div>

              {/* Intensity state selectors */}
              {preferences.enableTelemetryStream && (
                <div className="bg-zinc-50 p-4 border border-zinc-150 rounded-xl space-y-3 animate-fade-in shadow-inner">
                  <span className="text-[9px] text-zinc-450 block font-black uppercase tracking-wider font-mono">FEED RATE DENSITY</span>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {(['eco', 'pro', 'overdrive'] as const).map((intensity) => (
                      <button
                        key={intensity}
                        type="button"
                        onClick={() => {
                          updatePreferences({ streamIntensity: intensity });
                          triggerSaveNotify();
                        }}
                        className={`p-2 rounded-lg text-[9px] font-black uppercase tracking-wider border font-mono transition-all cursor-pointer ${preferences.streamIntensity === intensity ? 'bg-white border-red-300 text-red-650 ring-2 ring-red-50 shadow-sm' : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 shadow-xs'}`}
                      >
                        {intensity === 'eco' ? 'ECO (1Hz)' : intensity === 'pro' ? 'PRO (10Hz)' : 'OVERDRIVE (50Hz)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column Diagnostic status monitor */}
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 p-5 rounded-2xl space-y-4 shadow-sm">
            <span className="text-[10px] font-bold text-zinc-400 tracking-widest block uppercase font-mono">LIVE PIPELINE GRAPH DIAGNOSTIC</span>

            <div className="space-y-4 text-xs font-medium text-zinc-505">
              
              <div className="bg-zinc-50 p-4 border border-zinc-150 rounded-xl space-y-3 font-mono text-[11px] leading-relaxed shadow-inner">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-150">
                  <span className="text-zinc-450">System Link:</span>
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SECURE CONNECTED
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-zinc-150">
                  <span className="text-zinc-450">Telemetry feed:</span>
                  <span className="text-zinc-800 font-bold">
                    {preferences.enableTelemetryStream ? `ACTIVE (${preferences.streamIntensity?.toUpperCase()})` : 'OFFLINE'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-zinc-150">
                  <span className="text-zinc-450">Active server:</span>
                  <span className="text-zinc-800 font-medium">CO_PILOT_WEST_2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-450">Memory index:</span>
                  <span className="text-zinc-800 font-medium">9 px_matrix load</span>
                </div>
              </div>

              <div className="p-4 bg-red-50/50 border border-dashed border-red-200 rounded-xl flex gap-3 text-red-650 text-[10px] font-medium leading-relaxed shadow-xs">
                <Cpu className="h-4 w-4 shrink-0 mt-0.5 animate-pulse text-red-500" />
                <p>
                  SYSTEM OVERRIDE DETECTED: This mock telemetry companion feed is secure and complies with F1 2026 technical regulations. No confidential constructor intellectual property is shared.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
