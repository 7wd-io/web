<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import TheGame from 'components/Game/TheGame.vue';
import TheSidebar from 'components/Game/TheSidebar/TheSidebar.vue';
import { useRoute } from 'vue-router';
import { useGameStore } from 'stores/game/game';
import { useAccountStore } from 'stores/account';
import { GameId } from 'src/models/game';
import router from 'src/router';
import { useMeta } from 'quasar';
import config from 'src/config';
import { sound } from 'src/service/sound';
import cent from 'src/centrifuge';

const $route = useRoute();
const $game = useGameStore();
const $account = useAccountStore();

const gameId = $route.params.id as unknown as GameId;
const loadResources = (urls: string[]) => {
  const workers: Promise<boolean>[] = [];

  urls.forEach((url) => {
    const worker: Promise<boolean> = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(true);
      };
      img.src = `/img/game/${url}`;
    });

    workers.push(worker);
  });

  return Promise.all(workers);
};

const title = ref(config.defaultTitle);
const resourcesLoading = ref(true);
const stateLoading = ref(true);

let sub = cent.newSubscription(`game:update_${gameId}`);

useMeta(() => ({
  title: title.value,
}));

onBeforeMount(async () => {
  sub.subscribe();

  sub.on('publication', (ctx) => {
    $game.update(ctx.data);

    if (
      $account.user.settings.sounds.myTurn &&
      !$game.isOver &&
      $game.isMyTurn
    ) {
      void sound();
    }
  });

  try {
    void loadResources([
      'bg.jpg',
      'cards.jpeg',
      'wonders.jpeg',
      'tokens.png',
      'board.png',
      'messe.png',
      'statue_of_liberty.png',
    ]).then(() => {
      resourcesLoading.value = false;
    });

    await $game.load(gameId);

    stateLoading.value = false;
    title.value = `Game #${gameId}`;

    if (
      $account.user.settings.sounds.myTurn &&
      !$game.isOver &&
      $game.isMyTurn
    ) {
      void sound();
    }
  } catch (e) {
    await router.push({ name: '404' });
  }
});

onBeforeUnmount(() => {
  sub.unsubscribe();
  cent.removeSubscription(sub);
});
</script>

<template>
  <div v-if="resourcesLoading || stateLoading" class="fit preload">
    <q-inner-loading
      :showing="true"
      dark
      color="white"
      label="Loading game resources..."
      label-style="font-size: 2em; color: white; font-weight: bold;"
    />
  </div>
  <div v-else class="page-game">
    <TheGame />
    <TheSidebar />
  </div>
</template>

<style scoped lang="scss">
.preload {
  background: linear-gradient(120deg, #5e60ce, #4ea8de) top left/cover no-repeat !important;
}

.page-game {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  background: url('/img/game/bg.jpg') center/cover no-repeat;
}
</style>
