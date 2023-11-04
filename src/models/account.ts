interface GameSettings {
  animationSpeed: AnimationSpeed;
}

interface SoundsSettings {
  opponentJoined: boolean;
  myTurn: boolean;
}

export interface Settings {
  game: GameSettings;
  sounds: SoundsSettings;
}

export type AnimationSpeed = 1 | 2 | 3 | 4 | 5;

export type Nickname = string;
export type Id = number;

export interface Session {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: Id;
  nickname: Nickname;
  rating: number;
  settings: Settings;
}

export const botNickname = 'bot';
