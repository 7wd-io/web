<template>
  <div class="symbols-bar">
    <div v-for="id in city.symbols.order" :key="id" class="item">
      <Symbol
        v-if="id !== SymbolId.law"
        :id="id"
        :size="symbolSize"
        class="relative-position"
      >
        <Badge pos="bottom-right" x="-20%" y="-20%">
          <Counter :value="city.symbols.data[id]" :size="badgeSize" />
        </Badge>
      </Symbol>
    </div>
  </div>
</template>

<script setup lang="ts">
import Symbol from 'components/Game/Symbol/Symbol.vue';
import Badge from 'components/Badge.vue';
import Counter from 'components/Game/Counter.vue';
import { SymbolId } from 'src/models/game';
import { useGame } from 'src/stores/game/game';
import { Nickname } from 'src/models/account';
import { computed } from 'vue';

interface Props {
  name: Nickname;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = defineProps<Props>();

const symbolSize = 'calc(var(--swd-game-unit) * 2.9)';
const badgeSize = `calc(${symbolSize} * .3)`;

const $game = useGame();
const city = computed(() => $game.city(name));
</script>

<style lang="scss" scoped>
.symbols-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .item {
    margin-right: var(--swd-game-gap-xs);
    margin-bottom: var(--swd-game-gap-xs);
  }
}
</style>
