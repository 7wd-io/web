<template>
  <div class="icon-coin" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { size } = defineProps<Props>();
</script>

<style scoped>
.icon-coin {
  --size: v-bind(size);
  width: var(--size);
  height: var(--size);
  background: url("./coin.png") no-repeat center/cover;
}
</style>
