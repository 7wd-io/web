<template>
  <q-list class="list bg-transparent" dense padding>
    <template v-for="(player, ind) in players" :key="ind">
      <q-separator />
      <q-item clickable v-ripple @click.capture.stop="onPlayerClick(player[0])">
        <q-item-section>
          <Player :name="player[0]" />
        </q-item-section>
        <q-item-section side class="text-bold text-white">
          {{ player[1] }}
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script setup lang="ts">
import Player from 'components/Player/Player.vue';
import { usePlayerComponent } from 'components/Player/composables';
import { useChat } from 'src/stores/chat/game';
import { computed } from 'vue';

const $chat = useChat();
const players = computed(() => $chat.descPlayers);

const { onPlayerClick } = usePlayerComponent();
</script>

<style lang="scss" scoped>
.list {
  color: white;

  .q-separator:first-child {
    display: none;
  }
}
</style>
