<template>
  <router-view />
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import cent from 'src/centrifuge';
import { RatingMap, Room } from 'src/models/game';
import { useOnline } from 'src/stores/online';
import { useRooms } from 'src/stores/rooms';
import { useAccountStore } from 'src/stores/account';
import { useMeta } from 'quasar';
import config from 'src/config';
import { sound } from 'src/service/sound';

const $online = useOnline();
const $rooms = useRooms();
const $account = useAccountStore();

let subOnline = cent.newSubscription('service:online');
let subNewRoom = cent.newSubscription('new_room');
let subUpdRoom = cent.newSubscription('upd_room');
let subDelRoom = cent.newSubscription('del_room');

const title = ref(config.defaultTitle);

useMeta(() => ({
  title: title.value,
}));

onBeforeMount(async () => {
  subOnline.subscribe();
  subNewRoom.subscribe();
  subUpdRoom.subscribe();
  subDelRoom.subscribe();

  subOnline.on('publication', (ctx: { data: RatingMap }) => {
    $online.players = ctx.data;
  });

  await $rooms.load();

  subNewRoom.on('publication', (ctx: { data: Room }) => {
    $rooms.add(ctx.data);
  });

  subUpdRoom.on('publication', (ctx: { data: Room }) => {
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

  subDelRoom.on('publication', (ctx: { data: { id: string } }) => {
    $rooms.remove(ctx.data.id);

    title.value = config.defaultTitle;
  });
});

onBeforeUnmount(() => {
  subOnline.unsubscribe();
  subNewRoom.unsubscribe();
  subUpdRoom.unsubscribe();
  subDelRoom.unsubscribe();
});
</script>
