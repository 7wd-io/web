<template>
  <q-markup-table
    class="the-score-card"
    dense
  >
    <thead>
    <tr class="text-bold">
      <th>

      </th>

      <th>
        <Text
          size="sm"
          class="text-center relative-position q-pa-md"
        >
          {{ left.name }}

          <PlayAgainBadge :name="left.name" />
        </Text>
      </th>

      <th>
        <Text
          size="sm"
          class="text-center relative-position q-pa-md"
        >
          {{ right.name }}

          <PlayAgainBadge :name="right.name" />
        </Text>
      </th>
    </tr>
    </thead>

    <tbody>
    <tr>
      <td>
        <div class="row justify-center">
          <VictoryIcon :size="baseSizeIcon"/>
        </div>
      </td>
      <td class="text-center">
        <Reason
          v-if="left.name === winner"
          :value="victory"
        />
      </td>
      <td class="text-center">
        <Reason
          v-if="right.name === winner"
          :value="victory"
        />
      </td>
    </tr>

    <tr class="rating">
      <td>
        <div class="row justify-center">
          <RatingIcon :size="baseSizeIcon"/>
        </div>
      </td>
      <td class="text-center">
        <Text
          v-if="right.name !== botNickname"
          size="sm"
        >
          {{ leftRatingPoints }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ rightRatingPoints }}
        </Text>
      </td>
    </tr>

    <tr>
      <td>
        <div class="row justify-center">
          <CardIcon
            :group="CardGroupId.civilian"
            :size="smIconSize"
          />
        </div>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ left.score.civilian }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ right.score.civilian }}
        </Text>
      </td>
    </tr>

    <tr>
      <td>
        <div class="row justify-center">
          <CardIcon
            :group="CardGroupId.scientific"
            :size="smIconSize"
          />
        </div>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ left.score.science }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ right.score.science }}
        </Text>
      </td>
    </tr>

    <tr>
      <td>
        <div class="row justify-center">
          <CardIcon
            :group="CardGroupId.commercial"
            :size="smIconSize"
          />
        </div>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ left.score.commercial }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ right.score.commercial }}
        </Text>
      </td>
    </tr>

    <tr>
      <td>
        <div class="row justify-center">
          <CardIcon
            :group="CardGroupId.guild"
            :size="smIconSize"
          />
        </div>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ left.score.guilds }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ right.score.guilds }}
        </Text>
      </td>
    </tr>

    <tr>
      <td>
        <div class="row justify-center">
          <WonderIcon :size="lgIconSize"/>
        </div>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ left.score.wonders }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ right.score.wonders }}
        </Text>
      </td>
    </tr>

    <tr>
      <td>
        <div class="row justify-center">
          <TokenIcon :size="lgIconSize"/>
        </div>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ left.score.tokens }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ right.score.tokens }}
        </Text>
      </td>
    </tr>

    <tr>
      <td>
        <div class="row justify-center">
          <CoinIcon :size="lgIconSize"/>
        </div>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ left.score.coins }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ right.score.coins }}
        </Text>
      </td>
    </tr>

    <tr>
      <td>
        <div class="row justify-center">
          <MilitaryIcon :size="lgIconSize"/>
        </div>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ left.score.military }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="sm">
          {{ right.score.military }}
        </Text>
      </td>
    </tr>

    <tr class="total">
      <td>
      </td>
      <td class="text-center">
        <Text size="lg">
          {{ left.score.total }}
        </Text>
      </td>
      <td class="text-center">
        <Text size="lg">
          {{ right.score.total }}
        </Text>
      </td>
    </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup lang="ts">
import { useGame } from 'src/stores/game/game';
import { CardGroupId, Nickname } from 'src/models/game';
import VictoryIcon from 'components/Game/Icon/Victory/Victory.vue';
import Text from 'components/Game/Text.vue';
import { botNickname } from 'src/models/account';
import Reason from './Reason.vue';
import CardIcon from './CardIcon.vue';
import WonderIcon from './WonderIcon.vue';
import TokenIcon from './TokenIcon.vue';
import CoinIcon from './CoinIcon.vue';
import MilitaryIcon from './MilitaryIcon.vue';
import RatingIcon from './RatingIcon.vue';
import PlayAgainBadge from './PlayAgainBadge.vue';

const $game = useGame();

const baseSizeIcon = 'calc(var(--swd-game-unit) * 2.5)';
const smIconSize = `calc(${baseSizeIcon} * .8)`;
const lgIconSize = `calc(${baseSizeIcon} * 1.2)`;
const left = $game.city($game.left);
const right = $game.city($game.right);
const {
  winner,
  victory,
} = $game.state;
const ratingPoints = $game.players[winner as Nickname].points;
const leftRatingPoints = (left.name === winner) ? `+${ratingPoints}` : `-${ratingPoints}`;
const rightRatingPoints = (right.name === winner) ? `+${ratingPoints}` : `-${ratingPoints}`;
</script>

<style lang="scss" scoped>
.the-score-card {
  tr {
    th, td {
      color: #333;
    }
  }
}

.total {
  td {
    padding-top: var(--swd-game-gap-md);
    padding-bottom: var(--swd-game-gap-md);
  }
}
</style>
