<template>
  <q-card class="swd-cover-dark">
    <q-card-section>
      <div class="text-weight-bolder text-h6">Leaderboards</div>
    </q-card-section>

    <q-card-section class="no-padding">
      <q-list dense padding class="list">
        <template v-for="(player, ind) in players" :key="ind">
          <q-separator dark />

          <q-item
            clickable
            v-ripple
            @click.capture.stop="onPlayerClick(player.name)"
          >
            <q-item-section class="text-white" side>
              #{{ ind + 1 }}
            </q-item-section>
            <q-item-section>
              <Player :name="player.name" />
            </q-item-section>
            <q-item-section side class="text-white text-weight-bolder">
              {{ player.rating }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useTopStore } from 'stores/top';
import { onBeforeMount, computed } from 'vue';
import Player from 'components/Player/Player.vue';
import { usePlayerComponent } from 'components/Player/composables';

const $top = useTopStore();

onBeforeMount(() => {
  void $top.load();
});

const players = computed(() => $top.players);

const { onPlayerClick } = usePlayerComponent();
</script>

<style lang="scss" scoped>
.list {
  .q-separator:first-child {
    display: none;
  }
}
</style>
