// src/types.ts
export interface Team {
  id: number;
  name: string;
  logo: string;
  score?: number | null;
}

export interface Fixture {
  fixtureId: number;
  date: string;
  tip: string;
  status?: string | {
    short?: string;
    elapsed?: number;
  };
  minute?: number;
  displayDate?: string;
  homeTeam?: Team | null;
  awayTeam?: Team | null;
  [key: string]: any;
}

export interface LeagueData {
  league: string;
  leagueLogo?: string;
  country?: string;
  fixtures: Array<Partial<Fixture> & { fixtureId: number; date: string; tip: string }>;
}
