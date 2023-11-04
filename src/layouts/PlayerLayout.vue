<template>
  <router-view />
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
// import centrifuge from 'src/centrifuge';
// import Centrifuge from 'centrifuge';
// import { RatingMap, Room } from 'src/models/game';
// import { useOnline } from 'src/stores/online';
// import { useRooms } from 'src/stores/rooms';
// import { useAccountStore } from 'src/stores/account';
import { useMeta } from 'quasar';
import config from 'src/config';
// import { sound } from 'src/service/sound';

// const $online = useOnline();
// const $rooms = useRooms();
// const $account = useAccountStore();
//
// let subOnline: Centrifuge.Subscription;
// let subNewRoom: Centrifuge.Subscription;
// let subUpdRoom: Centrifuge.Subscription;
// let subDelRoom: Centrifuge.Subscription;

const title = ref(config.defaultTitle);

useMeta(() => ({
  title: title.value,
}));

// onBeforeMount(async () => {
//   subOnline = centrifuge.subscribe('stats:online', (ctx: {data: RatingMap}) => {
//     $online.players = ctx.data;
//   });
//
//   await $rooms.load();
//
//   subNewRoom = centrifuge.subscribe('new_room', (ctx: { data: Room }) => {
//     $rooms.add(ctx.data);
//   });
//
//   subUpdRoom = centrifuge.subscribe('upd_room', (ctx: { data: Room }) => {
//     $rooms.update(ctx.data);
//
//     if (ctx.data.host !== $account.name) {
//       return;
//     }
//
//     if (ctx.data.gameId) {
//       title.value = config.defaultTitle;
//
//       return;
//     }
//
//     if (ctx.data.guest && ctx.data.guestRating) {
//       if ($account.profile.settings.sounds.opponentJoined) {
//         void sound();
//       }
//
//       title.value = `${ctx.data.guest}(${ctx.data.guestRating}) joined`;
//     } else {
//       title.value = config.defaultTitle;
//     }
//   });
//
//   subDelRoom = centrifuge.subscribe('del_room', (ctx: { data: { host: string } }) => {
//     $rooms.remove(ctx.data.host);
//
//     title.value = config.defaultTitle;
//   });
// });

// onBeforeUnmount(() => {
//   subOnline.unsubscribe();
//   subNewRoom.unsubscribe();
//   subUpdRoom.unsubscribe();
//   subDelRoom.unsubscribe();
// });
</script>
