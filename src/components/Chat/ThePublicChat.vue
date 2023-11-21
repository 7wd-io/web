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
import cent from 'src/centrifuge';
import { useChat } from 'src/stores/chat/public';
import { QScrollArea } from 'quasar';
import Message from './Message.vue';
import { Message as MessageModel } from './models';
import { HistoryResult } from 'centrifuge/build/types';

const $chat = useChat();
const scroll = ref<QScrollArea>();
let sub = cent.newSubscription('public:chat');

onBeforeMount(async () => {
  sub.subscribe();

  sub.on(
    'publication',
    // (ctx: { data: MessageModel; info: { user: string } }) => {
    (ctx) => {
      const m: MessageModel = ctx.data;
      m.author = ctx.info!.user;

      $chat.addMessage(m);
    }
  );

  try {
    const history = await sub.history({
      limit: -1,
      since: undefined,
      reverse: false,
    });

    $chat.setHistory(history);
    // hack, after first load watch did't work (
    setTimeout(() => {
      scroll.value?.setScrollPercentage('vertical', 100);
    }, 100);
  } catch (e) {
    console.log(e);
  }
});

onBeforeUnmount(() => {
  sub.unsubscribe();
});

const msg = ref('');
const submit = async () => {
  const m: MessageModel = {
    body: msg.value,
    ts: Date.now(),
    author: '',
  };

  await sub.publish(m);
  msg.value = '';
};

const messages = computed(() => $chat.messages);

watch(
  messages,
  () => {
    scroll.value?.setScrollPercentage('vertical', 100);
  },
  { flush: 'post' }
);
</script>

<style lang="scss" scoped>
.messages {
  height: calc(50vh - 155px);
  overflow-wrap: anywhere;
}
</style>
