import { defineStore } from 'pinia';
import { RatingTop } from 'src/models/game';
import { api } from 'boot/axios';

export const useTopStore = defineStore('top', {
  state: () => ({
    players: [] as RatingTop,
  }),
  actions: {
    async load() {
      const { data } = await api.get<{ players: RatingTop }>('/top');
      this.players = data.players;
    },
  },
});
