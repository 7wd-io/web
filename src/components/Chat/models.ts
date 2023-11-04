import { Nickname } from 'src/models/game';

export interface Message {
  author: Nickname;
  body: string;
  ts: number;
}
