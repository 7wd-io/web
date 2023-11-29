<template>
  <div class="the-wonders-picker">
    <div v-for="(id, ind) in wonders" :key="`${id}-${ind}`">
      <Wonder
        v-if="id"
        :id="id"
        :size="wonderWidth"
        @click="onClick(id)"
        class="cursor-pointer"
        :class="BoardService.getClassnameWonder(id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useWonderCssVars from 'components/Game/Wonder/useCssVars';
import Wonder from 'components/Game/Wonder/Wonder.vue';
import { useGameStore } from 'stores/game/game';
import { useMoveStore } from 'stores/game/move';
import { computed, ref, watch } from 'vue';
import { WonderId } from 'src/models/game';
import { useQuasar } from 'quasar';
import BoardService from 'src/service/Board';

const $q = useQuasar();
const $game = useGameStore();
const $move = useMoveStore();
const { wonderWidth, wonderHeight } = useWonderCssVars(
  'calc(var(--swd-game-unit) * 20)'
);
const wonders = ref($game.state.dialogItems.wonders);

watch(
  () => $game.chan,
  () => {
    wonders.value = $game.state.dialogItems.wonders;
  }
);

const isMyTurn = computed(() => $game.isMyTurn);

const onClick = (id: WonderId) => {
  if (!isMyTurn.value) {
    return;
  }

  $move.pickWonder($game.id, id);
};
</script>

<style lang="scss" scoped>
.the-wonders-picker {
  --height: v-bind(wonderHeight);
  --width: v-bind(wonderWidth);
  display: grid;
  grid-template-rows: repeat(2, var(--height));
  grid-template-columns: repeat(2, var(--width));
  grid-gap: var(--swd-game-gap-lg);
  justify-content: center;
  align-content: center;
}
</style>
