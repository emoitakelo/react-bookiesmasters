// src/types.ts

export interface Team {
  id: number;
  name: string;
  logo?: string;
  score?: number | null;
  last5Matches?: Match[]; // ✅ Use Match[]
}
export interface LiveScore {
  fixtureId: number;
  fullData: {
    fixture: {
      status?: { short?: string; elapsed?: number };
    };
    goals?: {
      home?: number;
      away?: number;
    };
  };
}
export interface Match {
  homeTeam: string; // team name
  awayTeam: string; // team name
  date?: string;
  score: { home: number; away: number }; // required
  result?: string; // optional (W/D/L)
  color?: string; // optional for display
}

export interface Fixture {
  fixtureId: number;
  date: string;
  tip?: string;
  status?: string | { short?: string; elapsed?: number };
  minute?: number;
  displayDate?: string;
  venue?: string;
  homeTeam: Team;
  awayTeam: Team;
  h2h?: any[];
  league?: {
    name: string;
    logo?: string;
    country?: string;
  };
  [key: string]: any;
}

export interface LeagueData {
  league: string;
  leagueLogo?: string;
  country?: string;
  fixtures: Fixture[];
}
