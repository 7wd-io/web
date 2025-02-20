import { Move } from 'src/models/move';

export interface LogRecord {
  move: Move;
  meta: { actor: string };
}

export type Log = LogRecord[];
