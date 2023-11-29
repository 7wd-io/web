<template>
  <q-dialog
    id="dialog-pick-topline-card"
    :persistent="true"
    :model-value="show"
  >
    <q-card class="swd-dialog" @mousedown="onMouseDown">
      <q-card-section>
        <Title> Select top line card </Title>
      </q-card-section>

      <q-card-section>
        <div class="row q-gutter-md">
          <swd-card
            v-for="c in cards"
            :key="c"
            :id="c"
            class="item cursor-pointer"
            @click="onClick(c)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useGame } from 'stores/game/game';
import { useMoveStore } from 'stores/game/move';
import { computed } from 'vue';
import { CardId, Phase } from 'src/models/game';
import Title from './Title.vue';
import { useDraggble } from './useDraggble';

const { onMouseDown } = useDraggble('#dialog-pick-topline-card .swd-dialog');
const $game = useGame();

const show = computed(
  () => $game.state.phase === Phase.pickTopLineCard && $game.isMyTurn
);

const cards = computed(() => $game.state.dialogItems.cards);

const onClick = (card: CardId) => {
  useMoveStore().pickToplineCard($game.id, card);
};
</script>
