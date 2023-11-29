import { defineStore } from 'pinia';
import { CardId, GameId, TokenId, WonderId } from 'src/models/game';
import { api } from 'boot/axios';
import { Nickname } from 'src/models/account';

export const useMoveStore = defineStore('game:move', {
  actions: {
    async constructCard(gameId: GameId, cardId: CardId) {
      await api.post('/game/move/construct-card', {
        gameId,
        cardId,
      });
    },

    async constructWonder(gameId: GameId, wonderId: WonderId, cardId: CardId) {
      await api.post('/game/move/construct-wonder', {
        gameId,
        wonderId,
        cardId,
      });
    },

    async discardCard(gameId: GameId, cardId: CardId) {
      await api.post('/game/move/discard-card', {
        gameId,
        cardId,
      });
    },

    async selectMove(gameId: GameId, user: Nickname) {
      await api.post('/game/move/select-move', {
        gameId,
        user,
      });
    },

    async pickWonder(gameId: GameId, wonderId: WonderId) {
      await api.post('/game/move/pick-wonder', {
        gameId,
        wonderId,
      });
    },

    async pickBoardToken(gameId: GameId, tokenId: TokenId) {
      await api.post('/game/move/pick-board-token', {
        gameId,
        tokenId,
      });
    },

    async pickRandomToken(gameId: GameId, tokenId: TokenId) {
      await api.post('/game/move/pick-random-token', {
        gameId,
        tokenId,
      });
    },

    async burnCard(gameId: GameId, cardId: CardId) {
      await api.post('/game/move/burn-card', {
        gameId,
        cardId,
      });
    },

    async pickDiscardedCard(gameId: GameId, cardId: CardId) {
      await api.post('/game/move/pick-discarded-card', {
        gameId,
        cardId,
      });
    },

    async pickToplineCard(gameId: GameId, cardId: CardId) {
      await api.post('/game/move/pick-topline-card', {
        gameId,
        cardId,
      });
    },

    async pickReturnedCards(
      gameId: GameId,
      pickCardId: CardId,
      giveCardId: CardId
    ) {
      await api.post('/game/move/pick-returned-cards', {
        gameId,
        pickCardId,
        giveCardId,
      });
    },

    async resign(gameId: GameId) {
      await api.post('/game/move/resign', {
        gameId,
      });
    },
  },
});
