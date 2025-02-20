<template>
  <div class="symbol" :class="co">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { SymbolId } from 'src/models/game';

interface Props {
  id: SymbolId;
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { id, size } = defineProps<Props>();

const co = {
  [`id-${id}`]: true,
};
</script>

<style lang="scss" scoped>
.symbol {
  --size: v-bind(size);
  width: var(--size);
  height: var(--size);
  border: calc(var(--swd-game-unit) * 0.1) solid $primary;
  border-radius: var(--swd-game-radius-sm);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 110%;

  @for $i from 1 through 6 {
    &.id-#{$i} {
      background-image: url('./symbol_#{$i}.png');
    }
  }
}
</style>
