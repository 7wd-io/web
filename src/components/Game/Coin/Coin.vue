<template>
  <div class="coin relative-position">
    <div class="absolute-center">
      {{ count || '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count?: number;
  size: string;
  fontRatio?: number;
}

const { count, size, fontRatio = 0.8 } = defineProps<Props>();
</script>

<style scoped>
.coin {
  --size: v-bind(size);
  --font-ratio: v-bind(fontRatio);
  width: var(--size);
  height: var(--size);
  font-size: calc(var(--size) * var(--font-ratio));
  font-weight: bold;
  color: black;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('./coin.png');
}
</style>
