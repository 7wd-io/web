<template>
  <div
    class="rounded-borders q-pa-lg swd-cover-dark relative-position"
    style="width: 300px; height: 450px"
  >
    <h5 class="text-weight-bold text-center text-uppercase">Register</h5>

    <q-form novalidate @submit="onSubmit">
      <q-input
        type="text"
        label="Nickname *"
        color="primary"
        bg-color="white"
        v-model="nickname"
        lazy-rules="ondemand"
        :rules="rules.nickname"
        :clearable="true"
        outlined
      />

      <q-input
        label="Email *"
        color="primary"
        bg-color="white"
        v-model="email"
        lazy-rules="ondemand"
        :rules="rules.email"
        :clearable="true"
        outlined
      />

      <q-input
        label="Password *"
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        color="primary"
        bg-color="white"
        :rules="rules.email"
        lazy-rules="ondemand"
        :clearable="true"
        outlined
      >
        <template #append>
          <q-icon
            class="cursor-pointer"
            :name="showPassword ? 'visibility_off' : 'visibility'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
      <q-btn type="submit" class="hidden" />
    </q-form>
    <div class="form-footer">
      <div class="row justify-center">
        <div class="col col-auto">
          <q-btn
            style="width: 150px"
            label="Register"
            color="primary"
            :loading="inProgress"
            @click="onSubmit"
            push
          />
        </div>
      </div>
    </div>
  </div>
</template>

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

<style>
.form-footer {
  position: absolute;
  width: 300px;
  left: 0px;
  bottom: 25px;
}
</style>
