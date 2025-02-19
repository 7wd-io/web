<template>
  <div class="the-board relative-position">
    <div class="board-tokens">
      <ProgressToken
        v-for="id in tokens"
        :key="id"
        :id="id"
        size="var(--progress-token-size)"
        class="board-token"
        :class="BoardService.getClassnameToken(id)"
      />
    </div>

    <ConflictPawn class="pawn" :class="pawnCo" size="var(--pawn-size)" />

    <transition
      enter-active-class="animated animate__fadeInDown"
      leave-active-class="animated animate__fadeOutDown"
    >
      <MilitaryToken
        v-if="right.track.maxZone < 3"
        class="mtoken-l-5"
        :size="mtoken5Size"
        value="5"
      />
    </transition>

    <transition
      enter-active-class="animated animate__fadeInDown"
      leave-active-class="animated animate__fadeOutDown"
    >
      <MilitaryToken
        v-if="right.track.maxZone < 2"
        class="mtoken-l-2"
        :size="mtoken2Size"
        value="2"
      />
    </transition>

    <transition
      enter-active-class="animated animate__fadeInDown"
      leave-active-class="animated animate__fadeOutDown"
    >
      <MilitaryToken
        v-if="left.track.maxZone < 2"
        class="mtoken-r-2"
        :size="mtoken2Size"
        side="right"
        value="2"
      />
    </transition>

    <transition
      enter-active-class="animated animate__fadeInDown"
      leave-active-class="animated animate__fadeOutDown"
    >
      <MilitaryToken
        v-if="left.track.maxZone < 3"
        class="mtoken-r-5"
        :size="mtoken5Size"
        side="right"
        value="5"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import ProgressToken from 'components/Game/Token.vue';
import { useGameStore } from 'stores/game/game';
import { computed, ref, watch } from 'vue';
import BoardService from 'src/service/Board';
import ConflictPawn from './ConflictPawn.vue';
import MilitaryToken from './MilitaryToken.vue';

const $game = useGameStore();
const left = computed(() => $game.city($game.left));
const right = computed(() => $game.city($game.right));
const pOffset = 10;

const pos = computed(
  () =>
    pOffset +
    Math.max(left.value.track.pos, right.value.track.pos) *
      (left.value.track.pos > 0 ? 1 : -1)
);

const mtoken2Size = 'var(--mtoken-5-size)';
const mtoken5Size = 'var(--mtoken-5-size)';

const pawnCo = computed(() => ({
  [`pos-${pos.value}`]: true,
}));

const tokens = ref($game.state.tokens);

watch(
  () => $game.chan,
  () => {
    tokens.value = $game.state.tokens;
  }
);
</script>

<style lang="scss" scoped>
.the-board {
  --width: calc(var(--swd-game-unit) * 50);
  --height: calc(var(--width) / 3.541);
  --progress-token-size: calc(var(--width) * 0.09);
  --pawn-size: calc(var(--width) * 0.04);
  --mtoken-2-size: calc(var(--width) * 0.1);
  --mtoken-5-size: calc(var(--width) * 0.115);
  width: var(--width);
  height: var(--height);
  background: url('/img/game/board.png') center/cover no-repeat;

  .board-tokens {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: calc(var(--height) * 0.034);
    left: calc(var(--width) / 19 * 4.54);

    .board-token {
      margin-left: calc(var(--width) * 0.012);
      &:first-child {
        margin-left: 0;
      }
    }
  }

  .pawn {
    position: absolute;
    transition: all 0.2s linear;
    top: calc(var(--height) * 0.41);
    left: 0;
  }

  @for $pos from 1 through 19 {
    .pos-#{$pos} {
      transform: translateX(calc(var(--width) / 21.2 * #{$pos}));
    }
  }

  .mtoken-l-5 {
    position: absolute;
    bottom: calc(var(--height) * 0.085);
    left: calc(var(--width) / 19 * 1.77);
  }

  .mtoken-l-2 {
    position: absolute;
    bottom: calc(var(--height) * 0.085);
    left: calc(var(--width) / 19 * 4.5);
  }

  .mtoken-r-2 {
    position: absolute;
    bottom: calc(var(--height) * 0.085);
    right: calc(var(--width) / 19 * 5);
  }

  .mtoken-r-5 {
    position: absolute;
    bottom: calc(var(--height) * 0.081);
    right: calc(var(--width) / 19 * 2.2);
  }
}
</style>
