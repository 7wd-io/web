import { CardId, TokenId, WonderId } from 'src/models/game';

export default class Board {
  static classnameDiscard = 'swd-js-the-discard';

  static classnameDiscardCardHolder = 'swd-js-the-discard-card-holder';

  static getClassnameWonder(id: WonderId) {
    return `swd-js-board-wonder-${id}`;
  }

  static getClassnameCard(id: CardId) {
    return `swd-js-board-card-${id}`;
  }

  static getClassnameToken(id: TokenId) {
    return `swd-js-the-board-token-${id}`;
  }

  static getWonder(id: WonderId) {
    return document
      .querySelector(`.${Board.getClassnameWonder(id)}`) as HTMLElement;
  }

  static getCard(id: CardId) {
    return document
      .querySelector(`.${Board.getClassnameCard(id)}`) as HTMLElement;
  }

  static getToken(id: TokenId) {
    return document
      .querySelector(`.${Board.getClassnameToken(id)}`) as HTMLElement;
  }

  static getDiscard() {
    return document
      .querySelector(`.${Board.classnameDiscard}`) as HTMLElement;
  }

  static getDiscardCardHolder() {
    return document
      .querySelector(`.${Board.classnameDiscardCardHolder}`) as HTMLElement;
  }
}
