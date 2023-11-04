<template>
  <Badge
    pos="bottom"
    y="-65%"
    :x="x"
  >
    <PriceHint
      :value="value"
      :size="size"
    />
  </Badge>
</template>

<script setup lang="ts">
import Badge from 'components/Badge.vue';
import PriceHint from 'components/Game/PriceHint/PriceHint.vue';

interface Props {
  value: number;
  pos: 'left' | 'right';
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  value, pos, size,
} = defineProps<Props>();

let x = '110%';

if (pos === 'left') {
  x = `-${x}`;
}
</script>
