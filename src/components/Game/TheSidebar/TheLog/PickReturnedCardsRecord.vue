<template>
  <Record
    name="pick returned cards"
    :actor="actor"
    :n="n"
    :name-size="nameSize"
  >
    <div class="row q-gutter-sm">
      <div class="column items-center">
        <Card :id="pick" :size="cardSize" />
        <div class="text-white">Pick</div>
      </div>
      <div class="column items-center">
        <Card :id="give" :size="cardSize" />
        <div class="text-white">Give</div>
      </div>
    </div>
  </Record>
</template>

<script setup lang="ts">
import Card from 'components/Game/Unit/Building/BuildingUnit.vue';
import { CardId } from 'src/models/game';
import { PropType } from 'vue';
import Record from './Record.vue';
import { useCssVars } from './useCssVars';
import { useRecord } from './useRecord';

// eslint-disable-next-line vue/no-setup-props-destructure
const { actor, n, width, pick, give } = defineProps({
  ...useRecord(),
  pick: {
    type: Number as PropType<CardId>,
    required: true,
  },
  give: {
    type: Number as PropType<CardId>,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const { nameSize, cardSize } = useCssVars(width);
</script>
