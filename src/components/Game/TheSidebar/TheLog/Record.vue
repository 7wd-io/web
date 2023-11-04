<template>
  <q-item :class="co" class="record" clickable>
    <q-item-section>
      <q-item-label overline class="name text-uppercase text-white">
        #{{ n }} {{ name }}
      </q-item-label>
      <div class="row justify-center q-pa-md">
        <slot />
      </div>
      <q-item-label caption class="actor text-bold text-white">
        {{ actor }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useGame } from 'src/stores/game/game';
import { Nickname } from 'src/models/account';

interface Props {
  name: string;
  nameSize: string;
  actor: Nickname;
  n: number;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { name, nameSize, actor, n } = defineProps<Props>();
const $game = useGame();

const co = {
  'left-record': $game.left === actor,
};
</script>

<style lang="scss" scoped>
.name {
  --font-size: v-bind(nameSize);
  font-size: var(--font-size);
}

.actor {
  text-align: right;
}

.left-record {
  //opacity: 0.3;

  .actor {
    text-align: left;
  }
}
</style>
