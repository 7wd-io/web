<template>
  <div>
    <div class="counter">
      <div class="absolute-center">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number;
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { value, size } = defineProps<Props>();
</script>

<style lang="scss" scoped>
.counter {
  --size: v-bind(size);
  font-size: calc(var(--size) * .8);
  font-weight: bold;
  border-radius: 50%;
  color: white;
  border: 1px solid #834914;
  background-color: $primary;
  width: var(--size);
  height: var(--size);
}
</style>
