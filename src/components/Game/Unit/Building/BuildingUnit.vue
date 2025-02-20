<template>
  <div class="card" :class="co">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { CardId } from 'src/models/game';
import { useCssVars } from 'components/Game/Unit/Building/useCssVars';

interface Props {
  id: CardId;
  size?: string;
  dense?: boolean;
}

const { id, size, dense = false } = defineProps<Props>();

const { cardWidth, cardHeight, cardHeightDense, cardRadius } = useCssVars(size);

const co = {
  [`id-${id}`]: true,
  dense,
};
</script>

<style lang="scss" scoped>
.card {
  --sprite-units-count: 12;
  --width: v-bind(cardWidth);
  --height: v-bind(cardHeight);
  --radius: v-bind(cardRadius);
  width: var(--width);
  height: var(--height);
  border-radius: var(--radius);
  background-image: url('/img/game/cards.png');
  background-repeat: no-repeat;
  background-size: calc(var(--width) * var(--sprite-units-count));

  &.dense {
    height: v-bind(cardHeightDense);
  }

  &.id-100 {
    background-position: top 0 left 0;
  }

  &.id-101 {
    background-position: top 0 left calc(var(--width) * -3);
  }

  &.id-102 {
    background-position: top 0 left calc(var(--width) * -2);
  }

  &.id-103 {
    background-position: top 0 left calc(var(--width) * -5);
  }

  &.id-104 {
    background-position: top 0 left calc(var(--width) * -4);
  }

  &.id-105 {
    background-position: top 0 left calc(var(--width) * -1);
  }

  &.id-106 {
    background-position: top 0 left calc(var(--width) * -6);
  }

  &.id-107 {
    background-position: top 0 left calc(var(--width) * -7);
  }

  &.id-108 {
    background-position: top 0 left calc(var(--width) * -11);
  }

  &.id-109 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -1);
  }

  &.id-110 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -3);
  }

  &.id-111 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -5);
  }

  &.id-112 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -6);
  }

  &.id-113 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -7);
  }

  &.id-114 {
    background-position: top 0 left calc(var(--width) * -8);
  }

  &.id-115 {
    background-position: top 0 left calc(var(--width) * -9);
  }

  &.id-116 {
    background-position: top 0 left calc(var(--width) * -10);
  }

  &.id-117 {
    background-position: top calc(var(--height) * -1) left 0;
  }

  &.id-118 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -2);
  }

  &.id-119 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -8);
  }

  &.id-120 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -9);
  }

  &.id-121 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -10);
  }

  &.id-122 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -4);
  }

  &.id-200 {
    background-position: top calc(var(--height) * -1) left
      calc(var(--width) * -11);
  }

  &.id-201 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -1);
  }

  &.id-202 {
    background-position: top calc(var(--height) * -2) left 0;
  }

  &.id-203 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -2);
  }

  &.id-204 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -3);
  }

  &.id-205 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -6);
  }

  &.id-206 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -2);
  }

  &.id-207 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -3);
  }

  &.id-208 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -4);
  }

  &.id-209 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -7);
  }

  &.id-210 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -4);
  }

  &.id-211 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -5);
  }

  &.id-212 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -7);
  }

  &.id-213 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -8);
  }

  &.id-214 {
    background-position: top calc(var(--height) * -3) left 0;
  }

  &.id-215 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -11);
  }

  &.id-216 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -9);
  }

  &.id-217 {
    background-position: top calc(var(--height) * -2) left
      calc(var(--width) * -10);
  }

  &.id-218 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -6);
  }

  &.id-219 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -5);
  }

  &.id-220 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -8);
  }

  &.id-221 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -9);
  }

  &.id-222 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -1);
  }

  &.id-300 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -11);
  }

  &.id-301 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -2);
  }

  &.id-302 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -3);
  }

  &.id-303 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -5);
  }

  &.id-304 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -8);
  }

  &.id-305 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -9);
  }

  &.id-306 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -11);
  }

  &.id-307 {
    background-position: top calc(var(--height) * -5) left 0;
  }

  &.id-308 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -3);
  }

  &.id-309 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -5);
  }

  &.id-310 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -1);
  }

  &.id-311 {
    background-position: top calc(var(--height) * -4) left 0;
  }

  &.id-312 {
    background-position: top calc(var(--height) * -3) left
      calc(var(--width) * -10);
  }

  &.id-313 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -4);
  }

  &.id-314 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -6);
  }

  &.id-315 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -1);
  }

  &.id-316 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -2);
  }

  &.id-317 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -4);
  }

  &.id-318 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -10);
  }

  &.id-319 {
    background-position: top calc(var(--height) * -4) left
      calc(var(--width) * -7);
  }

  &.id-400 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -6);
  }

  &.id-401 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -7);
  }

  &.id-402 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -8);
  }

  &.id-403 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -9);
  }

  &.id-404 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -10);
  }

  &.id-405 {
    background-position: top calc(var(--height) * -5) left
      calc(var(--width) * -11);
  }

  &.id-406 {
    background-position: top calc(var(--height) * -6) left 0;
  }
}
</style>
