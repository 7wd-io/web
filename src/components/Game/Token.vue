<template>
  <div class="token" :class="co" />
</template>

<script setup lang="ts">
import { TokenId } from 'src/models/game';

interface Props {
  id: TokenId;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'calc(var(--swd-game-unit) * 5)',
});

const co = {
  [`id-${props.id}`]: true,
};
</script>

<style lang="scss" scoped>
@use 'sass:math';

.token {
  --sprite-units-count: 4;
  --size: v-bind(size);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-image: url('/img/game/tokens.jpeg');
  background-repeat: no-repeat;
  background-size: calc(var(--size) * var(--sprite-units-count));

  // we can get 0 from api and should handle this as none,
  // but with keep space to simplify positioning on board
  &.id-0 {
    background: none;
  }

  &.id-1 {
    background-position: top 0 left 0;
  }

  &.id-2 {
    background-position: top 0 left calc(var(--size) * -1);
  }

  &.id-3 {
    background-position: top 0 left calc(var(--size) * -2);
  }

  &.id-4 {
    background-position: top 0 left calc(var(--size) * -3);
  }

  &.id-5 {
    background-position: top calc(var(--size) * -1) left 0;
  }

  &.id-6 {
    background-position: top calc(var(--size) * -1) left calc(var(--size) * -1);
  }

  &.id-7 {
    background-position: top calc(var(--size) * -1) left calc(var(--size) * -2);
  }

  &.id-8 {
    background-position: top calc(var(--size) * -1) left calc(var(--size) * -3);
  }

  &.id-9 {
    background-position: top calc(var(--size) * -2) left 0;
  }

  &.id-10 {
    background-position: top calc(var(--size) * -2) left calc(var(--size) * -1);
  }
}
</style>
