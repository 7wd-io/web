<template>
  <div class="icon-victory" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

const { size } = defineProps<Props>();
</script>

<style lang="scss" scoped>
.icon-victory {
  --size: v-bind(size);
  width: var(--size);
  height: var(--size);
  background: url('./icon.png') no-repeat center/120%;
}
</style>
