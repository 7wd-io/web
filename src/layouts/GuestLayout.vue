<template>
  <q-layout
    view="hhh lpR fFf"
    class="guest-layout full-height"
    :class="co"
  >
    <q-header class="header">
      <div class="row justify-center">
        <div class="col-8">
          <q-toolbar>
            <q-btn
              flat
              round
              class="q-mr-lg"
              :to="{ name: 'welcome'}"
              no-caps
            >
              <span class="text-h6 text-weight-bolder">7wd</span>
            </q-btn>

            <q-btn
              flat
              color="white"
              label="Discord"
              href="https://discord.gg/4wGgQYNWBy"
              target="_blank"
              class="q-ml-md"
            />

            <q-btn
              flat
              color="white"
              label="About"
              :to="{ name: 'about' }"
            />

            <q-space />

            <q-btn
              label="Register"
              class="q-mr-sm"
              outline
              color="white"
              :to="{ name: 'register'}"
            />
            <q-btn
              label="Login"
              outline
              color="white"
              :to="{ name: 'login'}"
            />
          </q-toolbar>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const $route = useRoute();

const co = computed(() => ({
  welcome: $route.name === 'welcome',
}));
</script>

<style>

</style>

<style lang="scss" scoped>
.guest-layout {
  background: linear-gradient(120deg, #5e60ce, #4ea8de) top left/cover no-repeat;

  &.welcome {
    background:
      linear-gradient(120deg, #5e60ce, #4ea8de) top left/100% 750px no-repeat,
      var(--swd-bg-color-main);
  }
}

.header {
  background-color: transparent;
}
</style>
