<template>
  <Record name="pick board token" :actor="actor" :n="n" :name-size="nameSize">
    <Token :id="token" :size="tokenSize" />
  </Record>
</template>

<script setup lang="ts">
import Token from 'components/Game/Unit/Token/Token.vue';
import { TokenId } from 'src/models/game';
import { PropType } from 'vue';
import Record from './Record.vue';
import { useCssVars } from './useCssVars';
import { useRecord } from './useRecord';

const { actor, n, width, token } = defineProps({
  ...useRecord(),
  token: {
    type: Number as PropType<TokenId>,
    required: true,
  },
});

const { nameSize, tokenSize } = useCssVars(width);
</script>
