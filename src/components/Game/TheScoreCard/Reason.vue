<template>
  <div class="the-victory" v-html="data.label" />
</template>

<script setup lang="ts">
import { Victory } from 'src/models/game';

interface Props {
  value: Victory;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { value } = defineProps<Props>();

const map: Record<Victory, Record<string, string>> = {
  [Victory.civilian]: {
    label: 'points <br /> supremacy',
    color: '#009EFF',
  },
  [Victory.militarySupremacy]: {
    label: 'military <br /> supremacy',
    color: '#FF5471',
  },
  [Victory.scienceSupremacy]: {
    label: 'scientific <br /> supremacy',
    color: '#63B468',
  },
  [Victory.resign]: {
    label: 'opponent <br /> resign',
    color: '#c10015',
  },
  [Victory.timeout]: {
    label: 'opponent <br /> timeout',
    color: '#c10015',
  },
};

const data = map[value];
</script>

<style scoped>
.the-victory {
  font-size: calc(var(--swd-game-unit) * 1.1);
  line-height: 1em;
  font-weight: bold;
  white-space: normal;
  color: v-bind('data.color');
  text-transform: uppercase;
}
</style>
