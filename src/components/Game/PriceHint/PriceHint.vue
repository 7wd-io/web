<template>
  <div class="price-hint relative-position">
    <div class="absolute-center">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number;
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { value, size } = defineProps<Props>();
</script>

<style scoped>
.price-hint {
  --size: v-bind(size);
  width: var(--size);
  height: var(--size);
  font-size: calc(var(--size) * 0.65);
  font-weight: bold;
  color: black;
  background-position: center;
  background-size: cover;
  background-image: url('./coin.png');
}
</style>
