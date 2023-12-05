<template>
  <div class="the-deck" :class="co">
    <div
      v-for="(id, index) in cards"
      :key="`${index}-${id}`"
      :style="{ gridArea: `s-${index + 1}` }"
    >
      <div v-if="id !== -1" :class="BoardService.getClassnameCard(id)">
        <Card
          v-if="id > 0"
          :id="id"
          @click="isMyTurn && isPlayable(id) && onClick(id)"
          :class="{ playable: isMyTurn && isPlayable(id) }"
          :size="cardWidth"
        >
          <div class="fit relative-position">
            <ChainBadge
              :left="left"
              :right="right"
              :card="id"
              :size="cardChainBadgeSize"
            />

            <template v-if="isPlayable(id)">
              <PriceBadge
                :value="left.bank.cardPrice[id]"
                pos="left"
                :size="cardPriceBadgeSize"
              />

              <PriceBadge
                :value="right.bank.cardPrice[id]"
                pos="right"
                :size="cardPriceBadgeSize"
              />
            </template>
          </div>
        </Card>

        <Cover v-else :group="getCoverGroup(id)" :size="cardWidth" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useGameStore } from 'stores/game/game';
import { computed, ref, watch } from 'vue';
import { useCssVars } from 'components/Game/Unit/Building/useCssVars';
import { CardId } from 'src/models/game';
import CardDialog from 'components/Game/Dialog/Card.vue';
import Cover from 'components/Game/Unit/Building/Cover.vue';
import ChainBadge from 'components/Game/Badge/Chain.vue';
import PriceBadge from 'components/Game/Badge/Price.vue';
import BoardService from 'src/service/Board';
import Card from 'components/Game/Unit/Building/BuildingUnit.vue';

const $q = useQuasar();
const $game = useGameStore();

const cards = ref($game.state.cardItems.layout);
const co = computed(() => ({ [`age${$game.state.age}`]: true }));
const isMyTurn = computed(() => $game.isMyTurn);

const left = computed(() => $game.city($game.left));
const right = computed(() => $game.city($game.right));

const isPlayable = $game.isPlayableCard;
const getCoverGroup = (id: number) =>
  id === -2 ? 'guild' : `age_${$game.state.age}`;

const onClick = (id: CardId) => {
  $q.dialog({
    component: CardDialog,
    componentProps: {
      id,
    },
  });
};

const { cardWidth, cardHeight, cardChainBadgeSize, cardPriceBadgeSize } =
  useCssVars();

watch(
  () => $game.chan,
  () => {
    cards.value = $game.state.cardItems.layout;
  }
);
</script>

<style lang="scss" scoped>
@use 'sass:string';
@use 'sass:list';

@mixin board($tpl, $areaName) {
  $areas: ();
  $cardIndex: 1;

  @each $row in $tpl {
    $area: ();
    $l: string.length($row);

    @for $i from 1 through $l {
      $char: string.slice($row, $i, $i);
      @if $char == ' ' {
        $gridValue: '.';

        $area: list.append($area, $gridValue);
      } @else if $char == '[' {
        $gridValue: '#{$areaName}-#{$cardIndex}';

        $area: list.append($area, $gridValue);
        $area: list.append($area, $gridValue);
        $cardIndex: $cardIndex + 1;
      }
    }

    $areas: list.append($areas, string.quote(string.slice(#{$area}, 1, -1)));
  }

  grid-template-columns: repeat(
    string.length(list.nth($tpl, 1)),
    calc((var(--card-width) + (var(--card-width) * var(--card-overlap-x))) / 2)
  );
  grid-template-rows: repeat(
    list.length($tpl),
    calc(var(--card-height) - (var(--card-height) * var(--card-overlap-y)))
  );
  grid-template-areas: $areas;
}

$layouts: (
  'age1': '    [][]    ' '   [][][]   ' '  [][][][]  ' ' [][][][][] '
    '[][][][][][]',
  'age2': '[][][][][][]' ' [][][][][] ' '  [][][][]  ' '   [][][]   '
    '    [][]    ',
  'age3': '    [][]    ' '   [][][]   ' '  [][][][]  ' '   []  []   '
    '  [][][][]  ' '   [][][]   ' '    [][]    ',
);

.the-deck {
  --card-width: v-bind(cardWidth);
  --card-height: v-bind(cardHeight);
  --card-overlap-x: 0.1;
  --card-overlap-y: 0.5;
  display: grid;
  justify-content: center;

  @each $age, $value in $layouts {
    &.#{$age} {
      @include board(map-get($layouts, $age), 's');
    }
  }

  .playable {
    cursor: pointer;
  }
}
</style>
