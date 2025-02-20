<template>
  <div class="relative-position">
    <WonderComp
      :id="wid"
      :size="size"
      class="relative-position"
      style="z-index: 3"
    />

    <Badge v-if="cid" :pos="pos" x="-50%">
      <WonderCard
        :id="cid"
        :size="wonderCardSize"
        class="wonder-card"
        :class="cardCo"
      />
    </Badge>
    <Badge v-if="!cid" pos="bottom" y="-60%" style="z-index: 4">
      <PriceHint
        v-if="price !== undefined"
        :value="price"
        :size="wonderPriceBadgeSize"
      />
    </Badge>
  </div>
</template>

<script setup lang="ts">
import WonderComp from 'components/Game/Unit/Wonder/Wonder.vue';
import Badge from 'components/Badge.vue';
import { CardId, WonderId } from 'src/models/game';
import PriceHint from 'components/Game/PriceHint/PriceHint.vue';
import useWonderCssVars from 'components/Game/Unit/Wonder/useCssVars';
import WonderCard from './WonderCard.vue';

interface Props {
  wid: WonderId;
  cid?: CardId;
  price?: number;
  pos: string;
  size: string;
}

const { wid, cid, price, pos, size } = defineProps<Props>();

const { wonderCardSize, wonderPriceBadgeSize } = useWonderCssVars();

const cardCo = {
  [`${pos}`]: true,
};
</script>

<style lang="scss" scoped>
.wonder-card {
  --rotate: v-bind(rotate);
  transform: rotate(var(--rotate));

  &.left {
    transform: rotate(90deg);
  }

  &.right {
    transform: rotate(-90deg);
  }
}
</style>
