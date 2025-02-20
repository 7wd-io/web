<template>
  <div class="icon-chain" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { size } = defineProps<Props>();
</script>

<style scoped>
.icon-chain {
  --size: v-bind('size');
  display: inline-block;
  width: var(--size);
  height: var(--size);
  background: url('./chain.png') no-repeat center/cover;
  filter: drop-shadow(0 0 calc(var(--size) * 0.1) rgba(0, 0, 0, 60%));
}
</style>
