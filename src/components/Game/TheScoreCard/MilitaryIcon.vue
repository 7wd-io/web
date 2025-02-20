<template>
  <div class="icon-military" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

const { size } = defineProps<Props>();
</script>

<style scoped>
.icon-military {
  --size: v-bind(size);
  width: var(--size);
  height: calc(var(--size) / 0.95);
  background: url('./military.png') no-repeat center/110%;
}
</style>
