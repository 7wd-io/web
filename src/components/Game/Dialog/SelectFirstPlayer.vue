<template>
  <q-dialog
    id="dialog-select-first-player"
    :persistent="true"
    :model-value="show"
  >
    <q-card class="swd-dialog" @mousedown="onMouseDown">
      <q-card-section>
        <Title> Select first player </Title>
      </q-card-section>

      <q-card-actions align="between">
        <Button
          v-for="player in players"
          :key="player"
          flat
          class="text-white"
          :no-caps="true"
          :label="player"
          @click="onClick(player)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import Button from 'components/Game/Button.vue';
import { useGame } from 'stores/game/game';
import { useMoveStore } from 'stores/game/move';
import { computed } from 'vue';
import { Phase } from 'src/models/game';
import { Nickname } from 'src/models/account';
import Title from './Title.vue';
import { useDraggble } from './useDraggble';

const { onMouseDown } = useDraggble('#dialog-select-first-player .swd-dialog');
const $game = useGame();

const show = computed(
  () => $game.state.phase === Phase.selectWhoBeginsTheNextAge && $game.isMyTurn
);

// order is matter
const players = [$game.left, $game.right];

const onClick = (user: Nickname) => {
  useMoveStore().selectMove($game.id, user);
};
</script>
