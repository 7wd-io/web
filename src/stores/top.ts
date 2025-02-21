import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RatingTop } from 'src/models/game';
import { api } from 'boot/axios';

export const useTopStore = defineStore('top', () => {
  const players = ref([] as RatingTop);

  async function load() {
    const { data } = await api.get<{ players: RatingTop }>('/top');
    players.value = data.players;
  }

  return {
    players,
    load,
  };
});
