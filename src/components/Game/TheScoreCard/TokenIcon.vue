<template>
  <div class="icon-token" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { size } = defineProps<Props>();
</script>

<style scoped>
.icon-token {
  --size: v-bind(size);
  width: var(--size);
  height: var(--size);
  background: url("./token.png") no-repeat center/95%;
}
</style>
