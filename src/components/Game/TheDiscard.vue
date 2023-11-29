<template>
  <div
    class="the-discard cursor-pointer relative-position"
    :class="BoardService.classnameDiscard"
    @click="onClick"
  >
    <DiscardIcon :size="discardSize" />
    <Badge pos="bottom" x="-10%" y="50%">
      <div class="hints">
        <PriceHint
          :value="left.bank.discardReward"
          :size="priceHintSize"
          class="item"
        />

        <PriceHint
          :value="right.bank.discardReward"
          :size="priceHintSize"
          class="item"
        />
      </div>
    </Badge>

    <Badge pos="top-left" :class="BoardService.classnameDiscardCardHolder" />
  </div>
</template>

<script setup lang="ts">
import DiscardIcon from 'components/Game/Icon/Discard.vue';
import Badge from 'components/Badge.vue';
import PriceHint from 'components/Game/PriceHint/PriceHint.vue';
import { useQuasar } from 'quasar';
import { useGameStore } from 'src/stores/game/game';
import { computed } from 'vue';
import BoardService from 'src/service/Board';
import LookDiscardDialog from 'components/Game/Dialog/LookDiscard.vue';

const $q = useQuasar();
const $game = useGameStore();

const left = computed(() => $game.city($game.left));
const right = computed(() => $game.city($game.right));

const discardSize = 'calc(var(--swd-game-unit) * 2.5)';
const priceHintSize = `calc(${discardSize} * .6)`;

const onClick = () => {
  $q.dialog({
    component: LookDiscardDialog,
  });
};
</script>

<style lang="scss" scoped>
.hints {
  display: flex;
  flex-direction: row;

  > .item {
    margin-left: var(--swd-game-gap-md);
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
