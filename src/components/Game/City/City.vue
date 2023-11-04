<template>
  <div
    class="city cursor-pointer swd-game-cover"
    :class="CityService.getClassnameCity(name)"
    @click="showOverview"
  >
    <Badge pos="top">
      <Text
        size="sm"
        class="city-badge"
      >
        <Player
          :name="name"
          :body="`${name} (${rating})`"
          class="js-city-name"
        />
      </Text>
    </Badge>

    <Badge
      v-if="showClock"
      pos="bottom"
    >
      <Text
        size="xs"
        class="city-badge"
      >
        <Clock :name="name" />
      </Text>
    </Badge>

    <Score :name="name" />

    <div class="bar">

    </div>

    <div class="provision-bar bar">
      <Provision :name="name" />
    </div>

    <div class="bar">
      <WondersBar :name="name" />
    </div>

    <div class="bar">
      <SymbolsBar :name="name" />
    </div>

    <div class="bar">
      <TokensBar
        :name="name"
        :class="CityService.classTokensBar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Provision from 'components/Game/City/Provision.vue';
import WondersBar from 'components/Game/City/WondersBar.vue';
import TokensBar from 'components/Game/City/TokensBar.vue';
import SymbolsBar from 'components/Game/City/SymbolsBar.vue';
import Clock from 'components/Game/City/Clock.vue';
import Score from 'components/Game/City/Score.vue';
import { Nickname } from 'src/models/game';
import Badge from 'components/Badge.vue';
import Text from 'components/Game/Text.vue';
import CityService from 'src/service/City';
import { useQuasar } from 'quasar';
import CityOverview from 'components/Game/Dialog/CityOverview.vue';
import { useGame } from 'src/stores/game/game';
import { computed } from 'vue';
import Player from 'components/Player/Player.vue';

interface Props {
  name: Nickname;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name } = defineProps<Props>();

const $q = useQuasar();
const $game = useGame();

const showClock = computed(() => !$game.isOver && $game.players[name].clock > 0);
const { rating } = $game.players[name];

const showOverview = (e:PointerEvent) => {
  if ((e.target as HTMLElement).classList.contains('js-city-name')) {
    return;
  }

  $q.dialog({
    component: CityOverview,
    componentProps: {
      name,
    },
  });
};
</script>

<style lang="scss" scoped>
.city {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: calc(var(--swd-game-gap-sm) * 19);
  padding: var(--swd-game-gap-sm);
  padding-top: var(--swd-game-gap-xxl);

  .bar {
    margin-bottom: var(--swd-game-gap-lg);
    &:last-child {
      margin-bottom: 0;
    }
    &.provision-bar {
      margin-bottom: var(--swd-game-gap-xxl);
    }
  }
}

.city-badge {
  background-color: var(--swd-color-primary);
  border-radius: var(--swd-game-radius-sm);
  padding: var(--swd-game-gap-xs);
  white-space: nowrap;
}
</style>
