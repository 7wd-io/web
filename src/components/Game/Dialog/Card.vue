<template>
  <q-dialog
    id="dialog-card-action"
    ref="dialogRef"
    @hide="onDialogHide"
    :persistent="false"
  >
    <q-card class="swd-dialog" @mousedown="onMouseDown">
      <q-card-section>
        <div class="row no-wrap q-gutter-lg">
          <div class="column justify-center q-gutter-md">
            <div class="row justify-center">
              <CardComp :id="id" size="calc(var(--swd-game-unit) * 8)" />
            </div>

            <div>
              <Button
                class="full-width"
                :disable="
                  !isMyTurn || city.bank.cardPrice[id] > city.treasure.coins
                "
                @click="onConstructCard"
                v-close-popup
              >
                <div class="row justify-center q-gutter-sm">
                  <div>Construct</div>
                  <PriceHint
                    :value="city.bank.cardPrice[id]"
                    :size="priceHintSize"
                  />
                </div>
              </Button>
            </div>

            <div>
              <Button
                class="full-width"
                :disable="!isMyTurn"
                @click="onDiscardCard"
                v-close-popup
              >
                <div class="row justify-center q-gutter-sm">
                  <div>Discard</div>
                  <PriceHint
                    :value="city.bank.discardReward"
                    :size="priceHintSize"
                  />
                </div>
              </Button>
            </div>
          </div>
          <div class="col-auto">
            <div class="wonders-box fit">
              <template v-for="id in city.wonders.list" :key="id">
                <div>
                  <Wonder :id="id" size="calc(var(--swd-game-unit) * 14)" />
                  <div class="text-center q-mt-sm">
                    <Button
                      v-if="!city.wonders.constructed[id]"
                      :disable="
                        !isMyTurn ||
                        city.bank.wonderPrice[id] > city.treasure.coins
                      "
                      @click="onConstructWonder(id)"
                      v-close-popup
                    >
                      <div class="row justify-center q-gutter-sm">
                        <div>Construct</div>
                        <PriceHint
                          :value="city.bank.wonderPrice[id]"
                          :size="priceHintSize"
                        />
                      </div>
                    </Button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { CardId, WonderId } from 'src/models/game';
import { useDialogPluginComponent } from 'quasar';
import { useGame } from 'stores/game/game';
import { useMoveStore } from 'stores/game/move';
import { useAccountStore } from 'stores/account';
import { useDraggble } from 'components/Game/Dialog/useDraggble';
import { computed } from 'vue';
import Wonder from 'components/Game/Wonder/Wonder.vue';
import CardComp from 'components/Game/Card/Card.vue';
import Button from 'components/Game/Button.vue';
import PriceHint from 'components/Game/PriceHint/PriceHint.vue';

interface Props {
  id: CardId;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { id } = defineProps<Props>();

// runtime
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits([...useDialogPluginComponent.emits]);
const {
  dialogRef,
  onDialogHide,
  // onDialogOK,
} = useDialogPluginComponent();

const { onMouseDown } = useDraggble('#dialog-card-action .swd-dialog');

const $account = useAccountStore();
const $move = useMoveStore();
const $game = useGame();
const isMyTurn = computed(() => $game.isMyTurn);
const city = computed(() => $game.city($account.user.nickname));
const priceHintSize = 'calc(var(--swd-game-unit) * 1.8)';

const onDiscardCard = () => {
  $move.discardCard($game.id, id);
};

const onConstructCard = () => {
  $move.constructCard($game.id, id);
};

const onConstructWonder = (wid: WonderId) => {
  $move.constructWonder($game.id, wid, id);
};
</script>

<style lang="scss" scoped>
.wonders-box {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--swd-game-gap-md);
}
</style>
