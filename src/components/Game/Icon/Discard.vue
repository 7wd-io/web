<template>
  <div class="icon-discard">
    <div class="box">
      <slot/>
      <Card
        v-for="i in 4"
        :key="i"
        :size="size"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'components/Game/Icon/Card.vue';

interface Props {
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { size } = defineProps<Props>();
</script>

<style lang="scss" scoped>
.box {
  --size: v-bind(size);
  position: relative;
  height: var(--size);
  width: var(--size);
  transform: translateX(15%);

  & > div {
    position: absolute;

    &:nth-child(1) {
      transform: rotate(-25deg);
      left: -40%;
    }

    &:nth-child(2) {
      transform: rotate(20deg);
    }

    &:nth-child(3) {
      transform: rotate(-110deg);
      left: -40%;
      top: 40%;
    }

    &:nth-child(4) {
      transform: rotate(-80deg);
      top: 50%;
    }
  }
}
</style>
