import { Nickname } from 'src/models/account';

export interface Message {
  author: Nickname;
  body: string;
  ts: number;
}
