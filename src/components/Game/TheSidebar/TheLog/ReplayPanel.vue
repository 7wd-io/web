<template>
  <q-dialog
    position="bottom"
    ref="dialogRef"
    @hide="onDialogHide"
    :model-value="$log.replay"
    :persistent="true"
    :seamless="true"
    class="z-max"
  >
    <q-card class="swd-dialog no-border" style="width: 200px">
      <q-linear-progress
        dark
        size="20px"
        :value="index / length"
        color="accent"
      >
        <div class="absolute-full flex flex-center">
          <div class="text-black" style="font-size: 0.6em">
            <b>{{ index }}/{{ length }}</b>
          </div>
        </div>
      </q-linear-progress>
      <div class="row justify-between items-center q-py-sm">
        <div></div>
        <div>
          <q-btn
            flat
            round
            icon="arrow_back_ios"
            :disable="prevDisabled"
            @click="prev"
          />
          <q-btn
            flat
            round
            icon="arrow_forward_ios"
            :disable="nextDisabled"
            @click="next"
          />
        </div>

        <div>
          <q-btn flat round icon="close" @click="onOff" />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { useLogStore } from 'stores/game/log';

defineEmits([...useDialogPluginComponent.emits]);
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const $log = useLogStore();
const index = computed(() => $log.index);
const length = computed(() => $log.records.length);
const prevDisabled = computed(() => $log.index === 0);
const nextDisabled = computed(() => $log.index === length.value);

onBeforeUnmount(() => {
  $log.replayOff();
});

const onOff = () => {
  $log.replayOff();
  onDialogOK();
};

const prev = () => {
  $log.prev();
};

const next = () => {
  $log.next();
};
</script>
