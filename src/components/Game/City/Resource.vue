<template>
  <ResourceSymbol :id="id" :size="resourceSize" class="relative-position">
    <Badge pos="top-left" x="50%" y="50%">
      <Coin :count="price" :size="badgeSize" />
    </Badge>

    <Badge pos="bottom-right" x="-50%" y="-50%">
      <Counter :value="count" :size="badgeSize" />
    </Badge>
  </ResourceSymbol>
</template>

<script setup lang="ts">
import ResourceSymbol from 'components/Game/Resource/Resource.vue';
import { ResourceId } from 'src/models/game';
import Badge from 'components/Badge.vue';
import Counter from 'components/Game/Counter.vue';
import Coin from 'components/Game/Coin/Coin.vue';

interface Props {
  id: ResourceId;
  count: number;
  price: number;
}

const { id, count, price } = defineProps<Props>();

const resourceSize = 'calc(var(--swd-game-unit) * 3.5)';
const badgeSize = `calc(${resourceSize} * .34)`;
</script>
