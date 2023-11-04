<template>
  <Record name="construct wonder" :actor="actor" :n="n" :name-size="nameSize">
    <div class="wonder-badger">
      <Wonder
        :id="wonder"
        :size="wonderSize"
        class="relative-position"
        style="z-index: 3"
      />

      <Badge pos="top" :overlay="false" :y="cardOverlaySize">
        <Card :id="card" :size="cardSize" />
      </Badge>
    </div>
  </Record>
</template>

<script setup lang="ts">
import Card from 'components/Game/Card/Card.vue';
import Wonder from 'components/Game/Wonder/Wonder.vue';
import { CardId, WonderId } from 'src/models/game';
import Badge from 'components/Badge.vue';
import { PropType } from 'vue';
import { useRecord } from './useRecord';
import Record from './Record.vue';
import { useCssVars } from './useCssVars';

// eslint-disable-next-line vue/no-setup-props-destructure
const { actor, n, width, card, wonder } = defineProps({
  ...useRecord(),
  wonder: {
    type: Number as PropType<WonderId>,
    required: true,
  },
  card: {
    type: Number as PropType<CardId>,
    required: true,
  },
});

// eslint-disable-next-line
const {
  nameSize,
  cardSize,
  wonderSize,
  cardOverlaySize,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
} = useCssVars(width);
</script>

<style scoped>
.wonder-badger {
  --overlay: v-bind(cardOverlaySize);
  margin-top: calc(var(--overlay) * 0.21);
}
</style>
