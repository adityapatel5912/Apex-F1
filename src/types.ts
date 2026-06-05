/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Driver {
  id: string;
  name: string;
  code: string;
  number: number;
  teamId: string;
  teamName: string;
  teamColor: string;
  nationality: string;
  flag: string; // Emoji or asset
  avatar: string; // Visual symbol or dynamic graphic representation
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  championships: number;
  age: number;
  placeOfBirth: string;
  bio: string;
  history: {
    year: number;
    team: string;
    points: number;
    position: number;
  }[];
  seasonProgress: number[]; // points per race over the season
}

export interface Team {
  id: string;
  name: string;
  fullName: string;
  base: string;
  teamPrincipal: string;
  chassis: string;
  powerUnit: string;
  color: string; // hex code
  logoBg: string; // tailwind gradient or overlay
  points: number;
  wins: number;
  podiums: number;
  championships: number;
  worldRank: number;
  drivers: string[]; // Driver IDs
  bio: string;
  history: {
    year: number;
    points: number;
    position: number;
  }[];
  stats: {
    fastestLaps: number;
    polePositions: number;
  };
}

export interface Circuit {
  id: string;
  name: string;
  fullName: string;
  location: string;
  country: string;
  flag: string;
  lengthKm: number;
  laps: number;
  distanceKm: number;
  corners: number;
  capacity: number;
  opened: number;
  lapRecord: {
    time: string;
    driverCode: string;
    year: number;
  };
  svgPath: string; // Grid path layout visual
  bio: string;
}

export interface Race {
  round: number;
  id: string;
  name: string;
  circuitId: string;
  circuitName: string;
  location: string;
  country: string;
  flag: string;
  date: string; // ISO format or string
  timeUtc: string; // e.g. "13:00"
  status: 'Completed' | 'Upcoming' | 'Live';
  winner?: {
    driverId: string;
    driverName: string;
    teamColor: string;
    time: string;
  };
  podium?: string[]; // Driver Names or IDs
}

export interface AppState {
  currentView: 'dashboard' | 'drivers' | 'teams' | 'standings' | 'races' | 'circuits' | 'analytics' | 'settings';
  selectedDriverId: string | null;
  selectedTeamId: string | null;
  selectedCircuitId: string | null;
  searchQuery: string;
  standingsTab: 'drivers' | 'constructors';
  selectedYear: string;
  historicalData: {
    drivers: Driver[];
    teams: Team[];
    races: Race[];
    loading: boolean;
    error: string | null;
    cache: Record<string, { drivers: Driver[]; teams: Team[]; races: Race[] }>;
  };
  preferences: {
    speedUnit: 'kph' | 'mph';
    favoriteDriverId: string;
    favoriteTeamId: string;
    enableTelemetryStream: boolean;
    streamIntensity: 'eco' | 'pro' | 'overdrive';
  };
}
