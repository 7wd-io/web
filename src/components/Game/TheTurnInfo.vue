<template>
  <Text size="sm" class="text-center text-bold">
    <q-icon v-if="meOnLeft" name="arrow_back" />
    {{ label }}
    <q-icon v-if="!meOnLeft" name="arrow_forward" />
  </Text>
</template>

<script setup lang="ts">
import Text from 'components/Game/Text.vue';
import { Phase } from 'src/models/game';
import { useGameStore } from 'src/stores/game/game';
import { watch, ref } from 'vue';

const labels = {
  [Phase.prepare]: 'Select wonder',
  [Phase.turn]: 'Turn',
  [Phase.selectWhoBeginsTheNextAge]: 'Select first player',
  [Phase.pickBoardToken]: 'Pick token',
  [Phase.pickRandomToken]: 'Pick token',
  [Phase.burnCard]: 'Burn card',
  [Phase.pickDiscardedCard]: 'Pick card',
  [Phase.pickTopLineCard]: 'Pick card',
  [Phase.pickReturnedCards]: 'Pick cards',
  [Phase.over]: '',
};

const $game = useGameStore();

const label = ref(labels[$game.state.phase]);
const meOnLeft = ref($game.state.me.name === $game.left);

watch(
  () => $game.chan,
  () => {
    label.value = labels[$game.state.phase];
    meOnLeft.value = $game.state.me.name === $game.left;
  }
);
</script>
