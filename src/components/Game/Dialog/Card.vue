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
                @click="onDiscard"
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
import { useQuasar, useDialogPluginComponent } from 'quasar';
import { useGame } from 'src/stores/game/game';
import { useAccountStore } from 'src/stores/account';
import { useDraggble } from 'components/Game/Dialog/useDraggble';
import { computed } from 'vue';
import { ApiError, api } from 'boot/axios';
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

const $q = useQuasar();
const $account = useAccountStore();
const $game = useGame();
const isMyTurn = computed(() => $game.isMyTurn);
const city = computed(() => $game.city($account.user.nickname));
const priceHintSize = 'calc(var(--swd-game-unit) * 1.8)';

const onDiscard = async () => {
  try {
    await api.post('/game/move/discard-card', {
      gid: $game.id,
      cid: id,
    });
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  }
};

const onConstructCard = async () => {
  try {
    await api.post('/game/move/construct-card', {
      gid: $game.id,
      cid: id,
    });
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  }
};

const onConstructWonder = async (wid: WonderId) => {
  try {
    await api.post('/game/move/construct-wonder', {
      gid: $game.id,
      wid,
      cid: id,
    });
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  }
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
