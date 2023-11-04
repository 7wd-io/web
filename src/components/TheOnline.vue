<template>
  <q-card class="swd-cover-dark">
    <q-card-section>
      <div class="text-positive text-weight-bolder">
        {{ count }} online now
      </div>
    </q-card-section>
    <q-card-section class="no-padding">
      <q-list
        padding
        class="list"
      >
        <q-scroll-area
          class="players"
        >
          <template
            v-for="player in players"
            :key="`${player[0]}:${player[1]}`"
          >
            <q-separator dark/>

            <q-item
              dense
              clickable
              v-ripple
              @click="onClick(player[0])"
            >
              <q-item-section>
                <Player
                  :name="player[0]"
                  :profile="false"
                />
              </q-item-section>
              <q-item-section
                side
                class="text-white text-weight-bolder"
              >
                {{ player[1] }}
              </q-item-section>
            </q-item>
          </template>
        </q-scroll-area>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useOnline } from 'src/stores/online';
import { useQuasar } from 'quasar';
import Player from 'components/Player/Player.vue';
import Profile from 'components/Account/Profile.vue';
import { Nickname } from 'src/models/game';

const $q = useQuasar();
const $online = useOnline();

const players = computed(() => $online.desc);
const count = computed(() => $online.count);

const onClick = (name: Nickname) => {
  $q.dialog({
    component: Profile,
    componentProps: {
      name,
    },
  });
};
</script>

<style lang="scss" scoped>
.list {
  .q-separator:first-child {
    display: none;
  }
}

.players {
  height: calc(48vh - 120px);
}
</style>
