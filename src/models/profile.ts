export interface GameReport {
  total: number;
  points: number;
  military: number;
  science: number;
  resign: number;
  timeout: number;
}

export interface GamesReport {
  won: GameReport;
  lose: GameReport;
}

export interface Profile {
  rank: number;
  rating: number;
  games: GamesReport;
}

export interface Report {
  won: Profile;
  lose: Profile;
}
