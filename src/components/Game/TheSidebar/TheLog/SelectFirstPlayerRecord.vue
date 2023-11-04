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

// eslint-disable-next-line vue/no-setup-props-destructure
const { actor, n, width, player } = defineProps({
  ...useRecord(),
  player: {
    type: String as PropType<Nickname>,
    required: true,
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const { nameSize } = useCssVars(width);
</script>
