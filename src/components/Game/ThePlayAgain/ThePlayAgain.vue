<template>
  <template v-if="show">
    <div v-if="!approved" class="row justify-center items-center q-gutter-lg">
      <div>
        <Text size="md"> Play again? ({{ countdown }}) </Text>
      </div>

      <div>
        <Button
          label="Yes"
          color="primary"
          @click="onClick(true)"
          class="q-mr-sm"
        />

        <Button label="No" color="primary" @click="onClick(false)" />
      </div>
    </div>

    <div v-else>
      <Text size="md" class="text-center">
        Approved, new game is loading

        <q-spinner color="primary" size="1em" />
      </Text>
    </div>
  </template>
</template>

<script setup lang="ts">
import Text from 'components/Game/Text.vue';
import Button from 'components/Game/Button.vue';
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useGame } from 'src/stores/game/game';
import { Subscription } from 'centrifuge';
import cent from 'src/centrifuge';
import { PlayAgainApproved, PlayAgainUpdated } from 'src/models/messages';
import { useRoute } from 'vue-router';
import { GameId } from 'src/models/game';
import { api } from 'boot/axios';
import { usePlayAgain } from 'src/stores/game/playAgain';

const $playAgain = usePlayAgain();

const countdown = ref(60);

const show = computed(() => $playAgain.show);
const approved = ref(false);

const $route = useRoute();
const gameId = $route.params.id as unknown as GameId;

const runTimer = () => {
  window.setTimeout(function clock() {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      $playAgain.show = false;
      $playAgain.showBadges = false;
    }

    window.setTimeout(clock, 1000);
  }, 1000);
};

const onClick = async (answer: boolean) => {
  await api.post(`/game/play-again`, {
    gameId,
    answer,
  });
};

runTimer();

let subUpdate = cent.newSubscription(`play-again:update_${gameId}`);
let subApprove = cent.newSubscription(`play-again:approve_${gameId}`);

onBeforeMount(() => {
  subUpdate.subscribe();
  subApprove.subscribe();

  subUpdate.on('publication', (ctx: { data: PlayAgainUpdated }) => {
    const { player, answer } = ctx.data;
    $playAgain.answers[player] = answer;
  });

  subApprove.on('publication', (ctx: { data: PlayAgainApproved }) => {
    const { next } = ctx.data;
    approved.value = true;

    setTimeout(() => {
      window.open(`/game/${next}`, '_self');
    }, 3000);
  });
});

onBeforeUnmount(() => {
  subUpdate.unsubscribe();
  subApprove.unsubscribe();
});
</script>
