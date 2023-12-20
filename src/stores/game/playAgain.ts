import { defineStore } from 'pinia';
import { Nickname } from 'src/models/account';
import { GameId } from 'src/models/game';
import { api } from 'boot/axios';

export const usePlayAgainStore = defineStore('game:playAgain', {
  state: () => ({
    answers: {} as Record<Nickname, boolean>,
    show: false,
    showBadges: false,
  }),
  actions: {
    async answer(gameId: GameId, answer: boolean) {
      await api.post('/play-again', {
        gameId,
        answer,
      });
    },
  },
});
