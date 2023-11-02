import { User } from './account';

export type RoomId = string;

export interface Room {
  id: RoomId;
  players: User[];
  options: RoomOptions;
}

export interface RoomOptions {
  size: number;
}
