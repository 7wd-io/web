<template>
  <span class="clock">
     {{ clock.m }}:{{ clock.s }}
  </span>
</template>

<script setup lang="ts">
import { Nickname } from 'src/models/game';
import { useGame } from 'src/stores/game/game';
import {
  computed, ref, watch,
} from 'vue';

interface Props {
  name: Nickname;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = defineProps<Props>();

const $game = useGame();

let timerId: number;
const seconds = computed(() => $game.players[name].clock);
const model = ref(seconds.value);
const active = ref($game.state.me.name === name);

const runTimer = () => {
  model.value -= Math.floor((Date.now() - Date.parse($game.lastMoveAt)) / 1000);

  timerId = window.setTimeout(function clock() {
    model.value -= 1;
    timerId = window.setTimeout(clock, 1000);
  }, 1000);
};

const stopTimer = () => {
  window.clearTimeout(timerId);
};

if (active.value) {
  runTimer();
}

watch(
  () => $game.lastMoveAt,
  () => {
    active.value = $game.state.me.name === name;
  },
);

watch(active, (newValue) => (newValue ? runTimer() : stopTimer()));

watch(seconds, (newValue) => {
  model.value = newValue;
});

const clock = computed(() => {
  let m: number | string = Math.floor(model.value / 60);
  let s: number | string = model.value - m * 60;

  if (m < 10) {
    m = `0${m}`;
  }

  if (s < 10) {
    s = `0${s}`;
  }

  return {
    m,
    s,
  };
});
</script>
