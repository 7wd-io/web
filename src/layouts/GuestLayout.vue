<template>
  <q-layout view="hhh lpR fFf" class="full-height" :class="co">
    <q-header class="header">
      <div class="row justify-center">
        <div class="col-8">
          <q-toolbar>
            <q-btn flat round class="q-mr-lg" :to="{ name: 'welcome' }" no-caps>
              <span class="text-h6 text-weight-bolder">7wd</span>
            </q-btn>

            <q-btn
              flat
              color="white"
              label="Discord"
              href="https://discord.gg/FNYke6MF57"
              target="_blank"
              class="q-ml-md"
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

<style></style>

<style lang="scss" scoped>
.header {
  background-color: transparent;
}
</style>
