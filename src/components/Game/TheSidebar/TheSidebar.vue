<template>
  <div class="the-sidebar">
    <q-list>
      <q-item
        clickable
        v-ripple
        class="lobby swd-btn-primary"
        :to="{ name: 'lobby' }"
      >
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>

        <q-item-section> LOBBY </q-item-section>
      </q-item>
    </q-list>

    <TheChat />

    <q-separator />

    <q-tabs v-model="tab" dense class="text-white" align="left">
      <q-tab name="log" label="Log" />
      <q-tab name="players" :label="`Players (${countPlayers})`" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="full-height bg-transparent">
      <q-tab-panel name="log" class="no-padding">
        <TheLog />
      </q-tab-panel>

      <q-tab-panel name="players" class="no-padding">
        <ThePlayers />
      </q-tab-panel>
    </q-tab-panels>

    <Resign v-if="showResign" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useChatStore } from 'src/stores/chat/game';
import { useGameStore } from 'src/stores/game/game';
import { useAccountStore } from 'src/stores/account';
import TheLog from './TheLog/TheLog.vue';
import Resign from './Resign.vue';
import TheChat from '../../Chat/TheGameChat.vue';
import ThePlayers from './ThePlayers.vue';

const $account = useAccountStore();
const $game = useGameStore();
const $chat = useChatStore();
const tab = ref('log');
const countPlayers = computed(() => $chat.countPlayers);
const showResign = computed(
  () => !$game.isFinished && $game.players[$account.user.nickname]
);
</script>

<style scoped>
.the-sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: var(--swd-game-sidebar-width);
  background: var(--swd-game-bg);
}
</style>
