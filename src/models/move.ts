import { CardId, TokenId, Victory, WonderId } from 'src/models/game';

import { Nickname } from 'src/models/account';

export enum Id {
  pickWonder = 2,
  pickBoardToken,
  constructCard,
  constructWonder,
  discardCard,
  selectWhoBeginsNextAge,
  burnCard,
  pickRandomToken,
  pickTopLineCard,
  pickDiscardedCard,
  pickReturnedCards,
  over,
}

interface Base {
  id: Id;
}

interface PickWonder extends Base {
  wonder: WonderId;
}

interface PickBoardToken extends Base {
  token: TokenId;
}

interface ConstructCard extends Base {
  card: CardId;
}

interface ConstructWonder extends Base {
  wonder: WonderId;
  card: CardId;
}

interface DiscardCard extends Base {
  card: CardId;
}

interface SelectWhoBeginsTheNextAge extends Base {
  player: Nickname;
}

interface BurnCard extends Base {
  card: CardId;
}

interface PickRandomToken extends Base {
  token: TokenId;
}

interface PickTopLineCard extends Base {
  card: CardId;
}

interface PickDiscardedCard extends Base {
  card: CardId;
}

interface PickReturnedCards extends Base {
  pick: CardId;
  give: CardId;
}

interface Over extends Base {
  loser: Nickname;
  reason: Victory;
}

export type Move =
  | PickWonder
  | PickBoardToken
  | ConstructCard
  | ConstructWonder
  | DiscardCard
  | SelectWhoBeginsTheNextAge
  | BurnCard
  | PickRandomToken
  | PickTopLineCard
  | PickDiscardedCard
  | PickReturnedCards
  | Over;

export class MoveValidator {
  public static isPickWonder(m: Move): m is PickWonder {
    return m.id === Id.pickWonder;
  }

  public static isPickBoardToken(m: Move): m is PickBoardToken {
    return m.id === Id.pickBoardToken;
  }

  public static isConstructCard(m: Move): m is ConstructCard {
    return m.id === Id.constructCard;
  }

  public static isConstructWonder(m: Move): m is ConstructWonder {
    return m.id === Id.constructWonder;
  }

  public static isDiscardCard(m: Move): m is DiscardCard {
    return m.id === Id.discardCard;
  }

  public static isSelectWhoBeginsNextAge(
    m: Move
  ): m is SelectWhoBeginsTheNextAge {
    return m.id === Id.selectWhoBeginsNextAge;
  }

  public static isBurnCard(m: Move): m is BurnCard {
    return m.id === Id.burnCard;
  }

  public static isPickRandomToken(m: Move): m is PickRandomToken {
    return m.id === Id.pickRandomToken;
  }

  public static isPickTopLineCard(m: Move): m is PickTopLineCard {
    return m.id === Id.pickTopLineCard;
  }

  public static isPickDiscardedCard(m: Move): m is PickDiscardedCard {
    return m.id === Id.pickDiscardedCard;
  }

  public static isPickReturnedCards(m: Move): m is PickReturnedCards {
    return m.id === Id.pickReturnedCards;
  }

  public static isOver(m: Move): m is Over {
    return m.id === Id.over;
  }
}
