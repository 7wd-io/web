<template>
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

<script setup lang="ts">
import Text from 'components/Game/Text.vue';
import Button from 'components/Game/Button.vue';
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import cent from 'src/centrifuge';
import { PlayAgainApproved, PlayAgainUpdated } from 'src/models/messages';
import { useRoute } from 'vue-router';
import { GameId } from 'src/models/game';
import { usePlayAgainStore } from 'stores/game/playAgain';

const $playAgain = usePlayAgainStore();

const countdown = ref(60);

const approved = ref(false);

const $route = useRoute();
const gameId: GameId = +$route.params.id;

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

const onClick = (answer: boolean) => {
  $playAgain.answer(gameId, answer);
};

runTimer();

let subUpdate = cent
  .newSubscription(`play-again:update_${gameId}`)
  .on('publication', (ctx: { data: PlayAgainUpdated }) => {
    const { user, answer } = ctx.data;
    $playAgain.answers[user] = answer;
  });

let subApprove = cent
  .newSubscription(`play-again:approve_${gameId}`)
  .on('publication', (ctx: { data: PlayAgainApproved }) => {
    const { next } = ctx.data;
    approved.value = true;

    setTimeout(() => {
      window.open(`/game/${next}`, '_self');
    }, 3000);
  });

onBeforeMount(() => {
  subUpdate.subscribe();
  subApprove.subscribe();
});

onBeforeUnmount(() => {
  subUpdate.unsubscribe();
  subApprove.unsubscribe();
});
</script>
