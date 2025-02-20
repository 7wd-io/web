<template>
  <Record name="construct card" :actor="actor" :n="n" :name-size="nameSize">
    <Card :id="card" :size="cardSize" />
  </Record>
</template>

<script setup lang="ts">
import Card from 'components/Game/Unit/Building/BuildingUnit.vue';
import { CardId } from 'src/models/game';
import { PropType } from 'vue';
import { useRecord } from './useRecord';
import Record from './Record.vue';
import { useCssVars } from './useCssVars';

const { actor, n, width, card } = defineProps({
  ...useRecord(),
  card: {
    type: Number as PropType<CardId>,
    required: true,
  },
});

const { nameSize, cardSize } = useCssVars(width);
</script>
