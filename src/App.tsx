/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Calendar, 
  Settings as SettingsIcon, 
  Users, 
  TrendingUp, 
  Compass, 
  Sliders, 
  Menu, 
  X,
  Activity,
  ChevronRight,
  Gauge
} from 'lucide-react';
import { useF1Store } from './store/f1Store';

// Dynamic sub-view imports
import DashboardView from './components/DashboardView';
import DriversView from './components/DriversView';
import TeamsView from './components/TeamsView';
import StandingsView from './components/StandingsView';
import CalendarView from './components/CalendarView';
import CircuitsView from './components/CircuitsView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';

export default function App() {
  const { 
    currentView, 
    setView, 
    resetSelections, 
    preferences,
    selectedYear,
    setYear,
    historicalData
  } = useF1Store();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systime, setSystime] = useState(new Date().toUTCString());

  // Real-time ticker update
  useEffect(() => {
    const timer = setInterval(() => {
      setSystime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set-up historical years matching FIA history from 1950 to 2026
  const years = ['2026', ...Array.from({ length: 2025 - 1950 + 1 }, (_, i) => String(2025 - i))];

  // Primary navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Gauge },
    { id: 'drivers', label: 'Drivers Group', icon: Users },
    { id: 'teams', label: 'Constructors', icon: Trophy },
    { id: 'standings', label: 'Standings', icon: TrendingUp },
    { id: 'races', label: 'Race Calendar', icon: Calendar },
    { id: 'circuits', label: 'Circuits Intel', icon: Compass },
    { id: 'analytics', label: 'Analytics Panel', icon: Activity },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ] as const;

  // Render view controller mappings
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'drivers':
        return <DriversView />;
      case 'teams':
        return <TeamsView />;
      case 'standings':
        return <StandingsView />;
      case 'races':
        return <CalendarView />;
      case 'circuits':
        return <CircuitsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  const renderCurrentViewWithLoader = () => {
    if (historicalData.loading) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 animate-smooth">
          <div className="relative">
            <div className="absolute inset-0 h-16 w-16 bg-red-100 rounded-full animate-ping opacity-45" />
            <div className="relative h-16 w-16 bg-red-600 rounded-2xl flex items-center justify-center text-white italic font-black text-xl shadow-lg border border-red-500 animate-spin" style={{ animationDuration: '3s' }}>
              AP
            </div>
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest font-mono flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
              TELEMETRY SYNCING
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              Injecting official FIA season data for the <span className="font-bold text-red-600 font-mono">{selectedYear}</span> world championship records. Accuracy index: 100000%.
            </p>
          </div>
        </div>
      );
    }

    if (historicalData.error) {
      return (
        <div className="bg-red-50/50 border border-dashed border-red-200 p-8 rounded-2xl text-center space-y-4 max-w-md mx-auto my-12 shadow-sm animate-smooth">
          <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-xs">
            <span className="text-sm font-bold font-mono">!</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-black text-red-800 uppercase tracking-wider font-mono">SYNC FAILURE</h3>
            <p className="text-xs text-red-600/80 leading-relaxed font-semibold">
              {historicalData.error}
            </p>
          </div>
          <button
            onClick={() => setYear(selectedYear)}
            className="p-2 px-5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
          >
            Retry Synchronization
          </button>
        </div>
      );
    }

    return renderCurrentView();
  };

  const handleNavClick = (viewId: typeof navItems[number]['id']) => {
    setView(viewId);
    resetSelections(); // Safely close active profile drills on page shifts
    setMobileMenuOpen(false);
  };

  const YearSelector = () => (
    <div className="space-y-1.5 px-3">
      <span className="text-[9px] text-zinc-400 font-black tracking-wider uppercase font-mono block">CHAMPIONSHIP SEASON</span>
      <div className="relative">
        <select
          value={selectedYear}
          onChange={(e) => setYear(e.target.value)}
          className="w-full bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200 hover:border-zinc-300 text-xs text-zinc-800 font-black tracking-wide p-2.5 px-3.5 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-100 transition-all font-mono"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y === '2026' ? '2026 (Live Demo)' : `${y} Season`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 flex flex-col font-sans" id="apexf1-root">
      
      {/* --- TELEMETRY BROADCAST MARQUEE TICKER --- */}
      <div className="bg-white border-b border-zinc-200 py-2.5 px-4 hidden md:flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-zinc-500 overflow-hidden relative">
        <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
          <span className="text-red-600 flex items-center gap-1.5 shrink-0">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            LIVE TELEMETRY FEED: ONLINE
          </span>
          <span className="text-zinc-600 shrink-0 uppercase">NEXT DESTINATION: SILVERSTONE GP (GP ROUND 3)</span>
          <span className="shrink-0 text-zinc-600">CHAMPIONSHIP LEADER: VERSTAPPEN (198 PTS)</span>
          <span className="shrink-0 uppercase text-zinc-650">CONSTRUCTOR SQUAD LEADER: MCLAREN (345 PTS)</span>
          <span className="shrink-0 text-zinc-650">FEED SPEED RESOLUTION: {preferences.enableTelemetryStream ? `${preferences.streamIntensity?.toUpperCase()} MODE` : 'OFFLINE'}</span>
        </div>
        
        <div className="flex items-center gap-2 text-zinc-500 ml-4 bg-white pl-3 z-10 shrink-0 font-bold uppercase">
          <span>UTC CLOCK:</span>
          <span className="text-red-600 font-mono font-black">{systime}</span>
        </div>
      </div>

      {/* --- PRIMARY CONTAINER SHEET --- */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* SIDEBAR NAVIGATION (Desktop) */}
        <aside className="w-64 bg-white border-r border-zinc-200 shrink-0 hidden md:flex flex-col justify-between p-6 z-20 shadow-sm">
          <div className="space-y-8">
            {/* Elegant Header Branding */}
            <div 
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer select-none py-1 group"
            >
              <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center font-black text-white italic tracking-tighter text-sm transform group-hover:scale-105 transition-transform">
                AP
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-zinc-900 block group-hover:text-red-600 transition-colors uppercase">APEX<span className="text-red-600">F1</span></span>
                <span className="text-[9px] text-zinc-400 font-bold tracking-widest block leading-none font-mono">INTELLIGENCE PLATFORM</span>
              </div>
            </div>

            {/* Global Year Action Bar Selection */}
            <div className="py-2 border-t border-b border-zinc-100/80">
              <YearSelector />
            </div>

            {/* Menu Sections list */}
            <nav className="space-y-1.5">
              <span className="text-[9px] text-zinc-400 font-bold tracking-widest block uppercase px-3 mb-2">SYSTEM CONSOLES</span>
              
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer group ${isActive ? 'bg-red-50 text-red-600 border-l-2 border-red-600 shadow-sm' : 'text-zinc-650 hover:text-zinc-900 hover:bg-zinc-50 w-full'}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-4 w-4 ${isActive ? 'text-red-600' : 'text-zinc-400 group-hover:text-zinc-600'}`} />
                      <span className="tracking-wide">{item.label}</span>
                    </div>

                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User profile identifier footer */}
          <div className="pt-6 border-t border-zinc-100 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-extrabold text-zinc-500 text-xs shrink-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542909168-82c357fd4aea?auto=format&fit=crop&q=80&w=300)' }} />
              <div className="overflow-hidden">
                <span className="text-zinc-800 font-extrabold block truncate uppercase">ADITYA PATEL</span>
                <span className="text-[10px] text-zinc-400 block truncate font-semibold font-mono">adityapatel5912</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MOBILE STICKY NAVIGATION BAR */}
        <header className="md:hidden bg-white border-b border-zinc-200 p-4 flex items-center justify-between z-30 sticky top-0 shadow-sm">
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="h-7 w-7 bg-red-600 rounded-lg flex items-center justify-center font-black text-white italic tracking-tighter text-xs">
              AP
            </div>
            <span className="text-sm font-black text-zinc-900 uppercase">APEX<span className="text-red-600">F1</span></span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Mobile mini season-selector switch */}
            <select
              value={selectedYear}
              onChange={(e) => setYear(e.target.value)}
              className="bg-zinc-100 border border-zinc-200 text-[10px] font-black tracking-wide p-1.5 px-2 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-100 transition-all font-mono text-zinc-700"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-1.5 text-zinc-650 hover:text-zinc-900 bg-zinc-100 border border-zinc-200 rounded-lg cursor-pointer animate-smooth animate-none"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* MOBILE EXTENDED MENU OVERLAY */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full bg-white border-b border-zinc-200 z-30 p-6 flex flex-col space-y-4 md:hidden shadow-2xl"
            >
              <span className="text-[9px] text-zinc-400 font-bold tracking-widest block uppercase mb-1">SYSTEM CONSOLES</span>
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all cursor-pointer ${isActive ? 'bg-red-50 text-red-600 border-l-2 border-red-600' : 'text-zinc-600 hover:text-zinc-900 bg-zinc-50 border border-zinc-200'}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN TELEMETRY CONTENT CONTAINER */}
        <main className="flex-1 bg-zinc-50 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full z-10">
          
          {/* Breadcrumb indicator trail */}
          <div className="flex items-center gap-1 text-[10px] text-zinc-450 font-bold uppercase tracking-wider mb-5 pb-3 border-b border-zinc-200/80">
            <span className="hover:text-zinc-900 text-zinc-400 cursor-pointer transition-colors" onClick={() => handleNavClick('dashboard')}>APEX_F1_PORTAL</span>
            <ChevronRight className="h-3 w-3 text-zinc-305" />
            <span className="text-zinc-700">CONSOLE_{currentView.toUpperCase()}_STAGE</span>
          </div>

          {/* Active rendering view */}
          <div className="flex-1">
            {renderCurrentViewWithLoader()}
          </div>

          {/* Humble credit line */}
          <footer className="mt-12 pt-6 border-t border-zinc-200 text-center text-[10px] text-zinc-400 font-mono">
            &copy; {new Date().getFullYear()} APEXF1 CORE MOTORSPORT PLATFORM. COMPLIANT WITH F1 TECHNICAL DIRECTIVE 2026.
          </footer>
        </main>

      </div>
    </div>
  );
}
