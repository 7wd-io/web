import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Nickname } from 'src/models/account';
import { GameId } from 'src/models/game';
import { api } from 'boot/axios';

export const usePlayAgainStore = defineStore('game:playAgain', () => {
  const answers = ref({} as Record<Nickname, boolean>);
  const show = ref(false);
  const showBadges = ref(false);

  async function answer(gameId: GameId, answer: boolean) {
    await api.post('/play-again', {
      gameId,
      answer,
    });
  }

  return {
    answers,
    show,
    showBadges,
    answer,
  };
});
