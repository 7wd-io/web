<template>
  <q-list class="list bg-transparent" dense padding>
    <template v-for="(player, ind) in players" :key="ind">
      <q-separator />
      <q-item clickable v-ripple @click.capture.stop="onClick(player[0])">
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
import { useChat } from 'src/stores/chat/game';
import { computed } from 'vue';
import { Nickname } from 'src/models/account';
import Profile from 'components/Account/Profile.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const $chat = useChat();
const players = computed(() => $chat.descPlayers);

const onClick = (name: Nickname) => {
  $q.dialog({
    component: Profile,
    componentProps: {
      name,
    },
  });
};
</script>

<style lang="scss" scoped>
.list {
  color: white;

  .q-separator:first-child {
    display: none;
  }
}
</style>
