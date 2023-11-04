import { defineStore } from 'pinia';
import { Rating } from 'src/models/game';
import { Nickname } from 'src/models/account';
import { PresenceMap, PublicationContext } from 'centrifuge';
import { useOnline } from 'src/stores/online';
import _toPairs from 'lodash-es/toPairs';
import { useGame } from 'src/stores/game/game';
import { botNickname } from 'src/models/account';
import { Message } from 'components/Chat/models';

export const useChat = defineStore('chat:game', {
  state: () => ({
    messages: [] as Message[],
    players: [] as Nickname[],
  }),
  getters: {
    descPlayers(state): [Nickname, Rating][] {
      const $online = useOnline();

      const m: Record<Nickname, Rating> = {};

      state.players.forEach((player) => {
        m[player] = $online.players[player];
      });

      return _toPairs(m).sort((a, b) => b[1] - a[1]);
    },
    countPlayers(state) {
      return state.players.length;
    },
  },
  actions: {
    addMessage(msg: Message) {
      this.messages = [...this.messages, msg];
    },
    setHistory(history: PublicationContext[]) {
      const messages = [] as Message[];

      history.forEach((item) => {
        // messages.push([item.info?.user as Nickname, item.data as string]);
        const { body, ts } = item.data as Message;
        messages.push({
          author: item.info?.user || '',
          body,
          ts,
        });
      });

      this.messages = messages;
    },
    setPlayers(presence: PresenceMap) {
      const $game = useGame();

      const players: Nickname[] = [];

      if ($game.right === botNickname) {
        players.push(botNickname);
      }

      Object.values(presence).forEach((item) => {
        players.push(item.user.nickname as Nickname);
      });

      this.players = Array.from(new Set(players));
    },
  },
});

export type ChatStore = ReturnType<typeof useChat>;
