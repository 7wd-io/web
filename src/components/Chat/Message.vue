<template>
  <li class="chat-message">
    <q-chip color="accent" text-color="black" class="author" square dense>
      <Player :name="value.author" />
    </q-chip>
    <span class="chat-message-body">
      {{ value.body }}
    </span>
    <div class="chat-message-ts text-right">
      {{ when }}
    </div>
  </li>
</template>

<script setup lang="ts">
import Player from 'components/Player/Player.vue';
import timeAgo from 'src/service/timeAgo';
import { ref } from 'vue';
import { Message } from 'components/Chat/models';

interface Props {
  value: Message;
}

const { value } = defineProps<Props>();

const when = ref(timeAgo.format(Date.now() - (Date.now() - value.ts)));

const runTimer = () => {
  window.setTimeout(function update() {
    when.value = timeAgo.format(Date.now() - (Date.now() - value.ts));

    window.setTimeout(update, 1000 * 60);
  }, 1000);
};

runTimer();
</script>

<style lang="scss" scoped>
.chat-message-body {
  color: white;

  &:before {
    content: '- ';
  }
}
.chat-message-ts {
  font-size: 10px;
  color: $grey-5;
}
</style>
