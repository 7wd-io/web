import { defineStore } from 'pinia';
import { Rating, RatingMap } from 'src/models/game';
import { Nickname } from 'src/models/account';
import { botNickname } from 'src/models/account';
import { useAccountStore } from 'src/stores/account';
import { api } from 'boot/axios';
import _toPairs from 'lodash-es/toPairs';

export const useOnlineStore = defineStore('online', {
  state: () => ({
    players: {} as RatingMap,
  }),
  getters: {
    desc(state): [Nickname, Rating][] {
      return _toPairs(state.players).sort((a, b) => b[1] - a[1]);
    },
    count(state) {
      return Object.keys(state.players).length;
    },
    search(state) {
      const $account = useAccountStore();

      return Object.keys(state.players).filter(
        (player) => player !== $account.user.nickname && player !== botNickname
      );
    },
  },
  actions: {
    async load() {
      const { data } = await api.get<{ data: RatingMap }>('/online');
      this.players = data.data;
    },
  },
});
