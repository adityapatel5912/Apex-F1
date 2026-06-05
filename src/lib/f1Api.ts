/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Driver, Team, Race } from '../types';

export const NATIONALITY_FLAGS: Record<string, string> = {
  Dutch: '🇳🇱',
  British: '🇬🇧',
  Monegasque: '🇲🇨',
  Australian: '🇦🇺',
  Spanish: '🇪🇸',
  German: '🇩🇪',
  Brazilian: '🇧🇷',
  French: '🇫🇷',
  Italian: '🇮🇹',
  Canadian: '🇨🇦',
  Finnish: '🇫🇮',
  Japanese: '🇯🇵',
  Mexican: '🇲🇽',
  American: '🇺🇸',
  Thai: '🇹🇭',
  Austrian: '🇦🇹',
  Swedish: '🇸🇪',
  Belgian: '🇧🇪',
  Swiss: '🇨🇭',
  Danish: '🇩🇰',
  'New Zealander': '🇳🇿',
  Russian: '🇷🇺',
  Indian: '🇮🇳',
  Polish: '🇵🇱',
  Venezuelan: '🇻🇪',
  Chinese: '🇨🇳',
  Argentinian: '🇦🇷',
  'South African': '🇿🇦',
  Colombian: '🇨🇴',
  Irish: '🇮🇪',
  Portuguese: '🇵🇹',
  Indonesian: '🇮🇩',
};

export const COUNTRY_FLAGS: Record<string, string> = {
  Bahrain: '🇧🇭',
  Monaco: '🇲🇨',
  UK: '🇬🇧',
  'United Kingdom': '🇬🇧',
  Belgium: '🇧🇪',
  Italy: '🇮🇹',
  Singapore: '🇸🇬',
  Australia: '🇦🇺',
  Austria: '🇦🇹',
  Azerbaijan: '🇦🇿',
  Brazil: '🇧🇷',
  Canada: '🇨🇦',
  China: '🇨🇳',
  France: '🇫🇷',
  Hungary: '🇭🇺',
  Japan: '🇯🇵',
  Mexico: '🇲🇽',
  Netherlands: '🇳🇱',
  'Saudi Arabia': '🇸🇦',
  Spain: '🇪🇸',
  UAE: '🇦🇪',
  USA: '🇺🇸',
  'United States': '🇺🇸',
  Qatar: '🇶🇦',
  Turkey: '🇹🇷',
  Malaysia: '🇲🇾',
  Russia: '🇷🇺',
  Portugal: '🇵🇹',
  India: '🇮🇳',
  Korea: '🇰🇷2',
  Europe: '🇪🇺',
  Germany: '🇩🇪',
  Switzerland: '🇨🇭',
  Argentina: '🇦🇷',
  Eifel: '🇩🇪',
  Styria: '🇦🇹',
  Tuscany: '🇮🇹',
  'Emilia-Romagna': '🇮🇹',
  Sakhir: '🇧🇭',
};

export const TEAM_COLORS: Record<string, string> = {
  ferrari: '#E80020',
  mclaren: '#FF8000',
  red_bull: '#001A30',
  redbull: '#001A30',
  mercedes: '#27F4D2',
  aston_martin: '#229971',
  astonmartin: '#229971',
  williams: '#005AFF',
  haas: '#E60000',
  alpine: '#FF007F',
  vcarb: '#5C1DFF',
  sauber: '#00E6FF',
  audi: '#00E6FF',
  alfa: '#900000',
  toro_rosso: '#4E7CFF',
  alphatauri: '#4E7CFF',
  renault: '#FFF200',
  racing_point: '#F596C8',
  lotus: '#FFF200',
  benetton: '#008751',
  jordan: '#FFF200',
  minardi: '#FFF200',
  bar: '#FFFFFF',
  toyota: '#E01E22',
  bmw_sauber: '#243C8C',
  brawn: '#BFFF00',
  brawngp: '#BFFF00',
  force_india: '#FF8000',
  ligier: '#0000FF',
  tyrrell: '#00008B',
  footwork: '#FFFFFF',
  arrows: '#FF8000',
  brabham: '#002B7F',
  team_lotus: '#004F30',
  cooper: '#004225',
};

const TEAM_BG_GRADIENTS: Record<string, string> = {
  ferrari: 'bg-gradient-to-br from-red-800 to-red-600',
  mclaren: 'bg-gradient-to-br from-orange-600 to-amber-500',
  red_bull: 'bg-gradient-to-br from-blue-950 to-blue-900',
  redbull: 'bg-gradient-to-br from-blue-950 to-blue-900',
  mercedes: 'bg-gradient-to-br from-slate-900 to-teal-950',
  aston_martin: 'bg-gradient-to-br from-emerald-950 to-emerald-800',
  astonmartin: 'bg-gradient-to-br from-emerald-950 to-emerald-800',
  williams: 'bg-gradient-to-br from-blue-900 to-indigo-950',
  haas: 'bg-gradient-to-br from-gray-950 to-red-950',
  alpine: 'bg-gradient-to-br from-pink-900 to-blue-900',
  vcarb: 'bg-gradient-to-br from-indigo-800 to-purple-900',
  sauber: 'bg-gradient-to-br from-zinc-800 to-emerald-900',
  audi: 'bg-gradient-to-br from-zinc-900 to-zinc-950 border border-teal-500/30',
};

export async function fetchSeasonData(year: string) {
  // Use the high availability F1 community database mirror Jolpica
  const baseUrl = `https://api.jolpi.ca/ergast/f1/${year}`;

  const [driversRes, constructorsRes, resultsRes] = await Promise.all([
    fetch(`${baseUrl}/driverStandings.json`).then((r) => r.json()),
    // Constructor standings only make sense from 1958 onwards
    parseInt(year) >= 1958
      ? fetch(`${baseUrl}/constructorStandings.json`).then((r) => r.json())
      : Promise.resolve(null),
    fetch(`${baseUrl}/results/1.json?limit=100`).then((r) => r.json()),
  ]);

  // Extract from raw standings
  const rawDriversList =
    driversRes?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [];
  const rawConstructorsList =
    constructorsRes?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [];
  const rawRacesList = resultsRes?.MRData?.RaceTable?.Races || [];

  // Map Drivers
  const drivers: Driver[] = rawDriversList.map((item: any) => {
    const dr = item.Driver;
    const cons = item.Constructors?.[0] || { constructorId: 'unknown', name: 'Independent' };
    const driverId = dr.driverId;
    const teamId = cons.constructorId;
    const nationality = dr.nationality || 'Unknown';
    const flag = NATIONALITY_FLAGS[nationality] || '🏁';

    // Calculate birth age during that season year
    const dobValue = dr.dateOfBirth;
    let computedAge = 25; // standard fallback
    if (dobValue) {
      const birthYear = parseInt(dobValue.split('-')[0]);
      if (!isNaN(birthYear)) {
        computedAge = parseInt(year) - birthYear;
      }
    }

    return {
      id: driverId,
      name: `${dr.givenName} ${dr.familyName}`,
      code: dr.code || dr.familyName.slice(0, 3).toUpperCase(),
      number: parseInt(dr.permanentNumber || item.number) || 0,
      teamId,
      teamName: cons.name,
      teamColor: TEAM_COLORS[teamId] || TEAM_COLORS[teamId.replace('-', '_')] || '#71717a',
      nationality,
      flag,
      // Premium Unsplash avatar placeholder but styled and colored
      avatar: `https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300`,
      points: parseFloat(item.points) || 0,
      wins: parseInt(item.wins) || 0,
      podiums: parseInt(item.wins) || 0, // Fallback placeholder since standings don't hold full podium counts directly
      poles: 0, // Standings do not hold qualifying details
      championships: item.position === '1' ? 1 : 0,
      age: computedAge,
      placeOfBirth: dr.nationality ? `${dr.nationality} Region` : 'F1 Grid',
      bio: `${dr.givenName} ${dr.familyName} is a prominent ${nationality} Formula One racing driver. During the historic ${year} season, they competed for ${cons.name} with extreme focus, capturing P${item.position} in the World Drivers' Championship with a total of ${item.points} points.`,
      history: [
        {
          year: parseInt(year),
          team: cons.name,
          points: parseFloat(item.points) || 0,
          position: parseInt(item.position) || 0,
        },
      ],
      seasonProgress: Array.from({ length: 15 }, (_, i) => Math.round((parseFloat(item.points) / 15) * (i + 1))), // Mock historical progression for analytics charts
    };
  });

  // Map Teams (Constructors)
  let teams: Team[] = [];
  if (parseInt(year) >= 1958) {
    teams = rawConstructorsList.map((item: any) => {
      const cons = item.Constructor;
      const teamId = cons.constructorId;
      const color = TEAM_COLORS[teamId] || TEAM_COLORS[teamId.replace('-', '_')] || '#71717a';
      const logoBg = TEAM_BG_GRADIENTS[teamId] || `bg-gradient-to-br from-zinc-700 to-zinc-900`;

      // Get driver IDs for this team
      const teamDrivers = drivers.filter((d) => d.teamId === teamId).map((d) => d.id);

      return {
        id: teamId,
        name: cons.name,
        fullName: cons.name,
        base: cons.nationality || 'Worldwide HQ',
        teamPrincipal: 'F1 Technical Principal',
        chassis: `${cons.name.toUpperCase()}-${year}-SPEC`,
        powerUnit: cons.name,
        color,
        logoBg,
        points: parseFloat(item.points) || 0,
        wins: parseInt(item.wins) || 0,
        podiums: parseInt(item.wins) || 0,
        championships: item.position === '1' ? 1 : 0,
        worldRank: parseInt(item.position) || 1,
        drivers: teamDrivers,
        bio: `${cons.name} is a legendary constructor in Formula 1. In the highly competitive ${year} season, they campaigned with speed and innovation, gathering a total of ${item.points} points to lock down rank P${item.position} in the World Constructors' Championship.`,
        history: [
          {
            year: parseInt(year),
            points: parseFloat(item.points) || 0,
            position: parseInt(item.position) || 1,
          },
        ],
        stats: {
          fastestLaps: parseInt(item.wins) * 2,
          polePositions: parseInt(item.wins),
        },
      };
    });
  } else {
    // Before 1958, there is no Constructors Championship standings, but we can reconstruct Teams
    // based on constructors in driver list to preserve team directory and dashboards.
    const uniqueConsMap = new Map<string, any>();
    drivers.forEach((drv) => {
      if (!uniqueConsMap.has(drv.teamId) && drv.teamId !== 'unknown') {
        uniqueConsMap.set(drv.teamId, {
          id: drv.teamId,
          name: drv.teamName,
          fullName: drv.teamName,
          base: drv.nationality,
          teamPrincipal: 'Team Principal',
          chassis: `${drv.teamName.toUpperCase()}-${year}-SPEC`,
          powerUnit: drv.teamName,
          color: drv.teamColor,
          logoBg: TEAM_BG_GRADIENTS[drv.teamId] || `bg-gradient-to-br from-zinc-700 to-zinc-900`,
          points: 0,
          wins: 0,
          podiums: 0,
          championships: 0,
          worldRank: 1,
          drivers: [],
        });
      }
      if (drv.teamId !== 'unknown') {
        const entry = uniqueConsMap.get(drv.teamId);
        entry.points += drv.points;
        entry.wins += drv.wins;
        entry.podiums += drv.podiums;
        entry.drivers.push(drv.id);
      }
    });

    teams = Array.from(uniqueConsMap.values()).map((t, idx) => ({
      ...t,
      worldRank: idx + 1,
      bio: `${t.name} entered the formula racing contests of ${year}, fueling drivers to reach milestones across competitive circuits.`,
      history: [{ year: parseInt(year), points: t.points, position: idx + 1 }],
      stats: { fastestLaps: t.wins * 2, polePositions: t.wins },
    }));
  }

  // Map Races
  const races: Race[] = rawRacesList.map((item: any) => {
    const round = parseInt(item.round);
    const id = `${year}_round_${round}`;
    const circ = item.Circuit;
    const country = circ.Location.country || 'International';
    const flag = COUNTRY_FLAGS[country] || '🏁';

    const results = item.Results || [];
    const winnerResult = results[0];
    let winnerInfo;

    if (winnerResult) {
      const winnerDriver = winnerResult.Driver;
      const winnerCons = winnerResult.Constructor;
      const wTeamId = winnerCons?.constructorId || 'unknown';
      winnerInfo = {
        driverId: winnerDriver.driverId,
        driverName: `${winnerDriver.givenName} ${winnerDriver.familyName}`,
        teamColor: TEAM_COLORS[wTeamId] || '#71717a',
        time: winnerResult.Time?.time || 'Finished',
      };
    }

    return {
      round,
      id,
      name: item.raceName,
      circuitId: circ.circuitId,
      circuitName: circ.circuitName,
      location: circ.Location.locality,
      country,
      flag,
      date: item.date,
      timeUtc: item.time ? item.time.slice(0, 5) : '14:00',
      status: 'Completed',
      winner: winnerInfo,
      podium: winnerInfo ? [winnerInfo.driverName] : undefined,
    };
  });

  return {
    drivers,
    teams,
    standings: {
      drivers: rawDriversList,
      constructors: rawConstructorsList,
    },
    races,
  };
}
