<template>
  <div class="icon-victory" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { size } = defineProps<Props>();
</script>

<style lang="scss" scoped>
.icon-victory {
  --size: v-bind(size);
  width: var(--size);
  height: var(--size);
  background: url("./icon.png") no-repeat center/cover;
}
</style>
