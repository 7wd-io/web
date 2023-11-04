<template>
  <q-dialog
    id="dialog-pick-board-token"
    :persistent="true"
    :model-value="show"
  >
    <q-card
      class="swd-dialog"
      @mousedown="onMouseDown"
    >
      <q-card-section>
        <Title>
          Select token
        </Title>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-sm">
          <template
            v-for="id in tokens"
            :key="id"
          >
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
import Token from 'components/Game/Token.vue';
import { useGame } from 'src/stores/game/game';
import { computed } from 'vue';
import { Phase, TokenId } from 'src/models/game';
import { httpClient } from 'boot/api';
import Title from './Title.vue';
import { useDraggble } from './useDraggble';

const { onMouseDown } = useDraggble('#dialog-pick-board-token .swd-dialog');
const $game = useGame();

const show = computed(
  () => ($game.state.phase === Phase.pickBoardToken)
    && $game.isMyTurn,
);

const tokens = computed(() => $game.state.dialogItems.tokens);

const onClick = async (token: TokenId) => {
  await httpClient.post('/game/pick-board-token', {
    gid: $game.id,
    tid: token,
  });
};
</script>
