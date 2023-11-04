import { defineStore } from 'pinia';
import { Nickname } from 'src/models/account';

export const usePlayAgain = defineStore('game:playAgain', {
  state: () => ({
    answers: {} as Record<Nickname, boolean>,
    show: false,
    showBadges: false,
  }),
});

export type PlayAgainStore = ReturnType<typeof usePlayAgain>;
