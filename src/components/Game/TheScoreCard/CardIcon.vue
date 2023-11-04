<template>
  <div
    class="icon-card"
    :class="co"
  />
</template>

<script setup lang="ts">
import { CardGroupId } from 'src/models/game';

type Group =
  CardGroupId.civilian
  | CardGroupId.scientific
  | CardGroupId.commercial
  | CardGroupId.guild;

interface Props {
  group: Group;
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { group, size } = defineProps<Props>();

const co = {
  [`card-${group}`]: true,
};
</script>

<style scoped>
.icon-card {
  --size: v-bind(size);
  width: var(--size);
  height: calc(var(--size) / 0.7);
  border-radius: calc(var(--size) * .1);
}

.card-4 {
  background-color: #008D48;
}

.card-5 {
  background-color: #0074BC;
}

.card-6 {
  background-color: #FFCC0C;
}

.card-7 {
  background-color: #74548D;
}
</style>
