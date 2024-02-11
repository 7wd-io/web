<script setup lang="ts">
import { ref } from 'vue';
import { useAccountStore } from 'stores/account';
import { ApiError } from 'boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const $account = useAccountStore();

const inProgress = ref(false);
const nickname = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rules = {
  nickname: [
    (val: string) => (val && val.length > 0) || 'Nickname is required',
  ],
  email: [(val: string) => (val && val.length > 0) || 'Email is required'],
  password: [
    (val: string) => (val && val.length > 0) || 'Password is required',
  ],
};

const onSubmit = async () => {
  inProgress.value = true;

  try {
    await $account.signup(email.value, password.value, nickname.value);
  } catch (error) {
    const err = error as ApiError;

    $q.notify({
      message: err.response?.data.err,
      type: 'negative',
    });
  } finally {
    inProgress.value = false;
  }
};
</script>

<template>
  <q-card class="q-pa-lg absolute-center" style="width: 300px">
    <h5 class="text-weight-bold text-center">Registration</h5>

    <q-form :autofocus="true" novalidate @submit="onSubmit">
      <q-input
        type="text"
        label="Your nickname *"
        color="welcome"
        v-model="nickname"
        lazy-rules="ondemand"
        :rules="rules.nickname"
        :clearable="true"
      />

      <q-input
        label="Your email *"
        color="welcome"
        v-model="email"
        lazy-rules="ondemand"
        :rules="rules.email"
        :clearable="true"
      />

      <q-input
        label="Your password *"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        color="welcome"
        :rules="rules.email"
        lazy-rules="ondemand"
        :clearable="true"
      >
        <template #append>
          <q-icon
            class="cursor-pointer"
            :name="showPassword ? 'visibility_off' : 'visibility'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>

      <q-card-actions align="center" class="q-pt-md">
        <q-btn
          label="Register"
          type="submit"
          color="welcome"
          :loading="inProgress"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
