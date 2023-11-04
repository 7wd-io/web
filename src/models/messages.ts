import { GameId } from 'src/models/game';
import { Nickname } from 'src/models/account';

export interface PlayAgainUpdated {
  id: GameId;
  player: Nickname;
  answer: boolean;
}

export interface PlayAgainApproved {
  next: GameId;
}
