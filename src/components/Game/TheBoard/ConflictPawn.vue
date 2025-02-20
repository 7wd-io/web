<template>
  <div class="conflict-pawn" />
</template>

<script setup lang="ts">
interface Props {
  size: string;
}

const { size } = defineProps<Props>();
</script>

<style scoped>
.conflict-pawn {
  --size: v-bind(size);
  //--ratio: .358;
  --ratio: 0.485;
  width: var(--size);
  height: calc(var(--size) / var(--ratio));
  background: url('./conflict_pawn.png') center/cover no-repeat;
}
</style>
