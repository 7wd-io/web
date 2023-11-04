<template>
  <div class="icon-military" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { size } = defineProps<Props>();
</script>

<style scoped>
.icon-military {
  --size: v-bind(size);
  width: var(--size);
  height: calc(var(--size) / .93);
  background: url("./military.png") no-repeat center/95%;
}
</style>
