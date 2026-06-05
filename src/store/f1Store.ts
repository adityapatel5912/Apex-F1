/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { AppState } from '../types';
import { fetchSeasonData } from '../lib/f1Api';

interface StoreActions {
  setView: (view: AppState['currentView']) => void;
  selectDriver: (id: string | null) => void;
  selectTeam: (id: string | null) => void;
  selectCircuit: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setStandingsTab: (tab: AppState['standingsTab']) => void;
  updatePreferences: (prefs: Partial<AppState['preferences']>) => void;
  resetSelections: () => void;
  setYear: (year: string) => Promise<void>;
}

type F1Store = AppState & StoreActions;

export const useF1Store = create<F1Store>((set, get) => ({
  currentView: 'dashboard',
  selectedDriverId: null,
  selectedTeamId: null,
  selectedCircuitId: null,
  searchQuery: '',
  standingsTab: 'drivers',
  selectedYear: '2026',
  historicalData: {
    drivers: [],
    teams: [],
    races: [],
    loading: false,
    error: null,
    cache: {},
  },
  preferences: {
    speedUnit: 'kph',
    favoriteDriverId: 'hamilton',
    favoriteTeamId: 'ferrari',
    enableTelemetryStream: true,
    streamIntensity: 'pro',
  },

  setView: (view) => set({ 
    currentView: view,
    searchQuery: '', // Clean search queries on view transitions
  }),
  selectDriver: (id) => set({ selectedDriverId: id }),
  selectTeam: (id) => set({ selectedTeamId: id }),
  selectCircuit: (id) => set({ selectedCircuitId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStandingsTab: (tab) => set({ standingsTab: tab }),
  updatePreferences: (prefs) => set((state) => ({
    preferences: { ...state.preferences, ...prefs }
  })),
  resetSelections: () => set({
    selectedDriverId: null,
    selectedTeamId: null,
    selectedCircuitId: null,
  }),
  setYear: async (year) => {
    set({ selectedYear: year, selectedDriverId: null, selectedTeamId: null, selectedCircuitId: null });
    
    if (year === '2026') {
      return;
    }

    const { historicalData } = get();
    // Check if cache contains year
    if (historicalData.cache[year]) {
      const cached = historicalData.cache[year];
      set((state) => ({
        historicalData: {
          ...state.historicalData,
          drivers: cached.drivers,
          teams: cached.teams,
          races: cached.races,
          loading: false,
          error: null,
        }
      }));
      return;
    }

    // Otherwise, fetch it dynamically
    set((state) => ({
      historicalData: {
        ...state.historicalData,
        loading: true,
        error: null,
      }
    }));

    try {
      const data = await fetchSeasonData(year);
      set((state) => ({
        historicalData: {
          ...state.historicalData,
          drivers: data.drivers,
          teams: data.teams,
          races: data.races,
          loading: false,
          error: null,
          cache: {
            ...state.historicalData.cache,
            [year]: {
              drivers: data.drivers,
              teams: data.teams,
              races: data.races,
            }
          }
        }
      }));
    } catch (err: any) {
      console.error(`Failed to load season ${year}`, err);
      set((state) => ({
        historicalData: {
          ...state.historicalData,
          loading: false,
          error: `Network failure: Could not retrieve F1 records for ${year}. Please retry.`,
        }
      }));
    }
  }
}));
