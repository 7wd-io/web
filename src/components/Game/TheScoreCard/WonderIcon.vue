<template>
  <div class="icon-wonder" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { size } = defineProps<Props>();
</script>

<style scoped>
.icon-wonder {
  --size: v-bind(size);
  width: var(--size);
  height: calc(var(--size) * .809);
  background: url("./wonder.png") no-repeat center/cover;
}
</style>
