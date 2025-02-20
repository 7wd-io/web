<template>
  <Record class="over" name="Over" :actor="actor" :n="n" :name-size="nameSize">
    <span class="text-white text-h6">
      {{ loser }}
    </span>
  </Record>
</template>

<script setup lang="ts">
import { Victory } from 'src/models/game';
import { Nickname } from 'src/models/account';
import { PropType } from 'vue';
import Record from './Record.vue';
import { useCssVars } from './useCssVars';
import { useRecord } from './useRecord';

const { actor, n, width, loser } = defineProps({
  ...useRecord(),
  loser: {
    type: String as PropType<Nickname>,
    required: true,
  },
  reason: {
    type: Number as PropType<Victory>,
    required: true,
  },
});

const { nameSize } = useCssVars(width);
</script>
