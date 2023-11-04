<template>
  <Cover
    :size="size"
    :group="group"
  >
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      class="transparent"
    >
      <Card :id="id"/>
    </q-tooltip>
  </Cover>
</template>

<script setup lang="ts">
import Cover from 'components/Game/Card/Cover.vue';
import Card from 'components/Game/Card/Card.vue';
import { CardId } from 'src/models/game';

interface Props {
  id: CardId;
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { id, size } = defineProps<Props>();

const group = (function getGroup(cid: CardId) {
  const char = cid.toString()[0];

  return (+char < 4)
    ? `age_${char}`
    : 'guild';
}(id));
</script>
