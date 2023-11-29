<template>
  <div class="city-score" :class="co">
    <Point :count="city.score.total" :size="size" class="item" />

    <Coin
      :count="city.treasure.coins"
      :font-ratio="0.5"
      :size="size"
      class="item"
    />
  </div>
</template>

<script setup lang="ts">
import { Nickname } from 'src/models/account';
import Coin from 'components/Game/Coin/Coin.vue';
import Point from 'components/Game/Point/Point.vue';
import { useGameStore } from 'src/stores/game/game';
import { computed } from 'vue';

interface Props {
  name: Nickname;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = defineProps<Props>();

const $game = useGameStore();
const city = computed(() => $game.city(name));
const side = $game.left === name ? 'left' : 'right';
const size = 'calc(var(--swd-game-unit) * 3)';

const co = {
  [`side-${side}`]: true,
};
</script>

<style lang="scss" scoped>
.city-score {
  --offset: -70%;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: min(1%, 15px);

  &.side-left {
    right: var(--offset);
  }

  &.side-right {
    left: var(--offset);
  }

  .item {
    margin-left: var(--swd-game-gap-sm);
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
