<template>
  <div class="point relative-position">
    <div class="absolute-center">
      {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count: number;
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure,@typescript-eslint/no-unsafe-assignment
const { count, size } = defineProps<Props>();
</script>

<style scoped>
.point {
  --size: v-bind(size);
  width: var(--size);
  height: calc(var(--size) / 1.0975);
  font-size: calc(var(--size) * 0.4);
  font-weight: bold;
  color: white;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('./points.png');
}
</style>
