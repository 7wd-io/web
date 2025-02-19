<template>
  <div class="wonder" :class="co">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { WonderId } from 'src/models/game';

interface Props {
  id: WonderId;
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { id, size } = defineProps<Props>();

const co = {
  [`id-${id}`]: true,
};
</script>

<style lang="scss" scoped>
.wonder {
  --sprite-units-count: 5;
  --size: v-bind(size);
  --ratio: calc(369 / 254);
  --width: var(--size);
  --height: calc(var(--width) / var(--ratio));
  width: var(--width);
  height: var(--height);
  border-radius: calc(var(--width) * 0.05);
  background-image: url('/img/game/wonders.png');
  background-repeat: no-repeat;
  background-size: calc(var(--width) * var(--sprite-units-count));

  &.id-1 {
    background-position: top calc(var(--height) * -2) left 0;
  }

  &.id-2 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -1);
  }

  &.id-3 {
    background-position: top 0 left calc(var(--width) * -1);
  }

  &.id-4 {
    background-position: top calc(var(--height) * -1) left 0;
  }

  &.id-5 {
    background-position: top 0 left calc(var(--width) * -2);
  }

  &.id-6 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -2);
  }

  &.id-7 {
    background-position: top 0 left calc(var(--width) * -4);
  }

  &.id-8 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -1);
  }

  &.id-9 {
    background-position: top 0 left 0;
  }

  &.id-10 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -4);
  }

  &.id-11 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -3);
  }

  &.id-12 {
    background-position: top 0 left calc(var(--width) * -3);
  }

  &.id-13 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -3);
  }

  &.id-14 {
    background-position: top calc(var(--height) * -3) left 0;
  }
}
</style>
