<template>
  <div class="text">
    <slot />
  </div>
</template>

<script setup lang="ts">
type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

const sizes: Record<Size, string> = {
  xxs: '.7',
  xs: '.95',
  sm: '1.2',
  md: '1.6',
  lg: '2',
};

interface Props {
  size?: Size;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { size = 'md' } = defineProps<Props>();
const rate = sizes[size];
</script>

<style scoped>
.text {
  --rate: v-bind(rate);
  line-height: .9;
  font-size: calc(var(--swd-game-unit) * var(--rate));
}
</style>
