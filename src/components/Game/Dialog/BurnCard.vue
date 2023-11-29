<template>
  <q-dialog id="dialog-burn-card" :persistent="true" :model-value="show">
    <q-card class="swd-dialog" @mousedown="onMouseDown">
      <q-card-section>
        <Title> Select a card to burn </Title>
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
import { useGameStore } from 'stores/game/game';
import { useMoveStore } from 'stores/game/move';
import { computed } from 'vue';
import { CardId, Phase } from 'src/models/game';
import Title from './Title.vue';
import { useDraggble } from './useDraggble';

const { onMouseDown } = useDraggble('#dialog-burn-card .swd-dialog');
const $game = useGameStore();

const show = computed(
  () => $game.state.phase === Phase.burnCard && $game.isMyTurn
);

const cards = computed(() => $game.state.dialogItems.cards);

const onClick = (card: CardId) => {
  useMoveStore().burnCard($game.id, card);
};
</script>
