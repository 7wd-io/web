<template>
  <div class="the-game-chat">
    <q-scroll-area ref="scroll" class="messages">
      <ul class="mute">
        <Message v-for="(m, ind) in messages" :key="ind" :value="m" />
      </ul>
    </q-scroll-area>
    <div>
      <q-input
        class="input"
        v-model="msg"
        dense
        outlined
        placeholder="To send press <Enter>"
        @keyup.enter="submit"
        color="white"
        dark
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import cent from 'src/centrifuge';
import { computed, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue';
import { useChatStore } from 'stores/chat/game';
import { QScrollArea } from 'quasar';
import { useRoute } from 'vue-router';
import { GameId } from 'src/models/game';
import Message from './Message.vue';
import { Message as MessageModel } from './models';
import { HistoryResult, PresenceResult } from 'centrifuge/build/types';

const $chat = useChatStore();
const scroll = ref<QScrollArea>();

const $route = useRoute();
const channelName = `chat-game:${$route.params.id as unknown as GameId}`;
let sub = cent.newSubscription(channelName);
let presenceTimerId: number;

onBeforeMount(() => {
  sub.subscribe();

  sub.on('publication', (ctx) => {
    const m: MessageModel = ctx.data;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    m.author = ctx.info!.user;

    $chat.addMessage(m);
  });

  void sub
    .history({
      limit: -1,
      since: undefined,
      reverse: false,
    })
    .then((ctx: HistoryResult) => {
      $chat.setHistory(ctx);
      // hack, after first load watch did't work (
      setTimeout(() => {
        scroll.value?.setScrollPercentage('vertical', 100);
      }, 100);
    });

  presenceTimerId = window.setInterval(() => {
    void sub.presence().then((ctx: PresenceResult) => {
      $chat.setPlayers(ctx);
    });
  }, 3000);
});

onBeforeUnmount(() => {
  sub.unsubscribe();
  cent.removeSubscription(sub);
  window.clearInterval(presenceTimerId);
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
.the-game-chat {
  padding: var(--swd-game-gap-md);
}

.messages {
  height: 40vh;
  overflow-wrap: anywhere;
}

.input {
  padding-top: var(--swd-game-gap-md);

  ::placeholder {
    color: #fff !important;
  }
}
</style>
