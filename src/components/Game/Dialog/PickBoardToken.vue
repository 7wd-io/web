<template>
  <q-dialog id="dialog-pick-board-token" :persistent="true" :model-value="show">
    <q-card class="swd-dialog" @mousedown="onMouseDown">
      <q-card-section>
        <Title> Select token </Title>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <template v-for="id in tokens" :key="id">
            <Token
              v-if="id > 0"
              :id="id"
              class="item cursor-pointer"
              @click="onClick(id)"
            />
          </template>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import Token from 'components/Game/Unit/Token/Token.vue';
import { useGameStore } from 'stores/game/game';
import { useMoveStore } from 'stores/game/move';
import { computed } from 'vue';
import { Phase, TokenId } from 'src/models/game';
import Title from './Title.vue';
import { useDraggble } from './useDraggble';

const { onMouseDown } = useDraggble('#dialog-pick-board-token .swd-dialog');
const $game = useGameStore();

const show = computed(
  () => $game.state.phase === Phase.pickBoardToken && $game.isMyTurn
);

const tokens = computed(() => $game.state.dialogItems.tokens);

const onClick = (token: TokenId) => {
  useMoveStore().pickBoardToken($game.id, token);
};
</script>
