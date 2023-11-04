import { defineStore } from 'pinia';
import { RatingTop } from 'src/models/game';
import { api } from 'boot/axios';

export const useTop = defineStore('top', {
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

export type TopStore = ReturnType<typeof useTop>;
