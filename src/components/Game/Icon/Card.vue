<template>
  <div class="icon-card"></div>
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

const { size } = defineProps<Props>();
</script>

<style lang="scss" scoped>
.icon-card {
  --size: v-bind(size);
  height: var(--size);
  width: calc(var(--size) * 0.75);
  border-radius: calc(var(--size) * 0.05);
  border: calc(var(--size) * 0.03) solid black;
  background-color: #eee;
}
</style>
