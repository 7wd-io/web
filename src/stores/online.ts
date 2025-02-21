import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Rating, RatingMap } from 'src/models/game';
import { Nickname } from 'src/models/account';
import { botNickname } from 'src/models/account';
import { useAccountStore } from 'stores/account';
import { api } from 'boot/axios';
import _toPairs from 'lodash-es/toPairs';

export const useOnlineStore = defineStore('online', () => {
  const players = ref({} as RatingMap);

  const desc = computed((): [Nickname, Rating][] => {
    return _toPairs(players.value).sort((a, b) => b[1] - a[1]);
  });

  const count = computed(() => Object.keys(players.value).length);

  const search = computed(() => {
    const $account = useAccountStore();

    return Object.keys(players.value).filter(
      (player) => player !== $account.user.nickname && player !== botNickname
    );
  });

  async function load() {
    const { data } = await api.get<{ data: RatingMap }>('/online');
    players.value = data.data;
  }

  return {
    players,
    desc,
    count,
    search,
    load,
  };
});
