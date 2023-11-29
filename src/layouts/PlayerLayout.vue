<template>
  <router-view />
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import cent from 'src/centrifuge';
import { RatingMap, Room } from 'src/models/game';
import { useOnlineStore } from 'src/stores/online';
import { useRoomsStore } from 'src/stores/rooms';
import { useAccountStore } from 'src/stores/account';
import { useMeta } from 'quasar';
import config from 'src/config';
import { sound } from 'src/service/sound';

const $online = useOnlineStore();
const $rooms = useRoomsStore();
const $account = useAccountStore();

let subOnline = cent.newSubscription('service:online');
let subRoomCreate = cent.newSubscription('room:create');
let subRoomUpdate = cent.newSubscription('room:update');
let subRoomDelete = cent.newSubscription('room:delete');

const title = ref(config.defaultTitle);

useMeta(() => ({
  title: title.value,
}));

onBeforeMount(async () => {
  subOnline.subscribe();
  subRoomCreate.subscribe();
  subRoomUpdate.subscribe();
  subRoomDelete.subscribe();

  subOnline.on('publication', (ctx: { data: RatingMap }) => {
    $online.players = ctx.data;
  });

  await $rooms.load();

  subRoomCreate.on('publication', (ctx: { data: Room }) => {
    $rooms.add(ctx.data);
  });

  subRoomUpdate.on('publication', (ctx: { data: Room }) => {
    $rooms.update(ctx.data);

    if (ctx.data.host !== $account.user.nickname) {
      return;
    }

    if (ctx.data.gameId) {
      title.value = config.defaultTitle;

      return;
    }

    if (ctx.data.guest && ctx.data.guestRating) {
      if ($account.user.settings.sounds.opponentJoined) {
        void sound();
      }

      title.value = `${ctx.data.guest}(${ctx.data.guestRating}) joined`;
    } else {
      title.value = config.defaultTitle;
    }
  });

  subRoomDelete.on('publication', (ctx: { data: { id: string } }) => {
    $rooms.remove(ctx.data.id);

    title.value = config.defaultTitle;
  });
});

onBeforeUnmount(() => {
  subOnline.unsubscribe();
  subRoomCreate.unsubscribe();
  subRoomUpdate.unsubscribe();
  subRoomDelete.unsubscribe();
});
</script>
