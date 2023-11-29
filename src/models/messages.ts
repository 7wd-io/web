import { GameId } from 'src/models/game';
import { Nickname } from 'src/models/account';

export interface PlayAgainUpdated {
  game: GameId;
  user: Nickname;
  answer: boolean;
}

export interface PlayAgainApproved {
  next: GameId;
}
