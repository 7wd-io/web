import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Rating } from 'src/models/game';
import { Nickname } from 'src/models/account';
import { useOnlineStore } from 'stores/online';
import _toPairs from 'lodash-es/toPairs';
import { useGameStore } from 'stores/game/game';
import { botNickname } from 'src/models/account';
import { Message } from 'components/Chat/models';
import { HistoryResult, PresenceResult } from 'centrifuge/build/types';

export const useChatStore = defineStore('chat:game', () => {
  const messages = ref<Message[]>([]);
  const players = ref<Nickname[]>([]);

  const descPlayers = computed<[Nickname, Rating][]>(() => {
    const $online = useOnlineStore();
    const m: Record<Nickname, Rating> = {};

    players.value.forEach((player) => {
      m[player] = $online.players[player];
    });

    return _toPairs(m).sort((a, b) => b[1] - a[1]);
  });

  const countPlayers = computed(() => players.value.length);

  async function addMessage(msg: Message) {
    messages.value.push(msg);
  }

  async function setHistory(history: HistoryResult) {
    const value = [] as Message[];

    history.publications.forEach((item) => {
      const { body, ts } = item.data as Message;
      value.push({
        author: item.info?.user || '',
        body,
        ts,
      });
    });

    messages.value = value;
  }

  async function setPlayers(presence: PresenceResult) {
    const $game = useGameStore();

    const value: Nickname[] = [];

    if ($game.right === botNickname) {
      value.push(botNickname);
    }

    Object.values(presence.clients).forEach((item) => {
      value.push(item.user as Nickname);
    });

    players.value = Array.from(new Set(value));
  }

  return {
    messages,
    players,
    descPlayers,
    countPlayers,
    addMessage,
    setHistory,
    setPlayers,
  };
});
