<template>
  <div class="resource" :class="co">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ResourceId } from 'src/models/game';

interface Props {
  id: ResourceId;
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { id, size } = defineProps<Props>();

const co = {
  [`id-${id}`]: true,
};
</script>

<style lang="scss" scoped>
.resource {
  --size: v-bind(size);
  width: var(--size);
  height: var(--size);
  background-position: center;
  background-size: cover;

  @for $i from 1 through 5 {
    &.id-#{$i} {
      background-image: url('./resource_#{$i}.png');
    }
  }

  &.id-1,
  &.id-2,
  &.id-3 {
    --scaled: calc(var(--size) * 1.17);
    width: var(--scaled);
    height: var(--scaled);
  }
}
</style>
