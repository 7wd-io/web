<template>
  <Badge
    v-if="show"
    :pos="pos"
    :x="x"
    :y="y"
  >
    <q-tooltip
      class="bg-dark text-white"
      anchor="top middle"
      self="center middle"
    >
      Free by chain
    </q-tooltip>
    <ChainIcon :size="size" />
  </Badge>
</template>

<script setup lang="ts">
import Badge from 'components/Badge.vue';
import ChainIcon from 'components/Game/Icon/Chain/Chain.vue';
import { CardId, City } from 'src/models/game';

function use(left: City, right: City, id: CardId) {
  const data = {
    show: false,
    pos: '',
    x: '20%',
    y: '20%',
  };

  if (left.chains.list.includes(id)) {
    data.show = true;
    data.pos = 'top-left';
  } else if (right.chains.list.includes(id)) {
    data.show = true;
    data.pos = 'top-right';
    data.x = `-${data.x}`;
  }

  return data;
}

interface Props {
  card: CardId;
  left: City;
  right: City;
  size: string;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const {
  card, left, right, size,
} = defineProps<Props>();
const {
  show, pos, x, y,
} = use(left, right, card);
</script>
