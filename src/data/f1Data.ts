/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Driver, Team, Circuit, Race } from '../types';

export const TEAMS: Team[] = [
  {
    id: 'ferrari',
    name: 'Ferrari',
    fullName: 'Scuderia Ferrari HP',
    base: 'Maranello, Italy',
    teamPrincipal: 'Frédéric Vasseur',
    chassis: 'SF-26',
    powerUnit: 'Ferrari',
    color: '#E80020',
    logoBg: 'bg-gradient-to-br from-red-800 to-red-600',
    points: 312,
    wins: 4,
    podiums: 11,
    championships: 16,
    worldRank: 2,
    drivers: ['hamilton', 'leclerc'],
    bio: 'The oldest and most successful active team in Formula One, Scuderia Ferrari represents racing passion, Italian heritage, and unparalleled motorsport prestige. For 2026, Ferrari shocked the sporting world by pairing seven-time champion Lewis Hamilton with Charles Leclerc.',
    history: [
      { year: 2025, points: 518, position: 2 },
      { year: 2024, points: 406, position: 3 },
      { year: 2023, points: 406, position: 3 }
    ],
    stats: {
      fastestLaps: 264,
      polePositions: 251
    }
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    fullName: 'McLaren Formula 1 Team',
    base: 'Woking, United Kingdom',
    teamPrincipal: 'Andrea Stella',
    chassis: 'MCL39',
    powerUnit: 'Mercedes',
    color: '#FF8000',
    logoBg: 'bg-gradient-to-br from-orange-600 to-amber-500',
    points: 345,
    wins: 5,
    podiums: 13,
    championships: 8,
    worldRank: 1,
    drivers: ['norris', 'piastri'],
    bio: 'McLaren Racing has established itself as an innovative powerhouse. Boasting a championship-winning pedigree and a modern engineering core, the Woking-based outfit enters 2026 leading the fight with their stellar driver lineup of Lando Norris and Oscar Piastri.',
    history: [
      { year: 2025, points: 625, position: 1 },
      { year: 2024, points: 560, position: 1 },
      { year: 2023, points: 302, position: 4 }
    ],
    stats: {
      fastestLaps: 168,
      polePositions: 159
    }
  },
  {
    id: 'redbull',
    name: 'Red Bull Racing',
    fullName: 'Oracle Red Bull Racing',
    base: 'Milton Keynes, United Kingdom',
    teamPrincipal: 'Christian Horner',
    chassis: 'RB22',
    powerUnit: 'Red Bull Ford',
    color: '#001A30',
    logoBg: 'bg-gradient-to-br from-blue-950 to-blue-900',
    points: 288,
    wins: 3,
    podiums: 8,
    championships: 6,
    worldRank: 3,
    drivers: ['verstappen', 'lawson'],
    bio: 'Famed for their aggressive aerodynamic design and strategy dominance, Red Bull Racing transitions to the Red Bull Ford powertrain era in 2026. Spearheaded by multi-champion Max Verstappen with rising star Liam Lawson in the second seat.',
    history: [
      { year: 2025, points: 485, position: 3 },
      { year: 2024, points: 575, position: 2 },
      { year: 2023, points: 860, position: 1 }
    ],
    stats: {
      fastestLaps: 98,
      polePositions: 104
    }
  },
  {
    id: 'mercedes',
    name: 'Mercedes',
    fullName: 'Mercedes-AMG PETRONAS F1 Team',
    base: 'Brackley, United Kingdom',
    teamPrincipal: 'Toto Wolff',
    chassis: 'W17',
    powerUnit: 'Mercedes',
    color: '#27F4D2',
    logoBg: 'bg-gradient-to-br from-slate-900 to-teal-950',
    points: 194,
    wins: 1,
    podiums: 5,
    championships: 8,
    worldRank: 4,
    drivers: ['russell', 'antonelli'],
    bio: 'Determined to reclaim total supremacy with the 2026 active aerodynamics engine shake-up. George Russell serves as team leader alongside Italy’s sensational teenage prodigy, Andrea Kimi Antonelli.',
    history: [
      { year: 2025, points: 390, position: 4 },
      { year: 2024, points: 322, position: 4 },
      { year: 2023, points: 409, position: 2 }
    ],
    stats: {
      fastestLaps: 108,
      polePositions: 139
    }
  },
  {
    id: 'astonmartin',
    name: 'Aston Martin',
    fullName: 'Aston Martin Aramco F1 Team',
    base: 'Silverstone, United Kingdom',
    teamPrincipal: 'Mike Krack',
    chassis: 'AMR26',
    powerUnit: 'Honda',
    color: '#229971',
    logoBg: 'bg-gradient-to-br from-emerald-950 to-emerald-800',
    points: 132,
    wins: 0,
    podiums: 3,
    championships: 0,
    worldRank: 5,
    drivers: ['alonso', 'stroll'],
    bio: 'With the arrival of legendary designer Adrian Newey and exclusive factory power from Honda, Aston Martin has entered a brand new era in 2026. Fernando Alonso and Lance Stroll spearhead their ambitious assault on the frontrunners.',
    history: [
      { year: 2025, points: 215, position: 5 },
      { year: 2024, points: 86, position: 5 },
      { year: 2023, points: 280, position: 5 }
    ],
    stats: {
      fastestLaps: 12,
      polePositions: 3
    }
  },
  {
    id: 'williams',
    name: 'Williams Racing',
    fullName: 'Williams Racing',
    base: 'Grove, United Kingdom',
    teamPrincipal: 'James Vowles',
    chassis: 'FW48',
    powerUnit: 'Mercedes',
    color: '#005AFF',
    logoBg: 'bg-gradient-to-br from-blue-900 to-indigo-950',
    points: 98,
    wins: 0,
    podiums: 1,
    championships: 9,
    worldRank: 6,
    drivers: ['albon', 'sainz'],
    bio: 'One of the sport’s heritage pillars, Williams continues its aggressive long-term rebuild under James Vowles. In 2026, Carlos Sainz partner’s Alex Albon, forming what is globally recognized as one of the grid’s most consistent and potent driver pairings.',
    history: [
      { year: 2025, points: 42, position: 8 },
      { year: 2024, points: 17, position: 9 },
      { year: 2023, points: 28, position: 7 }
    ],
    stats: {
      fastestLaps: 133,
      polePositions: 128
    }
  },
  {
    id: 'haas',
    name: 'Haas F1 Team',
    fullName: 'MoneyGram Haas F1 Team',
    base: 'Kannapolis, United States',
    teamPrincipal: 'Ayao Komatsu',
    chassis: 'VF-26',
    powerUnit: 'Ferrari',
    color: '#E60000',
    logoBg: 'bg-gradient-to-br from-gray-950 to-red-950',
    points: 44,
    wins: 0,
    podiums: 0,
    championships: 0,
    worldRank: 7,
    drivers: ['ocon', 'bearman'],
    bio: 'America’s F1 team has undergone a complete culture change under Ayao Komatsu. Fielded for 2026 with a brand-new driver squad: the hard-nosed veteran Esteban Ocon partnering Ferrari academy prodigy Oliver Bearman.',
    history: [
      { year: 2025, points: 55, position: 6 },
      { year: 2024, points: 38, position: 7 },
      { year: 2023, points: 12, position: 10 }
    ],
    stats: {
      fastestLaps: 2,
      polePositions: 1
    }
  },
  {
    id: 'alpinesports',
    name: 'Alpine',
    fullName: 'BWT Alpine F1 Team',
    base: 'Enstone, United Kingdom',
    teamPrincipal: 'Oliver Oakes',
    chassis: 'A526',
    powerUnit: 'Mercedes',
    color: '#FF007F',
    logoBg: 'bg-gradient-to-br from-pink-900 to-blue-900',
    points: 38,
    wins: 0,
    podiums: 0,
    championships: 2,
    worldRank: 8,
    drivers: ['gasly', 'doohan'],
    bio: 'Moving to a Mercedes-supplied customer power unit architecture in 2026, Alpine seeks a complete structural reset. Pierre Gasly remains the veteran presence alongside Australia’s fast-charging Jack Doohan.',
    history: [
      { year: 2025, points: 49, position: 7 },
      { year: 2024, points: 49, position: 8 },
      { year: 2023, points: 120, position: 6 }
    ],
    stats: {
      fastestLaps: 15,
      polePositions: 22
    }
  },
  {
    id: 'vcarb',
    name: 'VCARB Racing Bulls',
    fullName: 'Visa Cash App RB F1 Team',
    base: 'Faenza, Italy',
    teamPrincipal: 'Laurent Mekies',
    chassis: 'VCARB02',
    powerUnit: 'Red Bull Ford',
    color: '#5C1DFF',
    logoBg: 'bg-gradient-to-br from-indigo-800 to-purple-900',
    points: 27,
    wins: 0,
    podiums: 0,
    championships: 0,
    worldRank: 9,
    drivers: ['tsunoda', 'hadjar'],
    bio: 'Part of the Red Bull racing ecosystem, Faenza-based VCARB pairs their experienced energetic leader Yuki Tsunoda with French super-rookie Isack Hadjar, utilizing Red Bull Ford powertrains.',
    history: [
      { year: 2025, points: 38, position: 9 },
      { year: 2024, points: 44, position: 6 },
      { year: 2023, points: 25, position: 8 }
    ],
    stats: {
      fastestLaps: 3,
      polePositions: 0
    }
  },
  {
    id: 'audi',
    name: 'Audi',
    fullName: 'Audi Sport F1 Team',
    base: 'Hinwil, Switzerland',
    teamPrincipal: 'Mattia Binotto',
    chassis: 'Audi F1-01',
    powerUnit: 'Audi',
    color: '#00E6FF',
    logoBg: 'bg-gradient-to-br from-zinc-900 to-zinc-950 border border-teal-500/30',
    points: 12,
    wins: 0,
    podiums: 0,
    championships: 0,
    worldRank: 10,
    drivers: ['hulkenberg', 'bortoleto'],
    bio: '2026 marks the historic full entry of German brand Audi, taking over Sauber completely. Led by industry icon Mattia Binotto, they boast a state-of-the-art power unit coupled with veteran Nico Hulkenberg and 2024 F2 champion Gabriel Bortoleto.',
    history: [
      { year: 2025, points: 4, position: 10 },
      { year: 2024, points: 0, position: 10 },
      { year: 2023, points: 16, position: 9 }
    ],
    stats: {
      fastestLaps: 0,
      polePositions: 0
    }
  }
];

export const DRIVERS: Driver[] = [
  {
    id: 'verstappen',
    name: 'Max Verstappen',
    code: 'VER',
    number: 1,
    teamId: 'redbull',
    teamName: 'Red Bull Racing',
    teamColor: '#001A30',
    nationality: 'Dutch',
    flag: '🇳🇱',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300',
    points: 198,
    wins: 3,
    podiums: 6,
    poles: 5,
    championships: 3,
    age: 28,
    placeOfBirth: 'Hasselt, Belgium',
    bio: 'Max Verstappen is a generational racing talent, combining relentless race pace, lethal defensive driving, and flawless calculated intelligence. Famed for clinching his first titles in extreme circumstances, Max represents Red Bull’s aggressive design philosophy.',
    history: [
      { year: 2025, team: 'Red Bull Racing', points: 388, position: 1 },
      { year: 2024, team: 'Red Bull Racing', points: 437, position: 1 },
      { year: 2023, team: 'Red Bull Racing', points: 575, position: 1 }
    ],
    seasonProgress: [25, 18, 25, 15, 25, 18, 18, 18, 18, 18]
  },
  {
    id: 'norris',
    name: 'Lando Norris',
    code: 'NOR',
    number: 4,
    teamId: 'mclaren',
    teamName: 'McLaren',
    teamColor: '#FF8000',
    nationality: 'British',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    points: 182,
    wins: 3,
    podiums: 7,
    poles: 4,
    championships: 0,
    age: 26,
    placeOfBirth: 'Bristol, United Kingdom',
    bio: 'Highly technical, dynamic, and exceptionally fast, Lando Norris has matured into a superstar frontline championship contender. Carrying McLaren back to standard-setting race pace.',
    history: [
      { year: 2025, team: 'McLaren', points: 345, position: 2 },
      { year: 2024, team: 'McLaren', points: 331, position: 2 },
      { year: 2023, team: 'McLaren', points: 205, position: 6 }
    ],
    seasonProgress: [18, 25, 15, 18, 18, 25, 15, 15, 20, 13]
  },
  {
    id: 'leclerc',
    name: 'Charles Leclerc',
    code: 'LEC',
    number: 16,
    teamId: 'ferrari',
    teamName: 'Ferrari',
    teamColor: '#E80020',
    nationality: 'Monegasque',
    flag: '🇲🇨',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    points: 171,
    wins: 2,
    podiums: 6,
    poles: 3,
    championships: 0,
    age: 28,
    placeOfBirth: 'Monte Carlo, Monaco',
    bio: 'Universally seen as the absolute fastest qualifier on the modern grid, Charles Leclerc combines extraordinary natural reflex control with deep historic loyalty to Scuderia Ferrari.',
    history: [
      { year: 2025, team: 'Ferrari', points: 312, position: 3 },
      { year: 2024, team: 'Ferrari', points: 307, position: 3 },
      { year: 2023, team: 'Ferrari', points: 206, position: 5 }
    ],
    seasonProgress: [15, 15, 18, 25, 12, 15, 25, 12, 20, 14]
  },
  {
    id: 'piastri',
    name: 'Oscar Piastri',
    code: 'PIA',
    number: 81,
    teamId: 'mclaren',
    teamName: 'McLaren',
    teamColor: '#FF8000',
    nationality: 'Australian',
    flag: '🇦🇺',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    points: 163,
    wins: 2,
    podiums: 6,
    poles: 1,
    championships: 0,
    age: 25,
    placeOfBirth: 'Melbourne, Australia',
    bio: 'Unflappable, surgically precise, and incredibly mature, Piastri is a calm-minded speed machine on track. Capable of executing high-pressure stint strategies with steel cold composure.',
    history: [
      { year: 2025, team: 'McLaren', points: 280, position: 4 },
      { year: 2024, team: 'McLaren', points: 262, position: 4 },
      { year: 2023, team: 'McLaren', points: 97, position: 9 }
    ],
    seasonProgress: [12, 20, 12, 12, 15, 20, 20, 25, 15, 12]
  },
  {
    id: 'hamilton',
    name: 'Lewis Hamilton',
    code: 'HAM',
    number: 44,
    teamId: 'ferrari',
    teamName: 'Ferrari',
    teamColor: '#E80020',
    nationality: 'British',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
    points: 141,
    wins: 2,
    podiums: 5,
    poles: 2,
    championships: 7,
    age: 41,
    placeOfBirth: 'Stevenage, United Kingdom',
    bio: 'One of the greatest to ever grace a racing cockpit, Lewis Hamilton shifted from Mercedes to Ferrari in 2026 to chase an unprecedented eighth world championship in the iconic Rosso Corsa.',
    history: [
      { year: 2025, team: 'Mercedes', points: 190, position: 5 },
      { year: 2024, team: 'Mercedes', points: 190, position: 6 },
      { year: 2023, team: 'Mercedes', points: 234, position: 3 }
    ],
    seasonProgress: [10, 12, 20, 10, 10, 12, 15, 18, 25, 9]
  },
  {
    id: 'russell',
    name: 'George Russell',
    code: 'RUS',
    number: 63,
    teamId: 'mercedes',
    teamName: 'Mercedes',
    teamColor: '#27F4D2',
    nationality: 'British',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    points: 124,
    wins: 1,
    podiums: 3,
    poles: 1,
    championships: 0,
    age: 28,
    placeOfBirth: 'King\'s Lynn, United Kingdom',
    bio: 'A fiercely aggressive overtaker, Russell is now the definitive leader of Mercedes. Known for supreme high-speed track navigation and analytical feedback.',
    history: [
      { year: 2025, team: 'Mercedes', points: 200, position: 4 },
      { year: 2024, team: 'Mercedes', points: 177, position: 5 },
      { year: 2023, team: 'Mercedes', points: 175, position: 8 }
    ],
    seasonProgress: [8, 10, 10, 15, 8, 10, 12, 25, 10, 16]
  },
  {
    id: 'sainz',
    name: 'Carlos Sainz',
    code: 'SAI',
    number: 55,
    teamId: 'williams',
    teamName: 'Williams Racing',
    teamColor: '#005AFF',
    nationality: 'Spanish',
    flag: '🇪🇸',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    points: 68,
    wins: 0,
    podiums: 1,
    poles: 0,
    championships: 0,
    age: 31,
    placeOfBirth: 'Madrid, Spain',
    bio: 'Known as the "smooth operator" and an absolute tactical mastermind. Sainz joins Williams under Grove’s legendary rebuild program, bringing elite GP experience and chassis tuning precision.',
    history: [
      { year: 2025, team: 'Ferrari', points: 212, position: 5 },
      { year: 2024, team: 'Ferrari', points: 258, position: 5 },
      { year: 2023, team: 'Ferrari', points: 200, position: 7 }
    ],
    seasonProgress: [6, 8, 8, 6, 6, 8, 10, 8, 4, 4]
  },
  {
    id: 'alonso',
    name: 'Fernando Alonso',
    code: 'ALO',
    number: 14,
    teamId: 'astonmartin',
    teamName: 'Aston Martin',
    teamColor: '#229971',
    nationality: 'Spanish',
    flag: '🇪🇸',
    avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=300',
    points: 82,
    wins: 0,
    podiums: 3,
    poles: 0,
    championships: 2,
    age: 44,
    placeOfBirth: 'Oviedo, Spain',
    bio: 'The ultimate veteran, Alonso’s racing IQ is unmatched. Powered in 2026 by Honda and the genius engineering designs of Adrian Newey, Fernando continues to defeat rivals half his age.',
    history: [
      { year: 2025, team: 'Aston Martin', points: 145, position: 6 },
      { year: 2024, team: 'Aston Martin', points: 62, position: 9 },
      { year: 2023, team: 'Aston Martin', points: 206, position: 4 }
    ],
    seasonProgress: [4, 6, 6, 8, 12, 10, 15, 10, 8, 3]
  },
  {
    id: 'lawson',
    name: 'Liam Lawson',
    code: 'LAW',
    number: 30,
    teamId: 'redbull',
    teamName: 'Red Bull Racing',
    teamColor: '#001A30',
    nationality: 'New Zealander',
    flag: '🇳🇿',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300',
    points: 90,
    wins: 0,
    podiums: 2,
    poles: 0,
    championships: 0,
    age: 24,
    placeOfBirth: 'Hastings, New Zealand',
    bio: 'New Zealand’s relentless speed star, Liam Lawson secured the holy grail second seat at Oracle Red Bull Racing. Fierce, composed, and extremely confident wheel-to-wheel.',
    history: [
      { year: 2025, team: 'VCARB', points: 28, position: 10 },
      { year: 2024, team: 'VCARB (Reserve)', points: 2, position: 20 },
      { year: 2023, team: 'AlphaTauri', points: 2, position: 20 }
    ],
    seasonProgress: [2, 4, 15, 8, 12, 8, 10, 15, 10, 6]
  },
  {
    id: 'antonelli',
    name: 'Kimi Antonelli',
    code: 'ANT',
    number: 12,
    teamId: 'mercedes',
    teamName: 'Mercedes',
    teamColor: '#27F4D2',
    nationality: 'Italian',
    flag: '🇮🇹',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=300',
    points: 70,
    wins: 0,
    podiums: 2,
    poles: 0,
    championships: 0,
    age: 19,
    placeOfBirth: 'Bologna, Italy',
    bio: 'Lauded as Italy’s next legendary world champion, Andrea Kimi Antonelli advanced through F4, FRECA, and F2 with blistering efficiency to debut inside Brackley’s elite Mercedes cockpit.',
    history: [
      { year: 2025, team: 'Mercedes (Test)', points: 0, position: 0 }
    ],
    seasonProgress: [1, 2, 4, 4, 10, 15, 8, 12, 10, 4]
  },
  {
    id: 'albon',
    name: 'Alex Albon',
    code: 'ALB',
    number: 23,
    teamId: 'williams',
    teamName: 'Williams Racing',
    teamColor: '#005AFF',
    nationality: 'Thai',
    flag: '🇹🇭',
    avatar: 'https://images.unsplash.com/photo-1542909168-82c357fd4aea?auto=format&fit=crop&q=80&w=300',
    points: 30,
    wins: 0,
    podiums: 0,
    poles: 0,
    championships: 0,
    age: 30,
    placeOfBirth: 'London, United Kingdom',
    bio: 'Refined, highly popular, and incredibly fast over a single flight lap. Albon continues to provide the technical core for Williams’ return to motorsport excellence.',
    history: [
      { year: 2025, team: 'Williams', points: 36, position: 8 },
      { year: 2024, team: 'Williams', points: 12, position: 15 },
      { year: 2023, team: 'Williams', points: 27, position: 13 }
    ],
    seasonProgress: [0, 1, 2, 2, 4, 6, 6, 1, 4, 4]
  },
  {
    id: 'stroll',
    name: 'Lance Stroll',
    code: 'STR',
    number: 18,
    teamId: 'astonmartin',
    teamName: 'Aston Martin',
    teamColor: '#229971',
    nationality: 'Canadian',
    flag: '🇨🇦',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    points: 50,
    wins: 0,
    podiums: 0,
    poles: 0,
    championships: 0,
    age: 27,
    placeOfBirth: 'Montreal, Canada',
    bio: 'Possessing remarkable reflexes in mixed, changing, or extreme weather conditions. Stroll anchors the green Aston Martin AMR26 as it utilizes legendary Honda mechanical configurations.',
    history: [
      { year: 2025, team: 'Aston Martin', points: 70, position: 7 },
      { year: 2024, team: 'Aston Martin', points: 24, position: 10 },
      { year: 2023, team: 'Aston Martin', points: 74, position: 10 }
    ],
    seasonProgress: [1, 2, 4, 4, 6, 6, 4, 8, 5, 10]
  },
  {
    id: 'ocon',
    name: 'Esteban Ocon',
    code: 'OCO',
    number: 31,
    teamId: 'haas',
    teamName: 'Haas F1 Team',
    teamColor: '#E60000',
    nationality: 'French',
    flag: '🇫🇷',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=300',
    points: 26,
    wins: 1, // Hungary 2021
    podiums: 3,
    poles: 0,
    championships: 0,
    age: 29,
    placeOfBirth: 'Évreux, France',
    bio: 'Famed for being one of the trickiest, most stubborn, and defensively outstanding wheel-to-wheel operators, Esteban Ocon leads America’s Haas crew in 2026.',
    history: [
      { year: 2025, team: 'Alpine', points: 25, position: 11 },
      { year: 2024, team: 'Alpine', points: 15, position: 14 },
      { year: 2023, team: 'Alpine', points: 58, position: 12 }
    ],
    seasonProgress: [0, 0, 1, 2, 2, 4, 6, 4, 5, 2]
  },
  {
    id: 'bearman',
    name: 'Oliver Bearman',
    code: 'BEA',
    number: 87,
    teamId: 'haas',
    teamName: 'Haas F1 Team',
    teamColor: '#E60000',
    nationality: 'British',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300',
    points: 18,
    wins: 0,
    podiums: 0,
    poles: 0,
    championships: 0,
    age: 21,
    placeOfBirth: 'Chelmsford, United Kingdom',
    bio: 'Scoring F1 points on his stunning, last-minute 2024 debut for Scuderia Ferrari, "Ollie" transitions into a full premium Haas factory campaign to demonstrate his world-championship caliber speed.',
    history: [
      { year: 2025, team: 'Haas (Reserve)', points: 4, position: 19 },
      { year: 2024, team: 'Ferrari / Haas', points: 7, position: 18 }
    ],
    seasonProgress: [0, 0, 0, 1, 1, 2, 4, 6, 2, 2]
  },
  {
    id: 'gasly',
    name: 'Pierre Gasly',
    code: 'GAS',
    number: 10,
    teamId: 'alpinesports',
    teamName: 'Alpine',
    teamColor: '#FF007F',
    nationality: 'French',
    flag: '🇫🇷',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=300',
    points: 24,
    wins: 1, // Monza 2020
    podiums: 4,
    poles: 0,
    championships: 0,
    age: 30,
    placeOfBirth: 'Rouen, France',
    bio: 'An incredibly resilient character, Pierre Gasly centers Alpine F1’s Mercedes power unit shift. High cornering agility and great street track capabilities.',
    history: [
      { year: 2025, team: 'Alpine', points: 24, position: 12 },
      { year: 2024, team: 'Alpine', points: 34, position: 12 },
      { year: 2023, team: 'Alpine', points: 62, position: 11 }
    ],
    seasonProgress: [0, 0, 1, 1, 2, 4, 2, 8, 4, 2]
  },
  {
    id: 'tsunoda',
    name: 'Yuki Tsunoda',
    code: 'TSU',
    number: 22,
    teamId: 'vcarb',
    teamName: 'VCARB Racing Bulls',
    teamColor: '#5C1DFF',
    nationality: 'Japanese',
    flag: '🇯🇵',
    avatar: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=300',
    points: 21,
    wins: 0,
    podiums: 0,
    poles: 0,
    championships: 0,
    age: 26,
    placeOfBirth: 'Sagamihara, Japan',
    bio: 'Yuki blends legendary outright raw velocity with newly mastered technical race management. Known for blistering overtaking runs in high-speed complexes.',
    history: [
      { year: 2025, team: 'VCARB', points: 10, position: 13 },
      { year: 2024, team: 'VCARB', points: 22, position: 11 },
      { year: 2023, team: 'AlphaTauri', points: 17, position: 14 }
    ],
    seasonProgress: [1, 0, 1, 2, 1, 4, 6, 2, 2, 2]
  },
  {
    id: 'doohan',
    name: 'Jack Doohan',
    code: 'DOO',
    number: 8,
    teamId: 'alpinesports',
    teamName: 'Alpine',
    teamColor: '#FF007F',
    nationality: 'Australian',
    flag: '🇦🇺',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300',
    points: 14,
    wins: 0,
    podiums: 0,
    poles: 0,
    championships: 0,
    age: 23,
    placeOfBirth: 'Gold Coast, Australia',
    bio: 'Son of legendary 5-time motorcycling champion Mick Doohan, Jack brings incredible instinctual tyre management and intense focus to the full Enstone Alpine campaign.',
    history: [
      { year: 2025, team: 'Alpine (Reserve)', points: 0, position: 0 }
    ],
    seasonProgress: [0, 0, 0, 0, 1, 2, 4, 1, 2, 4]
  },
  {
    id: 'hadjar',
    name: 'Isack Hadjar',
    code: 'HAD',
    number: 25,
    teamId: 'vcarb',
    teamName: 'VCARB Racing Bulls',
    teamColor: '#5C1DFF',
    nationality: 'French',
    flag: '🇫🇷',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=300',
    points: 6,
    wins: 0,
    podiums: 0,
    poles: 0,
    championships: 0,
    age: 21,
    placeOfBirth: 'Paris, France',
    bio: 'Famed for his aggressive, hard-braking driving, the Red Bull junior product graduated to Faenza’s active roster to provide high-octane F2-winning telemetry performance.',
    history: [
      { year: 2025, team: 'Red Bull Racing (Test)', points: 0, position: 0 }
    ],
    seasonProgress: [0, 0, 0, 0, 1, 1, 2, 0, 1, 1]
  },
  {
    id: 'hulkenberg',
    name: 'Nico Hülkenberg',
    code: 'HUL',
    number: 27,
    teamId: 'audi',
    teamName: 'Audi',
    teamColor: '#00E6FF',
    nationality: 'German',
    flag: '🇩🇪',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    points: 10,
    wins: 0,
    podiums: 0,
    poles: 1,
    championships: 0,
    age: 38,
    placeOfBirth: 'Emmerich am Rhein, West Germany',
    bio: 'One of the most trusted names on the grid. Nico was picked by Audi for their historical entry due to his outstanding raw qualifying speed and master-level car development feedback.',
    history: [
      { year: 2025, team: 'Haas', points: 30, position: 9 },
      { year: 2024, team: 'Haas', points: 22, position: 10 },
      { year: 2023, team: 'Haas', points: 9, position: 16 }
    ],
    seasonProgress: [0, 0, 1, 1, 2, 2, 2, 0, 2, 0]
  },
  {
    id: 'bortoleto',
    name: 'Gabriel Bortoleto',
    code: 'BOR',
    number: 5,
    teamId: 'audi',
    teamName: 'Audi',
    teamColor: '#00E6FF',
    nationality: 'Brazilian',
    flag: '🇧🇷',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=300',
    points: 2,
    wins: 0,
    podiums: 0,
    poles: 0,
    championships: 0,
    age: 21,
    placeOfBirth: 'São Paulo, Brazil',
    bio: 'Managed by Fernando Alonso’s company, Bortoleto clinched back-to-back F3 and F2 crowns to spearhead Brazil’s epic full-time return to the elite Formula 1 grid with Audi.',
    history: [
      { year: 2025, team: 'McLaren (Reserve)', points: 0, position: 0 }
    ],
    seasonProgress: [0, 0, 0, 0, 0, 1, 1, 0, 0, 0]
  }
];

export const CIRCUITS: Circuit[] = [
  {
    id: 'bahrain',
    name: 'Bahrain International Circuit',
    fullName: 'Gulf Air Bahrain International Circuit',
    location: 'Sakhir',
    country: 'Bahrain',
    flag: '🇧🇭',
    lengthKm: 5.412,
    laps: 57,
    distanceKm: 308.238,
    corners: 15,
    capacity: 70000,
    opened: 2004,
    lapRecord: {
      time: '1:31.447',
      driverCode: 'ZHE',
      year: 2005
    },
    svgPath: 'M 30,30 L 150,30 L 120,70 L 180,90 L 150,130 L 90,130 L 60,90 L 30,30 Z', // Simplified track layout lines
    bio: 'The standard modern opener. Characterized by high environmental wind, abrasive sand, extreme deceleration zones, and heavy acceleration focus, pushing modern F1 power unit efficiency to its peak.'
  },
  {
    id: 'monaco',
    name: 'Circuit de Monaco',
    fullName: 'Circuit de Monaco',
    location: 'Monte Carlo',
    country: 'Monaco',
    flag: '🇲🇨',
    lengthKm: 3.337,
    laps: 78,
    distanceKm: 260.286,
    corners: 19,
    capacity: 37000,
    opened: 1929,
    lapRecord: {
      time: '1:12.909',
      driverCode: 'HAM',
      year: 2021
    },
    svgPath: 'M 20,40 C 40,40 50,20 70,20 C 100,20 120,40 140,30 C 160,20 180,40 160,80 C 140,100 110,80 90,110 C 70,140 40,110 30,80 C 20,50 10,40 20,40 Z',
    bio: 'The crown jewel. Steeped in ultimate glamour, this extremely tight street run through Monte Carlo permits absolutely zero error margins, with overtaking being the supreme test of modern grid driving.'
  },
  {
    id: 'silverstone',
    name: 'Silverstone Circuit',
    fullName: 'Silverstone Circuit',
    location: 'Silverstone',
    country: 'United Kingdom',
    flag: '🇬🇧',
    lengthKm: 5.891,
    laps: 52,
    distanceKm: 306.198,
    corners: 18,
    capacity: 150000,
    opened: 1948,
    lapRecord: {
      time: '1:27.097',
      driverCode: 'VER',
      year: 2020
    },
    svgPath: 'M 20,30 L 60,10 L 140,20 C 170,40 190,60 170,90 C 150,120 120,130 90,100 L 70,120 C 50,140 20,110 30,70 L 20,30 Z',
    bio: 'The classic high-speed home of Formula 1. Silverstone’s historic Copse, Maggots, and Becketts corners create massive lateral G-force loads on F1 aerodynamic chassis and tyre boundaries.'
  },
  {
    id: 'spa',
    name: 'Circuit de Spa-Francorchamps',
    fullName: 'Circuit de Spa-Francorchamps',
    location: 'Stavelot',
    country: 'Belgium',
    flag: '🇧🇪',
    lengthKm: 7.004,
    laps: 44,
    distanceKm: 308.052,
    corners: 19,
    capacity: 100000,
    opened: 1921,
    lapRecord: {
      time: '1:46.286',
      driverCode: 'BOT',
      year: 2018
    },
    svgPath: 'M 10,100 C 20,70 50,50 80,40 L 120,10 L 180,40 C 190,70 170,110 140,110 C 110,110 90,130 60,130 C 30,130 10,120 10,100 Z',
    bio: 'An absolute driver favorite. Nestled deep in the hilly terrain of the Ardennes, Spa boasts the terrifying Eau Rouge and Radillon complex, providing extremely scenic elevation transitions.'
  },
  {
    id: 'monza',
    name: 'Autodromo Nazionale Monza',
    fullName: 'Autodromo Nazionale Monza',
    location: 'Monza',
    country: 'Italy',
    flag: '🇮🇹',
    lengthKm: 5.793,
    laps: 53,
    distanceKm: 306.720,
    corners: 11,
    capacity: 115000,
    opened: 1922,
    lapRecord: {
      time: '1:21.046',
      driverCode: 'BAR',
      year: 2004
    },
    svgPath: 'M 10,20 L 180,20 L 180,50 L 130,85 L 100,100 L 40,85 L 10,60 L 10,20 Z',
    bio: 'The absolute "Temple of Speed". Monza features breathtaking long straights coupled with massive slowing chicanes. It is the ultimate spiritual home to the Italian Tifosi and Scuderia Ferrari Passion.'
  },
  {
    id: 'marina_bay',
    name: 'Marina Bay Street Circuit',
    fullName: 'Marina Bay Street Circuit',
    location: 'Marina Bay',
    country: 'Singapore',
    flag: '🇸🇬',
    lengthKm: 4.940,
    laps: 62,
    distanceKm: 306.143,
    corners: 19,
    capacity: 90000,
    opened: 2008,
    lapRecord: {
      time: '1:35.867',
      driverCode: 'HAM',
      year: 2023
    },
    svgPath: 'M 10,10 H 150 V 50 H 100 V 100 H 50 V 150 H 10 Z',
    bio: 'A grueling twilight trial. Famous as the original F1 night circuit, Marina Bay combines severe tropical humidity with persistent bumpy concrete walls, posing absolute physical tests.'
  }
];

export const RACES: Race[] = [
  {
    round: 1,
    id: 'bahrain_gp',
    name: 'Bahrain Grand Prix',
    circuitId: 'bahrain',
    circuitName: 'Bahrain International Circuit',
    location: 'Sakhir',
    country: 'Bahrain',
    flag: '🇧🇭',
    date: '2026-03-01',
    timeUtc: '15:00',
    status: 'Completed',
    winner: {
      driverId: 'verstappen',
      driverName: 'Max Verstappen',
      teamColor: '#001A30',
      time: '1:31:44.755'
    },
    podium: ['Max Verstappen', 'Lando Norris', 'Charles Leclerc']
  },
  {
    round: 2,
    id: 'monaco_gp',
    name: 'Monaco Grand Prix',
    circuitId: 'monaco',
    circuitName: 'Circuit de Monaco',
    location: 'Monte Carlo',
    country: 'Monaco',
    flag: '🇲🇨',
    date: '2026-05-24',
    timeUtc: '13:00',
    status: 'Completed',
    winner: {
      driverId: 'leclerc',
      driverName: 'Charles Leclerc',
      teamColor: '#E80020',
      time: '1:43:26.432'
    },
    podium: ['Charles Leclerc', 'Oscar Piastri', 'Lewis Hamilton']
  },
  {
    round: 3,
    id: 'british_gp',
    name: 'British Grand Prix',
    circuitId: 'silverstone',
    circuitName: 'Silverstone Circuit',
    location: 'Silverstone',
    country: 'United Kingdom',
    flag: '🇬🇧',
    date: '2026-07-05',
    timeUtc: '14:00',
    status: 'Upcoming'
  },
  {
    round: 4,
    id: 'belgian_gp',
    name: 'Belgian Grand Prix',
    circuitId: 'spa',
    circuitName: 'Circuit de Spa-Francorchamps',
    location: 'Stavelot',
    country: 'Belgium',
    flag: '🇧🇪',
    date: '2026-07-26',
    timeUtc: '13:00',
    status: 'Upcoming'
  },
  {
    round: 5,
    id: 'italian_gp',
    name: 'Italian Grand Prix',
    circuitId: 'monza',
    circuitName: 'Autodromo Nazionale Monza',
    location: 'Monza',
    country: 'Italy',
    flag: '🇮🇹',
    date: '2026-08-30',
    timeUtc: '13:00',
    status: 'Upcoming'
  },
  {
    round: 6,
    id: 'singapore_gp',
    name: 'Singapore Grand Prix',
    circuitId: 'marina_bay',
    circuitName: 'Marina Bay Street Circuit',
    location: 'Marina Bay',
    country: 'Singapore',
    flag: '🇸🇬',
    date: '2026-09-20',
    timeUtc: '12:00',
    status: 'Upcoming'
  }
];

// Helper to provide a telemetry timeline for progression charting
export const RACE_LAP_DATAPOINTS = [
  { lap: 1, VER: 0, NOR: 3, LEC: 1, PIA: 4, HAM: 6, RUS: 7 },
  { lap: 10, VER: 2, NOR: 4.5, LEC: 1.2, PIA: 8.2, HAM: 12.1, RUS: 14.3 },
  { lap: 20, VER: 3.5, NOR: 5.1, LEC: 0.8, PIA: 10.4, HAM: 18.2, RUS: 21.0 },
  { lap: 30, VER: 6.2, NOR: 4.8, LEC: 2.1, PIA: 9.3, HAM: 22.1, RUS: 24.5 },
  { lap: 40, VER: 10.1, NOR: 3.2, LEC: 3.5, PIA: 11.2, HAM: 25.0, RUS: 29.1 },
  { lap: 50, VER: 14.5, NOR: 2.1, LEC: 2.8, PIA: 10.1, HAM: 21.3, RUS: 31.2 },
  { lap: 57, VER: 18.2, NOR: 1.8, LEC: 4.2, PIA: 12.0, HAM: 19.5, RUS: 32.4 }
];
