<template>
  <div class="tokens-bar">
    <TransitionGroup name="tokens">
      <Token
        v-for="id in city.tokens.list"
        :key="id"
        :id="id"
        :size="size"
        class="item"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import Token from 'components/Game/Unit/Token/Token.vue';
import { Nickname } from 'src/models/account';
import { useGameStore } from 'stores/game/game';
import { computed } from 'vue';

interface Props {
  name: Nickname;
}

const { name } = defineProps<Props>();

const size = 'calc(var(--swd-game-unit) * 3.6)';

const $game = useGameStore();
const city = computed(() => $game.city(name));
</script>

<style lang="scss" scoped>
.tokens-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .item {
    margin-right: var(--swd-game-gap-xs);
    margin-bottom: var(--swd-game-gap-xs);
  }
}

.tokens-enter-active,
.tokens-leave-active {
  transition: all 0.5s ease;
}
.tokens-enter-from,
.tokens-leave-to {
  opacity: 0;
  transform: scale(1.3);
}
</style>
