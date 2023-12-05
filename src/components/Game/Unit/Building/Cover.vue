<template>
  <div class="card-cover" :class="co">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useCssVars } from 'components/Game/Unit/Building/useCssVars';

interface Props {
  group: 'age_1' | 'age_2' | 'age_3' | 'guild';
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { group, size } = defineProps<Props>();

const co = {
  [`group-${group}`]: true,
};

const { cardWidth, cardHeight, cardRadius } = useCssVars(size);
</script>

<style lang="scss" scoped>
.card-cover {
  --sprite-units-count: 12;
  --width: v-bind(cardWidth);
  --height: v-bind(cardHeight);
  --radius: v-bind(cardRadius);
  width: var(--width);
  height: var(--height);
  border-radius: var(--radius);
  background-image: url('/img/game/cards.jpeg');
  background-repeat: no-repeat;
  background-size: calc(var(--width) * var(--sprite-units-count));

  &.group-age_1 {
    background-position: top calc(var(--height) * -6) left
      calc(var(--width) * -10);
  }

  &.group-age_2 {
    background-position: top calc(var(--height) * -6) left
      calc(var(--width) * -11);
  }

  &.group-age_3 {
    background-position: top calc(var(--height) * -7) left 0;
  }

  &.group-guild {
    background-position: top calc(var(--height) * -7) left
      calc(var(--width) * -1);
  }
}
</style>
