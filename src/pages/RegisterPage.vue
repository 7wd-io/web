<script setup lang="ts">
import { ref } from 'vue';
import { useAccountStore } from 'stores/account';

const $account = useAccountStore();
const nickname = ref('');
const email = ref('');
const pass = ref('');

const onSubmit = async () => {
  await $account.signup(email.value, pass.value, nickname.value);
};
</script>

<template>
  <q-card class="q-pa-lg absolute-center">
    <h5 class="text-weight-bold text-center">Registration</h5>

    <q-form class="q-gutter-md" @submit="onSubmit">
      <q-input filled label="Your nickname" v-model="nickname" />

      <q-input filled label="Your email" v-model="email" />

      <q-input filled type="password" label="Your password" v-model="pass" />

      <q-card-actions align="center">
        <q-btn label="Register" type="submit" color="welcome" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
