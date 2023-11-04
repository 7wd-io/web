<template>
  <Record
    name="discard card"
    :actor="actor"
    :n="n"
    :name-size="nameSize"
  >
    <Card
      :id="card"
      :size="cardSize"
    />
  </Record>
</template>

<script setup lang="ts">
import Card from 'components/Game/Card/Card.vue';
import { CardId } from 'src/models/game';
import { PropType } from 'vue';
import Record from './Record.vue';
import { useCssVars } from './useCssVars';
import { useRecord } from './useRecord';

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  actor,
  n,
  width,
  card,
} = defineProps({
  ...useRecord(),
  card: {
    type: Number as PropType<CardId>,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const { nameSize, cardSize } = useCssVars(width);
</script>
