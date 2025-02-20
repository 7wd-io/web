<template>
  <Record
    class="select-who-move"
    name="select first player"
    :actor="actor"
    :n="n"
    :name-size="nameSize"
  >
    <span class="text-white text-h6">
      {{ player }}
    </span>
  </Record>
</template>

<script setup lang="ts">
import { Nickname } from 'src/models/account';
import { PropType } from 'vue';
import Record from './Record.vue';
import { useCssVars } from './useCssVars';
import { useRecord } from './useRecord';

const { actor, n, width, player } = defineProps({
  ...useRecord(),
  player: {
    type: String as PropType<Nickname>,
    required: true,
  },
});

const { nameSize } = useCssVars(width);
</script>
