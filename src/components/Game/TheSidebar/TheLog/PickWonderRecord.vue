<template>
  <Record name="pick wonder" :actor="actor" :n="n" :name-size="nameSize">
    <Wonder :id="wonder" :size="wonderSize" />
  </Record>
</template>

<script setup lang="ts">
import Wonder from 'components/Game/Unit/Wonder/Wonder.vue';
import { WonderId } from 'src/models/game';
import { PropType } from 'vue';
import Record from './Record.vue';
import { useCssVars } from './useCssVars';
import { useRecord } from './useRecord';

const { actor, n, width, wonder } = defineProps({
  ...useRecord(),
  wonder: {
    type: Number as PropType<WonderId>,
    required: true,
  },
});

const { nameSize, wonderSize } = useCssVars(width);
</script>
