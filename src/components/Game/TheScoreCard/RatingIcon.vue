<template>
  <div class="icon-rating" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { size } = defineProps<Props>();
</script>

<style scoped>
.icon-rating {
  --size: v-bind(size);
  width: var(--size);
  height: calc(var(--size) / .93);
  background: url("./rating.png") no-repeat center/cover;
}
</style>
