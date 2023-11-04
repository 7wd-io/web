<template>
  <div class="the-game">
    <div
      style="grid-area: main"
      class="main swd-game-cover"
    >
      <div class="row justify-center">
        <TheBoard />
      </div>

      <div
        v-if="!isOver"
        class="section-move-info"
      >
        <TheMoveInfo />
      </div>

      <template v-if="isOver">
        <div class="row justify-center q-mt-md">
          <ThePlayAgain />
        </div>
        <div class="row justify-center q-mt-md">
          <TheScoreCard />
        </div>
      </template>

      <template v-else>
        <div
          v-if="wonderPickInProgress"
          class="section-wonder-picker"
        >
          <TheWondersPicker />
        </div>
        <template v-else>
          <TheDeck />
        </template>
      </template>

      <Badge
        pos="bottom-right"
        y="-130%"
        x="-130%"
        class="z-top"
      >
        <TheDiscard />
      </Badge>
    </div>

    <City
      :name="left"
      style="grid-area: left"
      :class="CityService.classLeftMarker"
    />

    <City
      :name="right"
      style="grid-area: right"
      :class="CityService.classRightMarker"
    />

    <SelectFirstPlayerDialog />
    <PickBoardTokenDialog />
    <PickRandomTokenDialog />
    <BurnCardDialog />
    <PickTopLineCardDialog />
    <PickDiscardedCardDialog />
    <PickReturnedCardsDialog />
    <ReplayPanel />
  </div>
</template>

<script setup lang="ts">
import TheBoard from 'components/Game/TheBoard/TheBoard.vue';
import TheMoveInfo from 'components/Game/TheTurnInfo.vue';
import TheWondersPicker from 'components/Game/TheWondersPicker.vue';
import TheDeck from 'components/Game/TheDeck.vue';
import TheDiscard from 'components/Game/TheDiscard.vue';
import TheScoreCard from 'components/Game/TheScoreCard/TheScoreCard.vue';
import ThePlayAgain from 'components/Game/ThePlayAgain/ThePlayAgain.vue';
import City from 'components/Game/City/City.vue';
import Card from 'components/Game/Card/Card.vue';
import { useGame } from 'src/stores/game/game';
import { useLog } from 'src/stores/game/log';
import { useAccount } from 'src/stores/account';
import {
  watch, createApp, ref, computed,
} from 'vue';
import {
  CardId, Phase,
} from 'src/models/game';
import { MoveValidator } from 'src/models/move';
import BoardService from 'src/service/Board';
import CityService from 'src/service/City';
import Badge from 'components/Badge.vue';
import SelectFirstPlayerDialog from 'components/Game/Dialog/SelectFirstPlayer.vue';
import PickBoardTokenDialog from 'components/Game/Dialog/PickBoardToken.vue';
import PickRandomTokenDialog from 'components/Game/Dialog/PickRandomToken.vue';
import BurnCardDialog from 'components/Game/Dialog/BurnCard.vue';
import PickTopLineCardDialog from 'components/Game/Dialog/PickTopLineCard.vue';
import PickDiscardedCardDialog from 'components/Game/Dialog/PickDiscardedCard.vue';
import PickReturnedCardsDialog from 'components/Game/Dialog/PickReturnedCards.vue';
import ReplayPanel from 'components/Game/TheSidebar/TheLog/ReplayPanel.vue';
import { LogRecord } from 'src/models/log';
import { ApiError } from 'boot/api';
import { useQuasar } from 'quasar';
import gsap from 'gsap';
import { AnimationSpeed } from 'src/models/account';

const $q = useQuasar();
const $account = useAccount();
const $game = useGame();
const $log = useLog();
const isOver = ref($game.isOver);
const wonderPickInProgress = ref($game.state.phase === Phase.prepare);

const { left, right } = $game;

const createCard = (id: CardId) => {
  const c = createApp(Card, {
    id,
    animated: true,
  });

  c.component('swd-card', Card);

  return c;
};

// slower -> faster
const speed: Record<AnimationSpeed, number> = {
  1: 1,
  2: 0.75,
  3: 0.5,
  4: 0.4,
  5: 0.3,
};

const animationFn = 'power1.in';

const handleMove = (record: LogRecord) => {
  const {
    move,
    meta,
  } = record;

  let toX = 0;
  let toY = 0;

  const $myCity = new CityService(meta.actor);
  const $enemyCity = new CityService($game.enemy(meta.actor));
  const durationMedium = computed(() => speed[$account.profile.settings.game.animationSpeed]);
  const durationFast = computed(() => durationMedium.value * 0.7);

  if (MoveValidator.isPickWonder(move)) {
    const $wonder = BoardService.getWonder(move.wonder);
    const {
      x: wonderX,
      y: wonderY,
    } = $wonder.getBoundingClientRect();

    const $wonderHolder = $myCity.getElementWonderHolder();
    const {
      x: wHolderX,
      y: wHolderY,
    } = $wonderHolder.getBoundingClientRect();

    gsap.to($wonder, {
      x: wHolderX - wonderX,
      y: wHolderY - wonderY,
      duration: durationMedium.value,
      ease: animationFn,
      onStart() {
        $wonder.classList.add('z-top', 'absolute');
      },
      onComplete() {
        $wonder.classList.add('invisible');
        $game.tick();
      },
    });

    return;
  }

  if (MoveValidator.isConstructCard(move) || MoveValidator.isPickTopLineCard(move)) {
    const $wondersBar = $myCity.getElementWondersBar();
    const {
      x: cityX,
      y: cityY,
      height: cityH,
      width: cityW,
    } = $wondersBar.getBoundingClientRect();

    const $card = BoardService.getCard(move.card);
    const {
      x: cardX,
      y: cardY,
      width: cardW,
      height: cardH,
    } = $card.getBoundingClientRect();

    toX = $myCity.isLeft()
      ? cityX + cityW - cardW
      : cityX;

    toY = cityY + (cityH / 2) - (cardH / 2);

    gsap.to($card, {
      x: toX - cardX,
      y: toY - cardY,
      duration: durationMedium.value,
      ease: animationFn,
      onStart() {
        $card.classList.add('z-top', 'absolute');
      },
      onComplete() {
        $game.tick();
      },
    });

    return;
  }

  if (MoveValidator.isDiscardCard(move)) {
    // right top card corner to bottom left discard corner
    const {
      x: discardX,
      y: discardY,
    } = BoardService.getDiscard()
      .getBoundingClientRect();

    const $elCard = BoardService.getCard(move.card);
    const {
      x: cardX,
      y: cardY,
      width: cardW,
      height: cardH,
    } = $elCard.getBoundingClientRect();

    gsap.to($elCard, {
      x: discardX - (cardX + cardW),
      y: discardY - (cardY + cardH),
      duration: durationFast.value,
      ease: animationFn,
      onStart() {
        $elCard.classList.add('z-top');
      },
      onComplete() {
        $game.tick();
      },
    });

    return;
  }

  if (MoveValidator.isConstructWonder(move)) {
    const $elWonder = $myCity.getElementWonder(move.wonder);
    const {
      x: wonderX,
      y: wonderY,
      height: wonderH,
      width: wonderW,
    } = $elWonder.getBoundingClientRect();

    const $elCard = BoardService.getCard(move.card);
    const {
      x: cardX,
      y: cardY,
      width: cardW,
      height: cardH,
    } = $elCard.getBoundingClientRect();

    toX = wonderX + (wonderW / 2) - (cardW / 2);
    toY = wonderY + (wonderH / 2) - (cardH / 2);

    gsap.to(`.${BoardService.getClassnameCard(move.card)}`, {
      rotate: 90,
      scale: 0.9,
      x: toX - cardX,
      y: toY - cardY,
      duration: durationMedium.value,
      ease: animationFn,
      onStart() {
        $elCard.classList.add('z-top', 'absolute');
      },
      onComplete() {
        $game.tick();
      },
    });

    return;
  }

  if (MoveValidator.isPickBoardToken(move)) {
    const $token = BoardService.getToken(move.token);
    const {
      x: tokenX,
      y: tokenY,
      width: tokenW,
      height: tokenH,
    } = $token.getBoundingClientRect();

    const $tokensBar = $myCity.getElementTokensBar();
    const {
      x: tokensBarX,
      y: tokensBarY,
      height: tokensBarH,
      width: tokensBarW,
    } = $tokensBar.getBoundingClientRect();

    $token.classList.add('z-top');

    gsap.to($token, {
      x: tokensBarX + (tokensBarW / 2) - (tokenW / 2) - tokenX,
      y: tokensBarY + (tokensBarH / 2) - (tokenH / 2) - tokenY,
      duration: durationMedium.value,
      ease: 'power1.in',
      onComplete() {
        $game.tick();
      },
    });

    return;
  }

  if (MoveValidator.isBurnCard(move)) {
    const $burnHolder = $enemyCity.getElementBurnHolder();
    const $elCard = createCard(move.card);

    void $elCard
      .mount($burnHolder)
      .$nextTick(() => {
        const {
          x: burnX,
          y: burnY,
          height: burnH,
        } = $burnHolder.getBoundingClientRect();

        const {
          x: discardX,
          y: discardY,
          width: discardW,
        } = BoardService.getDiscard()
          .getBoundingClientRect();

        gsap.to($burnHolder, {
          x: (discardX - discardW) - burnX,
          y: (discardY - burnH) - burnY,
          duration: durationMedium.value,
          ease: animationFn,
          onComplete() {
            $elCard.unmount();
            $game.tick();
          },
        });
      });

    return;
  }

  if (MoveValidator.isPickDiscardedCard(move)) {
    const $discardHolder = BoardService.getDiscardCardHolder();
    const $elCard = createCard(move.card);

    void $elCard
      .mount($discardHolder)
      .$nextTick(() => {
        const {
          x: discardX,
          y: discardY,
          width: discardW,
          height: discardH,
        } = $discardHolder.getBoundingClientRect();

        const $wondersBar = $myCity.getElementWondersBar();
        const {
          x: cityX,
          y: cityY,
          height: cityH,
          width: cityW,
        } = $wondersBar.getBoundingClientRect();

        gsap.to($discardHolder, {
          x: cityX + (cityW / 2) - (discardW / 2) - discardX,
          y: cityY + (cityH / 2) - (discardH / 2) - discardY,
          duration: durationMedium.value,
          ease: animationFn,
          onComplete() {
            $elCard.unmount();
            $game.tick();
          },
        });
      });

    return;
  }

  if (MoveValidator.isPickReturnedCards(move)) {
    const {
      pick,
      give,
    } = move;

    const $pick = $myCity.getElementCardInHolder();
    const $pickCard = createCard(pick);
    $pickCard.mount($pick);

    const $give = $enemyCity.getElementCardInHolder();
    const $giveCard = createCard(give);
    $giveCard.mount($give);

    let pickX: Record<string, string>;
    let giveX: Record<string, string>;

    if ($myCity.isLeft()) {
      pickX = { right: '100%' };
      giveX = { left: '100%' };
    } else {
      pickX = { left: '100%' };
      giveX = { right: '100%' };
    }

    gsap.to($pick, {
      ...pickX,
      duration: durationMedium.value,
      ease: animationFn,
      onComplete() {
        $pickCard.unmount();
        $game.tick();
      },
    });

    gsap.to($give, {
      ...giveX,
      duration: durationMedium.value,
      ease: animationFn,
      onComplete() {
        $giveCard.unmount();
        $game.tick();
      },
    });
  }

  $game.tick();
};

watch(
  () => $game.chan,
  () => {
    const { move } = $log.last;

    const wondersCount = $game.state.me.wonders.list.length
    + $game.state.enemy.wonders.list.length;

    const draftSize = 8;
    if (
      MoveValidator.isPickWonder(move)
      && wondersCount === draftSize
    ) {
      // drop prepare phase only after wonders bar animation finished
      wonderPickInProgress.value = false;
    }

    isOver.value = $game.isOver;
  },
);

watch(
  () => $log.records,
  () => {
    if ($log.replay) {
      return;
    }

    try {
      handleMove($log.last);
    } catch (error) {
      // hack mute
    }
  },
);

watch(
  () => $log.index,
  async (newValue, oldValue) => {
    try {
      await $game.goto(newValue);
      // hack to avoid errors because wonders picker DOM don't exist in normally way
      wonderPickInProgress.value = $game.state.phase === Phase.prepare;

      const isSerial = (newValue - oldValue) === 1;
      if (isSerial) {
        handleMove($log.records[newValue - 1]);
      } else {
        $game.tick();
      }
    } catch (error) {
      const err = error as ApiError;

      $q.notify({
        message: err.response?.data.err_message,
        type: 'negative',
      });
    }
  },
);

</script>

<style lang="scss" scoped>
.the-game {
  color: white;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "left main right"
    "left main right";

  padding: var(--swd-game-gap-lg);
}

.main {
  position: relative;
  margin-left: var(--swd-game-gap-lg);
  margin-right: var(--swd-game-gap-lg);
}

.section-move-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: var(--swd-game-gap-lg);
  margin-bottom: var(--swd-game-gap-lg);
}

.section-wonder-picker {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: calc(var(--swd-game-unit) * 10);
}
</style>
