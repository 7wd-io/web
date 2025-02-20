<template>
  <div class="icon-rating" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

const { size } = defineProps<Props>();
</script>

<style scoped>
.icon-rating {
  --size: v-bind(size);
  width: var(--size);
  height: calc(var(--size) / 0.93);
  background: url('./rating.png') no-repeat center/120%;
}
</style>
