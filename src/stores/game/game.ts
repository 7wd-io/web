import { defineStore } from 'pinia';
import {
  CardId,
  City,
  Game,
  GameId,
  Phase,
  State,
  UpdateMessage,
} from 'src/models/game';
import { Nickname } from 'src/models/account';
import { useAccountStore } from 'src/stores/account';
import { api } from 'boot/axios';
import { useLogStore } from 'src/stores/game/log';
import { usePlayAgainStore } from 'src/stores/game/playAgain';

export const useGameStore = defineStore('game', {
  state: () => ({
    id: 0 as GameId,
    state: {} as State,
    finished: false as boolean,
    lastMoveAt: '' as string,
    left: '' as Nickname,
    right: '' as Nickname,
    players: {} as Record<
      Nickname,
      { rating: number; points: number; clock: number }
    >,
    chan: 0 as number,
  }),
  getters: {
    city(state): (name: Nickname) => City {
      return (name: Nickname) =>
        name === state.state.me.name ? state.state.me : state.state.enemy;
    },
    enemy(state): (name: Nickname) => Nickname {
      return (name) => (name === state.left ? state.right : state.left);
    },
    isMyTurn(state) {
      const $account = useAccountStore();

      return $account?.user.nickname === state.state?.me?.name;
    },
    isMember(state) {
      const $account = useAccountStore();

      return (
        $account?.user.nickname === state.left ||
        $account?.user.nickname === state.right
      );
    },
    isOver(state): boolean {
      return state.state.phase === Phase.over;
    },
    isFinished(state): boolean {
      return state.finished;
    },
    isPlayableCard(state): (id: CardId) => boolean {
      return (id) =>
        Object.prototype.hasOwnProperty.call(
          state.state.cardItems.playable || {},
          id
        ) || false;
    },
  },
  actions: {
    async load(id: GameId) {
      const $account = useAccountStore();
      const $log = useLogStore();
      const { data } = await api.get<Game>(`/game/${id}`);

      this.id = data.id;
      const me = $account.user.nickname;
      this.left =
        me === data.host.name || me === data.guest.name ? me : data.host.name;
      this.right = me === data.guest.name ? data.host.name : data.guest.name;

      this.players[data.host.name] = {
        rating: data.host.rating,
        points: data.host.points,
        clock: 0,
      };

      this.players[data.guest.name] = {
        rating: data.guest.rating,
        points: data.guest.points,
        clock: 0,
      };

      if (data.clock) {
        this.lastMoveAt = data.clock.lastMoveAt;
        this.players[this.left].clock = data.clock.values[this.left];
        this.players[this.right].clock = data.clock.values[this.right];
      }

      this.state = data.state;
      this.finished = data.finished;
      $log.records = data.log;
    },
    async goto(index: number) {
      const { data } = await api.get<{ state: State }>(
        `/game/${this.id}/state/${index}`
      );
      this.state = data.state;
    },
    update(m: UpdateMessage) {
      const $log = useLogStore();
      const $playAgain = usePlayAgainStore();

      this.state = m.state;
      this.lastMoveAt = m.clock.lastMoveAt;
      this.players[this.left].clock = m.clock.values[this.left];
      this.players[this.right].clock = m.clock.values[this.right];
      $log.records = [...$log.records, m.lastMove];

      if (this.isOver) {
        $playAgain.show = this.isMember;
        $playAgain.showBadges = true;
      }
    },
    tick() {
      this.chan += 1;
    },
  },
});
