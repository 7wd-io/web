<template>
  <div class="badge absolute" :style="so">
    <slot />
  </div>
</template>

<script setup lang="ts">
export type Pos =
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

interface Props {
  pos: Pos;
  x?: string;
  y?: string;
}

interface Style {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  transform: string;
}

const { pos, x = '0%', y = '0%' } = defineProps<Props>();

const styles: Record<Pos, Style> = {
  center: {
    top: '50%',
    left: '50%',
    transform: `translate(calc(-50% + ${x}), calc(-50% + ${y}))`,
  },
  top: {
    top: '0%',
    left: '50%',
    transform: `translate(calc(-50% + ${x}), calc(-50% + ${y}))`,
  },
  right: {
    top: '50%',
    right: '0%',
    transform: `translate(calc(50% + ${x}), calc(-50% + ${y}))`,
  },
  bottom: {
    bottom: '0%',
    left: '50%',
    transform: `translate(calc(-50% + ${x}), calc(50% + ${y}))`,
  },
  left: {
    top: '50%',
    left: '0%',
    transform: `translate(calc(-50% - ${x}), calc(-50% + ${y}))`,
  },
  'top-left': {
    top: '0%',
    left: '0%',
    transform: `translate(calc(-50% + ${x}), calc(-50% + ${y}))`,
  },
  'top-right': {
    top: '0%',
    right: '0%',
    transform: `translate(calc(50% + ${x}), calc(-50% + ${y}))`,
  },
  'bottom-left': {
    bottom: '0%',
    left: '0%',
    transform: `translate(calc(-50% + ${x}), calc(50% + ${y}))`,
  },
  'bottom-right': {
    bottom: '0%',
    right: '0%',
    transform: `translate(calc(50% + ${x}), calc(50% + ${y}))`,
  },
};

const so = styles[pos];
</script>
