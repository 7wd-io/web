<template>
  <div
    class="token"
    :class="co"
  />
</template>

<script setup lang="ts">
interface Props {
  size: string;
  side: 'left' | 'right';
  value: '2' | '5';
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { size, side, value } = defineProps<Props>();
const co = {
  [`value-${value}`]: true,
  [`side-${side}`]: true,
};
</script>

<style lang="scss" scoped>
.token {
  --size: v-bind(size);
  --side: v-bind(side);
  --value: v-bind(value);
  --ratio: 2.287;
  width: var(--size);
  height: calc(var(--size) / var(--ratio));
  background-position: center;
  background-size: cover;

  &.value-2 {
    background-image: url("./token_2.png");
  }

  &.value-5 {
    background-image: url("./token_5.png");
  }

  &.side-left {
    transform: rotate(-180deg);
  }

  &.side-right {
    transform: rotate(0deg);
  }
}
</style>
