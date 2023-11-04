<template>
  <q-list class="the-log bg-transparent">
    <template
      v-for="(record, ind) in log"
      :key="ind"
    >
      <component
        :is="components[record.move.id]"
        :n="ind + 1"
        :actor="record.meta.actor"
        width="250px"
        v-bind="record.move"
        class="cursor-pointer"
        @click="onClick(ind)"
      />
      <q-separator color="white" />
    </template>
  </q-list>
</template>

<script setup lang="ts">
import { Id } from 'src/models/move';
import { useLog } from 'src/stores/game/log';
import { computed } from 'vue';
import PickWonderRecord from './PickWonderRecord.vue';
import PickBoardTokenRecord from './PickBoardTokenRecord.vue';
import ConstructCardRecord from './ConstructCardRecord.vue';
import ConstructWonderRecord from './ConstructWonderRecord.vue';
import DiscardCardRecord from './DiscardCardRecord.vue';
import SelectFirstPlayerRecord from './SelectFirstPlayerRecord.vue';
import BurnCardRecord from './BurnCardRecord.vue';
import PickRandomTokenRecord from './PickRandomTokenRecord.vue';
import PickTopLineCardRecord from './PickTopLineCardRecord.vue';
import PickDiscardedCardRecord from './PickDiscardedCardRecord.vue';
import PickReturnedCardsRecord from './PickReturnedCardsRecord.vue';
import OverRecord from './OverRecord.vue';

const components = {
  [Id.pickWonder]: PickWonderRecord,
  [Id.pickBoardToken]: PickBoardTokenRecord,
  [Id.constructCard]: ConstructCardRecord,
  [Id.constructWonder]: ConstructWonderRecord,
  [Id.discardCard]: DiscardCardRecord,
  [Id.selectWhoBeginsNextAge]: SelectFirstPlayerRecord,
  [Id.burnCard]: BurnCardRecord,
  [Id.pickRandomToken]: PickRandomTokenRecord,
  [Id.pickTopLineCard]: PickTopLineCardRecord,
  [Id.pickDiscardedCard]: PickDiscardedCardRecord,
  [Id.pickReturnedCards]: PickReturnedCardsRecord,
  [Id.over]: OverRecord,
};

const $log = useLog();
const log = computed(() => $log.records);

const onClick = (ind: number) => {
  $log.replayOn(ind);
};
</script>

<style  lang="scss" scoped>
.the-log {
  display: flex;
  flex-direction: column-reverse;

  .q-separator:last-child {
    display: none;
  }
}
</style>
