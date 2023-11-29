<template>
  <q-dialog
    id="dialog-pick-discarded-card"
    :persistent="true"
    :model-value="show"
  >
    <q-card class="swd-dialog" @mousedown="onMouseDown">
      <q-card-section>
        <Title> Select discarded card </Title>
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
import { useGame } from 'src/stores/game/game';
import { computed } from 'vue';
import { CardId, Phase } from 'src/models/game';
import { api } from 'boot/axios';
import Title from './Title.vue';
import { useDraggble } from './useDraggble';

const { onMouseDown } = useDraggble('#dialog-pick-discarded-card .swd-dialog');
const $game = useGame();

const show = computed(
  () => $game.state.phase === Phase.pickDiscardedCard && $game.isMyTurn
);

const cards = computed(() => $game.state.dialogItems.cards);

const onClick = async (card: CardId) => {
  await api.post('/game/move/pick-discarded-card', {
    gid: $game.id,
    cid: card,
  });
};
</script>
