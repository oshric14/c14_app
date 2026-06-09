export type Team = {
  id: number;
  name: string;
  nameHe: string;
  logo: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  isHighlighted?: boolean; // Optional flag for highlighting specific teams
};

export type LeagueStandings = {
  league: {
    id: number;
    name: string;
    nameHe: string;
    season: string;
  };
  standings: Team[];
};

export type Match = {
  id: number;
  homeTeam: {
    id: number;
    name: string;
    nameHe: string;
    logo: string;
  };
  awayTeam: {
    id: number;
    name: string;
    nameHe: string;
    logo: string;
  };
  homeScore: number | null;
  awayScore: number | null;
  status: "finished" | "live" | "scheduled";
  date: string;
  time: string;
  league: {
    id: number;
    name: string;
    nameHe: string;
  };
};

export type TeamStats = {
  team: Team;
  recentMatches: Match[];
  seasonStats: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    cleanSheets: number;
    avgGoalsFor: number;
    avgGoalsAgainst: number;
  };
  topPlayers: {
    id: number;
    name: string;
    nameHe: string;
    position: string;
    goals: number;
    assists: number;
    appearances: number;
  }[];
};

export type SportCategory = "main" | "football" | "basketball" | "tennis";

// Add Tennis Ranking type
export type TennisPlayer = {
  id: number;
  name: string;
  nameHe: string;
  image: string;
  rank: number;
  points: number;
  age: number; // Add age property
};

export type TennisRanking = {
  category: string;
  categoryHe: string;
  players: TennisPlayer[];
};

// Game Statistics for Basketball
export type GameStatistics = {
  gameId: number;
  league: {
    id: number;
    name: string;
    nameHe: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      nameHe: string;
      logo: string;
      statistics: {
        points: number;
        fieldGoalsMade: number;
        fieldGoalsAttempted: number;
        fieldGoalsPercentage: number;
        threePointersMade: number;
        threePointersAttempted: number;
        threePointersPercentage: number;
        freeThrowsMade: number;
        freeThrowsAttempted: number;
        freeThrowsPercentage: number;
        rebounds: number;
        assists: number;
        steals: number;
        blocks: number;
        turnovers: number;
        fouls: number;
      };
    };
    away: {
      id: number;
      name: string;
      nameHe: string;
      logo: string;
      statistics: {
        points: number;
        fieldGoalsMade: number;
        fieldGoalsAttempted: number;
        fieldGoalsPercentage: number;
        threePointersMade: number;
        threePointersAttempted: number;
        threePointersPercentage: number;
        freeThrowsMade: number;
        freeThrowsAttempted: number;
        freeThrowsPercentage: number;
        rebounds: number;
        assists: number;
        steals: number;
        blocks: number;
        turnovers: number;
        fouls: number;
      };
    };
  };
  quarters?: {
    quarter: number;
    homeScore: number;
    awayScore: number;
  }[];
  date: string;
  status: "finished" | "live" | "scheduled";
};

// Head to Head data
export type HeadToHead = {
  team1: {
    id: number;
    name: string;
    nameHe: string;
    logo: string;
  };
  team2: {
    id: number;
    name: string;
    nameHe: string;
    logo: string;
  };
  matches: Match[];
  statistics: {
    team1Wins: number;
    team2Wins: number;
    draws: number;
    totalMatches: number;
  };
};

// World Cup 2026 Types
export type WorldCupGroup = {
  name: string; // "Group A", "Group B", etc.
  teams: Team[];
};

export type WorldCupGroupStandings = {
  tournament: {
    id: number;
    name: string;
    nameHe: string;
    season: string;
  };
  groups: WorldCupGroup[];
};

// World Cup Match Stages
export type MatchStage =
  | "Group Stage"
  | "Round of 16"
  | "Quarter Finals"
  | "Semi Finals"
  | "3rd Place"
  | "Final";

// Extended Match type with optional stage information
export type WorldCupMatch = Match & {
  stage?: MatchStage;
  round?: string;
  venue?: string; // Stadium/venue name
};
