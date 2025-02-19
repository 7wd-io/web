<template>
  <div class="token" :class="co" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
  value: '2' | '5';
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { size, value } = defineProps<Props>();
const co = {
  [`value-${value}`]: true,
};
</script>

<style lang="scss" scoped>
.token {
  --size: v-bind(size);
  --value: v-bind(value);
  --ratio: 2.287;
  width: var(--size);
  height: calc(var(--size) / var(--ratio));
  background-position: center;
  background-size: cover;

  &.value-2 {
    background-image: url('./token_2.png');
  }

  &.value-5 {
    background-image: url('./token_5.png');
  }
}
</style>
