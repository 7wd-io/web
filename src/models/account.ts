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
}
