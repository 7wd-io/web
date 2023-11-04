<template>
  <q-card class="public-chat swd-cover-dark">
    <q-card-section>
      <q-scroll-area ref="scroll" class="messages">
        <ul class="mute">
          <Message v-for="(m, ind) in messages" :key="ind" :value="m" />
        </ul>
      </q-scroll-area>
    </q-card-section>
    <q-card-section>
      <q-input
        color="accent"
        dark
        v-model="msg"
        dense
        outlined
        placeholder="To send press <Enter>"
        @keyup.enter="submit"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue';
// import centrifuge from 'src/centrifuge';
// import { useChat } from 'src/stores/chat/public';
import { QScrollArea } from 'quasar';
// import Centrifuge from 'centrifuge';
import Message from './Message.vue';
import { Message as MessageModel } from './models';

// const $chat = useChat();
const scroll = ref<QScrollArea>();
// let sub: Centrifuge.Subscription;
//
// onBeforeMount(() => {
//   sub = centrifuge.subscribe('public:chat', (ctx: { data: MessageModel, info: {user: string} }) => {
//     const m: MessageModel = ctx.data;
//     m.author = ctx.info.user;
//
//     $chat.addMessage(m);
//   });
//
//   void sub
//     .history({
//       limit: -1,
//       since: undefined,
//       reverse: false,
//     })
//     .then(({ publications }) => {
//       $chat.setHistory(publications);
//       // hack, after first load watch did't work (
//       setTimeout(() => {
//         scroll.value?.setScrollPercentage('vertical', 100);
//       }, 100);
//     });
// });

// onBeforeUnmount(() => {
//   sub.unsubscribe();
// });

const msg = ref('');
const submit = async () => {
  const m: MessageModel = {
    body: msg.value,
    ts: Date.now(),
    author: '',
  };

  // await centrifuge.publish('public:chat', m);
  msg.value = '';
};

// const messages = computed(() => $chat.messages);
const messages = [];

// watch(
//   messages,
//   () => {
//     scroll.value?.setScrollPercentage('vertical', 100);
//   },
//   { flush: 'post' },
// );
</script>

<style lang="scss" scoped>
.messages {
  height: calc(50vh - 155px);
  overflow-wrap: anywhere;
}
</style>
