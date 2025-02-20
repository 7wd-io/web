import { api } from 'boot/axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import {
  CardId,
  Game,
  GameId,
  Phase,
  State,
  UpdateMessage,
} from 'src/models/game';
import { Nickname } from 'src/models/account';
import { useAccountStore } from 'stores/account';
import { useLogStore } from 'stores/game/log';
import { usePlayAgainStore } from 'stores/game/playAgain';

export const useGameStore = defineStore('game', () => {
  const id = ref<GameId>(0);
  const state = ref<State>({} as State);
  const finished = ref(false);
  const lastMoveAt = ref('');
  const left = ref<Nickname>('');
  const right = ref<Nickname>('');
  const players = ref<
    Record<Nickname, { rating: number; points: number; clock: number }>
  >({});
  const chan = ref(0);

  const city = computed(
    () => (name: Nickname) =>
      name === state.value.me.name ? state.value.me : state.value.enemy
  );

  const enemy = computed(
    () => (name: Nickname) => name === left.value ? right.value : left.value
  );

  const isMyTurn = computed(() => {
    const $account = useAccountStore();

    return $account?.user.nickname === state.value?.me?.name;
  });

  // @TODO Participant?
  const isMember = computed(() => {
    const $account = useAccountStore();

    return (
      $account?.user.nickname === left.value ||
      $account?.user.nickname === right.value
    );
  });

  const isOver = computed(() => state.value.phase === Phase.over);
  // @TODO cut?
  const isFinished = computed(() => finished.value);

  const isPlayableCard = computed(
    () => (id: CardId) =>
      Object.prototype.hasOwnProperty.call(
        state.value.cardItems.playable || {},
        id
      ) || false
  );

  async function load(v: GameId) {
    const $account = useAccountStore();
    const $log = useLogStore();
    const { data } = await api.get<Game>(`/game/${v}`);

    id.value = data.id;
    const me = $account.user.nickname;
    left.value =
      me === data.host.name || me === data.guest.name ? me : data.host.name;
    right.value = me === data.guest.name ? data.host.name : data.guest.name;

    players.value = {
      [data.host.name]: {
        rating: data.host.rating,
        points: data.host.points,
        clock: 0,
      },
      [data.guest.name]: {
        rating: data.guest.rating,
        points: data.guest.points,
        clock: 0,
      },
    };

    if (data.clock) {
      lastMoveAt.value = data.clock.lastMoveAt;
      players.value[left.value].clock = data.clock.values[left.value];
      players.value[right.value].clock = data.clock.values[right.value];
    }

    state.value = data.state;
    finished.value = data.finished;
    $log.records = data.log;
  }

  async function goto(index: number) {
    const { data } = await api.get<{ state: State }>(
      `/game/${id.value}/state/${index}`
    );
    state.value = data.state;
  }

  function update(m: UpdateMessage) {
    const $log = useLogStore();
    const $playAgain = usePlayAgainStore();

    state.value = m.state;
    lastMoveAt.value = m.clock.lastMoveAt;
    players.value[left.value].clock = m.clock.values[left.value];
    players.value[right.value].clock = m.clock.values[right.value];
    $log.records = [...$log.records, m.lastMove];

    if (isOver.value) {
      $playAgain.show = isMember.value;
      $playAgain.showBadges = true;
    }
  }

  function tick() {
    chan.value += 1;
  }

  async function createWithBot() {
    return await api.post('/game');
  }

  return {
    id,
    state,
    finished,
    lastMoveAt,
    left,
    right,
    players,
    chan,
    city,
    enemy,
    isMyTurn,
    isMember,
    isOver,
    isFinished,
    isPlayableCard,
    load,
    goto,
    update,
    tick,
    createWithBot,
  };
});
