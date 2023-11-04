<template>
  <q-layout view="hHh lpr fFf" class="main-layout full-height">
    <q-header class="header bg-dark" bordered>
      <div class="row justify-center">
        <div class="col-8">
          <q-toolbar>
            <q-btn flat round class="q-mr-lg" :to="{ name: 'lobby' }" no-caps>
              <span class="text-h6 text-weight-bolder">7wd</span>
            </q-btn>

            <q-tabs v-model="tab" indicator-color="transparent">
              <q-route-tab
                name="lobby"
                label="Lobby"
                :to="{ name: 'lobby' }"
                exact-active-class="tab-route-active"
              />
              <q-route-tab
                name="faq"
                label="How to play"
                :to="{ name: 'faq' }"
                exact-active-class="tab-route-active"
              />

              <q-route-tab
                name="discord"
                label="Discord"
                href="https://discord.gg/4wGgQYNWBy"
                target="_blank"
              />
            </q-tabs>

            <q-space />

            <q-btn-dropdown flat :no-caps="true">
              <template #label>
                {{ accountName }}
                <template v-if="accountRating">
                  ({{ accountRating }})
                </template>
              </template>
              <q-list class="text-dark">
                <q-item
                  v-for="(item, ind) in accountMenu"
                  :key="ind"
                  @click="item.onClick"
                  clickable
                  v-close-popup
                >
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>

                  <q-item-section>
                    {{ item.label }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-toolbar>
        </div>
      </div>
    </q-header>
    <q-page-container class="full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useAccountStore } from 'src/stores/account';
// import { useOnline } from 'src/stores/online';
import Profile from 'components/Account/Profile.vue';
import Settings from 'components/Account/Settings.vue';

const tab = ref('');
interface Action {
  icon: string;
  label: string;
  onClick: () => void;
}

const $q = useQuasar();
const $account = useAccountStore();
// const $online = useOnline();

const accountName = computed(() => $account.user.nickname);
// const accountRating = computed(() => $online.players[$account.user.rating]);
const accountRating = computed(() => $account.user.rating);
const accountMenu: Action[] = [
  {
    icon: 'person',
    label: 'Profile',
    onClick() {
      $q.dialog({
        component: Profile,
        componentProps: {
          name: accountName.value,
        },
      });
    },
  },
  {
    icon: 'settings',
    label: 'Settings',
    onClick() {
      $q.dialog({
        component: Settings,
      });
    },
  },
  {
    icon: 'logout',
    label: 'Logout',
    onClick() {
      void $account.logout();
    },
  },
];
</script>

<style lang="scss" scoped>
.main-layout {
  color: white;
  background: linear-gradient(
      150deg,
      rgba(13, 46, 62, 0.75) 0,
      rgba(126, 126, 126, 0.5) 50%,
      rgba(88, 66, 24, 0.75) 100%
    ),
    url('/img/game/bg.jpg') center/cover no-repeat fixed;
}
</style>
